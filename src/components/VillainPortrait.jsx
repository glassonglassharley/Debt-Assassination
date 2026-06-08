/* Each villain gets a completely unique inline SVG portrait */

function BgGrad({ id, c1, c2 = '#040408' }) {
  return (
    <defs>
      <radialGradient id={`bg${id}`} cx="50%" cy="25%" r="72%">
        <stop offset="0" stopColor={c1} stopOpacity="0.55" />
        <stop offset="0.55" stopColor="#08040e" stopOpacity="0.95" />
        <stop offset="1" stopColor={c2} />
      </radialGradient>
      <filter id={`gf${id}`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.1" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}

function CornerMarks({ c }) {
  return (
    <path
      d="M3 3 H11 M3 3 V11 M73 3 H65 M73 3 V11 M3 73 H11 M3 73 V65 M73 73 H65 M73 73 V65"
      stroke={c} strokeWidth="0.9" opacity="0.5" fill="none"
    />
  )
}

/* 1 — PAYDAY PAT: snapback, round eyes, gold tooth, smirk */
function Pat({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="PAYDAY PAT portrait">
      <BgGrad id={id} c1="#5c0018" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 62 H14 V70 M76 28 H62 V18" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Snapback flat brim */}
      <rect x="17" y="9" width="42" height="10" rx="5" fill="#14000a" stroke="#ff003c" strokeWidth="1.1" />
      <rect x="11" y="16" width="54" height="5" rx="1" fill="#1a0010" stroke="#ff003c" strokeWidth="0.8" opacity="0.8" />
      <line x1="11" y1="21" x2="65" y2="21" stroke="#ff003c" strokeWidth="0.8" opacity="0.5" />
      {/* Wide face */}
      <ellipse cx="38" cy="38" rx="18" ry="19" fill="#0c0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
      {/* Eyes round glowing */}
      <circle cx="30" cy="34" r="4.5" fill="#ff003c" />
      <circle cx="30" cy="34" r="2.5" fill="#0a0208" />
      <circle cx="46" cy="35" r="3.5" fill="#ff003c" />
      <circle cx="46" cy="35" r="1.8" fill="#0a0208" />
      {/* Smug smirk */}
      <path d="M28 45 Q38 52 48 45" stroke="#ff003c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Gold tooth */}
      <rect x="35" y="45" width="6" height="5" rx="0.5" fill="#c9a84c" />
      {/* Heavy coat collar */}
      <path d="M17 58 L26 48 H50 L59 58" stroke="#ff003c" strokeWidth="1.2" fill="rgba(30,5,12,0.7)" strokeLinejoin="round" />
      <path d="M30 48 L38 54 L46 48" stroke="#ff003c" strokeWidth="0.9" fill="none" />
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">PAT</text>
    </svg>
  )
}

/* 2 — KIKOFF KID: hoodie shadow, slit eyes, arms reaching */
function Kid({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="KIKOFF KID portrait">
      <BgGrad id={id} c1="#3a0028" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff2a6d" />
      <path d="M0 52 H10 V40 H22 M76 58 H66 V68" stroke="#ff2a6d" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Hoodie big pointed hood */}
      <path d="M10 46 Q12 10 38 5 Q64 10 66 46 Q54 22 38 20 Q22 22 10 46Z" fill="rgba(15,0,12,0.92)" stroke="#ff2a6d" strokeWidth="1.2" />
      {/* Deep shadow */}
      <ellipse cx="38" cy="36" rx="16" ry="15" fill="#030108" />
      {/* Slit eyes peeking */}
      <ellipse cx="31" cy="33" rx="5" ry="2.5" fill="#ff2a6d" />
      <ellipse cx="31" cy="33" rx="2.5" ry="1" fill="#0a0108" />
      <ellipse cx="45" cy="33" rx="5" ry="2.5" fill="#ff2a6d" />
      <ellipse cx="45" cy="33" rx="2.5" ry="1" fill="#0a0108" />
      {/* Wiry body */}
      <path d="M26 58 L30 46 H46 L50 58" stroke="#ff2a6d" strokeWidth="1.2" fill="rgba(15,0,8,0.6)" />
      {/* Arms reaching */}
      <path d="M26 54 Q14 60 8 68" stroke="#ff2a6d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 54 Q62 60 68 68" stroke="#ff2a6d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 68 Q5 62 7 58 M8 68 Q4 64 6 60" stroke="#ff2a6d" strokeWidth="0.9" fill="none" opacity="0.8" />
      <path d="M68 68 Q71 62 69 58 M68 68 Q72 64 70 60" stroke="#ff2a6d" strokeWidth="0.9" fill="none" opacity="0.8" />
      <text x="38" y="73" textAnchor="middle" fill="#ff2a6d" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">KID</text>
    </svg>
  )
}

/* 3 — THE PINNACLE: pyramid triangle head, cold rectangular eyes, suit */
function Pinnacle({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="THE PINNACLE portrait">
      <BgGrad id={id} c1="#3d2000" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff7c00" />
      <path d="M0 55 H14 V65 M76 25 H62 V15" stroke="#ff7c00" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Pyramid/triangle head */}
      <polygon points="38,4 60,54 16,54" fill="#0a0604" stroke="#ff7c00" strokeWidth="1.3" filter={`url(#gf${id})`} />
      {/* Cold rectangular corporate eyes */}
      <rect x="26" y="28" width="9" height="5" rx="0" fill="#ff7c00" opacity="0.9" />
      <rect x="41" y="28" width="9" height="5" rx="0" fill="#ff7c00" opacity="0.9" />
      {/* Thin cold mouth */}
      <line x1="30" y1="44" x2="46" y2="44" stroke="#ff7c00" strokeWidth="1.5" />
      {/* Suit collar lapels */}
      <path d="M16 54 L24 46 H34 L38 54 L42 46 H52 L60 54" stroke="#ff7c00" strokeWidth="1.1" fill="rgba(25,12,0,0.7)" strokeLinejoin="round" />
      {/* Tie */}
      <path d="M35 54 L38 70 L41 54" stroke="#ff7c00" strokeWidth="1" fill="rgba(20,8,0,0.6)" />
      <circle cx="38" cy="4" r="3" fill="#ff7c00" opacity="0.35" />
      <text x="38" y="73" textAnchor="middle" fill="#ff7c00" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">PIN</text>
    </svg>
  )
}

/* 4 — AVANT GARDE: military beret, angular jaw, diagonal scar */
function Avant({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="AVANT GARDE portrait">
      <BgGrad id={id} c1="#4a0010" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 58 H16 V68 M76 22 H60 V12" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Angular face */}
      <path d="M22 28 Q22 16 38 12 Q54 16 54 28 L52 52 Q46 58 38 59 Q30 58 24 52Z" fill="#0a0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
      {/* Military beret offset */}
      <path d="M18 26 Q16 12 34 9 Q50 7 54 18 Q48 20 38 20 Q26 20 18 26Z" fill="#1a0008" stroke="#ff003c" strokeWidth="1.2" />
      <circle cx="44" cy="16" r="3" fill="rgba(255,0,60,0.2)" stroke="#ff003c" strokeWidth="0.9" />
      <text x="44" y="18" textAnchor="middle" fill="#ff003c" fontSize="4" fontFamily="monospace">★</text>
      {/* Square battle eyes */}
      <rect x="27" y="30" width="8" height="6" rx="1" fill="#ff003c" />
      <rect x="28" y="31" width="6" height="4" rx="0.5" fill="#0a0208" />
      <rect x="41" y="30" width="8" height="6" rx="1" fill="#ff003c" />
      <rect x="42" y="31" width="6" height="4" rx="0.5" fill="#0a0208" />
      {/* Diagonal scar */}
      <line x1="44" y1="25" x2="34" y2="47" stroke="#ff003c" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <line x1="45" y1="26" x2="35" y2="48" stroke="rgba(255,80,80,0.3)" strokeWidth="0.7" />
      {/* Stern mouth */}
      <path d="M28 48 L48 48" stroke="#ff003c" strokeWidth="1.4" strokeLinecap="round" />
      {/* Mercenary armor collar */}
      <path d="M18 56 L26 46 H50 L58 56" stroke="#ff003c" strokeWidth="1.2" fill="rgba(30,5,12,0.7)" />
      <path d="M28 46 V40 M48 46 V40" stroke="#ff003c" strokeWidth="0.8" opacity="0.5" />
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">AVG</text>
    </svg>
  )
}

/* 5 — CREDIT REAPER: skull face, hollow eyes, vampire collar */
function Reaper({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="CREDIT REAPER portrait">
      <BgGrad id={id} c1="#200030" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 48 H12 V38 H22 M76 52 H64 V64" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Skull head */}
      <ellipse cx="38" cy="32" rx="19" ry="22" fill="#060106" stroke="#ff003c" strokeWidth="1.3" filter={`url(#gf${id})`} />
      {/* Hollow eye sockets */}
      <circle cx="29" cy="29" r="6.5" fill="#020104" stroke="#ff003c" strokeWidth="1.4" />
      <circle cx="29" cy="29" r="3.5" fill="#0a0108" />
      <circle cx="47" cy="29" r="6.5" fill="#020104" stroke="#ff003c" strokeWidth="1.4" />
      <circle cx="47" cy="29" r="3.5" fill="#0a0108" />
      {/* Nasal cavity inverted V */}
      <path d="M35 38 L38 34 L41 38" stroke="#ff003c" strokeWidth="1.1" fill="rgba(2,1,4,0.8)" />
      {/* Skull grin */}
      <path d="M26 46 Q38 54 50 46" stroke="#ff003c" strokeWidth="1.5" fill="none" />
      <line x1="30" y1="46" x2="30" y2="50" stroke="#ff003c" strokeWidth="1" />
      <line x1="34" y1="47" x2="34" y2="52" stroke="#ff003c" strokeWidth="1" />
      <line x1="38" y1="48" x2="38" y2="53" stroke="#ff003c" strokeWidth="1" />
      <line x1="42" y1="47" x2="42" y2="52" stroke="#ff003c" strokeWidth="1" />
      <line x1="46" y1="46" x2="46" y2="50" stroke="#ff003c" strokeWidth="1" />
      {/* Vampire high collar */}
      <path d="M4 56 L16 38 L24 46 H52 L60 38 L72 56 Q52 50 38 54 Q24 50 4 56Z" fill="rgba(12,0,10,0.88)" stroke="#ff003c" strokeWidth="1.1" strokeLinejoin="round" />
      {/* Inner glow eyes */}
      <circle cx="29" cy="29" r="2" fill="#ff003c" opacity="0.5" />
      <circle cx="47" cy="29" r="2" fill="#ff003c" opacity="0.5" />
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">REAP</text>
    </svg>
  )
}

/* 6 — MISS LANE: sharp bob haircut, aggressive angular eyes */
function Lane({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="MISS LANE portrait">
      <BgGrad id={id} c1="#3d0018" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 60 H14 V52 H24 M76 30 H62 V20" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Sharp geometric bob left */}
      <path d="M14 48 L16 18 Q20 10 30 10 Q38 10 38 14" fill="#0e0008" stroke="#ff003c" strokeWidth="1.1" />
      {/* Bob right */}
      <path d="M62 48 L60 18 Q56 10 46 10 Q38 10 38 14" fill="#0e0008" stroke="#ff003c" strokeWidth="1.1" />
      {/* Hair top flat */}
      <rect x="18" y="9" width="40" height="12" rx="2" fill="#0e0008" stroke="#ff003c" strokeWidth="0.9" />
      {/* Face */}
      <ellipse cx="38" cy="37" rx="16" ry="18" fill="#0a0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
      {/* Aggressive angular brows */}
      <path d="M24 28 L36 32" stroke="#ff003c" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 32 L52 28" stroke="#ff003c" strokeWidth="2.2" strokeLinecap="round" />
      {/* Narrow aggressive eyes */}
      <rect x="25" y="33" width="10" height="4" rx="0" fill="#ff003c" />
      <rect x="41" y="33" width="10" height="4" rx="0" fill="#ff003c" />
      {/* Pursed tight mouth */}
      <path d="M30 46 L38 48 L46 46" stroke="#ff003c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Business collar */}
      <path d="M20 56 L28 47 H34 L38 53 L42 47 H48 L56 56" stroke="#ff003c" strokeWidth="1.1" fill="rgba(24,5,12,0.7)" strokeLinejoin="round" />
      {/* Earrings */}
      <circle cx="22" cy="38" r="2" fill="none" stroke="#ff003c" strokeWidth="0.9" />
      <circle cx="54" cy="38" r="2" fill="none" stroke="#ff003c" strokeWidth="0.9" />
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">LANE</text>
    </svg>
  )
}

/* 7 — SKY BARON: large aviator goggles, high coat collar, sneer */
function SkyBaron({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="SKY BARON portrait">
      <BgGrad id={id} c1="#3a1800" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff7c00" />
      <path d="M0 54 H14 V64 M76 30 H62 V20" stroke="#ff7c00" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Aviator cap */}
      <path d="M18 30 Q20 12 38 8 Q56 12 58 30 Q48 22 38 20 Q28 22 18 30Z" fill="#1a0a00" stroke="#ff7c00" strokeWidth="1.2" />
      {/* Cap strap */}
      <path d="M20 30 Q18 36 20 42" stroke="#ff7c00" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M56 30 Q58 36 56 42" stroke="#ff7c00" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Face */}
      <ellipse cx="38" cy="40" rx="18" ry="17" fill="#0a0604" stroke="#ff7c00" strokeWidth="1" filter={`url(#gf${id})`} />
      {/* Large round aviator goggles */}
      <circle cx="28" cy="37" r="9" fill="rgba(20,10,0,0.85)" stroke="#ff7c00" strokeWidth="1.5" />
      <circle cx="48" cy="37" r="9" fill="rgba(20,10,0,0.85)" stroke="#ff7c00" strokeWidth="1.5" />
      <circle cx="28" cy="37" r="6" fill="rgba(255,124,0,0.15)" />
      <circle cx="48" cy="37" r="6" fill="rgba(255,124,0,0.15)" />
      <circle cx="28" cy="37" r="3" fill="#ff7c00" opacity="0.7" />
      <circle cx="48" cy="37" r="3" fill="#ff7c00" opacity="0.7" />
      {/* Goggle bridge */}
      <rect x="36" y="34" width="4" height="5" rx="1" fill="#1a0a00" stroke="#ff7c00" strokeWidth="0.8" />
      {/* Sneer mouth */}
      <path d="M26 51 Q33 55 42 50 Q37 54 32 52" stroke="#ff7c00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Baron high coat collar */}
      <path d="M10 60 L22 46 H30 L38 54 L46 46 H54 L66 60" stroke="#ff7c00" strokeWidth="1.3" fill="rgba(25,12,0,0.8)" strokeLinejoin="round" />
      {/* Epaulettes */}
      <rect x="8" y="56" width="10" height="6" rx="1" fill="rgba(255,124,0,0.1)" stroke="#ff7c00" strokeWidth="0.8" />
      <rect x="58" y="56" width="10" height="6" rx="1" fill="rgba(255,124,0,0.1)" stroke="#ff7c00" strokeWidth="0.8" />
      <text x="38" y="73" textAnchor="middle" fill="#ff7c00" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">SKY</text>
    </svg>
  )
}

