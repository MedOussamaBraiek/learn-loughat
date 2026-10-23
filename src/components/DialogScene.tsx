import type { DialogPlace } from '../data/dialogs';

const SKIN = '#f3c9a3';

function CafeArt() {
  return (
    <g>
      <rect width={1440} height={900} fill="#fff3e2" />
      <rect y={672} width={1440} height={228} fill="#e6c9a6" />
      <rect y={664} width={1440} height={18} fill="#cfae86" />

      <rect x={430} y={140} width={300} height={340} rx={26} fill="#cfe9ff" stroke="#b08050" strokeWidth={16} />
      <line x1={580} y1={140} x2={580} y2={480} stroke="#b08050" strokeWidth={10} />
      <line x1={430} y1={310} x2={730} y2={310} stroke="#b08050" strokeWidth={10} />
      <circle cx={525} cy={215} r={34} fill="#ffe08a" />
      <ellipse cx={655} cy={235} rx={48} ry={20} fill="#fff" opacity={0.85} />
      <rect x={412} y={476} width={336} height={18} rx={9} fill="#b08050" />

      <rect x={800} y={150} width={300} height={252} rx={18} fill="#2f2a26" stroke="#8a6240" strokeWidth={14} />
      <text x={950} y={210} textAnchor="middle" fontSize={34} fontWeight={800} fill="#f6e3c8" letterSpacing={4}>
        MENÜ
      </text>
      <line x1={836} y1={244} x2={1064} y2={244} stroke="#fff" strokeWidth={6} opacity={0.6} strokeLinecap="round" />
      <line x1={836} y1={288} x2={1064} y2={288} stroke="#fff" strokeWidth={6} opacity={0.6} strokeLinecap="round" />
      <line x1={836} y1={332} x2={1000} y2={332} stroke="#fff" strokeWidth={6} opacity={0.6} strokeLinecap="round" />

      <line x1={620} y1={0} x2={620} y2={130} stroke="#7a5a3a" strokeWidth={6} />
      <path d="M578 130 h84 l-16 40 h-52 z" fill="#ffb74d" />
      <circle cx={620} cy={188} r={14} fill="#ffe08a" opacity={0.8} />
      <line x1={880} y1={0} x2={880} y2={96} stroke="#7a5a3a" strokeWidth={6} />
      <path d="M844 96 h72 l-14 34 h-44 z" fill="#ffb74d" />
      <circle cx={880} cy={146} r={12} fill="#ffe08a" opacity={0.8} />

      <rect x={460} y={590} width={520} height={220} rx={10} fill="#8d5a3b" />
      <rect x={442} y={564} width={556} height={34} rx={14} fill="#6f4428" />
      <rect x={620} y={466} width={132} height={98} rx={12} fill="#4a4a4a" />
      <rect x={638} y={558} width={96} height={16} rx={5} fill="#cfcfcf" />
      <rect x={646} y={486} width={20} height={20} rx={4} fill="#ff9600" />
      <rect x={698} y={486} width={20} height={20} rx={4} fill="#58cc02" />
      <path d="M778 572 h40 l-6 26 h-28 z" fill="#fff" stroke="#d9c3a5" strokeWidth={4} />
      <path d="M852 572 h40 l-6 26 h-28 z" fill="#fff" stroke="#d9c3a5" strokeWidth={4} />

      <g>
        <rect x={1180} y={300} width={150} height={110} rx={10} fill="#fff" stroke="#b08050" strokeWidth={10} />
        <path d="M1210 400 l30 -46 l22 30 l18 -22 l26 38 z" fill="#9bc99b" />
        <circle cx={1290} cy={336} r={12} fill="#ffe08a" />
      </g>

      <g>
        <rect x={92} y={470} width={120} height={120} rx={16} fill="#e6b48a" />
        <path d="M152 470 q-58 -8 -68 -74 q54 -6 68 40 q16 -50 76 -36 q-4 70 -76 70 z" fill="#5aa85a" />
      </g>
    </g>
  );
}

