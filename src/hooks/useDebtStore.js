import { useState, useMemo } from 'react'
import { ORIGINAL_DEBTS, VILLAIN_DATA } from '../constants'

const STORAGE_KEY = 'debt-assassination-v1'
const DEFAULT_CREDIT_SCORE = 742
const BASE_DEBT_COUNT = ORIGINAL_DEBTS.length
const DEFAULT_LAST_SYNCED = '2026-06-08'

const CLEARANCE_TIERS = [
  { name: 'INITIATE', min: 300 },
  { name: 'RUNNER', min: 640 },
  { name: 'OPERATOR', min: 700 },
  { name: 'SPECTER', min: 760 },
  { name: 'ARCHITECT', min: 800 },
]

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

function getDefaultVillainInfo(debt) {
  return VILLAIN_DATA[debt.id] ?? {
    name: debt.enemyName || debt.lender || 'UNKNOWN TARGET',
    villainClass: debt.villainClass || 'Rogue Program',
    flavor: debt.flavor || 'Unregistered hostile debt program. Rank assigned by amount owed.',
  }
}

function rankDebts(debts) {
  return [...debts].sort((a, b) => {
    if (a.balance <= 0 && b.balance > 0) return 1
    if (b.balance <= 0 && a.balance > 0) return -1
    return a.balance - b.balance || a.id - b.id
  })
}

function getPhaseForAmount(amount) {
  if (amount <= 250) return 1
  if (amount <= 750) return 2
  return 3
}

function withEnemyNames(debts) {
  return debts.map(d => {
    const info = getDefaultVillainInfo(d)
    return {
      ...d,
      limit: Number.isFinite(Number(d.limit)) && Number(d.limit) > 0 ? Number(d.limit) : Math.max(Number(d.balance) || 0, Number(d.originalBalance) || 0, 1),
      originalBalance: Number.isFinite(Number(d.originalBalance)) && Number(d.originalBalance) > 0 ? Number(d.originalBalance) : Number(d.balance) || 0,
      phase: d.phase || getPhaseForAmount(Number(d.balance) || Number(d.originalBalance) || 0),
      villainClass: d.villainClass || info.villainClass,
      flavor: d.flavor || info.flavor,
      enemyName: typeof d.enemyName === 'string' && d.enemyName.trim()
        ? d.enemyName
        : info.name,
    }
  })
}

function buildInitialDebts() {
  return ORIGINAL_DEBTS.map(d => ({
    ...d,
    balance: d.originalBalance,
    minPayment: null,
    apr: null,
    enemyName: VILLAIN_DATA[d.id]?.name ?? d.lender,
  }))
}

function clampScore(score) {
  return Math.max(300, Math.min(850, Math.round(score)))
}

function getScoreMetrics(debts, creditScore) {
  const totalOriginalDebt = debts.reduce((s, d) => s + Math.max(0, d.originalBalance || d.balance || 0), 0)
  const totalRemaining = debts.reduce((s, d) => s + Math.max(0, d.balance), 0)
  const totalPaid = Math.max(0, totalOriginalDebt - totalRemaining)
  const cardsKilled = debts.filter(d => d.balance <= 0).length
  const highUtilizationCount = debts.filter(d => d.limit > 0 && d.balance > 0 && (d.balance / d.limit) > 0.7).length
  const highUtilizationPenalty = highUtilizationCount * 8
  const gridIntegrity = clampScore(creditScore + (totalPaid * 0.015) + (cardsKilled * 20) - highUtilizationPenalty)
  const projectedScore = clampScore(gridIntegrity + (totalRemaining * 0.008))
  const tierIndex = CLEARANCE_TIERS.reduce((best, tier, index) => gridIntegrity >= tier.min ? index : best, 0)
  const tier = CLEARANCE_TIERS[tierIndex]
  const nextTier = CLEARANCE_TIERS[tierIndex + 1] ?? null
  const tierFloor = tier.min
  const tierCeiling = nextTier?.min ?? 850
  const progressToNext = nextTier
    ? Math.max(0, Math.min(100, ((gridIntegrity - tierFloor) / (tierCeiling - tierFloor)) * 100))
    : 100

  return {
    creditScore,
    gridIntegrity,
    projectedScore,
    highUtilizationCount,
    highUtilizationPenalty,
    clearanceTier: tier.name,
    nextClearanceTier: nextTier?.name ?? 'MAX LEVEL',
    progressToNext,
  }
}

