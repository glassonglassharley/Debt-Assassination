import { useState, useMemo } from 'react'
import { ORIGINAL_DEBTS, TOTAL_ORIGINAL_DEBT } from '../constants'

const STORAGE_KEY = 'debt-assassination-v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch {}
}

function buildInitialDebts() {
  return ORIGINAL_DEBTS.map(d => ({
    ...d,
    balance: d.originalBalance,
    minPayment: null,
    apr: null,
  }))
}

function getInitialState() {
  const saved = loadState()
  if (saved?.debts?.length === ORIGINAL_DEBTS.length) return saved
  return {
    debts: buildInitialDebts(),
    paymentHistory: [],
    milestonesShown: [],
    playerHealth: 100,
    viewMode: 'dashboard',
    installDate: Date.now(),
  }
}

export function useDebtStore() {
  const [state, setState] = useState(getInitialState)

  function persist(next) {
    setState(next)
    saveState(next)
  }

  const derived = useMemo(() => {
    const totalRemaining = state.debts.reduce((s, d) => s + Math.max(0, d.balance), 0)
    const totalPaid = Math.max(0, TOTAL_ORIGINAL_DEBT - totalRemaining)
    const cardsKilled = state.debts.filter(d => d.balance <= 0).length
    const percentComplete = Math.min(100, (totalPaid / TOTAL_ORIGINAL_DEBT) * 100)
    const activeTarget = state.debts.find(d => d.balance > 0) ?? null
    const freedUpMinimums = state.debts
      .filter(d => d.balance <= 0 && d.minPayment)
      .reduce((s, d) => s + (d.minPayment || 0), 0)
    return { totalRemaining, totalPaid, cardsKilled, percentComplete, activeTarget, freedUpMinimums }
  }, [state.debts])

  function makePayment(debtId, amount) {
    const debt = state.debts.find(d => d.id === debtId)
    if (!debt || debt.balance <= 0) return null

    const actual = Math.min(amount, debt.balance)
    const newBalance = Math.max(0, debt.balance - actual)
    const cardKilled = newBalance === 0

    const historyEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US'),
      lender: debt.lender,
      amount: actual,
      balanceAfter: newBalance,
    }

    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, balance: newBalance } : d
    )
    const newHistory = [historyEntry, ...state.paymentHistory].slice(0, 10)
    let newHealth = state.playerHealth
    if (cardKilled) newHealth = Math.min(100, newHealth + 15)

    persist({ ...state, debts: newDebts, paymentHistory: newHistory, playerHealth: newHealth })
    return { cardKilled, lender: debt.lender }
  }

  function editBalance(debtId, newBalance) {
    const clamped = Math.max(0, parseFloat(newBalance) || 0)
    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, balance: clamped } : d
    )
    persist({ ...state, debts: newDebts })
  }

  function updateMinPayment(debtId, amount) {
    const num = parseFloat(amount)
    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, minPayment: isNaN(num) || num <= 0 ? null : num } : d
    )
    persist({ ...state, debts: newDebts })
  }

  function updateAPR(debtId, apr) {
    const num = parseFloat(apr)
    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, apr: isNaN(num) || num <= 0 ? null : num } : d
    )
    persist({ ...state, debts: newDebts })
  }

  function markMilestoneShown(milestone) {
    const allBelow = [25, 50, 75, 100].filter(m => m <= milestone)
    const newShown = [...new Set([...state.milestonesShown, ...allBelow])]
    persist({ ...state, milestonesShown: newShown })
  }

  function setViewMode(mode) {
    persist({ ...state, viewMode: mode })
  }

  function logCounterattack(debtId, feeAmount, feeLabel) {
    const debt = state.debts.find(d => d.id === debtId)
    if (!debt) return
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US'),
      lender: `ENEMY ATTACK — ${debt.lender}`,
      amount: feeAmount,
      balanceAfter: debt.balance + feeAmount,
    }
    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, balance: d.balance + feeAmount } : d
    )
    const newHealth = Math.max(0, state.playerHealth - 5)
    const newHistory = [entry, ...state.paymentHistory].slice(0, 10)
    persist({ ...state, debts: newDebts, paymentHistory: newHistory, playerHealth: newHealth })
  }

  function reset() {
    persist({
      debts: buildInitialDebts(),
      paymentHistory: [],
      milestonesShown: [],
      playerHealth: 100,
      viewMode: state.viewMode,
      installDate: state.installDate ?? Date.now(),
    })
  }

  return {
    debts: state.debts,
    paymentHistory: state.paymentHistory,
    milestonesShown: state.milestonesShown,
    playerHealth: state.playerHealth,
    viewMode: state.viewMode,
    installDate: state.installDate,
    ...derived,
    makePayment,
    editBalance,
    updateMinPayment,
    updateAPR,
    markMilestoneShown,
    setViewMode,
    logCounterattack,
    reset,
  }
}
