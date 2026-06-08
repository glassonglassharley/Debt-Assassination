/* Each villain gets a completely unique inline SVG portrait — 100×100 viewBox */

const S = 1.315789 // scale: 76→100

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
      d="M4 4 H18 M4 4 V18 M96 4 H82 M96 4 V18 M4 96 H18 M4 96 V82 M96 96 H82 M96 96 V82"
      stroke={c} strokeWidth="1.2" opacity="0.5" fill="none"
    />
  )
}

/* 1 — PAYDAY PAT: snapback with sticker, stubble, gold tooth */
function Pat({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="PAYDAY PAT portrait">
      <BgGrad id={id} c1="#5c0018" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 62 H14 V70 M76 28 H62 V18" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Snapback flat brim */}
        <rect x="17" y="9" width="42" height="10" rx="5" fill="#14000a" stroke="#ff003c" strokeWidth="1.1" />
        <rect x="11" y="16" width="54" height="5" rx="1" fill="#1a0010" stroke="#ff003c" strokeWidth="0.8" opacity="0.8" />
        <line x1="11" y1="21" x2="65" y2="21" stroke="#ff003c" strokeWidth="0.8" opacity="0.5" />
        {/* Snapback sticker badge */}
        <rect x="42" y="10" width="9" height="6" rx="1" fill="#0a0208" stroke="#c9a84c" strokeWidth="0.7" />
        <text x="46" y="14.5" textAnchor="middle" fill="#c9a84c" fontSize="4" fontFamily="monospace" fontWeight="700">$</text>
        {/* Wide face */}
        <ellipse cx="38" cy="38" rx="18" ry="19" fill="#0c0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
        {/* Eyes round glowing */}
        <circle cx="30" cy="34" r="4.5" fill="#ff003c" />
        <circle cx="30" cy="34" r="2.5" fill="#0a0208" />
        <circle cx="30" cy="34" r="1" fill="#ff003c" opacity="0.6" />
        <circle cx="46" cy="35" r="3.5" fill="#ff003c" />
        <circle cx="46" cy="35" r="1.8" fill="#0a0208" />
        <circle cx="46" cy="35" r="0.8" fill="#ff003c" opacity="0.6" />
        {/* Stubble dots */}
        <circle cx="30" cy="41" r="0.6" fill="#ff003c" opacity="0.4" />
        <circle cx="33" cy="43" r="0.6" fill="#ff003c" opacity="0.4" />
        <circle cx="36" cy="44" r="0.6" fill="#ff003c" opacity="0.4" />
        <circle cx="39" cy="44" r="0.6" fill="#ff003c" opacity="0.4" />
        <circle cx="42" cy="43" r="0.6" fill="#ff003c" opacity="0.4" />
        <circle cx="45" cy="41" r="0.6" fill="#ff003c" opacity="0.4" />
        {/* Smug smirk */}
        <path d="M28 45 Q38 52 48 45" stroke="#ff003c" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Gold tooth */}
        <rect x="35" y="45" width="6" height="5" rx="0.5" fill="#c9a84c" />
        <line x1="38" y1="45" x2="38" y2="50" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
        {/* Heavy coat collar */}
        <path d="M17 58 L26 48 H50 L59 58" stroke="#ff003c" strokeWidth="1.2" fill="rgba(30,5,12,0.7)" strokeLinejoin="round" />
        <path d="M30 48 L38 54 L46 48" stroke="#ff003c" strokeWidth="0.9" fill="none" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">PAT</text>
      </g>
    </svg>
  )
}