function getInitialState() {
  const saved = loadState()
  if (Array.isArray(saved?.debts) && saved.debts.length >= BASE_DEBT_COUNT) {
    return {
      ...saved,
      debts: withEnemyNames(saved.debts),
      creditScore: Number.isFinite(saved.creditScore) ? saved.creditScore : DEFAULT_CREDIT_SCORE,
      lastSynced: saved.lastSynced || DEFAULT_LAST_SYNCED,
      scoreHistory: Array.isArray(saved.scoreHistory) ? saved.scoreHistory : [],
    }
  }
  return {
    debts: buildInitialDebts(),
    paymentHistory: [],
    scoreHistory: [],
    milestonesShown: [],
    playerHealth: 100,
    viewMode: 'dashboard',
    installDate: Date.now(),
    creditScore: DEFAULT_CREDIT_SCORE,
    gridIntegrity: DEFAULT_CREDIT_SCORE,
    projectedScore: 765,
    lastSynced: DEFAULT_LAST_SYNCED,
  }
}

export function useDebtStore() {
  const [state, setState] = useState(getInitialState)

  function persist(next) {
    setState(next)
    saveState(next)
  }

  const derived = useMemo(() => {
    const rankedDebts = rankDebts(state.debts)
    const totalOriginalDebt = state.debts.reduce((s, d) => s + Math.max(0, d.originalBalance || d.balance || 0), 0)
    const totalRemaining = state.debts.reduce((s, d) => s + Math.max(0, d.balance), 0)
    const totalPaid = Math.max(0, totalOriginalDebt - totalRemaining)
    const cardsKilled = state.debts.filter(d => d.balance <= 0).length
    const percentComplete = totalOriginalDebt > 0 ? Math.min(100, (totalPaid / totalOriginalDebt) * 100) : 0
    const activeTarget = rankedDebts.find(d => d.balance > 0) ?? null
    const freedUpMinimums = state.debts
      .filter(d => d.balance <= 0 && d.minPayment)
      .reduce((s, d) => s + (d.minPayment || 0), 0)
    const totalDailyInterest = state.debts.reduce((sum, d) => {
      if (!d.apr || d.balance <= 0) return sum
      return sum + ((d.apr / 100) / 365) * d.balance
    }, 0)
    const scoreMetrics = getScoreMetrics(state.debts, state.creditScore)
    return { totalOriginalDebt, totalRemaining, totalPaid, cardsKilled, percentComplete, activeTarget, rankedDebts, freedUpMinimums, totalDailyInterest, totalDailyDamage: totalDailyInterest, ...scoreMetrics }
  }, [state.debts, state.creditScore])

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
    const beforeScore = getScoreMetrics(state.debts, state.creditScore).gridIntegrity
    const afterMetrics = getScoreMetrics(newDebts, state.creditScore)
    const gridGain = Math.max(0, afterMetrics.gridIntegrity - beforeScore)
    const scoreEntry = {
      id: Date.now() + 1,
      date: new Date().toLocaleDateString('en-US'),
      label: cardKilled ? `${debt.lender} neutralized` : `${debt.lender} payment`,
      gridIntegrity: afterMetrics.gridIntegrity,
      delta: gridGain,
    }
    const newScoreHistory = gridGain > 0
      ? [scoreEntry, ...(state.scoreHistory || [])].slice(0, 12)
      : state.scoreHistory || []
    let newHealth = state.playerHealth
    if (cardKilled) newHealth = Math.min(100, newHealth + 15)

    persist({
      ...state,
      debts: newDebts,
      paymentHistory: newHistory,
      scoreHistory: newScoreHistory,
      playerHealth: newHealth,
      gridIntegrity: afterMetrics.gridIntegrity,
      projectedScore: afterMetrics.projectedScore,
    })
    return { cardKilled, lender: debt.lender, gridGain, gridIntegrity: afterMetrics.gridIntegrity }
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

  function updateEnemyName(debtId, name) {
    const currentDebt = state.debts.find(d => d.id === debtId)
    const fallback = VILLAIN_DATA[debtId]?.name ?? currentDebt?.lender ?? 'UNKNOWN TARGET'
    const cleaned = String(name || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 32)
    const newDebts = state.debts.map(d =>
      d.id === debtId ? { ...d, enemyName: cleaned || fallback } : d
    )
    persist({ ...state, debts: newDebts })
  }

  function addDebt(input) {
    const balance = Math.max(0, parseFloat(input.balance) || 0)
    if (balance <= 0) return null
    const nextId = Math.max(0, ...state.debts.map(d => Number(d.id) || 0)) + 1
    const lender = String(input.lender || 'New Debt').trim().replace(/\s+/g, ' ').slice(0, 48)
    const enemyName = String(input.enemyName || lender).trim().replace(/\s+/g, ' ').slice(0, 32).toUpperCase()
    const villainClass = String(input.villainClass || 'Rogue Program').trim().replace(/\s+/g, ' ').slice(0, 28)
    const limit = Math.max(1, parseFloat(input.limit) || balance)
    const minPayment = input.minPayment === null || input.minPayment === undefined ? null : Math.max(0, parseFloat(input.minPayment) || 0) || null
    const apr = input.apr === null || input.apr === undefined ? null : Math.max(0, parseFloat(input.apr) || 0) || null
    const newDebt = {
      id: nextId,
      lender,
      originalBalance: balance,
      balance,
      limit,
      phase: getPhaseForAmount(balance),
      minPayment,
      apr,
      enemyName,
      villainClass,
      flavor: 'User-added hostile debt program. Rank assigned by amount owed.',
      custom: true,
    }
    persist({ ...state, debts: rankDebts([...state.debts, newDebt]) })
    return newDebt
  }

  function syncCreditScore(score) {
    const syncedScore = clampScore(parseFloat(score) || DEFAULT_CREDIT_SCORE)
    const metrics = getScoreMetrics(state.debts, syncedScore)
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US'),
      label: 'Credit Karma sync',
      gridIntegrity: metrics.gridIntegrity,
      delta: metrics.gridIntegrity - derived.gridIntegrity,
    }
    persist({
      ...state,
      creditScore: syncedScore,
      gridIntegrity: metrics.gridIntegrity,
      projectedScore: metrics.projectedScore,
      lastSynced: new Date().toISOString().slice(0, 10),
      scoreHistory: [entry, ...(state.scoreHistory || [])].slice(0, 12),
    })
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
      scoreHistory: [],
      playerHealth: 100,
      viewMode: state.viewMode,
      installDate: state.installDate ?? Date.now(),
      creditScore: DEFAULT_CREDIT_SCORE,
      gridIntegrity: DEFAULT_CREDIT_SCORE,
      projectedScore: 765,
      lastSynced: DEFAULT_LAST_SYNCED,
    })
  }

  return {
    debts: derived.rankedDebts,
    paymentHistory: state.paymentHistory,
    scoreHistory: state.scoreHistory || [],
    milestonesShown: state.milestonesShown,
    playerHealth: state.playerHealth,
    viewMode: state.viewMode,
    installDate: state.installDate,
    lastSynced: state.lastSynced || DEFAULT_LAST_SYNCED,
    ...derived,
    makePayment,
    editBalance,
    updateMinPayment,
    updateAPR,
    updateEnemyName,
    addDebt,
    syncCreditScore,
    markMilestoneShown,
    setViewMode,
    logCounterattack,
    reset,
  }
}
