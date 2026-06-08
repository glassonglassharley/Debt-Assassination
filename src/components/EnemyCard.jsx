import { useCallback } from 'react'
import VillainPortrait from './VillainPortrait'
import { VILLAIN_DATA, VILLAIN_TAUNTS } from '../constants'

function getThreat(debt) {
  const util = (debt.balance / debt.limit) * 100
  if (debt.balance > debt.limit && util > 110) return 'critical'
  if (debt.balance > debt.limit || util > 90)  return 'high'
  if (util > 60)                                return 'medium'
  return 'low'
}

function getTauntLine(debt) {
  const lines = VILLAIN_TAUNTS[debt.id] ?? ['...', '...', '...']
  const pct = (debt.balance / debt.originalBalance) * 100
  if (pct > 59) return lines[0]
  if (pct > 19) return lines[1]
  return lines[2]
}

function getAttackTier(amount) {
  if (amount >= 500) return 'execution'
  if (amount >= 150) return 'explosive'
  if (amount >= 50)  return 'shotgun'
  return 'pistol'
}

export { getAttackTier }

export default function EnemyCard({ debt, isTarget, featured, onAttack, extraClass }) {
  const info = VILLAIN_DATA[debt.id]
  const eliminated = debt.balance <= 0
  const isBoss = debt.id === 12

  const healthPct = Math.max(0, Math.min(100, (debt.balance / debt.originalBalance) * 100))
  const shieldPct = debt.balance > debt.limit
    ? 0
    : Math.max(0, Math.min(100, ((debt.limit - debt.balance) / debt.limit) * 100))

  const threat = getThreat(debt)
  const taunt = eliminated
    ? `${info.name} has been deleted.`
    : getTauntLine(debt)

  const isOverLimit = debt.balance > debt.limit
  const dailyInterest = debt.apr ? ((debt.apr / 100) / 365) * debt.balance : null
  const lowHealth = healthPct < 20 && !eliminated

  const idfmt = String((debt.id * 7919 + 4337) % 10000).padStart(4, '0')

  const bossPhase = isBoss && !eliminated
    ? debt.balance > 1500 ? 'ENRAGED' : debt.balance > 500 ? 'DESPERATE' : 'FINAL STAND'
    : null

  const hasAttack = (extraClass || '').startsWith('attack-')

  const handleAttack = useCallback(() => {
    onAttack(debt)
  }, [debt, onAttack])

  const tierClass = isBoss ? 'dc-tier-boss' : debt.phase === 1 ? 'dc-tier-grunt' : debt.phase === 2 ? 'dc-tier-mid' : 'dc-tier-heavy'

  const cardClasses = [
    'dossier-card',
    `dc-threat-${threat}`,
    `dc-phase-${debt.phase}`,
    tierClass,
    isTarget ? 'dc-target' : '',
    featured ? 'dc-featured' : '',
    eliminated ? 'dc-eliminated' : '',
    isBoss && !eliminated ? 'dc-boss' : '',
    extraClass || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClasses}>
      {/* Structural corners */}
      <div className="dc-corner tl" />
      <div className="dc-corner tr" />
      <div className="dc-corner bl" />
      <div className="dc-corner br" />

      {/* Circuit texture */}
      <div className="dc-circuit" />

      {/* Attack ripple effect */}
      {hasAttack && <div className="dc-ripple" key={extraClass} />}

      {/* Dossier header */}
      <div className="dc-header">
        <span className="dc-classified">◉ CLASSIFIED</span>
        <span className="dc-target-id">TARGET.{String(debt.id).padStart(2, '0')}</span>
        <span className={`dc-threat-pill tl-${threat}`}>{threat.toUpperCase()}</span>
      </div>

      {/* Main body */}
      <div className="dc-body">
        {/* Portrait column */}
        <div className="dc-portrait-col">
          <VillainPortrait
            villainId={debt.id}
            featured={featured}
            eliminated={eliminated}
            isTarget={isTarget}
            isBoss={isBoss}
          />
          <div className="dc-villain-id">ID#{idfmt}</div>
        </div>

        {/* Intel column */}
        <div className="dc-intel-col">
          <div className="dc-villain-name">{info.name}</div>
          <div className="dc-villain-class"><span className="rank-patch">CLASS</span> {info.villainClass}</div>
          <div className="dc-flavor-line">{info.flavor}</div>

          {isBoss && !eliminated && (
            <div className="boss-phase-stack" aria-label="Final boss phase integrity">
              <span className={debt.balance > 1500 ? 'active' : 'spent'} />
              <span className={debt.balance > 500 ? 'active' : 'spent'} />
              <span className="active final" />
            </div>
          )}

          {/* HP bar */}
          <div className="dc-bar-row">
            <span className="dc-bar-lbl">HP</span>
            <div className="dc-bar-outer">
              <div
                className={`dc-bar-fill dc-hp-fill ${lowHealth ? 'critical-hp' : ''}`}
                style={{ width: `${healthPct}%` }}
              />
            </div>
            <span className="dc-bar-num">${debt.balance.toFixed(0)}</span>
          </div>

          {/* Shield bar */}
          <div className="dc-bar-row">
            <span className="dc-bar-lbl cyan-lbl">SH</span>
            <div className={`dc-bar-outer sh-outer ${isOverLimit ? 'shield-broken' : ''}`}>
              {!isOverLimit && (
                <div className="dc-bar-fill dc-sh-fill" style={{ width: `${shieldPct}%` }} />
              )}
            </div>
            <span className={`dc-bar-num ${isOverLimit ? 'breach-num' : 'cyan-num'}`}>
              {isOverLimit ? '⚡ BREACH' : `${shieldPct.toFixed(0)}%`}
            </span>
          </div>

          {/* Intel tags */}
          <div className="dc-intel-tags">
            {isOverLimit && <span className="dc-tag raging-tag">RAGING</span>}
            {dailyInterest && (
              <span className="dc-tag dmg-tag">⚡ ${dailyInterest.toFixed(2)}/day</span>
            )}
            {bossPhase && <span className="dc-tag boss-tag">{bossPhase}</span>}
            {debt.minPayment && eliminated && (
              <span className="dc-tag freed-tag">${debt.minPayment}/mo freed</span>
            )}
          </div>

          {/* Villain taunt */}
          <div className="dc-taunt">"{taunt}"</div>
        </div>
      </div>

      {/* DELETED stamp */}
      {eliminated && <div className="dc-deleted-stamp">DELETED</div>}

      {/* Attack footer */}
      {!eliminated && (
        <div className="dc-footer">
          <button
            className={`dc-attack-btn ${featured ? 'dc-featured-btn' : ''}`}
            onClick={handleAttack}
          >
            {featured ? '▶ EXECUTE ATTACK' : '▶ ATTACK'}
          </button>
        </div>
      )}
    </div>
  )
}