/* 2 — KIKOFF KID: deep hood, cyan slit eyes, wiry reaching arms */
function Kid({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="KIKOFF KID portrait">
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="25%" r="72%">
          <stop offset="0" stopColor="#001a1a" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#020808" stopOpacity="0.97" />
          <stop offset="1" stopColor="#000408" />
        </radialGradient>
        <filter id={`gf${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`cf${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#00f5ff" />
      <g transform={`scale(${S})`}>
        {/* Hood outer glow */}
        <path d="M8 50 Q9 6 38 2 Q67 6 68 50 Q56 18 38 16 Q20 18 8 50Z"
          fill="none" stroke="#00f5ff" strokeWidth="3" opacity="0.18" filter={`url(#cf${id})`} />
        {/* Hood silhouette */}
        <path d="M8 50 Q9 6 38 2 Q67 6 68 50 Q56 18 38 16 Q20 18 8 50Z"
          fill="#030d0d" stroke="#00f5ff" strokeWidth="1.1" opacity="0.95" />
        {/* Deep face shadow */}
        <ellipse cx="38" cy="34" rx="17" ry="16" fill="#010606" />
        {/* Hood inner texture lines */}
        <path d="M20 14 Q38 10 56 14" stroke="#00f5ff" strokeWidth="0.5" opacity="0.2" fill="none" />
        <path d="M14 28 Q38 20 62 28" stroke="#00f5ff" strokeWidth="0.4" opacity="0.15" fill="none" />
        {/* Cyan slit eyes — left */}
        <ellipse cx="29" cy="32" rx="6" ry="2.2" fill="#00f5ff" filter={`url(#cf${id})`} opacity="0.9" />
        <ellipse cx="29" cy="32" rx="6" ry="2.2" fill="#00f5ff" opacity="0.85" />
        <ellipse cx="29" cy="32" rx="2.8" ry="0.9" fill="#000c0c" />
        {/* Cyan slit eyes — right */}
        <ellipse cx="47" cy="32" rx="6" ry="2.2" fill="#00f5ff" filter={`url(#cf${id})`} opacity="0.9" />
        <ellipse cx="47" cy="32" rx="6" ry="2.2" fill="#00f5ff" opacity="0.85" />
        <ellipse cx="47" cy="32" rx="2.8" ry="0.9" fill="#000c0c" />
        {/* Wiry torso */}
        <path d="M28 62 L31 48 H45 L48 62" stroke="#00f5ff" strokeWidth="1" fill="rgba(0,10,14,0.65)" opacity="0.7" />
        {/* Arms reaching to corners */}
        <path d="M28 56 Q16 62 5 72" stroke="#00f5ff" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M5 72 Q2 68 5 66 M5 72 Q1 66 4 63" stroke="#00f5ff" strokeWidth="0.9" fill="none" opacity="0.75" />
        <path d="M48 56 Q60 62 71 72" stroke="#00f5ff" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M71 72 Q74 68 71 66 M71 72 Q75 66 72 63" stroke="#00f5ff" strokeWidth="0.9" fill="none" opacity="0.75" />
        <text x="38" y="74" textAnchor="middle" fill="#00f5ff" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5" opacity="0.8">KID</text>
      </g>
    </svg>
  )
}

/* 3 — THE PINNACLE: pyramid triangle head, rectangular eyes, suit + briefcase detail */
function Pinnacle({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="THE PINNACLE portrait">
      <BgGrad id={id} c1="#3d2000" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff7c00" />
      <g transform={`scale(${S})`}>
        <path d="M0 55 H14 V65 M76 25 H62 V15" stroke="#ff7c00" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Pyramid/triangle head */}
        <polygon points="38,4 60,54 16,54" fill="#0a0604" stroke="#ff7c00" strokeWidth="1.3" filter={`url(#gf${id})`} />
        {/* Internal structure lines */}
        <line x1="38" y1="4" x2="38" y2="54" stroke="#ff7c00" strokeWidth="0.5" opacity="0.2" />
        <line x1="27" y1="29" x2="49" y2="29" stroke="#ff7c00" strokeWidth="0.4" opacity="0.15" />
        {/* Cold rectangular corporate eyes */}
        <rect x="26" y="28" width="9" height="5" rx="0" fill="#ff7c00" opacity="0.9" />
        <rect x="27" y="29" width="7" height="3" rx="0" fill="#0a0604" />
        <rect x="41" y="28" width="9" height="5" rx="0" fill="#ff7c00" opacity="0.9" />
        <rect x="42" y="29" width="7" height="3" rx="0" fill="#0a0604" />
        {/* Thin cold mouth */}
        <line x1="30" y1="44" x2="46" y2="44" stroke="#ff7c00" strokeWidth="1.5" />
        {/* Suit collar lapels */}
        <path d="M16 54 L24 46 H34 L38 54 L42 46 H52 L60 54" stroke="#ff7c00" strokeWidth="1.1" fill="rgba(25,12,0,0.7)" strokeLinejoin="round" />
        {/* Tie with pattern */}
        <path d="M35 54 L38 70 L41 54" stroke="#ff7c00" strokeWidth="1" fill="rgba(20,8,0,0.6)" />
        <line x1="37" y1="56" x2="39" y2="56" stroke="#ff7c00" strokeWidth="0.5" opacity="0.5" />
        <line x1="37" y1="59" x2="39" y2="59" stroke="#ff7c00" strokeWidth="0.5" opacity="0.5" />
        {/* Suit buttons */}
        <circle cx="38" cy="55" r="1" fill="#ff7c00" opacity="0.5" />
        <circle cx="38" cy="59" r="1" fill="#ff7c00" opacity="0.5" />
        <circle cx="38" cy="4" r="3" fill="#ff7c00" opacity="0.35" />
        <text x="38" y="73" textAnchor="middle" fill="#ff7c00" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">PIN</text>
      </g>
    </svg>
  )
}

/* 4 — AVANT GARDE: military beret, star badge, diagonal scar, high collar */
function Avant({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="AVANT GARDE portrait">
      <BgGrad id={id} c1="#4a0010" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 58 H16 V68 M76 22 H60 V12" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Angular face */}
        <path d="M22 28 Q22 16 38 12 Q54 16 54 28 L52 52 Q46 58 38 59 Q30 58 24 52Z" fill="#0a0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
        {/* Military beret offset left */}
        <path d="M18 26 Q16 12 34 9 Q50 7 54 18 Q48 20 38 20 Q26 20 18 26Z" fill="#1a0008" stroke="#ff003c" strokeWidth="1.2" />
        {/* Beret texture */}
        <path d="M20 20 Q29 17 38 18" stroke="#ff003c" strokeWidth="0.4" opacity="0.3" fill="none" />
        {/* Star badge */}
        <circle cx="44" cy="16" r="3.5" fill="rgba(255,0,60,0.12)" stroke="#ff003c" strokeWidth="0.9" />
        <text x="44" y="18.5" textAnchor="middle" fill="#ff003c" fontSize="5" fontFamily="monospace">★</text>
        {/* Square battle eyes */}
        <rect x="27" y="30" width="8" height="6" rx="1" fill="#ff003c" />
        <rect x="28" y="31" width="6" height="4" rx="0.5" fill="#0a0208" />
        <rect x="28.5" y="31.5" width="5" height="3" rx="0" fill="#ff003c" opacity="0.4" />
        <rect x="41" y="30" width="8" height="6" rx="1" fill="#ff003c" />
        <rect x="42" y="31" width="6" height="4" rx="0.5" fill="#0a0208" />
        <rect x="42.5" y="31.5" width="5" height="3" rx="0" fill="#ff003c" opacity="0.4" />
        {/* Diagonal scar — main */}
        <line x1="44" y1="25" x2="34" y2="47" stroke="#ff003c" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
        <line x1="45" y1="26" x2="35" y2="48" stroke="rgba(255,80,80,0.3)" strokeWidth="0.7" />
        {/* Cross-scar detail */}
        <line x1="40" y1="33" x2="37" y2="36" stroke="#ff003c" strokeWidth="0.6" opacity="0.5" />
        {/* Stern mouth */}
        <path d="M28 48 L48 48" stroke="#ff003c" strokeWidth="1.4" strokeLinecap="round" />
        {/* Mercenary armor collar */}
        <path d="M18 56 L26 46 H50 L58 56" stroke="#ff003c" strokeWidth="1.2" fill="rgba(30,5,12,0.7)" />
        <path d="M28 46 V40 M48 46 V40" stroke="#ff003c" strokeWidth="0.8" opacity="0.5" />
        {/* Collar rivets */}
        <circle cx="26" cy="50" r="1" fill="#ff003c" opacity="0.6" />
        <circle cx="50" cy="50" r="1" fill="#ff003c" opacity="0.6" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">AVG</text>
      </g>
    </svg>
  )
}

/* 5 — CREDIT REAPER: skull face, hollow eyes with red glow, visible grin teeth, high collar */
function Reaper({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="CREDIT REAPER portrait">
      <BgGrad id={id} c1="#200030" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 48 H12 V38 H22 M76 52 H64 V64" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Skull head */}
        <ellipse cx="38" cy="32" rx="19" ry="22" fill="#060106" stroke="#ff003c" strokeWidth="1.3" filter={`url(#gf${id})`} />
        {/* Hollow eye sockets */}
        <circle cx="29" cy="29" r="6.5" fill="#020104" stroke="#ff003c" strokeWidth="1.4" />
        <circle cx="29" cy="29" r="3.5" fill="#0a0108" />
        <circle cx="47" cy="29" r="6.5" fill="#020104" stroke="#ff003c" strokeWidth="1.4" />
        <circle cx="47" cy="29" r="3.5" fill="#0a0108" />
        {/* Red glow in eye sockets */}
        <circle cx="29" cy="29" r="2" fill="#ff003c" opacity="0.55" />
        <circle cx="47" cy="29" r="2" fill="#ff003c" opacity="0.55" />
        {/* Inner bright spots */}
        <circle cx="28" cy="28" r="0.8" fill="#ff6680" opacity="0.7" />
        <circle cx="46" cy="28" r="0.8" fill="#ff6680" opacity="0.7" />
        {/* Nasal cavity inverted V */}
        <path d="M35 38 L38 34 L41 38" stroke="#ff003c" strokeWidth="1.1" fill="rgba(2,1,4,0.8)" />
        {/* Skull grin arc */}
        <path d="M26 46 Q38 54 50 46" stroke="#ff003c" strokeWidth="1.5" fill="none" />
        {/* Visible teeth */}
        <line x1="30" y1="46" x2="30" y2="50" stroke="#ff003c" strokeWidth="1.2" />
        <line x1="34" y1="47" x2="34" y2="52" stroke="#ff003c" strokeWidth="1.2" />
        <line x1="38" y1="48" x2="38" y2="53" stroke="#ff003c" strokeWidth="1.2" />
        <line x1="42" y1="47" x2="42" y2="52" stroke="#ff003c" strokeWidth="1.2" />
        <line x1="46" y1="46" x2="46" y2="50" stroke="#ff003c" strokeWidth="1.2" />
        {/* Teeth horizontal bars for realism */}
        <line x1="30" y1="48" x2="34" y2="48" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" />
        <line x1="34" y1="49" x2="38" y2="49" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" />
        <line x1="38" y1="49" x2="42" y2="49" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" />
        <line x1="42" y1="48" x2="46" y2="48" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" />
        {/* Vampire high collar */}
        <path d="M4 56 L16 38 L24 46 H52 L60 38 L72 56 Q52 50 38 54 Q24 50 4 56Z" fill="rgba(12,0,10,0.88)" stroke="#ff003c" strokeWidth="1.1" strokeLinejoin="round" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">REAP</text>
      </g>
    </svg>
  )
}

/* 6 — MISS LANE: sharp angular bob, aggressive brows, diamond earrings */
function Lane({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="MISS LANE portrait">
      <BgGrad id={id} c1="#3d0018" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 60 H14 V52 H24 M76 30 H62 V20" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Sharp geometric bob left */}
        <path d="M14 48 L16 18 Q20 10 30 10 Q38 10 38 14" fill="#0e0008" stroke="#ff003c" strokeWidth="1.1" />
        {/* Bob right */}
        <path d="M62 48 L60 18 Q56 10 46 10 Q38 10 38 14" fill="#0e0008" stroke="#ff003c" strokeWidth="1.1" />
        {/* Hair top flat */}
        <rect x="18" y="9" width="40" height="12" rx="2" fill="#0e0008" stroke="#ff003c" strokeWidth="0.9" />
        {/* Hair highlights */}
        <line x1="22" y1="12" x2="22" y2="20" stroke="#ff003c" strokeWidth="0.4" opacity="0.3" />
        <line x1="38" y1="10" x2="38" y2="18" stroke="#ff003c" strokeWidth="0.4" opacity="0.2" />
        {/* Face */}
        <ellipse cx="38" cy="37" rx="16" ry="18" fill="#0a0208" stroke="#ff003c" strokeWidth="1.2" filter={`url(#gf${id})`} />
        {/* Aggressive angular brows */}
        <path d="M24 28 L36 32" stroke="#ff003c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M40 32 L52 28" stroke="#ff003c" strokeWidth="2.2" strokeLinecap="round" />
        {/* Narrow aggressive eyes */}
        <rect x="25" y="33" width="10" height="4" rx="0" fill="#ff003c" />
        <rect x="26" y="33.5" width="8" height="3" fill="#0a0208" rx="0" />
        <rect x="41" y="33" width="10" height="4" rx="0" fill="#ff003c" />
        <rect x="42" y="33.5" width="8" height="3" fill="#0a0208" rx="0" />
        {/* Iris glint */}
        <rect x="28" y="34" width="3" height="2" fill="#ff003c" opacity="0.7" rx="0" />
        <rect x="44" y="34" width="3" height="2" fill="#ff003c" opacity="0.7" rx="0" />
        {/* Pursed tight mouth */}
        <path d="M30 46 L38 48 L46 46" stroke="#ff003c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Lip line */}
        <line x1="32" y1="47" x2="44" y2="47" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" />
        {/* Business collar */}
        <path d="M20 56 L28 47 H34 L38 53 L42 47 H48 L56 56" stroke="#ff003c" strokeWidth="1.1" fill="rgba(24,5,12,0.7)" strokeLinejoin="round" />
        {/* Diamond earrings */}
        <polygon points="22,36 20,39 22,42 24,39" fill="none" stroke="#ff003c" strokeWidth="1" />
        <polygon points="22,36 20,39 22,42 24,39" fill="#ff003c" opacity="0.2" />
        <polygon points="54,36 52,39 54,42 56,39" fill="none" stroke="#ff003c" strokeWidth="1" />
        <polygon points="54,36 52,39 54,42 56,39" fill="#ff003c" opacity="0.2" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">LANE</text>
      </g>
    </svg>
  )
}

/* 7 — SKY BARON: large round aviator goggles with orange glow, military collar, epaulettes */
function SkyBaron({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="SKY BARON portrait">
      <BgGrad id={id} c1="#3a1800" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff7c00" />
      <g transform={`scale(${S})`}>
        <path d="M0 54 H14 V64 M76 30 H62 V20" stroke="#ff7c00" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Aviator cap */}
        <path d="M18 30 Q20 12 38 8 Q56 12 58 30 Q48 22 38 20 Q28 22 18 30Z" fill="#1a0a00" stroke="#ff7c00" strokeWidth="1.2" />
        {/* Cap seam */}
        <path d="M28 10 Q38 8 48 10" stroke="#ff7c00" strokeWidth="0.5" opacity="0.3" fill="none" />
        {/* Cap strap */}
        <path d="M20 30 Q18 36 20 42" stroke="#ff7c00" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M56 30 Q58 36 56 42" stroke="#ff7c00" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Strap buckle */}
        <rect x="17" y="36" width="5" height="4" rx="0.5" fill="none" stroke="#ff7c00" strokeWidth="0.8" />
        {/* Face */}
        <ellipse cx="38" cy="40" rx="18" ry="17" fill="#0a0604" stroke="#ff7c00" strokeWidth="1" filter={`url(#gf${id})`} />
        {/* Large round aviator goggles */}
        <circle cx="28" cy="37" r="9" fill="rgba(20,10,0,0.85)" stroke="#ff7c00" strokeWidth="1.5" />
        <circle cx="48" cy="37" r="9" fill="rgba(20,10,0,0.85)" stroke="#ff7c00" strokeWidth="1.5" />
        {/* Orange lens glow — outer */}
        <circle cx="28" cy="37" r="7" fill="rgba(255,124,0,0.12)" />
        <circle cx="48" cy="37" r="7" fill="rgba(255,124,0,0.12)" />
        {/* Orange lens glow — inner bright */}
        <circle cx="28" cy="37" r="4.5" fill="rgba(255,124,0,0.2)" />
        <circle cx="48" cy="37" r="4.5" fill="rgba(255,124,0,0.2)" />
        <circle cx="28" cy="37" r="3" fill="#ff7c00" opacity="0.7" />
        <circle cx="48" cy="37" r="3" fill="#ff7c00" opacity="0.7" />
        {/* Lens glint */}
        <circle cx="25" cy="34" r="1.2" fill="#ffa040" opacity="0.6" />
        <circle cx="45" cy="34" r="1.2" fill="#ffa040" opacity="0.6" />
        {/* Goggle bridge */}
        <rect x="36" y="34" width="4" height="5" rx="1" fill="#1a0a00" stroke="#ff7c00" strokeWidth="0.8" />
        {/* Sneer mouth */}
        <path d="M26 51 Q33 55 42 50 Q37 54 32 52" stroke="#ff7c00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Baron high coat collar */}
        <path d="M10 60 L22 46 H30 L38 54 L46 46 H54 L66 60" stroke="#ff7c00" strokeWidth="1.3" fill="rgba(25,12,0,0.8)" strokeLinejoin="round" />
        {/* Epaulettes */}
        <rect x="8" y="56" width="10" height="6" rx="1" fill="rgba(255,124,0,0.1)" stroke="#ff7c00" strokeWidth="0.8" />
        <rect x="58" y="56" width="10" height="6" rx="1" fill="rgba(255,124,0,0.1)" stroke="#ff7c00" strokeWidth="0.8" />
        {/* Epaulette stripe */}
        <line x1="8" y1="59" x2="18" y2="59" stroke="#ff7c00" strokeWidth="0.5" opacity="0.5" />
        <line x1="58" y1="59" x2="68" y2="59" stroke="#ff7c00" strokeWidth="0.5" opacity="0.5" />
        <text x="38" y="73" textAnchor="middle" fill="#ff7c00" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">SKY</text>
      </g>
    </svg>
  )
}

