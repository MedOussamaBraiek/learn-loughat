import type { SceneKind } from '../data/scenes';

// Cartoon artwork for the picture games. Everything is drawn on a 420 x 520 canvas,
// matching the coordinates in data/scenes.ts.
const SKIN = '#f6d2b0';

function Head() {
  return (
    <g>
      <rect x={200} y={104} width={20} height={22} fill={SKIN} />
      <circle cx={210} cy={70} r={38} fill={SKIN} />
      <circle cx={172} cy={74} r={9} fill={SKIN} />
      <circle cx={248} cy={74} r={9} fill={SKIN} />
      <circle cx={198} cy={68} r={4} fill="#333" />
      <circle cx={222} cy={68} r={4} fill="#333" />
      <path d="M210 74 q-4 10 2 12" stroke="#c98a6b" strokeWidth={2} fill="none" />
      <path d="M199 92 q11 8 22 0" stroke="#b5484d" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M172 58 q2 -34 38 -36 q40 0 40 36 q-14 -18 -38 -18 q-22 0 -40 18z" fill="#2d2d2d" />
    </g>
  );
}

function Person({ clothed }: { clothed: boolean }) {
  return (
    <g>
      {/* legs and lower body */}
      {clothed ? (
        <>
          <line x1={186} y1={300} x2={182} y2={468} stroke="#2b4c8c" strokeWidth={36} strokeLinecap="round" />
          <line x1={234} y1={300} x2={238} y2={468} stroke="#2b4c8c" strokeWidth={36} strokeLinecap="round" />
          <ellipse cx={176} cy={482} rx={24} ry={12} fill="#2b2b2b" />
          <ellipse cx={244} cy={482} rx={24} ry={12} fill="#2b2b2b" />
          <rect x={160} y={250} width={100} height={70} rx={8} fill="#2b4c8c" />
        </>
      ) : (
        <>
          <line x1={186} y1={300} x2={182} y2={440} stroke={SKIN} strokeWidth={34} strokeLinecap="round" />
          <line x1={234} y1={300} x2={238} y2={440} stroke={SKIN} strokeWidth={34} strokeLinecap="round" />
          <ellipse cx={176} cy={486} rx={18} ry={9} fill={SKIN} />
          <ellipse cx={244} cy={486} rx={18} ry={9} fill={SKIN} />
          <rect x={160} y={250} width={100} height={70} rx={10} fill="#2f6fd6" />
        </>
      )}

      {/* arms (drawn before the torso so the shoulders blend in) */}
      <line x1={166} y1={140} x2={122} y2={262} stroke={clothed ? '#8b5e3c' : SKIN} strokeWidth={clothed ? 28 : 24} strokeLinecap="round" />
      <line x1={254} y1={140} x2={298} y2={262} stroke={clothed ? '#8b5e3c' : SKIN} strokeWidth={clothed ? 28 : 24} strokeLinecap="round" />

      {/* torso */}
      {clothed ? (
        <>
          <rect x={152} y={120} width={116} height={140} rx={22} fill="#8b5e3c" />
          <line x1={210} y1={130} x2={210} y2={256} stroke="#5a3b22" strokeWidth={3} />
        </>
      ) : (
        <rect x={158} y={122} width={104} height={134} rx={22} fill="#ffffff" stroke="#9fb3cc" strokeWidth={2} />
      )}

      <Head />

      {/* hands */}
      {clothed ? <circle cx={118} cy={276} r={13} fill="#f2c230" /> : <circle cx={118} cy={276} r={12} fill={SKIN} />}
      <circle cx={302} cy={276} r={12} fill={SKIN} />

      {clothed && (
        <>
          <rect x={158} y={248} width={104} height={10} fill="#3b2a1e" />
          <rect x={190} y={112} width={40} height={14} rx={6} fill="#e4572e" />
          <rect x={220} y={120} width={12} height={32} rx={4} fill="#e4572e" />
          <ellipse cx={210} cy={38} rx={56} ry={8} fill="#c0392b" />
          <path d="M170 38 Q172 4 210 2 Q248 4 250 38 Z" fill="#c0392b" />
          <rect x={290} y={300} width={30} height={34} rx={6} fill="#9b59b6" />
          <path d="M296 300 q9 -18 18 0" stroke="#7d3c98" strokeWidth={3} fill="none" />
        </>
      )}
    </g>
  );
}

