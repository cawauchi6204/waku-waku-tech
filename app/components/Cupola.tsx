// Spacecraft cupola interior drawn over the WebGL scene. Its visibility, scale and
// parallax are driven by CSS variables that SpaceJourney writes every frame.

const WINDOW =
  "M410 250Q800 214 1190 250Q1250 256 1226 306L1086 660Q1069 696 1030 698Q800 706 570 698Q531 696 514 660L374 306Q350 256 410 250Z"
const FRAME =
  "M388 204Q800 162 1212 204Q1302 214 1266 292L1116 690Q1093 744 1036 747Q800 757 564 747Q507 744 484 690L334 292Q298 214 388 204Z"
const SIDE_L = "M-40 610Q30 575 88 632L250 940H-40Z"
const SIDE_R = "M1640 610Q1570 575 1512 632L1350 940H1640Z"

// Rivets along the centre line of the frame ring.
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const bolts = [
  ...Array.from({ length: 11 }, (_, i) => {
    const x = 420 + i * 76
    return { x, y: 207 + 20 * ((x - 800) / 380) ** 2 }
  }),
  ...Array.from({ length: 5 }, (_, i) => ({ x: lerp(360, 496, (i + 1) / 6), y: lerp(300, 672, (i + 1) / 6) })),
  ...Array.from({ length: 5 }, (_, i) => ({ x: lerp(1240, 1104, (i + 1) / 6), y: lerp(300, 672, (i + 1) / 6) })),
  ...Array.from({ length: 7 }, (_, i) => ({ x: 560 + i * 80, y: 723 })),
]

export default function Cupola() {
  return (
    <div className="cupola" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cp-panel" cx="50%" cy="52%" r="70%">
            <stop offset="0" stopColor="#141a21" />
            <stop offset=".45" stopColor="#0a0d11" />
            <stop offset="1" stopColor="#020304" />
          </radialGradient>
          <linearGradient id="cp-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#252c34" />
            <stop offset=".5" stopColor="#12161b" />
            <stop offset="1" stopColor="#07090b" />
          </linearGradient>
          <linearGradient id="cp-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d7c93" stopOpacity=".5" />
            <stop offset=".5" stopColor="#1c232c" stopOpacity=".2" />
            <stop offset=".8" stopColor="#c06a8a" stopOpacity=".55" />
            <stop offset="1" stopColor="#6fb4ff" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="cp-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".06" />
            <stop offset=".35" stopColor="#fff" stopOpacity="0" />
            <stop offset=".7" stopColor="#9cc8ff" stopOpacity=".03" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cp-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0c0f13" />
            <stop offset=".5" stopColor="#3a4450" />
            <stop offset="1" stopColor="#0c0f13" />
          </linearGradient>
          <filter id="cp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="cp-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* hull panel with the viewports cut out */}
        <path
          fillRule="evenodd"
          fill="url(#cp-panel)"
          d={`M-200 -200H1800V1100H-200Z ${FRAME} ${SIDE_L} ${SIDE_R}`}
        />
        {/* frame body */}
        <path fillRule="evenodd" fill="url(#cp-frame)" d={`${FRAME} ${WINDOW}`} />
        <path d={FRAME} fill="none" stroke="#2c343e" strokeWidth="2" />
        <path d={WINDOW} fill="none" stroke="url(#cp-rim)" strokeWidth="5" filter="url(#cp-soft)" />
        <path d={WINDOW} fill="none" stroke="#000" strokeWidth="2" />
        <path d={WINDOW} fill="url(#cp-glass)" />

        {/* side viewports */}
        <path d={SIDE_L} fill="none" stroke="#1c232b" strokeWidth="26" />
        <path d={SIDE_L} fill="none" stroke="#6fb4ff" strokeOpacity=".35" strokeWidth="2" />
        <path d={SIDE_R} fill="none" stroke="#1c232b" strokeWidth="26" />
        <path d={SIDE_R} fill="none" stroke="#6fb4ff" strokeOpacity=".5" strokeWidth="2" />

        {/* bolts around the frame */}
        {bolts.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r="4.5" fill="#07090b" />
            <circle cx={b.x - 1} cy={b.y - 1} r="2.2" fill="#3b4550" />
          </g>
        ))}

        {/* handrails */}
        <g transform="rotate(-24 250 420)">
          <rect x="226" y="300" width="30" height="250" rx="15" fill="url(#cp-metal)" />
          <rect x="214" y="290" width="54" height="30" rx="8" fill="#161b21" />
          <rect x="214" y="532" width="54" height="30" rx="8" fill="#161b21" />
        </g>
        <g transform="rotate(22 1360 440)">
          <rect x="1344" y="330" width="26" height="220" rx="13" fill="url(#cp-metal)" />
        </g>

        {/* status light strips */}
        <line x1="1420" y1="360" x2="1340" y2="610" stroke="#6fb4ff" strokeWidth="14" filter="url(#cp-glow)" opacity=".7" />
        <line x1="1420" y1="360" x2="1340" y2="610" stroke="#d6ecff" strokeWidth="3" strokeLinecap="round" />
        <line x1="178" y1="380" x2="238" y2="560" stroke="#6fb4ff" strokeWidth="10" filter="url(#cp-glow)" opacity=".35" />

        {/* labels, switches, the little red tag */}
        <g fill="#c9d1da" opacity=".38">
          <rect x="360" y="660" width="54" height="18" rx="2" transform="rotate(-18 387 669)" />
          <rect x="720" y="730" width="96" height="16" rx="2" />
          <rect x="1180" y="735" width="40" height="14" rx="2" />
          <rect x="1480" y="660" width="56" height="20" rx="2" transform="rotate(20 1508 670)" />
          <rect x="380" y="800" width="60" height="70" rx="3" transform="rotate(-14 410 835)" />
        </g>
        <g fill="#2a323b">
          <circle cx="1400" cy="800" r="26" />
          <circle cx="1460" cy="830" r="18" />
          <rect x="1130" y="780" width="70" height="46" rx="6" />
          <rect x="600" y="780" width="46" height="30" rx="4" />
        </g>
        <rect x="788" y="672" width="24" height="24" rx="2" fill="#d2542a" />
        <rect x="797" y="690" width="6" height="30" fill="#8a3418" />
      </svg>
    </div>
  )
}
