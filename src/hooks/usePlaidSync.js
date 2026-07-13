import { useState, useEffect, useCallback } from 'react'
import { getSessionToken } from '../lib/auth'

// Hardcoded, not env-driven — same reasoning as Training Log's oracleSync.js:
// this decides *where* the caller's Clerk JWT can go, so it's a literal
// constant, never something a misconfigured env var could redirect.
const ORACLE_ORIGIN = 'https://vice-tracker-orpin.vercel.app'

function matchAccount(plaidAccount, debts) {
  const pName = plaidAccount.name.toLowerCase()
  const oName = (plaidAccount.official_name || '').toLowerCase()

  const exact = debts.find(d =>
    d.lender.toLowerCase() === pName ||
    d.lender.toLowerCase() === oName
  )
  if (exact) return exact

  const partial = debts.find(d => {
    const words = d.lender.toLowerCase().split(/\s+/)
    return words.some(w => w.length > 3 && (pName.includes(w) || oName.includes(w)))
  })
  return partial ?? null
}

function formatLastSync(ts) {
  if (!ts) return null
  const mins = Math.floor((Date.now() - ts) / 60000)
  if (mins < 1) return 'JUST NOW'
  if (mins < 60) return `${mins} MIN AGO`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}H AGO`
  return `${Math.floor(hrs / 24)}D AGO`
}

export function usePlaidSync({ store, addToast }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncTs, setLastSyncTs] = useState(() => {
    const ts = localStorage.getItem('plaid_last_sync')
    return ts ? parseInt(ts) : null
  })
  const [linkToken, setLinkToken] = useState(null)
  const [unmatchedAccounts, setUnmatchedAccounts] = useState([])
  const [showMappingModal, setShowMappingModal] = useState(false)
  const [syncFlash, setSyncFlash] = useState(false)

  const lastSyncLabel = formatLastSync(lastSyncTs)
  const syncOverdue = lastSyncTs ? (Date.now() - lastSyncTs > 86400000) : false

  // Derive connection state from Oracle, not localStorage — Oracle holds the
  // actual plaid_connections row; this browser holds nothing sensitive.
  useEffect(() => {
    let cancelled = false
    async function checkStatus() {
      const token = await getSessionToken()
      if (!token) { if (!cancelled) setIsConnected(false); return }
      try {
        const res = await fetch(`${ORACLE_ORIGIN}/api/plaid/status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setIsConnected(!!data.connected)
      } catch (err) {
        console.warn('plaid status check failed:', err.message)
      }
    }
    checkStatus()
    return () => { cancelled = true }
  }, [])

  async function fetchLinkToken() {
    try {
      const token = await getSessionToken()
      if (!token) {
        addToast?.('SIGN IN TO CONNECT A BANK', 'red')
        return null
      }
      const res = await fetch(`${ORACLE_ORIGIN}/api/plaid/create-link-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ client_name: 'Debt Assassination' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setLinkToken(data.link_token)
      return data.link_token
    } catch (err) {
      console.error('create-link-token:', err.message)
      addToast?.('FAILED TO INITIALIZE — CHECK CONNECTION', 'red')
      return null
    }
  }

  const onLinkSuccess = useCallback(async (publicToken) => {
    try {
      const token = await getSessionToken()
      if (!token) throw new Error('Not signed in')
      const res = await fetch(`${ORACLE_ORIGIN}/api/plaid/exchange-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ public_token: publicToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setIsConnected(true)
      addToast?.('ACCOUNTS CONNECTED — READY TO SYNC', 'gold')
      // auto-sync immediately after connecting
      await runSync({ silent: false })
    } catch (err) {
      console.error('exchange-token:', err.message)
      addToast?.('CONNECTION FAILED — TRY AGAIN', 'red')
    }
  }, [store, addToast])

  const runSync = useCallback(async ({ silent = false } = {}) => {
    const token = await getSessionToken()
    if (!token) return

    setIsSyncing(true)
    try {
      const [balRes, liabRes] = await Promise.all([
        fetch(`${ORACLE_ORIGIN}/api/plaid/accounts`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${ORACLE_ORIGIN}/api/plaid/liabilities`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (balRes.status === 401) {
        addToast?.('SESSION EXPIRED — SIGN IN AGAIN', 'red')
        setIsConnected(false)
        return
      }
      if (!balRes.ok) {
        if (!silent) addToast?.('SYNC FAILED — CHECK CONNECTION', 'red')
        return
      }

      const { accounts } = await balRes.json()
      const { liabilities } = liabRes.ok ? await liabRes.json() : { liabilities: { credit: [] } }

      const liabMap = {}
      for (const c of (liabilities?.credit ?? [])) liabMap[c.account_id] = c

      const savedMap = JSON.parse(localStorage.getItem('plaid_account_map') || '{}')
      const activeDebts = store.debts.filter(d => d.balance > 0)
      const updates = []
      const unmatched = []

      for (const acct of accounts) {
        if (acct.type !== 'credit') continue

        let debt = null
        if (savedMap[acct.account_id]) {
          debt = activeDebts.find(d => d.id === savedMap[acct.account_id]) ?? null
        }
        if (!debt) debt = matchAccount(acct, activeDebts)

        if (!debt) {
          unmatched.push(acct)
          continue
        }

        const liab = liabMap[acct.account_id]
        const update = { debtId: debt.id, prevBalance: debt.balance }
        if (acct.balance !== null && acct.balance !== undefined) {
          update.balance = acct.balance
        }
        if (liab?.aprs?.length) {
          const pApr = liab.aprs.find(a => a.apr_type === 'purchase_apr')
          if (pApr) update.apr = pApr.apr_percentage
        }
        if (liab?.minimum_payment_amount != null) {
          update.minPayment = liab.minimum_payment_amount
        }
        updates.push({ ...update, lender: debt.lender })
      }

      const changed = store.batchUpdateFromPlaid(updates.map(u => ({
        debtId: u.debtId,
        balance: u.balance,
        apr: u.apr,
        minPayment: u.minPayment,
      })))

      const now = Date.now()
      localStorage.setItem('plaid_last_sync', String(now))
      setLastSyncTs(now)

      // flash for battle mode
      if (changed.length > 0) {
        setSyncFlash(true)
        setTimeout(() => setSyncFlash(false), 2500)
      }

      if (!silent) {
        for (const u of updates) {
          if (u.balance === undefined) continue
          const delta = u.balance - u.prevBalance
          if (Math.abs(delta) < 0.01) continue
          const dir = delta < 0
            ? `↓$${Math.abs(delta).toFixed(2)}`
            : `↑$${Math.abs(delta).toFixed(2)} FEE DETECTED`
          addToast?.(`${u.lender.toUpperCase()} — $${u.prevBalance.toFixed(2)} → $${u.balance.toFixed(2)} ${dir}`, delta < 0 ? 'gold' : 'red')
        }
        if (updates.length === 0 && unmatched.length === 0) {
          addToast?.('SYNC COMPLETE — NO CHANGES', 'gold')
        }
      } else if (changed.length > 0) {
        addToast?.(`AUTO-SYNC — ${changed.length} ACCOUNT${changed.length !== 1 ? 'S' : ''} UPDATED`, 'gold')
      }

      if (unmatched.length > 0 && !silent) {
        setUnmatchedAccounts(unmatched)
        setShowMappingModal(true)
      }
    } catch (err) {
      console.error('syncBalances:', err.message)
      if (!silent) addToast?.('SYNC FAILED — CHECK CONNECTION', 'red')
    } finally {
      setIsSyncing(false)
    }
  }, [store, addToast])

  function saveMappings(mappings) {
    const existing = JSON.parse(localStorage.getItem('plaid_account_map') || '{}')
    localStorage.setItem('plaid_account_map', JSON.stringify({ ...existing, ...mappings }))
    setShowMappingModal(false)
    setUnmatchedAccounts([])
    runSync({ silent: false })
  }

  // Local-only: clears this browser's sync cache/mapping, doesn't revoke the
  // Plaid item on Oracle's side. plaid_connections is shared with Vice
  // Tracker for this same user, so deleting it here would also break Vice
  // Tracker's bank sync — that cross-app action needs its own explicit UI,
  // not a side effect of this button.
  function disconnect() {
    localStorage.removeItem('plaid_last_sync')
    localStorage.removeItem('plaid_account_map')
    setIsConnected(false)
    setLastSyncTs(null)
    setLinkToken(null)
    addToast?.('DISCONNECTED FROM THIS DEVICE — BANK LINK STAYS ACTIVE ON ORACLE', 'red')
  }

  return {
    isConnected,
    isSyncing,
    lastSyncTs,
    lastSyncLabel,
    syncOverdue,
    linkToken,
    setLinkToken,
    fetchLinkToken,
    onLinkSuccess,
    syncBalances: runSync,
    saveMappings,
    disconnect,
    showMappingModal,
    setShowMappingModal,
    unmatchedAccounts,
    syncFlash,
  }
}