/* 8 — CAP ONE ALPHA: full face helmet, red visor slit, shoulder armor */
function Alpha({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="CAP ONE ALPHA portrait">
      <BgGrad id={id} c1="#4a0018" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 50 H12 V40 H24 M76 48 H64 V60" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Helmet dome */}
      <path d="M20 36 Q20 10 38 8 Q56 10 56 36 V50 H20Z" fill="#0d0208" stroke="#ff003c" strokeWidth="1.3" filter={`url(#gf${id})`} />
      {/* Visor slit */}
      <rect x="22" y="32" width="32" height="8" rx="1" fill="#020108" stroke="#ff003c" strokeWidth="1" />
      <rect x="23" y="33" width="30" height="6" rx="0.5" fill="#ff003c" opacity="0.55" />
      <line x1="23" y1="36" x2="53" y2="36" stroke="#ff003c" strokeWidth="0.5" opacity="0.4" />
      {/* Chin guard */}
      <path d="M22 50 L26 56 H50 L54 50" fill="#0d0208" stroke="#ff003c" strokeWidth="1" />
      {/* Side panel */}
      <line x1="20" y1="38" x2="12" y2="42" stroke="#ff003c" strokeWidth="0.9" />
      <line x1="56" y1="38" x2="64" y2="42" stroke="#ff003c" strokeWidth="0.9" />
      {/* Shoulder armor */}
      <rect x="8" y="50" width="14" height="14" rx="2" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="1" />
      <rect x="54" y="50" width="14" height="14" rx="2" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="1" />
      <text x="38" y="28" textAnchor="middle" fill="#ff003c" fontSize="9" fontFamily="monospace" fontWeight="700" opacity="0.45">α</text>
      <circle cx="24" cy="26" r="2" fill="rgba(255,0,60,0.3)" stroke="#ff003c" strokeWidth="0.7" />
      <circle cx="52" cy="26" r="2" fill="rgba(255,0,60,0.3)" stroke="#ff003c" strokeWidth="0.7" />
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">α</text>
    </svg>
  )
}