/* 8 — CAP ONE ALPHA: full military helmet, red visor slit, shoulder armor */
function Alpha({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="CAP ONE ALPHA portrait">
      <BgGrad id={id} c1="#4a0018" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 50 H12 V40 H24 M76 48 H64 V60" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Helmet dome */}
        <path d="M20 36 Q20 10 38 8 Q56 10 56 36 V50 H20Z" fill="#0d0208" stroke="#ff003c" strokeWidth="1.3" filter={`url(#gf${id})`} />
        {/* Helmet panel lines */}
        <path d="M38 8 V50" stroke="#ff003c" strokeWidth="0.5" opacity="0.2" />
        <path d="M28 12 Q38 10 48 12" stroke="#ff003c" strokeWidth="0.5" opacity="0.2" fill="none" />
        {/* Visor slit */}
        <rect x="22" y="32" width="32" height="8" rx="1" fill="#020108" stroke="#ff003c" strokeWidth="1" />
        <rect x="23" y="33" width="30" height="6" rx="0.5" fill="#ff003c" opacity="0.55" />
        <line x1="23" y1="36" x2="53" y2="36" stroke="#ff003c" strokeWidth="0.5" opacity="0.4" />
        {/* Visor glow effect */}
        <rect x="23" y="33" width="30" height="2" rx="0" fill="#ff6680" opacity="0.25" />
        {/* Chin guard */}
        <path d="M22 50 L26 56 H50 L54 50" fill="#0d0208" stroke="#ff003c" strokeWidth="1" />
        <line x1="22" y1="53" x2="54" y2="53" stroke="#ff003c" strokeWidth="0.5" opacity="0.3" />
        {/* Side panels */}
        <line x1="20" y1="38" x2="12" y2="42" stroke="#ff003c" strokeWidth="0.9" />
        <line x1="56" y1="38" x2="64" y2="42" stroke="#ff003c" strokeWidth="0.9" />
        {/* Shoulder armor with detail */}
        <rect x="8" y="50" width="14" height="14" rx="2" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="1" />
        <line x1="8" y1="57" x2="22" y2="57" stroke="#ff003c" strokeWidth="0.5" opacity="0.4" />
        <rect x="54" y="50" width="14" height="14" rx="2" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="1" />
        <line x1="54" y1="57" x2="68" y2="57" stroke="#ff003c" strokeWidth="0.5" opacity="0.4" />
        <text x="38" y="28" textAnchor="middle" fill="#ff003c" fontSize="9" fontFamily="monospace" fontWeight="700" opacity="0.45">α</text>
        <circle cx="24" cy="26" r="2" fill="rgba(255,0,60,0.3)" stroke="#ff003c" strokeWidth="0.7" />
        <circle cx="52" cy="26" r="2" fill="rgba(255,0,60,0.3)" stroke="#ff003c" strokeWidth="0.7" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">α</text>
      </g>
    </svg>
  )
}

