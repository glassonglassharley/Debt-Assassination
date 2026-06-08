import { useState, useEffect, useCallback } from 'react'
import GridBg from './components/GridBg'
import StatsRow from './components/StatsRow'
import ProgressBar from './components/ProgressBar'
import PhaseHeader from './components/PhaseHeader'
import DebtRow from './components/DebtRow'
import PaymentModal from './components/PaymentModal'
import EditBalanceModal from './components/EditBalanceModal'
import PaymentHistory from './components/PaymentHistory'
import MilestoneOverlay from './components/MilestoneOverlay'
import Confetti from './components/Confetti'
import BattleMode from './components/BattleMode'
import { useDebtStore } from './hooks/useDebtStore'
import { PHASES } from './constants'

const MILESTONES = [25, 50, 75, 100]

export default function App() {
  const store = useDebtStore()
  const [payingDebt, setPayingDebt] = useState(null)
  const [editingDebt, setEditingDebt] = useState(null)
  const [toasts, setToasts] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [pendingMilestone, setPendingMilestone] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)

  // Milestone trigger
  useEffect(() => {
    const next = MILESTONES.find(
      m => store.percentComplete >= m && !store.milestonesShown.includes(m)
    )
    if (next && next !== pendingMilestone) setPendingMilestone(next)
  }, [store.percentComplete, store.milestonesShown])

  const addToast = useCallback((msg, type = 'red') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const handlePayment = useCallback((debtId, amount) => {
    const result = store.makePayment(debtId, amount)
    setPayingDebt(null)
    addToast(`PAYMENT LOGGED: $${amount.toFixed(2)}`, 'red')
    if (result?.cardKilled) {
      setShowConfetti(true)
      addToast('CARD NEUTRALIZED', 'gold')
      setTimeout(() => setShowConfetti(false), 3500)
    }
  }, [store, addToast])

  const handleReset = useCallback(() => {
    if (resetConfirm) {
      store.reset()
      setResetConfirm(false)
      addToast('SYSTEM RESET', 'red')
    } else {
      setResetConfirm(true)
      setTimeout(() => setResetConfirm(false), 5000)
    }
  }, [resetConfirm, store, addToast])

  const phaseGroups = [1, 2, 3].map(phase => ({
    phase,
    debts: store.debts.filter(d => d.phase === phase),
  }))

  const isDashboard = store.viewMode !== 'battle'

  return (
    <>
      <GridBg />
      <div className="crt-overlay" />
      <div className="scanline-beam" />

      {showConfetti && <Confetti />}

      {pendingMilestone && (
        <MilestoneOverlay
          milestone={pendingMilestone}
          onDismiss={() => {
            store.markMilestoneShown(pendingMilestone)
            setPendingMilestone(null)
          }}
        />
      )}

      {payingDebt && (
        <PaymentModal
          debt={payingDebt}
          onPay={handlePayment}
          onClose={() => setPayingDebt(null)}
        />
      )}
      {editingDebt && (
        <EditBalanceModal
          debt={editingDebt}
          onSave={(id, bal) => {
            store.editBalance(id, bal)
            setEditingDebt(null)
            addToast('BALANCE UPDATED', 'red')
          }}
          onClose={() => setEditingDebt(null)}
        />
      )}

      {isDashboard ? (
        <main className="app-main">
          {/* View toggle */}
          <div className="view-toggle">
            <button className="view-toggle-btn active">DASHBOARD</button>
            <button className="view-toggle-btn" onClick={() => store.setViewMode('battle')}>BATTLE MODE</button>
          </div>

          {/* Title */}
          <header className="app-header">
            <h1 className="app-title">
              <span className="glitch-layer glitch-red" aria-hidden="true">DEBT ASSASSINATION</span>
              <span className="glitch-layer glitch-cyan" aria-hidden="true">DEBT ASSASSINATION</span>
              DEBT ASSASSINATION
            </h1>
            <p className="app-subtitle">FINANCIAL LIBERATION PROTOCOL · {store.cardsKilled}/12 NEUTRALIZED</p>
            {store.freedUpMinimums > 0 && (
              <p className="snowball-line">
                ▲ SNOWBALL FREED: ${store.freedUpMinimums.toFixed(2)}/mo
              </p>
            )}
          </header>

          <StatsRow
            totalRemaining={store.totalRemaining}
            totalPaid={store.totalPaid}
            cardsKilled={store.cardsKilled}
            freedUp={store.freedUpMinimums}
          />

          <ProgressBar percent={store.percentComplete} totalPaid={store.totalPaid} />

          {/* Active target */}
          {store.activeTarget && (
            <section className="active-target">
              <div className="active-target-label">// ACTIVE TARGET</div>
              <div className="active-target-lender">{store.activeTarget.lender}</div>
              <div className="active-target-balance">${store.activeTarget.balance.toFixed(2)}</div>
              <div className="active-target-instruction">
                TARGET LOWEST BALANCE · EXECUTE PAYMENT NOW
              </div>
              <button className="btn-execute" onClick={() => setPayingDebt(store.activeTarget)}>
                EXECUTE PAYMENT
              </button>
            </section>
          )}

          {/* Phase sections */}
          {phaseGroups.map(({ phase, debts }) => (
            <section key={phase} className="phase-section">
              <PhaseHeader phase={phase} debts={debts} />
              <div className="debt-list">
                {debts.map(debt => (
                  <DebtRow
                    key={debt.id}
                    debt={debt}
                    rank={store.debts.indexOf(debt) + 1}
                    isActive={debt.id === store.activeTarget?.id}
                    onPay={() => setPayingDebt(debt)}
                    onEdit={() => setEditingDebt(debt)}
                    onUpdateMinPayment={amt => store.updateMinPayment(debt.id, amt)}
                    onUpdateAPR={apr => store.updateAPR(debt.id, apr)}
                  />
                ))}
              </div>
            </section>
          ))}

          <PaymentHistory
            history={store.paymentHistory}
            open={historyOpen}
            onToggle={() => setHistoryOpen(o => !o)}
          />

          <footer className="protection-footer">
            <div className="protection-bar" />
            <div>
              <div className="protection-label">PROTECTION PROTOCOL</div>
              <p className="protection-text">
                Always maintain minimum payments on all accounts. Never miss a due date.
                Target lowest balance first. Redirect freed minimums to next target.
                Every dollar paid is a permanent victory. Keep attacking.
              </p>
            </div>
          </footer>

          <div className="reset-section">
            <button
              className={`btn-reset ${resetConfirm ? 'confirm' : ''}`}
              onClick={handleReset}
            >
              {resetConfirm ? '⚠ CONFIRM — CLICK AGAIN TO WIPE ALL DATA' : 'SYS::RESET'}
            </button>
          </div>
        </main>
      ) : (
        <>
          <div className="battle-shell-header">
            <div className="view-toggle">
              <button className="view-toggle-btn" onClick={() => store.setViewMode('dashboard')}>DASHBOARD</button>
              <button className="view-toggle-btn active">BATTLE MODE</button>
            </div>
            <header className="app-header">
              <h1 className="app-title">
                <span className="glitch-layer glitch-red" aria-hidden="true">DEBT ASSASSINATION</span>
                <span className="glitch-layer glitch-cyan" aria-hidden="true">DEBT ASSASSINATION</span>
                DEBT ASSASSINATION
              </h1>
            </header>
          </div>
          <BattleMode store={store} addToast={addToast} />
        </>
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>{t.msg}</div>
        ))}
      </div>
    </>
  )
}