/* 9 — CAP ONE BETA: mirrored helmet, cyan visor, antenna */
function Beta({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="CAP ONE BETA portrait">
      <BgGrad id={id} c1="#00203a" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#00f5ff" />
      <path d="M0 44 H14 V54 M76 42 H62 V30" stroke="#00f5ff" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Wider helmet */}
      <path d="M18 38 Q19 10 38 8 Q57 10 58 38 V52 H18Z" fill="#00080e" stroke="#00f5ff" strokeWidth="1.3" filter={`url(#gf${id})`} />
      {/* Cyan visor taller */}
      <rect x="20" y="30" width="36" height="10" rx="1.5" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
      <rect x="21" y="31" width="34" height="8" rx="1" fill="#00f5ff" opacity="0.45" />
      <line x1="21" y1="35" x2="55" y2="35" stroke="#00f5ff" strokeWidth="0.5" opacity="0.5" />
      {/* Chin guard wider */}
      <path d="M20 52 L24 60 H52 L56 52" fill="#00080e" stroke="#00f5ff" strokeWidth="1" />
      {/* Antenna */}
      <line x1="38" y1="8" x2="38" y2="2" stroke="#00f5ff" strokeWidth="1.2" />
      <circle cx="38" cy="2" r="1.5" fill="#00f5ff" />
      {/* Side cables */}
      <path d="M18 38 Q12 40 10 46" stroke="#00f5ff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M58 38 Q64 40 66 46" stroke="#00f5ff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Angular shoulder armor */}
      <polygon points="6,52 20,52 16,66 2,66" fill="rgba(0,245,255,0.06)" stroke="#00f5ff" strokeWidth="1" />
      <polygon points="70,52 56,52 60,66 74,66" fill="rgba(0,245,255,0.06)" stroke="#00f5ff" strokeWidth="1" />
      <text x="38" y="26" textAnchor="middle" fill="#00f5ff" fontSize="9" fontFamily="monospace" fontWeight="700" opacity="0.4">β</text>
      <text x="38" y="73" textAnchor="middle" fill="#00f5ff" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">β</text>
    </svg>
  )
}