/* 9 — CAP ONE BETA: identical to Alpha but cyan visor + antenna */
function Beta({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="CAP ONE BETA portrait">
      <BgGrad id={id} c1="#00203a" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#00f5ff" />
      <g transform={`scale(${S})`}>
        <path d="M0 44 H14 V54 M76 42 H62 V30" stroke="#00f5ff" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Wider helmet */}
        <path d="M18 38 Q19 10 38 8 Q57 10 58 38 V52 H18Z" fill="#00080e" stroke="#00f5ff" strokeWidth="1.3" filter={`url(#gf${id})`} />
        {/* Helmet panel lines */}
        <path d="M38 8 V52" stroke="#00f5ff" strokeWidth="0.5" opacity="0.2" />
        <path d="M27 12 Q38 10 49 12" stroke="#00f5ff" strokeWidth="0.5" opacity="0.2" fill="none" />
        {/* Cyan visor taller */}
        <rect x="20" y="30" width="36" height="10" rx="1.5" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
        <rect x="21" y="31" width="34" height="8" rx="1" fill="#00f5ff" opacity="0.45" />
        <line x1="21" y1="35" x2="55" y2="35" stroke="#00f5ff" strokeWidth="0.5" opacity="0.5" />
        {/* Visor glow */}
        <rect x="21" y="31" width="34" height="2" rx="0" fill="#80ffff" opacity="0.2" />
        {/* Chin guard wider */}
        <path d="M20 52 L24 60 H52 L56 52" fill="#00080e" stroke="#00f5ff" strokeWidth="1" />
        <line x1="20" y1="56" x2="56" y2="56" stroke="#00f5ff" strokeWidth="0.5" opacity="0.3" />
        {/* Antenna */}
        <line x1="38" y1="8" x2="38" y2="2" stroke="#00f5ff" strokeWidth="1.2" />
        <circle cx="38" cy="2" r="1.5" fill="#00f5ff" />
        {/* Antenna signal ring */}
        <circle cx="38" cy="2" r="3" fill="none" stroke="#00f5ff" strokeWidth="0.5" opacity="0.4" />
        {/* Side cables */}
        <path d="M18 38 Q12 40 10 46" stroke="#00f5ff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        <path d="M58 38 Q64 40 66 46" stroke="#00f5ff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        {/* Angular shoulder armor */}
        <polygon points="6,52 20,52 16,66 2,66" fill="rgba(0,245,255,0.06)" stroke="#00f5ff" strokeWidth="1" />
        <polygon points="70,52 56,52 60,66 74,66" fill="rgba(0,245,255,0.06)" stroke="#00f5ff" strokeWidth="1" />
        {/* Armor detail lines */}
        <line x1="6" y1="59" x2="18" y2="59" stroke="#00f5ff" strokeWidth="0.4" opacity="0.5" />
        <line x1="58" y1="59" x2="70" y2="59" stroke="#00f5ff" strokeWidth="0.4" opacity="0.5" />
        <text x="38" y="26" textAnchor="middle" fill="#00f5ff" fontSize="9" fontFamily="monospace" fontWeight="700" opacity="0.4">β</text>
        <text x="38" y="73" textAnchor="middle" fill="#00f5ff" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">β</text>
      </g>
    </svg>
  )
}

