const PORTRAIT_CONFIG = {
  1:  { label: 'PAT',   hue: '#ff003c', aux: '#00f5ff', helm: 'cap',     eyes: 'round',  body: 'coat',   mark: '$' },
  2:  { label: 'KID',   hue: '#ff2a6d', aux: '#00f5ff', helm: 'hood',    eyes: 'slit',   body: 'cloak',  mark: 'K' },
  3:  { label: 'PIN',   hue: '#ff7c00', aux: '#00f5ff', helm: 'shark',   eyes: 'tri',    body: 'suit',   mark: '△' },
  4:  { label: 'AVG',   hue: '#ff003c', aux: '#00f5ff', helm: 'visor',   eyes: 'square', body: 'armor',  mark: 'X' },
  5:  { label: 'REAP',  hue: '#ff003c', aux: '#00f5ff', helm: 'horns',   eyes: 'round',  body: 'cloak',  mark: '†' },
  6:  { label: 'LANE',  hue: '#ff003c', aux: '#00f5ff', helm: 'crown',   eyes: 'slit',   body: 'coat',   mark: '132' },
  7:  { label: 'SKY',   hue: '#ff7c00', aux: '#00f5ff', helm: 'baron',   eyes: 'round',  body: 'armor',  mark: '↟' },
  8:  { label: 'α',     hue: '#ff003c', aux: '#00f5ff', helm: 'soldier', eyes: 'square', body: 'armor',  mark: 'A' },
  9:  { label: 'β',     hue: '#ff003c', aux: '#00f5ff', helm: 'soldier', eyes: 'slit',   body: 'armor',  mark: 'B' },
  10: { label: 'LEAD',  hue: '#ff003c', aux: '#00f5ff', helm: 'heavy',   eyes: 'round',  body: 'heavy',  mark: 'W' },
  11: { label: 'MAIN',  hue: '#ff003c', aux: '#00f5ff', helm: 'node',    eyes: 'square', body: 'server', mark: 'IO' },
  12: { label: 'BOSS',  hue: '#ff003c', aux: '#c9a84c', helm: 'halo',    eyes: 'round',  body: 'boss',   mark: '⌘' },
}

function Eyes({ type, hue }) {
  if (type === 'slit') return <><rect x="27" y="31" width="7" height="2" fill={hue}/><rect x="40" y="31" width="7" height="2" fill={hue}/></>
  if (type === 'tri') return <><polygon points="28,34 32,27 36,34" fill={hue}/><polygon points="40,34 44,27 48,34" fill={hue}/></>
  if (type === 'square') return <><rect x="27" y="28" width="7" height="7" rx="1" fill={hue}/><rect x="41" y="28" width="7" height="7" rx="1" fill={hue}/></>
  return <><circle cx="31" cy="31" r="4" fill={hue}/><circle cx="45" cy="31" r="4" fill={hue}/></>
}

function Helmet({ type, hue, aux }) {
  const common = { fill: 'none', stroke: hue, strokeWidth: 1.2, strokeLinejoin: 'round' }
  switch (type) {
    case 'cap': return <><rect x="25" y="16" width="27" height="7" rx="2" fill="rgba(255,0,60,.14)" stroke={hue}/><path d="M23 22 H55" stroke={hue} strokeWidth="1.4"/></>
    case 'hood': return <path d="M18 38 Q20 13 38 9 Q56 13 58 38 Q48 21 38 20 Q28 21 18 38Z" fill="rgba(255,0,60,.08)" stroke={hue} strokeWidth="1.2"/>
    case 'shark': return <polygon points="38,5 58,40 18,40" fill="rgba(255,124,0,.08)" stroke={hue} strokeWidth="1.2"/>
    case 'visor': return <><rect x="22" y="19" width="32" height="9" rx="2" fill="rgba(0,245,255,.08)" stroke={aux}/><line x1="25" y1="24" x2="51" y2="24" stroke={hue}/></>
    case 'horns': return <><path d="M24 20 Q18 10 13 19" {...common}/><path d="M52 20 Q58 10 63 19" {...common}/></>
    case 'crown': return <polygon points="21,20 27,11 34,20 39,10 46,20 54,11 57,20" fill="rgba(255,0,60,.10)" stroke={hue} strokeWidth="1.1"/>
    case 'baron': return <><path d="M15 20 L38 7 L61 20" fill="rgba(255,124,0,.08)" stroke={hue}/><line x1="20" y1="20" x2="56" y2="20" stroke={aux} opacity=".6"/></>
    case 'soldier': return <><path d="M20 25 Q38 11 56 25 V31 H20Z" fill="rgba(255,0,60,.10)" stroke={hue}/><rect x="26" y="16" width="24" height="4" fill={hue} opacity=".35"/></>
    case 'heavy': return <><rect x="18" y="17" width="40" height="18" rx="3" fill="rgba(255,0,60,.08)" stroke={hue}/><circle cx="21" cy="20" r="2" fill={aux}/><circle cx="55" cy="20" r="2" fill={aux}/></>
    case 'node': return <><rect x="17" y="14" width="42" height="34" rx="4" fill="rgba(0,245,255,.05)" stroke={hue}/><circle cx="58" cy="16" r="3" fill={hue}/><path d="M58 16 L50 25" stroke={aux}/></>
    case 'halo': return <><circle cx="38" cy="34" r="27" fill="none" stroke={aux} strokeWidth="1.2" strokeDasharray="3 3"/><path d="M31 8 Q38 0 45 8" stroke={hue} strokeWidth="2" fill="none"/></>
    default: return null
  }
}