/* 10 — LEAD WEIGHT: massive wide silhouette, heavy brow, hulking armor */
function LeadWeight({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="LEAD WEIGHT portrait">
      <BgGrad id={id} c1="#300010" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <path d="M0 44 H10 V36 H22 M76 50 H64 V62" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
      {/* Massive wide head */}
      <ellipse cx="38" cy="34" rx="24" ry="20" fill="#0a0208" stroke="#ff003c" strokeWidth="1.4" filter={`url(#gf${id})`} />
      {/* Heavy brow plate */}
      <rect x="16" y="26" width="44" height="9" rx="2" fill="#140610" stroke="#ff003c" strokeWidth="1.1" />
      {/* Small eyes under heavy brow */}
      <circle cx="29" cy="36" r="3" fill="#ff003c" />
      <circle cx="29" cy="36" r="1.5" fill="#0a0208" />
      <circle cx="47" cy="36" r="3" fill="#ff003c" />
      <circle cx="47" cy="36" r="1.5" fill="#0a0208" />
      {/* Flat grim mouth */}
      <rect x="28" y="44" width="20" height="3" rx="1" fill="#ff003c" opacity="0.6" />
      {/* Rivet bolts on brow */}
      <circle cx="22" cy="30" r="1.5" fill="#ff003c" opacity="0.7" />
      <circle cx="32" cy="28" r="1.5" fill="#ff003c" opacity="0.7" />
      <circle cx="44" cy="28" r="1.5" fill="#ff003c" opacity="0.7" />
      <circle cx="54" cy="30" r="1.5" fill="#ff003c" opacity="0.7" />
      {/* Extremely wide shoulders */}
      <path d="M0 58 L8 48 H68 L76 58 L72 70 H4Z" fill="rgba(30,5,12,0.85)" stroke="#ff003c" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="4" y1="58" x2="72" y2="58" stroke="#ff003c" strokeWidth="0.8" opacity="0.4" />
      <line x1="6" y1="64" x2="70" y2="64" stroke="#ff003c" strokeWidth="0.6" opacity="0.3" />
      <text x="38" y="62" textAnchor="middle" fill="#ff003c" fontSize="8" fontFamily="monospace" fontWeight="700" opacity="0.3">⊕</text>
      <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">LEAD</text>
    </svg>
  )
}