function StreetArt() {
  const windows = [
    [40, 300], [120, 300], [40, 400], [120, 400],
    [1060, 260], [1140, 260], [1220, 260], [1060, 360], [1140, 360], [1220, 360],
  ];
  return (
    <g>
      <rect width={1440} height={900} fill="#cfe6ff" />
      <circle cx={1180} cy={150} r={74} fill="#ffe08a" />
      <ellipse cx={260} cy={160} rx={96} ry={34} fill="#fff" opacity={0.85} />
      <ellipse cx={330} cy={140} rx={60} ry={26} fill="#fff" opacity={0.85} />

      <rect x={0} y={220} width={420} height={420} fill="#c4d2e0" />
      <rect x={1020} y={180} width={420} height={460} fill="#b3c4d6" />
      {windows.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={54} height={54} rx={6} fill="#eaf3fb" />
      ))}

      <rect y={640} width={1440} height={44} fill="#c9ced4" />
      <rect y={684} width={1440} height={216} fill="#8d99a6" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={516 + i * 54} y={700} width={28} height={200} fill="#fff" opacity={0.85} />
      ))}

      <rect x={470} y={380} width={20} height={304} fill="#5b6673" />
      <rect x={420} y={300} width={120} height={150} rx={22} fill="#3a3f45" />
      <circle cx={480} cy={340} r={18} fill="#ff5b5b" />
      <circle cx={480} cy={392} r={18} fill="#ffce54" />
      <circle cx={480} cy={444} r={18} fill="#58cc02" />

      <rect x={980} y={420} width={18} height={264} fill="#5b6673" />
      <rect x={930} y={330} width={180} height={72} rx={14} fill="#1cb0f6" />
      <path
        d="M972 366 h84 m-22 -20 l22 20 l-22 20"
        stroke="#fff"
        strokeWidth={9}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g>
        <rect x={180} y={520} width={18} height={164} fill="#7a5a3a" />
        <circle cx={189} cy={470} r={70} fill="#5aa85a" />
        <circle cx={140} cy={510} r={46} fill="#4d9a4d" />
        <circle cx={238} cy={510} r={46} fill="#4d9a4d" />
      </g>
    </g>
  );
}

function ShopArt() {
  return (
    <g>
      <rect width={1440} height={900} fill="#f6ecff" />
      <rect y={700} width={1440} height={200} fill="#e3d1f2" />

      <rect x={400} y={220} width={640} height={520} rx={22} fill="#fff" />
      <rect x={400} y={186} width={640} height={74} fill="#ce82ff" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={400 + i * 80} y={186} width={40} height={74} fill="#f3e3ff" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={420 + i * 80} cy={260} r={20} fill={i % 2 === 0 ? '#ce82ff' : '#f3e3ff'} />
      ))}

      <rect x={450} y={330} width={300} height={300} rx={14} fill="#eaf6ff" stroke="#d9c3e8" strokeWidth={10} />
      <path d="M540 360 h40 l24 96 h-88 z" fill="#ce82ff" />
      <rect x={610} y={372} width={52} height={48} rx={8} fill="#1cb0f6" />
      <rect x={676} y={384} width={54} height={40} rx={8} fill="#ff9600" />
      <rect x={478} y={500} width={240} height={16} rx={8} fill="#d9c3e8" />

      <rect x={800} y={330} width={190} height={290} rx={14} fill="#d9b8f0" />
      <circle cx={958} cy={486} r={9} fill="#7a5a3a" />
      <rect x={830} y={360} width={130} height={180} rx={10} fill="#e9d6f7" />

      <rect x={600} y={92} width={240} height={72} rx={18} fill="#ce82ff" />
      <text x={720} y={142} textAnchor="middle" fontSize={40} fontWeight={800} fill="#fff" letterSpacing={4}>
        SHOP
      </text>

      <g>
        <rect x={1220} y={620} width={120} height={110} rx={16} fill="#e6b48a" />
        <path d="M1280 620 q-58 -8 -68 -74 q54 -6 68 40 q16 -50 76 -36 q-4 70 -76 70 z" fill="#5aa85a" />
      </g>
    </g>
  );
}

export function SceneBackdrop({ place }: { place: DialogPlace }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {place === 'cafe' && <CafeArt />}
      {place === 'street' && <StreetArt />}
      {place === 'shop' && <ShopArt />}
    </svg>
  );
}

interface PersonSpriteProps {
  side: 'left' | 'right';
  name: string;
  shirt: string;
  hair: string;
}

export function PersonSprite({ side, name, shirt, hair }: PersonSpriteProps) {
  const tagW = Math.max(96, name.length * 13 + 34);
  return (
    <svg viewBox="0 0 220 340" className={`dialog-person ${side}`} aria-hidden="true">
      <path
        d="M36 340 L52 252 Q58 212 110 212 Q162 212 168 252 L184 340 Z"
        fill={shirt}
      />
      <path d="M92 214 Q110 232 128 214" stroke="rgba(0,0,0,0.12)" strokeWidth={6} fill="none" />
      <rect x={100} y={196} width={20} height={30} rx={8} fill={SKIN} />
      <circle cx={110} cy={158} r={52} fill={SKIN} />
      <path
        d="M58 158 Q56 102 110 100 Q164 102 162 158 Q146 126 110 126 Q74 126 58 158 Z"
        fill={hair}
      />
      <circle cx={92} cy={160} r={6} fill="#3a3a3a" />
      <circle cx={128} cy={160} r={6} fill="#3a3a3a" />
      <path
        d="M94 180 Q110 194 126 180"
        stroke="#c0565b"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      <rect x={110 - tagW / 2} y={250} width={tagW} height={34} rx={17} fill="#fff" opacity={0.95} />
      <text x={110} y={274} textAnchor="middle" fontSize={18} fontWeight={800} fill="#5b6673">
        {name}
      </text>
    </svg>
  );
}