function Body({ type, hue, aux }) {
  if (type === 'server') return <><rect x="21" y="44" width="34" height="20" rx="2" fill="rgba(0,245,255,.04)" stroke={hue}/><rect x="26" y="49" width="16" height="3" fill={hue} opacity=".5"/><rect x="26" y="56" width="24" height="2" fill={aux} opacity=".5"/></>
  if (type === 'heavy') return <><path d="M14 66 L22 45 H54 L62 66Z" fill="rgba(255,0,60,.08)" stroke={hue} strokeWidth="1.2"/><path d="M23 51 H53 M20 59 H56" stroke={aux} opacity=".35"/></>
  if (type === 'boss') return <><path d="M16 66 Q38 44 60 66Z" fill="rgba(201,168,76,.09)" stroke={aux}/><path d="M25 51 H51 M29 58 H47" stroke={hue} opacity=".7"/></>
  if (type === 'cloak') return <path d="M19 66 Q24 45 38 43 Q52 45 58 66Z" fill="rgba(255,0,60,.07)" stroke={hue}/>
  if (type === 'armor') return <><path d="M20 66 L24 45 H52 L56 66Z" fill="rgba(0,245,255,.04)" stroke={hue}/><path d="M38 45 V66 M26 53 H50" stroke={aux} opacity=".45"/></>
  return <><rect x="24" y="45" width="28" height="21" rx="2" fill="rgba(255,0,60,.06)" stroke={hue}/><line x1="28" y1="52" x2="48" y2="52" stroke={aux} opacity=".4"/></>
}

function ProgramBust({ cfg, villainId }) {
  const bg = `bg-${villainId}`
  const glow = `glow-${villainId}`
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label={`${cfg.label} rogue program portrait`}>
      <defs>
        <radialGradient id={bg} cx="50%" cy="30%" r="70%">
          <stop offset="0" stopColor={cfg.aux} stopOpacity="0.16"/>
          <stop offset="0.45" stopColor="#090017" stopOpacity="0.92"/>
          <stop offset="1" stopColor="#020006"/>
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="76" height="76" fill={`url(#${bg})`}/>
      <path d="M4 58 H18 V65 H32 M72 20 H58 V12 H45 M8 14 H20 M56 65 H70" stroke={cfg.aux} strokeWidth=".7" opacity=".33" fill="none"/>
      <path d="M12 8 H24 M52 8 H64 M12 68 H27 M49 68 H64" stroke={cfg.hue} strokeWidth=".8" opacity=".5"/>
      <Helmet type={cfg.helm} hue={cfg.hue} aux={cfg.aux}/>
      <ellipse cx="38" cy="34" rx="18" ry="20" fill="rgba(2,2,12,.88)" stroke={cfg.hue} strokeWidth="1.3" filter={`url(#${glow})`}/>
      <Eyes type={cfg.eyes} hue={cfg.hue}/>
      <path d="M29 43 Q38 50 47 43" stroke={cfg.hue} strokeWidth="2" fill="none" strokeLinecap="round" opacity=".9"/>
      <path d="M20 36 H12 M56 36 H64 M38 14 V8" stroke={cfg.aux} strokeWidth=".7" opacity=".45"/>
      <Body type={cfg.body} hue={cfg.hue} aux={cfg.aux}/>
      <text x="38" y="72" textAnchor="middle" fill={cfg.hue} fontSize="5" fontFamily="monospace" fontWeight="700" letterSpacing="1">{cfg.label}</text>
      <text x="38" y="40" textAnchor="middle" fill={cfg.aux} fontSize="7" fontFamily="monospace" opacity=".18">{cfg.mark}</text>
    </svg>
  )
}

export default function VillainPortrait({ villainId, featured = false, eliminated = false, isTarget = false, isBoss = false }) {
  const cfg = PORTRAIT_CONFIG[villainId] ?? PORTRAIT_CONFIG[1]

  const frameClass = [
    'portrait-frame',
    featured ? 'pf-featured' : '',
    eliminated ? 'pf-eliminated' : isTarget ? 'pf-target' : isBoss ? 'pf-boss' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={frameClass}>
      <div className="pf-corner tl" />
      <div className="pf-corner tr" />
      <div className="pf-corner bl" />
      <div className="pf-corner br" />
      <div className="pf-vignette" />
      {!eliminated && <div className="pf-scan" />}
      <ProgramBust cfg={cfg} villainId={villainId} />
    </div>
  )
}