/* 11 — THE MAINFRAME: circuit lines on face, screen-glow rectangular eyes, node antenna */
function Mainframe({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="THE MAINFRAME portrait">
      <BgGrad id={id} c1="#002030" />
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#00f5ff" />
      <path d="M0 40 H12 V32 H22 M76 48 H64 V38 H52" stroke="#00f5ff" strokeWidth="0.7" opacity="0.35" fill="none" />
      {/* Rectangular face */}
      <rect x="18" y="14" width="40" height="46" rx="4" fill="#020a10" stroke="#00f5ff" strokeWidth="1.2" filter={`url(#gf${id})`} />
      {/* Circuit lines */}
      <path d="M26 22 H18 M26 22 V30 H22 M50 22 H58 M50 22 V30 H54" stroke="#00f5ff" strokeWidth="0.7" opacity="0.55" fill="none" />
      <path d="M30 38 H22 M46 38 H54 M38 18 V14 M38 14 H44" stroke="#00f5ff" strokeWidth="0.7" opacity="0.4" fill="none" />
      <circle cx="22" cy="30" r="1.5" fill="#00f5ff" opacity="0.6" />
      <circle cx="54" cy="30" r="1.5" fill="#00f5ff" opacity="0.6" />
      <circle cx="22" cy="38" r="1" fill="#00f5ff" opacity="0.5" />
      <circle cx="54" cy="38" r="1" fill="#00f5ff" opacity="0.5" />
      {/* Antenna */}
      <line x1="38" y1="14" x2="38" y2="6" stroke="#00f5ff" strokeWidth="1.2" />
      <circle cx="38" cy="6" r="2.5" fill="#00f5ff" opacity="0.7" />
      <line x1="34" y1="6" x2="42" y2="6" stroke="#00f5ff" strokeWidth="0.8" opacity="0.6" />
      {/* Screen-glow rectangular eyes */}
      <rect x="24" y="28" width="12" height="8" rx="1" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
      <rect x="25" y="29" width="10" height="6" rx="0.5" fill="#00f5ff" opacity="0.6" />
      <line x1="25" y1="31" x2="35" y2="31" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <line x1="25" y1="33" x2="35" y2="33" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <rect x="40" y="28" width="12" height="8" rx="1" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
      <rect x="41" y="29" width="10" height="6" rx="0.5" fill="#00f5ff" opacity="0.6" />
      <line x1="41" y1="31" x2="51" y2="31" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <line x1="41" y1="33" x2="51" y2="33" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      {/* Data stream mouth */}
      <rect x="26" y="44" width="24" height="3" rx="0.5" fill="rgba(0,245,255,0.15)" stroke="#00f5ff" strokeWidth="0.8" />
      <rect x="26" y="44" width="12" height="3" rx="0.5" fill="#00f5ff" opacity="0.5" />
      {/* Server rack body */}
      <rect x="20" y="52" width="36" height="8" rx="1" fill="rgba(0,245,255,0.05)" stroke="#00f5ff" strokeWidth="0.8" />
      <line x1="20" y1="55" x2="56" y2="55" stroke="#00f5ff" strokeWidth="0.6" opacity="0.4" />
      <rect x="22" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.25" />
      <rect x="30" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.15" />
      <rect x="38" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.2" />
      <text x="38" y="73" textAnchor="middle" fill="#00f5ff" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">MAIN</text>
    </svg>
  )
}