/* 10 — LEAD WEIGHT: massive wide head, heavy brow rivets, hulk shoulders */
function LeadWeight({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="LEAD WEIGHT portrait">
      <BgGrad id={id} c1="#300010" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#ff003c" />
      <g transform={`scale(${S})`}>
        <path d="M0 44 H10 V36 H22 M76 50 H64 V62" stroke="#ff003c" strokeWidth="0.6" opacity="0.28" fill="none" />
        {/* Massive wide head */}
        <ellipse cx="38" cy="34" rx="24" ry="20" fill="#0a0208" stroke="#ff003c" strokeWidth="1.4" filter={`url(#gf${id})`} />
        {/* Heavy brow plate */}
        <rect x="16" y="26" width="44" height="9" rx="2" fill="#140610" stroke="#ff003c" strokeWidth="1.1" />
        {/* Brow plate texture */}
        <line x1="16" y1="30" x2="60" y2="30" stroke="#ff003c" strokeWidth="0.5" opacity="0.25" />
        {/* Small eyes under heavy brow */}
        <circle cx="29" cy="36" r="3" fill="#ff003c" />
        <circle cx="29" cy="36" r="1.5" fill="#0a0208" />
        <circle cx="29" cy="36" r="0.7" fill="#ff003c" opacity="0.7" />
        <circle cx="47" cy="36" r="3" fill="#ff003c" />
        <circle cx="47" cy="36" r="1.5" fill="#0a0208" />
        <circle cx="47" cy="36" r="0.7" fill="#ff003c" opacity="0.7" />
        {/* Flat grim mouth */}
        <rect x="28" y="44" width="20" height="3" rx="1" fill="#ff003c" opacity="0.6" />
        {/* Teeth details */}
        <line x1="31" y1="44" x2="31" y2="47" stroke="#0a0208" strokeWidth="0.8" />
        <line x1="35" y1="44" x2="35" y2="47" stroke="#0a0208" strokeWidth="0.8" />
        <line x1="39" y1="44" x2="39" y2="47" stroke="#0a0208" strokeWidth="0.8" />
        <line x1="43" y1="44" x2="43" y2="47" stroke="#0a0208" strokeWidth="0.8" />
        {/* Rivet bolts on brow */}
        <circle cx="22" cy="30" r="1.5" fill="#ff003c" opacity="0.7" />
        <circle cx="32" cy="28" r="1.5" fill="#ff003c" opacity="0.7" />
        <circle cx="44" cy="28" r="1.5" fill="#ff003c" opacity="0.7" />
        <circle cx="54" cy="30" r="1.5" fill="#ff003c" opacity="0.7" />
        {/* Extra center rivet */}
        <circle cx="38" cy="27" r="2" fill="#ff003c" opacity="0.5" stroke="#ff003c" strokeWidth="0.8" />
        {/* Hulk wide shoulders */}
        <path d="M0 58 L8 48 H68 L76 58 L72 70 H4Z" fill="rgba(30,5,12,0.85)" stroke="#ff003c" strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="4" y1="58" x2="72" y2="58" stroke="#ff003c" strokeWidth="0.8" opacity="0.4" />
        <line x1="6" y1="64" x2="70" y2="64" stroke="#ff003c" strokeWidth="0.6" opacity="0.3" />
        {/* Shoulder armor panels */}
        <rect x="0" y="56" width="12" height="8" rx="1" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="0.7" />
        <rect x="64" y="56" width="12" height="8" rx="1" fill="rgba(255,0,60,0.08)" stroke="#ff003c" strokeWidth="0.7" />
        <text x="38" y="73" textAnchor="middle" fill="#ff003c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">LEAD</text>
      </g>
    </svg>
  )
}

