import { useState } from 'react'

export default function EditBalanceModal({ debt, onSave, onClose }) {
  const [value, setValue] = useState(debt.balance.toFixed(2))

  const handleSave = () => {
    const num = parseFloat(value)
    if (isNaN(num)) return
    onSave(debt.id, num)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-eyebrow">// EDIT BALANCE</div>
        <div className="modal-lender">{debt.lender}</div>
        <div className="modal-balance" style={{ marginBottom: '20px' }}>${debt.balance.toFixed(2)}</div>

        <div className="modal-field">
          <label className="modal-field-label">CORRECTED BALANCE</label>
          <input
            className="modal-input"
            type="number"
            min="0"
            step="0.01"
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button className="btn-abort" onClick={onClose}>ABORT</button>
          <button className="btn-modal-execute" onClick={handleSave}>SAVE</button>
        </div>
      </div>
    </div>
  )
}