/* 12 — THE APPLE BOSS: crown, wide imposing face, gold, most detailed */
function Boss({ id }) {
  return (
    <svg viewBox="0 0 76 76" width="100%" height="100%" role="img" aria-label="THE APPLE BOSS portrait">
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="20%" r="80%">
          <stop offset="0" stopColor="#4a3200" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#1a1000" stopOpacity="0.95" />
          <stop offset="1" stopColor="#040408" />
        </radialGradient>
        <radialGradient id={`crown${id}`} cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor="#c9a84c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7a6020" stopOpacity="0.5" />
        </radialGradient>
        <filter id={`gf${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="76" height="76" fill={`url(#bg${id})`} />
      <CornerMarks c="#c9a84c" />
      <path d="M0 52 H12 V40 H22 M76 52 H64 V40 H54 M38 76 V68 M38 0 V8" stroke="#c9a84c" strokeWidth="0.7" opacity="0.3" fill="none" />
      {/* Crown base */}
      <rect x="18" y="13" width="40" height="7" rx="1" fill="#12090a" stroke="#c9a84c" strokeWidth="1.2" />
      {/* Crown points 5 spikes */}
      <polygon points="20,13 20,4 25,9 30,1 35,9 38,3 41,9 46,1 51,9 56,4 56,13" fill={`url(#crown${id})`} stroke="#c9a84c" strokeWidth="1" strokeLinejoin="round" />
      {/* Crown jewels */}
      <circle cx="30" cy="6" r="2" fill="#ff003c" stroke="#c9a84c" strokeWidth="0.7" />
      <circle cx="38" cy="4" r="2.5" fill="#00f5ff" stroke="#c9a84c" strokeWidth="0.7" />
      <circle cx="46" cy="6" r="2" fill="#ff003c" stroke="#c9a84c" strokeWidth="0.7" />
      {/* Wide imposing face */}
      <ellipse cx="38" cy="36" rx="20" ry="20" fill="#0c080a" stroke="#c9a84c" strokeWidth="1.4" filter={`url(#gf${id})`} />
      {/* Power eyes */}
      <rect x="24" y="30" width="11" height="7" rx="1" fill="#100c04" stroke="#c9a84c" strokeWidth="1.2" />
      <rect x="25" y="31" width="9" height="5" rx="0.5" fill="#c9a84c" opacity="0.7" />
      <rect x="41" y="30" width="11" height="7" rx="1" fill="#100c04" stroke="#c9a84c" strokeWidth="1.2" />
      <rect x="42" y="31" width="9" height="5" rx="0.5" fill="#c9a84c" opacity="0.7" />
      {/* Strong bridge brow */}
      <path d="M22 28 Q38 22 54 28" stroke="#c9a84c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Prominent nose */}
      <path d="M35 38 V46 H41 V38" stroke="#c9a84c" strokeWidth="1.1" fill="rgba(8,6,4,0.7)" />
      {/* Stern mouth */}
      <path d="M26 52 Q38 55 50 52" stroke="#c9a84c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Imposing wide cape collar */}
      <path d="M4 64 L14 50 H24 L38 58 L52 50 H62 L72 64 Q52 58 38 62 Q24 58 4 64Z" fill="rgba(20,14,4,0.9)" stroke="#c9a84c" strokeWidth="1.3" strokeLinejoin="round" />
      <text x="38" y="57" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="monospace" fontWeight="700" opacity="0.4">⌘</text>
      <circle cx="38" cy="4" r="1.5" fill="white" opacity="0.5" />
      <text x="38" y="73" textAnchor="middle" fill="#c9a84c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">BOSS</text>
    </svg>
  )
}

const PORTRAIT_MAP = {
  1: Pat, 2: Kid, 3: Pinnacle, 4: Avant, 5: Reaper, 6: Lane,
  7: SkyBaron, 8: Alpha, 9: Beta, 10: LeadWeight, 11: Mainframe, 12: Boss,
}

export default function VillainPortrait({ villainId, featured = false, eliminated = false, isTarget = false, isBoss = false }) {
  const id = villainId ?? 1
  const Component = PORTRAIT_MAP[id] ?? Pat

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
      <Component id={id} />
    </div>
  )
}