/* 11 — THE MAINFRAME: rectangular face, circuit traces, cyan screen-eyes with scanlines */
function Mainframe({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="THE MAINFRAME portrait">
      <BgGrad id={id} c1="#002030" />
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      <CornerMarks c="#00f5ff" />
      <g transform={`scale(${S})`}>
        <path d="M0 40 H12 V32 H22 M76 48 H64 V38 H52" stroke="#00f5ff" strokeWidth="0.7" opacity="0.35" fill="none" />
        {/* Rectangular face */}
        <rect x="18" y="14" width="40" height="46" rx="4" fill="#020a10" stroke="#00f5ff" strokeWidth="1.2" filter={`url(#gf${id})`} />
        {/* Circuit traces — top */}
        <path d="M26 22 H18 M26 22 V30 H22 M50 22 H58 M50 22 V30 H54" stroke="#00f5ff" strokeWidth="0.7" opacity="0.55" fill="none" />
        {/* Circuit traces — middle */}
        <path d="M30 38 H22 M46 38 H54 M38 18 V14 M38 14 H44" stroke="#00f5ff" strokeWidth="0.7" opacity="0.4" fill="none" />
        {/* Circuit traces — additional */}
        <path d="M18 42 H24 M58 42 H52 M38 60 V56" stroke="#00f5ff" strokeWidth="0.6" opacity="0.3" fill="none" />
        {/* Node circles */}
        <circle cx="22" cy="30" r="1.5" fill="#00f5ff" opacity="0.6" />
        <circle cx="54" cy="30" r="1.5" fill="#00f5ff" opacity="0.6" />
        <circle cx="22" cy="38" r="1" fill="#00f5ff" opacity="0.5" />
        <circle cx="54" cy="38" r="1" fill="#00f5ff" opacity="0.5" />
        <circle cx="22" cy="42" r="1" fill="#00f5ff" opacity="0.4" />
        <circle cx="54" cy="42" r="1" fill="#00f5ff" opacity="0.4" />
        {/* Antenna */}
        <line x1="38" y1="14" x2="38" y2="6" stroke="#00f5ff" strokeWidth="1.2" />
        <circle cx="38" cy="6" r="2.5" fill="#00f5ff" opacity="0.7" />
        <line x1="34" y1="6" x2="42" y2="6" stroke="#00f5ff" strokeWidth="0.8" opacity="0.6" />
        {/* Screen-glow rectangular eyes with scanlines */}
        <rect x="24" y="28" width="12" height="8" rx="1" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
        <rect x="25" y="29" width="10" height="6" rx="0.5" fill="#00f5ff" opacity="0.6" />
        <line x1="25" y1="31" x2="35" y2="31" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
        <line x1="25" y1="33" x2="35" y2="33" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
        {/* Left eye glint */}
        <rect x="25" y="29" width="4" height="2" fill="#80ffff" rx="0" opacity="0.35" />
        <rect x="40" y="28" width="12" height="8" rx="1" fill="#020a10" stroke="#00f5ff" strokeWidth="1.1" />
        <rect x="41" y="29" width="10" height="6" rx="0.5" fill="#00f5ff" opacity="0.6" />
        <line x1="41" y1="31" x2="51" y2="31" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
        <line x1="41" y1="33" x2="51" y2="33" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
        {/* Right eye glint */}
        <rect x="41" y="29" width="4" height="2" fill="#80ffff" rx="0" opacity="0.35" />
        {/* Data stream mouth */}
        <rect x="26" y="44" width="24" height="3" rx="0.5" fill="rgba(0,245,255,0.15)" stroke="#00f5ff" strokeWidth="0.8" />
        <rect x="26" y="44" width="12" height="3" rx="0.5" fill="#00f5ff" opacity="0.5" />
        {/* Data flow segments in mouth */}
        <line x1="39" y1="44.5" x2="41" y2="44.5" stroke="#00f5ff" strokeWidth="0.8" opacity="0.4" />
        <line x1="43" y1="44.5" x2="46" y2="44.5" stroke="#00f5ff" strokeWidth="0.8" opacity="0.3" />
        {/* Server rack body */}
        <rect x="20" y="52" width="36" height="8" rx="1" fill="rgba(0,245,255,0.05)" stroke="#00f5ff" strokeWidth="0.8" />
        <line x1="20" y1="55" x2="56" y2="55" stroke="#00f5ff" strokeWidth="0.6" opacity="0.4" />
        <rect x="22" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.25" />
        <rect x="30" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.15" />
        <rect x="38" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.2" />
        <rect x="46" y="53" width="6" height="4" rx="0.5" fill="#00f5ff" opacity="0.1" />
        <text x="38" y="73" textAnchor="middle" fill="#00f5ff" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">MAIN</text>
      </g>
    </svg>
  )
}

