import { useState } from 'react'

const FAQ = [
  {
    category: 'STRATEGY',
    items: [
      {
        term: 'ACTIVE TARGET',
        def: 'The card with the lowest remaining balance. Throw every extra dollar at this one card while paying minimums on all others. Eliminating it frees up its minimum payment as a weapon.',
      },
      {
        term: 'SNOWBALL METHOD',
        def: 'When the active target hits $0, redirect its freed minimum to the next lowest balance. Each kill makes your monthly attack power bigger. The debt cannot recover.',
      },
      {
        term: 'PHASE 1 / 2 / 3',
        def: 'Threat tier based on balance. Phase 1: $0–$250 (street-level). Phase 2: $251–$750 (pressure accounts). Phase 3: $751+ (heavy systems). Final Boss is Phase 3, id 12.',
      },
      {
        term: 'FREED MINIMUM',
        def: 'When a card is eliminated, its required minimum payment is permanently freed. This snowballs into the next target — shown as SNOWBALL FREED in the dashboard header.',
      },
    ],
  },
  {
    category: 'CREDIT SCORE',
    items: [
      {
        term: 'GRID INTEGRITY',
        def: 'Your estimated credit score based on your actual credit score, payments made, cards eliminated, and utilization penalties. Improves automatically as you pay down debt.',
      },
      {
        term: 'CLEARANCE TIER',
        def: 'Your rank earned through Grid Integrity. INITIATE (300+) → RUNNER (640+) → OPERATOR (700+) → SPECTER (760+) → ARCHITECT (800+). Each tier represents real creditworthiness.',
      },
      {
        term: 'PROJECTED SCORE',
        def: 'Estimated Grid Integrity if you paid off all remaining debt today. Shows the maximum score you could reach — your final unlocked tier.',
      },
      {
        term: 'UTILIZATION',
        def: 'Balance ÷ credit limit, expressed as a %. Accounts for ~30% of your credit score. Keep each card below 30% to avoid score penalties. Under 10% is ideal.',
      },
    ],
  },
  {
    category: 'COSTS & INTEREST',
    items: [
      {
        term: 'APR',
        def: 'Annual Percentage Rate. The yearly interest rate charged on your balance. A 24.99% APR on $1,000 costs ~$0.68 every single day you carry it.',
      },
      {
        term: 'DAILY INTEREST',
        def: 'Formula: (APR ÷ 100 ÷ 365) × balance. This is real money extracted from you every day you don\'t pay it off. Set APR on each card to see the actual daily cost.',
      },
      {
        term: 'BLEEDING/DAY',
        def: 'Total daily interest summed across all active cards with APR entered. This number runs 24/7. Every payment you make reduces it permanently.',
      },
      {
        term: 'MIN PAYMENT',
        def: 'The required minimum monthly payment on a card. Paying only the minimum is a trap — most of it goes to interest. Enter it to track snowball freed amounts.',
      },
    ],
  },
  {
    category: 'CARD STATUS',
    items: [
      {
        term: 'OVERLIMIT / BREACH',
        def: 'Balance exceeds the credit limit. Triggers RAGING status, destroys your utilization score, and often triggers over-limit fees. Eliminate or pay below the limit immediately.',
      },
      {
        term: 'RAGING',
        def: 'A card that is over its credit limit. Highest threat priority. In Battle Mode the villain enters an enraged state. Real consequence: over-limit fees + severe credit score damage.',
      },
      {
        term: 'COUNTERATTACK',
        def: 'A late fee or interest charge that adds to a card\'s balance. Triggered when a minimum payment is missed or a billing cycle closes while over-limit. The enemy strikes back.',
      },
      {
        term: 'ELIMINATED',
        def: 'Card balance reduced to $0. The enemy is permanently removed from the active threat list. Its minimum payment is freed for the snowball.',
      },
    ],
  },
  {
    category: 'BATTLE MODE',
    items: [
      {
        term: 'WAVE',
        def: 'A group of enemies sorted by Phase. Wave 01 = Phase 1 (low-balance threats). Wave 02 = Phase 2 (mid-tier). Final Wave = Phase 3 heavy systems including the Final Boss.',
      },
      {
        term: 'HP (HEALTH POINTS)',
        def: 'A villain\'s remaining balance shown as a health bar. Deal damage (make payments) to drain it to zero. When HP hits 0, the enemy is eliminated.',
      },
      {
        term: 'SHIELD',
        def: 'Credit headroom: (limit − balance) ÷ limit × 100%. Represents how far you are from breaching the limit. Shield breaks at 0% — card enters RAGING state.',
      },
      {
        term: 'DAMAGE / DAILY DAMAGE',
        def: 'Daily interest expressed as enemy attack power: (APR ÷ 365 ÷ 100) × balance. Enemies with APR passively drain your financial health every day. Shown as TAKING $X.XX DMG/DAY in the HUD.',
      },
      {
        term: 'FINAL BOSS',
        def: 'The highest-balance card (Apple Card). Confronted only after clearing earlier waves. Has phase stages: ENRAGED (balance >$1,500), DESPERATE ($501–$1,500), FINAL STAND (≤$500).',
      },
      {
        term: 'LOOT DROP',
        def: 'When an enemy is eliminated, its minimum payment drops as a loot item. That cash is now yours to redirect to the next target every month.',
      },
      {
        term: 'TAKING DMG/DAY',
        def: 'Total passive daily damage from all active enemies with APR set. This is your financial bleed rate. Reducing any card\'s balance immediately lowers this number.',
      },
    ],
  },
]

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button — fixed top-left */}
      <button
        className={`hamburger-btn ${open ? 'hb-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className="hb-line" />
        <span className="hb-line" />
        <span className="hb-line" />
      </button>

      {/* Backdrop */}
      {open && (
        <div className="menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Side drawer */}
      <nav className={`side-drawer ${open ? 'drawer-open' : ''}`} aria-label="Side menu">
        <div className="drawer-header">
          <span className="drawer-eyebrow">// SYSTEM MENU</span>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <div className="drawer-section-title">FIELD MANUAL</div>
        <p className="drawer-intro">
          All terms, mechanics, and formulas used in this system.
        </p>

        <div className="faq-list">
          {FAQ.map(section => (
            <div key={section.category} className="faq-section">
              <div className="faq-category">{section.category}</div>
              {section.items.map(item => (
                <div key={item.term} className="faq-item">
                  <div className="faq-term">{item.term}</div>
                  <div className="faq-def">{item.def}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="drawer-footer">
          DEBT ASSASSINATION · FINANCIAL LIBERATION PROTOCOL
        </div>
      </nav>
    </>
  )
}
