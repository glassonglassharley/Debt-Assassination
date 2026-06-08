export default function PlayerHUD({ health, cardsKilled, totalPaid, gridIntegrity, clearanceTier, projectedScore, scoreGain }) {
  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const healthPct = Math.max(0, Math.min(100, health))
  const shieldPct = Math.min(100, 35 + cardsKilled * 5)

  return (
    <div className="player-hud hud-panel">
      <div className="hud-corner tl" />
      <div className="hud-corner br" />
      <div className="hud-content">
        <div className="player-hud-top hud-top">
          <div className="player-name hud-player-name">▶ THE ASSASSIN</div>
          <div className="hud-online">OPERATIVE ONLINE</div>
          <div className="player-stats hud-stats-row">
            <div className="player-stat hud-stat-block">
              <span className="player-stat-val hud-stat-val">{cardsKilled}</span>
              <span className="player-stat-lbl hud-stat-lbl">KILLS</span>
            </div>
            <div className="player-stat hud-stat-block">
              <span className="player-stat-val hud-stat-val">${fmt(totalPaid)}</span>
              <span className="player-stat-lbl hud-stat-lbl">DAMAGE DEALT</span>
            </div>
            <div className="player-stat hud-stat-block hud-clearance-block">
              <span className="player-stat-val hud-stat-val hud-grid-val">{gridIntegrity}</span>
              <span className="player-stat-lbl hud-stat-lbl">GRID</span>
            </div>
          </div>
        </div>

        <div className="hud-clearance-strip">
          <div>
            <span className="hud-clearance-label">CLEARANCE</span>
            <strong>{clearanceTier}</strong>
          </div>
          <div>
            <span className="hud-clearance-label">PROJECTED</span>
            <strong>{projectedScore}</strong>
          </div>
          {scoreGain > 0 && (
            <div className="hud-score-gain" key={scoreGain}>
              +{scoreGain} GRID INTEGRITY
            </div>
          )}
        </div>

        <div className="hud-bars">
          <div className="hud-sh-label">SHIELD</div>
          <div className="hud-bar-row">
            <span className="hud-bar-lbl hud-sh-lbl">SH</span>
            <div className="hud-bar-outer hud-sh-outer">
              <div className="hud-bar-fill hud-sh-fill" style={{ width: `${shieldPct}%` }} />
            </div>
            <span className="hud-bar-val hud-sh-val">{shieldPct}%</span>
          </div>
          <div className="hud-bar-row">
            <span className="hud-bar-lbl">HP</span>
            <div className="health-bar-outer hud-bar-outer">
              <div className={`health-bar-fill hud-bar-fill hud-hp-fill ${healthPct < 20 ? 'hud-critical' : ''}`} style={{ width: `${healthPct}%` }} />
            </div>
            <span className="health-bar-label hud-bar-val">{healthPct}/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