function FemalePerson() {
  return (
    <g>
      {/* long hair behind the head */}
      <path d="M164 74 Q158 26 210 26 Q262 26 256 74 L266 170 Q250 178 240 160 L180 160 Q170 178 154 170 Z" fill="#6b3e26" />

      {/* arms with short sleeves */}
      <line x1={172} y1={140} x2={134} y2={246} stroke="#e84393" strokeWidth={22} strokeLinecap="round" />
      <line x1={248} y1={140} x2={286} y2={246} stroke="#e84393" strokeWidth={22} strokeLinecap="round" />

      {/* dress: fitted bodice, flared skirt */}
      <path d="M170 124 L250 124 Q258 180 254 230 L300 470 L120 470 L166 230 Q162 180 170 124 Z" fill="#e84393" />
      <path d="M170 124 Q210 140 250 124" stroke="#b3216f" strokeWidth={3} fill="none" />

      {/* shoes peeking out */}
      <ellipse cx={172} cy={478} rx={16} ry={7} fill="#2b2b2b" />
      <ellipse cx={248} cy={478} rx={16} ry={7} fill="#2b2b2b" />

      {/* neck and face */}
      <rect x={200} y={104} width={20} height={22} fill={SKIN} />
      <circle cx={210} cy={70} r={38} fill={SKIN} />
      <circle cx={172} cy={74} r={9} fill={SKIN} />
      <circle cx={248} cy={74} r={9} fill={SKIN} />
      <circle cx={198} cy={68} r={4} fill="#333" />
      <circle cx={222} cy={68} r={4} fill="#333" />
      <path d="M210 74 q-4 10 2 12" stroke="#c98a6b" strokeWidth={2} fill="none" />
      <path d="M199 92 q11 8 22 0" stroke="#b5484d" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M172 62 Q176 32 210 30 Q246 32 248 62 Q232 46 210 46 Q188 46 172 62 Z" fill="#6b3e26" />

      {/* hands */}
      <circle cx={134} cy={256} r={11} fill={SKIN} />
      <circle cx={286} cy={256} r={11} fill={SKIN} />

      {/* belt, necklace, earrings */}
      <rect x={166} y={222} width={88} height={10} rx={3} fill="#5a3b22" />
      <path d="M182 118 Q210 138 238 118" stroke="#d4a017" strokeWidth={3} fill="none" />
      <circle cx={210} cy={136} r={3} fill="#d4a017" />
      <circle cx={250} cy={86} r={4} fill="#d4a017" />

      {/* hat */}
      <ellipse cx={210} cy={30} rx={60} ry={8} fill="#f4d03f" />
      <path d="M176 30 Q178 2 210 0 Q242 2 244 30 Z" fill="#f4d03f" />

      {/* handbag */}
      <rect x={290} y={300} width={30} height={34} rx={6} fill="#9b59b6" />
      <path d="M296 300 q9 -18 18 0" stroke="#7d3c98" strokeWidth={3} fill="none" />
    </g>
  );
}

function House() {
  return (
    <g>
      {/* roof and walls */}
      <polygon points="56,150 210,40 364,150" fill="#c0392b" />
      <rect x={80} y={150} width={260} height={340} fill="#fff6e5" stroke="#8a6d4b" strokeWidth={3} />
      <line x1={80} y1={320} x2={340} y2={320} stroke="#8a6d4b" strokeWidth={3} />
      <line x1={200} y1={150} x2={200} y2={490} stroke="#8a6d4b" strokeWidth={3} />
      <rect x={40} y={490} width={340} height={12} rx={4} fill="#7bc36a" />

      {/* kitchen */}
      <rect x={100} y={185} width={40} height={40} fill="#bfe6ff" stroke="#8a6d4b" strokeWidth={2} />
      <rect x={90} y={240} width={24} height={78} fill="#a0703c" />
      <rect x={120} y={260} width={70} height={10} rx={3} fill="#9aa5b1" />

      {/* living room */}
      <line x1={270} y1={150} x2={270} y2={172} stroke="#8a6d4b" strokeWidth={2} />
      <circle cx={270} cy={180} r={8} fill="#ffd54a" stroke="#c9a400" strokeWidth={2} />
      <rect x={240} y={262} width={60} height={8} rx={2} fill="#a0703c" />
      <line x1={246} y1={270} x2={246} y2={300} stroke="#a0703c" strokeWidth={3} />
      <line x1={294} y1={270} x2={294} y2={300} stroke="#a0703c" strokeWidth={3} />
      <rect x={304} y={266} width={18} height={6} rx={2} fill="#d98b48" />
      <rect x={304} y={246} width={4} height={22} fill="#d98b48" />

      {/* bedroom */}
      <rect x={96} y={386} width={6} height={36} fill="#8a6d4b" />
      <rect x={100} y={400} width={80} height={22} rx={4} fill="#6fa8dc" />
      <rect x={150} y={340} width={40} height={50} fill="#d9b382" stroke="#8a6d4b" strokeWidth={2} />

      {/* bathroom */}
      <rect x={220} y={450} width={80} height={26} rx={10} fill="#e8f4ff" stroke="#8a9fb5" strokeWidth={2} />
    </g>
  );
}

export function SceneArt({ kind }: { kind: SceneKind }) {
  return (
    <svg className="scene-art" viewBox="0 0 420 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width={420} height={520} rx={20} fill="#eef7ff" />
      <ellipse cx={210} cy={504} rx={150} ry={10} fill="#cfe8ff" />
      {kind === 'house' && <House />}
      {kind === 'clothes' && <Person clothed />}
      {kind === 'clothes-female' && <FemalePerson />}
      {kind === 'body' && <Person clothed={false} />}
    </svg>
  );
}