/* 12 — THE APPLE BOSS: 5-pt crown, wide face, gold eyes, cape collar, gold glow border */
function Boss({ id }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-label="THE APPLE BOSS portrait">
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
        <filter id={`glow${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="100" height="100" fill={`url(#bg${id})`} />
      {/* Gold glow border */}
      <rect x="2" y="2" width="96" height="96" fill="none" stroke="#c9a84c" strokeWidth="2" opacity="0.35" filter={`url(#glow${id})`} />
      <CornerMarks c="#c9a84c" />
      <g transform={`scale(${S})`}>
        <path d="M0 52 H12 V40 H22 M76 52 H64 V40 H54 M38 76 V68 M38 0 V8" stroke="#c9a84c" strokeWidth="0.7" opacity="0.3" fill="none" />
        {/* Crown base */}
        <rect x="18" y="13" width="40" height="7" rx="1" fill="#12090a" stroke="#c9a84c" strokeWidth="1.2" />
        {/* Crown points 5 spikes */}
        <polygon points="20,13 20,4 25,9 30,1 35,9 38,3 41,9 46,1 51,9 56,4 56,13" fill={`url(#crown${id})`} stroke="#c9a84c" strokeWidth="1" strokeLinejoin="round" />
        {/* Crown detail lines */}
        <line x1="25" y1="13" x2="25" y2="9" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
        <line x1="35" y1="13" x2="35" y2="9" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
        <line x1="41" y1="13" x2="41" y2="9" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
        <line x1="51" y1="13" x2="51" y2="9" stroke="#c9a84c" strokeWidth="0.5" opacity="0.4" />
        {/* Crown jewels */}
        <circle cx="30" cy="6" r="2" fill="#ff003c" stroke="#c9a84c" strokeWidth="0.7" />
        <circle cx="38" cy="4" r="2.5" fill="#00f5ff" stroke="#c9a84c" strokeWidth="0.7" />
        <circle cx="46" cy="6" r="2" fill="#ff003c" stroke="#c9a84c" strokeWidth="0.7" />
        {/* Crown gem glints */}
        <circle cx="29" cy="5.5" r="0.6" fill="#fff" opacity="0.6" />
        <circle cx="37" cy="3.5" r="0.7" fill="#fff" opacity="0.6" />
        <circle cx="45" cy="5.5" r="0.6" fill="#fff" opacity="0.6" />
        {/* Wide imposing face */}
        <ellipse cx="38" cy="36" rx="20" ry="20" fill="#0c080a" stroke="#c9a84c" strokeWidth="1.4" filter={`url(#gf${id})`} />
        {/* Cheek bone detail */}
        <path d="M18 36 Q18 46 22 50" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" fill="none" />
        <path d="M58 36 Q58 46 54 50" stroke="#c9a84c" strokeWidth="0.6" opacity="0.2" fill="none" />
        {/* Power eyes — gold */}
        <rect x="24" y="30" width="11" height="7" rx="1" fill="#100c04" stroke="#c9a84c" strokeWidth="1.2" />
        <rect x="25" y="31" width="9" height="5" rx="0.5" fill="#c9a84c" opacity="0.7" />
        <rect x="41" y="30" width="11" height="7" rx="1" fill="#100c04" stroke="#c9a84c" strokeWidth="1.2" />
        <rect x="42" y="31" width="9" height="5" rx="0.5" fill="#c9a84c" opacity="0.7" />
        {/* Eye glints */}
        <rect x="25" y="31" width="3" height="2" rx="0" fill="#ffe080" opacity="0.5" />
        <rect x="42" y="31" width="3" height="2" rx="0" fill="#ffe080" opacity="0.5" />
        {/* Strong bridge brow */}
        <path d="M22 28 Q38 22 54 28" stroke="#c9a84c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Prominent nose */}
        <path d="M35 38 V46 H41 V38" stroke="#c9a84c" strokeWidth="1.1" fill="rgba(8,6,4,0.7)" />
        {/* Stern commanding mouth */}
        <path d="M26 52 Q38 55 50 52" stroke="#c9a84c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Chin cleft */}
        <line x1="38" y1="55" x2="38" y2="58" stroke="#c9a84c" strokeWidth="0.7" opacity="0.3" />
        {/* Imposing wide cape collar */}
        <path d="M4 64 L14 50 H24 L38 58 L52 50 H62 L72 64 Q52 58 38 62 Q24 58 4 64Z" fill="rgba(20,14,4,0.9)" stroke="#c9a84c" strokeWidth="1.3" strokeLinejoin="round" />
        {/* Collar detail */}
        <line x1="4" y1="64" x2="38" y2="59" stroke="#c9a84c" strokeWidth="0.5" opacity="0.25" />
        <line x1="72" y1="64" x2="38" y2="59" stroke="#c9a84c" strokeWidth="0.5" opacity="0.25" />
        <text x="38" y="57" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="monospace" fontWeight="700" opacity="0.4">⌘</text>
        <circle cx="38" cy="4" r="1.5" fill="white" opacity="0.5" />
        <text x="38" y="73" textAnchor="middle" fill="#c9a84c" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">BOSS</text>
      </g>
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
