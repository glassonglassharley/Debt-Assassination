import { useState } from 'react'

export default function DebtRow({ debt, rank, isActive, onPay, onEdit, onUpdateMinPayment, onUpdateAPR }) {
  const [editMin, setEditMin] = useState(false)
  const [editAPR, setEditAPR] = useState(false)
  const [minVal, setMinVal] = useState('')
  const [aprVal, setAprVal] = useState('')

  const isPaid = debt.balance <= 0
  const isOverLimit = debt.balance > debt.limit
  const pctCleared = Math.max(0, Math.min(100,
    ((debt.originalBalance - debt.balance) / debt.originalBalance) * 100
  ))
  const pctUtil = Math.min(9999, (debt.balance / debt.limit) * 100)
  const dailyInterest = debt.apr ? ((debt.apr / 100) / 365) * debt.balance : null

  const saveMin = () => {
    onUpdateMinPayment(minVal)
    setEditMin(false)
    setMinVal('')
  }
  const saveAPR = () => {
    onUpdateAPR(aprVal)
    setEditAPR(false)
    setAprVal('')
  }

  if (isPaid) {
    return (
      <div className="debt-row is-paid">
        <div className="debt-row-top">
          <span className="debt-rank">{rank}</span>
          <div className="debt-lender-block">
            <span className="debt-lender is-paid-text">{debt.lender}</span>
            <div className="debt-neutralized">
              <span>✓</span>
              DEBT NEUTRALIZED · ${debt.originalBalance.toFixed(2)} CLEARED
              {debt.minPayment ? ` · $${debt.minPayment}/mo FREED` : ''}
            </div>
          </div>
          <span className="debt-balance" style={{ color: 'var(--red)' }}>$0</span>
        </div>
        <div className="debt-bar-outer">
          <div className="debt-bar-fill gold-fill" style={{ width: '100%' }} />
        </div>
      </div>
    )
  }

  return (
    <div className={`debt-row ${isActive ? 'is-active' : ''}`}>
      {isOverLimit && <div className="overlimit-badge">OVERLIMIT</div>}

      <div className="debt-row-top">
        <span className="debt-rank">{rank}</span>
        <div className="debt-lender-block">
          <span className="debt-lender">{debt.lender}</span>
        </div>
        <span className={`debt-balance ${isActive ? 'is-active-bal' : ''}`}>
          ${debt.balance.toFixed(2)}
        </span>
      </div>

      <div className="debt-bar-outer">
        <div className="debt-bar-fill" style={{ width: `${pctCleared}%` }} />
      </div>

      <div className="debt-stats-row">
        <div className="debt-stat">
          <span className="debt-stat-val">{pctCleared.toFixed(1)}%</span>
          <span className="debt-stat-lbl">CLEARED</span>
        </div>
        <div className="debt-stat">
          <span className="debt-stat-val">{pctUtil.toFixed(1)}%</span>
          <span className="debt-stat-lbl">UTIL</span>
        </div>
        {dailyInterest !== null && (
          <span className="debt-daily">~${dailyInterest.toFixed(2)}/day</span>
        )}
        {debt.minPayment && !editMin && (
          <span className="debt-min-chip" style={{ marginLeft: 'auto' }}>
            MIN ${debt.minPayment}/mo
          </span>
        )}
      </div>

      <div className="debt-actions">
        {isActive ? (
          <button className="btn-pay" onClick={onPay}>PAY</button>
        ) : (
          <button className="btn-pay-secondary" onClick={onPay}>PAY</button>
        )}

        <button className="btn-icon" onClick={onEdit} title="Edit balance">✎</button>

        {editMin ? (
          <div className="inline-edit-wrap">
            <input
              className="inline-input"
              type="number"
              min="0"
              placeholder="MIN $"
              value={minVal}
              onChange={e => setMinVal(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && saveMin()}
            />
            <button className="btn-inline-save" onClick={saveMin}>✓</button>
          </div>
        ) : (
          <button className="btn-chip" onClick={() => { setMinVal(debt.minPayment || ''); setEditMin(true) }}>
            {debt.minPayment ? `✎ MIN $${debt.minPayment}` : '+ MIN'}
          </button>
        )}

        {editAPR ? (
          <div className="inline-edit-wrap">
            <input
              className="inline-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="APR %"
              value={aprVal}
              onChange={e => setAprVal(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && saveAPR()}
            />
            <button className="btn-inline-save" onClick={saveAPR}>✓</button>
          </div>
        ) : (
          <button className="btn-chip" onClick={() => { setAprVal(debt.apr || ''); setEditAPR(true) }}>
            {debt.apr ? `✎ ${debt.apr}% APR` : '+ APR'}
          </button>
        )}
      </div>
    </div>
  )
}
