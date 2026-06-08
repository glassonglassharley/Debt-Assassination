export default function StatsRow({ totalRemaining, totalPaid, cardsKilled, freedUp }) {
  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-label">DEBT REMAINING</span>
        <div className="stat-value">${fmt(totalRemaining)}</div>
      </div>
      <div className="stat-card">
        <span className="stat-label">TOTAL PAID</span>
        <div className="stat-value gold">${fmt(totalPaid)}</div>
      </div>
      <div className="stat-card">
        <span className="stat-label">CARDS KILLED</span>
        <div className="stat-value gold">{cardsKilled}/12</div>
      </div>
    </div>
  )
}
