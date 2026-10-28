import type { ComponentType, ReactNode } from 'react';
import {
  IconActivityHeartbeat,
  IconAdjustments,
  IconAlarm,
  IconAlertCircle,
  IconAlphabetLatin,
  IconApple,
  IconArrowBigDown,
  IconArrowBigUp,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowNarrowRightDashed,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconArrowsExchange2,
  IconArrowsLeftRight,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconArrowsShuffle,
  IconBackpack,
  IconBallBasketball,
  IconBallFootball,
  IconBallTennis,
  IconBallVolleyball,
  IconBalloon,
  IconBanana,
  IconBandage,
  IconBarbell,
  IconBasket,
  IconBeach,
  IconBed,
  IconBike,
  IconBolt,
  IconBook,
  IconBooks,
  IconBottle,
  IconBrain,
  IconBread,
  IconBriefcase,
  IconBuildingBank,
  IconBuildingChurch,
  IconBuildingCommunity,
  IconBuildingFactory2,
  IconBuildingHospital,
  IconBuildingMonument,
  IconBuildingSkyscraper,
  IconBuildingStadium,
  IconBuildings,
  IconBus,
  IconBusStop,
  IconCake,
  IconCat,
  IconCakeRoll,
  IconCalendar,
  IconCalendarEvent,
  IconCalendarMonth,
  IconCalendarStats,
  IconCalendarWeek,
  IconCar,
  IconCarrot,
  IconCashBanknote,
  IconCertificate,
  IconChartBar,
  IconCheese,
  IconClipboardCheck,
  IconClipboardList,
  IconClock,
  IconClock12,
  IconCloud,
  IconCloudFog,
  IconCloudRain,
  IconCloudStorm,
  IconClover,
  IconCoffee,
  IconColumns2,
  IconCompass,
  IconConfetti,
  IconCornerUpRight,
  IconCrown,
  IconCrystalBall,
  IconCurrencyEuro,
  IconDeviceGamepad2,
  IconDeviceMobile,
  IconDiamond,
  IconDog,
  IconDoorEnter,
  IconDroplet,
  IconEPassport,
  IconEgg,
  IconFaceMask,
  IconFileCv,
  IconFish,
  IconFlame,
  IconFlower,
  IconFountain,
  IconGhost,
  IconGift,
  IconGlass,
  IconGlassCocktail,
  IconGlassFull,
  IconHandFingerRight,
  IconHandStop,
  IconHandTwoFingers,
  IconHanger,
  IconHash,
  IconHeart,
  IconHeartHandshake,
  IconHelpCircle,
  IconHome,
  IconHorse,
  IconHotelService,
  IconHourglass,
  IconIdBadge,
  IconJumpRope,
  IconKey,
  IconLink,
  IconListNumbers,
  IconLuggage,
  IconMail,
  IconMap,
  IconMapPin,
  IconMasksTheater,
  IconMeat,
  IconMedal,
  IconMessageDots,
  IconMicrophone,
  IconMilk,
  IconMoodAngry,
  IconMoodCrazyHappy,
  IconMoodCry,
  IconMoodHappy,
  IconMoodNervous,
  IconMoodSad,
  IconMoodSick,
  IconMoodSmile,
  IconMoodTongue,
  IconMoon,
  IconMoonStars,
  IconMotorbike,
  IconMountain,
  IconMovie,
  IconMusic,
  IconNews,
  IconNurse,
  IconPalette,
  IconPencil,
  IconPhoto,
  IconPig,
  IconPill,
  IconPills,
  IconPlane,
  IconPlaneArrival,
  IconPlaneDeparture,
  IconPlaylist,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconPlus,
  IconPool,
  IconPrescription,
  IconPuzzle,
  IconRainbow,
  IconRoad,
  IconRoute,
  IconRoute2,
  IconRun,
  IconScale,
  IconSchool,
  IconScissors,
  IconScript,
  IconSearch,
  IconShip,
  IconShoppingBag,
  IconShoppingCart,
  IconSnowflake,
  IconSofa,
  IconSparkles,
  IconSpeakerphone,
  IconStairsDown,
  IconStairsUp,
  IconStar,
  IconStethoscope,
  IconStopwatch,
  IconBulb,
  IconSun,
  IconSunWind,
  IconSunrise,
  IconSunset,
  IconSwimming,
  IconTarget,
  IconTeapot,
  IconTemperatureSnow,
  IconThermometer,
  IconTicket,
  IconTie,
  IconTool,
  IconToolsKitchen2,
  IconTrafficLights,
  IconTrain,
  IconTree,
  IconTrendingDown,
  IconTrendingUp,
  IconTrophy,
  IconUser,
  IconUserCircle,
  IconUserPlus,
  IconUsersGroup,
  IconVirus,
  IconWalk,
  IconWaveSine,
  IconWind,
  IconZzz,
} from '@tabler/icons-react';

type Glyph = ComponentType<{ size?: number; stroke?: number; color?: string; className?: string }>;

const emojiIcons: Record<string, Glyph> = {
  '🎉': IconConfetti,
  '🎂': IconCake,
  '🎁': IconGift,
  '🍰': IconCakeRoll,
  '🥤': IconGlassFull,
  '💌': IconMail,
  '🙋': IconUserPlus,
  '🎈': IconBalloon,
  '🎵': IconMusic,
  '🎶': IconPlaylist,
  '💃': IconWalk,
  '🥳': IconGlassCocktail,
  '🎤': IconMicrophone,
  '😂': IconMoodCrazyHappy,

  '🏅': IconBallBasketball,
  '⚽': IconBallFootball,
  '🏐': IconBallVolleyball,
  '🎮': IconDeviceGamepad2,
  '👥': IconUsersGroup,
  '🏋️': IconBarbell,
  '🏆': IconTrophy,
  '🥇': IconMedal,
  '🤸': IconBuildingStadium,
  '🏊': IconPool,
  '🏃': IconRun,
  '🤾': IconJumpRope,
  '📉': IconTrendingDown,
  '🎾': IconBallTennis,

  '💪': IconActivityHeartbeat,
  '🤒': IconMoodSick,
  '🧑‍⚕️': IconStethoscope,
  '👩‍⚕️': IconNurse,
  '💊': IconPill,
  '🌡️': IconThermometer,
  '😷': IconFaceMask,
  '🤧': IconDroplet,
  '🥶': IconTemperatureSnow,
  '🦠': IconVirus,
  '🤕': IconBandage,
  '🏥': IconBuildingHospital,
  '📝': IconPencil,
  '💚': IconHeart,

  '🍞': IconBread,
  '🧀': IconCheese,
  '🥛': IconMilk,
  '🥚': IconEgg,
  '🍎': IconBasket,
  '🥦': IconCarrot,
  '🍏': IconApple,
  '🍌': IconBanana,
  '🍖': IconMeat,
  '🐟': IconFish,
  '☕': IconCoffee,
  '🍵': IconTeapot,
  '💧': IconDroplet,
  '🧃': IconBottle,
  '🐶': IconDog,
  '🐱': IconCat,
  '🐴': IconHorse,
  '🐷': IconPig,
  '🚢': IconShip,
  '🏍️': IconMotorbike,

  '🧳': IconLuggage,
  '🏖️': IconBeach,
  '🛫': IconPlaneDeparture,
  '✈️': IconPlane,
  '🚆': IconTrain,
  '🚌': IconBus,
  '🚗': IconCar,
  '🚲': IconBike,
  '🎒': IconBackpack,
  '🎫': IconTicket,
  '🛂': IconEPassport,
  '🏨': IconHotelService,

  '🏙️': IconBuildings,
  '🛣️': IconRoad,
  '⛲': IconFountain,
  '⛪': IconBuildingChurch,
  '🏛️': IconBuildingCommunity,
  '🖼️': IconPhoto,
  '🎬': IconMovie,
  '🎭': IconMasksTheater,
  '📚': IconBooks,
  '🛒': IconShoppingCart,
  '🏫': IconSchool,
  '🏦': IconBuildingBank,
  '🍽️': IconToolsKitchen2,
  '🌳': IconTree,
  '🏢': IconBuildingSkyscraper,
  '🎓': IconSchool,

  '⬅️': IconArrowLeft,
  '➡️': IconArrowRight,
  '⬆️': IconArrowUp,
  '🔼': IconArrowBigUp,
  '🔽': IconArrowBigDown,
  '⤴️': IconArrowUpRight,
  '⤵️': IconArrowDownRight,
  '↔️': IconArrowsLeftRight,
  '🔄': IconArrowsExchange2,
  '📍': IconMapPin,
  '📐': IconCornerUpRight,
  '➕': IconPlus,
  '🚦': IconTrafficLights,
  '🛤️': IconRoute2,
  '🚏': IconBusStop,
  '🚪': IconDoorEnter,
  '🧭': IconCompass,

  '🌤️': IconSunWind,
  '☀️': IconSun,
  '🌧️': IconCloudRain,
  '❄️': IconSnowflake,
  '💨': IconWind,
  '☁️': IconCloud,
  '🌫️': IconCloudFog,
  '🌈': IconRainbow,
  '⚡': IconBolt,
  '⛈️': IconCloudStorm,
  '🌸': IconFlower,
  '⛰️': IconMountain,
  '🏞️': IconWaveSine,
  '🔥': IconFlame,

  '🎨': IconPalette,
  '💡': IconBulb,
  '🌑': IconMoon,
  '🐘': IconArrowsMaximize,
  '🐜': IconArrowsMinimize,

  '📅': IconCalendarEvent,
  '🗓️': IconCalendarWeek,
  '🌙': IconCalendarMonth,
  '📆': IconCalendarStats,
  '⏰': IconAlarm,
  '⏱️': IconStopwatch,
  '🕐': IconClock,
  '⏮️': IconPlayerSkipBack,
  '🌅': IconSunrise,
  '🕛': IconClock12,
  '🌇': IconSunset,
  '🌃': IconMoonStars,
  '🛋️': IconSofa,
  '🎊': IconConfetti,
  '🕰️': IconClock,
  '⏭️': IconPlayerSkipForward,
  '🔢': IconListNumbers,
  '#️⃣': IconHash,
  '💰': IconCashBanknote,

  '😄': IconMoodHappy,
  '😨': IconGhost,
  '❤️': IconHeart,
  '😡': IconMoodAngry,
  '😢': IconMoodCry,
  '🍀': IconClover,
  '😊': IconMoodSmile,
  '😞': IconMoodSad,
  '😴': IconZzz,
  '😋': IconMoodTongue,
  '🥵': IconGlass,
  '😬': IconMoodNervous,

  '🛬': IconPlaneArrival,
  '🕒': IconClock,
  '📋': IconClipboardList,
  '🛏️': IconBed,
  '🗽': IconBuildingMonument,
  '🗺️': IconMap,

  '👔': IconTie,
  '💼': IconBriefcase,
  '🧑‍💼': IconUser,
  '👨‍💼': IconCrown,
  '💶': IconCurrencyEuro,
  '📄': IconFileCv,
  '🤝': IconHeartHandshake,

  '🎯': IconTarget,
  '⚖️': IconScale,
  '🎚️': IconAdjustments,
  '📈': IconTrendingUp,
  '📊': IconChartBar,
  '📜': IconScript,
  '❗': IconAlertCircle,
  '❓': IconHelpCircle,
  '🔗': IconLink,
  '🔑': IconKey,
  '🏠': IconHome,
  '👨‍👩‍👧': IconUsersGroup,
  '👪': IconUsersGroup,
  '👗': IconHanger,
  '📱': IconDeviceMobile,
  '📢': IconSpeakerphone,
  '✌️': IconHandTwoFingers,
  '✂️': IconScissors,
  '🫵': IconHandFingerRight,
  '👋': IconHandStop,
  '✨': IconSparkles,
  '🧠': IconBrain,
  '🔀': IconArrowsShuffle,
  '🔍': IconSearch,
  '🔤': IconAlphabetLatin,
  '🔧': IconTool,
  '🔮': IconCrystalBall,
  '🗣️': IconMessageDots,
  '💭': IconMessageDots,
  '📰': IconNews,
  '⏳': IconHourglass,
  '✉️': IconMail,
  '🧩': IconPuzzle,
  '🧍': IconUser,
  '⭐': IconStar,
  '📖': IconBook,
  '🛍️': IconShoppingBag,
  '🔹': IconDiamond,
};

// Words that share an emoji inside the same picture still get their own glyph.
const wordIcons: Record<string, Glyph> = {
  Schwimmbad: IconPool,
  schwimmen: IconSwimming,
  Krankheit: IconMoodSick,
  krank: IconBed,
  Medizin: IconPill,
  Tablette: IconPills,
  Rezept: IconPrescription,
  Reise: IconRoute,
  Koffer: IconLuggage,
  Pass: IconIdBadge,
  Reisepass: IconEPassport,
  gewinnen: IconTrendingUp,
  Gast: IconUserCircle,
  neben: IconArrowsLeftRight,
  zwischen: IconColumns2,
  oben: IconStairsUp,
  unten: IconStairsDown,
  weit: IconArrowNarrowRightDashed,
  Aufgabe: IconClipboardCheck,
  Team: IconUsersGroup,
  Firma: IconBuildingFactory2,
  Erfahrung: IconCertificate,
  Kalender: IconCalendar,
};

const colorSwatches: Record<string, string> = {
  '🔴': '#ef4444',
  '🔵': '#3b82f6',
  '🟢': '#22c55e',
  '🟡': '#facc15',
  '🟠': '#f97316',
  '🟣': '#8b5cf6',
  '🩷': '#ec4899',
  '🟤': '#92400e',
  '⚫': '#1e293b',
  '⚪': '#ffffff',
  '🩶': '#94a3b8',
};

const numberLabels: Record<string, string> = {
  '0️⃣': '0',
  '1️⃣': '1',
  '2️⃣': '2',
  '3️⃣': '3',
  '4️⃣': '4',
  '5️⃣': '5',
  '6️⃣': '6',
  '7️⃣': '7',
  '8️⃣': '8',
  '9️⃣': '9',
  '🔟': '10',
  '2️⃣0️⃣': '20',
  '💯': '100',
};

const customArt: Record<string, ReactNode> = {
  '🐦': (
    <>
      <path d="M4 14c0-2.5 2-4.5 5-4.5 3.2 0 5.5 2 6.5 4.5.8 2.2-.5 4-2.8 4H8c-2 0-4-1.6-4-4z" />
      <circle cx="15.5" cy="8.5" r="2.6" />
      <path d="M18 8.5h3l-2.3 1.6" />
      <circle cx="16" cy="8" r=".4" fill="currentColor" stroke="none" />
      <path d="M9 10.5c1.5 1.8 4 2 5.8.6" />
      <path d="M8 14.5 4.5 12l.5 3.5z" />
      <path d="M10.5 18v2.5M14 18v2.5M9 21h3M12.5 21h3" />
    </>
  ),
  '🐮': (
    <>
      <path d="M8 7C5.5 6 5 4.5 5 3" />
      <path d="M16 7c2.5-1 3-2.5 3-4" />
      <path d="M6 10c0-3 2.6-5 6-5s6 2 6 5v3.5c0 3.3-2.6 5.5-6 5.5s-6-2.2-6-5.5z" />
      <ellipse cx="12" cy="16" rx="4" ry="2.3" />
      <path d="M10.5 16h.01M13.5 16h.01" />
      <circle cx="9" cy="11" r=".6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r=".6" fill="currentColor" stroke="none" />
      <path d="M7 9c-1.5.5-2 1.5-2 2.5M17 9c1.5.5 2 1.5 2 2.5" />
    </>
  ),
  '🐰': (
    <>
      <ellipse cx="12" cy="17" rx="5" ry="4.2" />
      <circle cx="14.2" cy="12" r="3.4" />
      <path d="M12.3 9C11 5.5 11.2 3 13 2.2c1.2 1.2 1.2 4 1 6.5" />
      <path d="M15.4 8.8c0-3.5 1-5 2.8-4.8.9 1.5 0 4.3-1.3 6" />
      <circle cx="15.2" cy="11.8" r=".45" fill="currentColor" stroke="none" />
      <path d="M16.8 13.2h1M11.5 14l-2 .8M12 15.2l-1.5 1" />
    </>
  ),
  '🍅': (
    <>
      <circle cx="12" cy="14" r="6.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
      <path d="M12 7.5c0-2 1-3.2 2.8-3.7M12 7.5c0-2-.8-3.2-2.6-3.8" />
      <path
        d="M12 8c-1.5-.5-3-1.5-3.5-3 1.8 0 3.5.8 4.5 2.2 1-1.4 2.7-2.2 4.5-2.2-.5 1.5-2 2.5-3.5 3"
        fill="#22c55e"
        stroke="#15803d"
        strokeWidth="1.2"
      />
    </>
  ),
  '🥔': (
    <>
      <path
        d="M7 6.8c2.5-1.8 7.2-1.5 9.5.8 2.4 2.4 2 7-.4 9-2.4 2-7.1 1.8-9.4-.4C4.4 14 4.6 8.6 7 6.8z"
        transform="rotate(-12 12 12)"
        fill="#d9a066"
        stroke="#8a5a2b"
        strokeWidth="1.4"
      />
      <circle cx="9.5" cy="9.5" r=".7" fill="#8a5a2b" stroke="none" />
      <circle cx="14.5" cy="13.5" r=".55" fill="#8a5a2b" stroke="none" />
      <circle cx="11" cy="15.5" r=".5" fill="#8a5a2b" stroke="none" />
    </>
  ),
  '🕯️': (
    <>
      <path d="M9 11h6v7.5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
      <path d="M9 11c0-1.2 1.3-1.2 1.3 0M12 11V8.8" />
      <path
        d="M12 8.8c-1.4-1.2-1.3-2.7.4-3.9 1.2.9 1.3 2.7-.4 3.9z"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.3"
      />
      <path d="M7 20.5h10" />
    </>
  ),
  '🥧': (
    <>
      <path d="M5.5 14c0-3.9 2.9-6.5 6.5-6.5s6.5 2.6 6.5 6.5" />
      <path d="M4 14h16l-.9 3.6a2 2 0 0 1-2 1.6H6.9a2 2 0 0 1-1.9-1.6z" />
      <path d="M9 9.7l-1.2 3.3M12 8.6v4.4M15 9.7l1.2 3.3" />
    </>
  ),
  '🚉': (
    <>
      <path d="M4 21h16" />
      <path d="M6 21V9h12v12" />
      <path d="M6 9l2-4h8l2 4" />
      <circle cx="12" cy="12.6" r="1.8" />
      <path d="M12 11.4v1.2l.9.8" />
      <path d="M10 21v-4.2h4V21" />
    </>
  ),
  '🚕': (
    <>
      <path d="M3 16v-2.8L5 9h14l2 4.2V16" fill="#fde047" stroke="#111827" strokeWidth="1.6" />
      <path d="M5 9h14M7 12h10" />
      <path d="M4 16h16" />
      <circle cx="7" cy="17.5" r="1.6" fill="#fff" />
      <circle cx="17" cy="17.5" r="1.6" fill="#fff" />
      <rect x="10" y="5" width="4" height="2.4" rx=".8" fill="#fde047" stroke="#111827" strokeWidth="1.4" />
    </>
  ),
};

function normalizeMap<T>(source: Record<string, T>): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [key, value] of Object.entries(source)) {
    out[key] = value;
    out[key.replace(/\uFE0F/g, '')] = value;
  }
  return out;
}

const emojiIndex = normalizeMap(emojiIcons);
const colorIndex = normalizeMap(colorSwatches);
const numberIndex = normalizeMap(numberLabels);
const artIndex = normalizeMap(customArt);

const glyphProps = (size: number, color?: string) => ({
  size,
  stroke: 1.8,
  ...(color ? { color } : {}),
});

export function pictogramNode(emoji: string, size: number, color?: string, word?: string): ReactNode {
  const bare = word?.replace(/^(der|die|das)\s+/i, '');
  const WordGlyph = bare ? wordIcons[bare] : undefined;
  if (WordGlyph) return <WordGlyph {...glyphProps(size, color)} />;

  if (emoji === '🇩🇪') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="4.4" rx="1" fill="#111827" />
        <rect x="3" y="9.4" width="18" height="4.4" fill="#dc2626" />
        <rect x="3" y="13.8" width="18" height="4.4" rx="1" fill="#facc15" />
      </svg>
    );
  }

  const swatch = colorIndex[emoji];
  if (swatch) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill={swatch}
          stroke={swatch === '#ffffff' ? '#94a3b8' : 'rgba(15,23,42,.16)'}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  const number = numberIndex[emoji];
  if (number) {
    const fontSize = number.length > 2 ? 8.5 : number.length > 1 ? 10.5 : 14;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <text
          x="12"
          y="12.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Nunito, system-ui, sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          fill="currentColor"
        >
          {number}
        </text>
      </svg>
    );
  }

  const art = artIndex[emoji];
  if (art) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color ?? 'currentColor'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {art}
      </svg>
    );
  }

  const Glyph = emojiIndex[emoji] ?? IconSparkles;
  return <Glyph {...glyphProps(size, color)} />;
}

interface PictogramProps {
  emoji: string;
  size?: number;
  color?: string;
  word?: string;
  className?: string;
}

export function Pictogram({ emoji, size = 24, color, word, className }: PictogramProps) {
  return (
    <span className={`pictogram${className ? ` ${className}` : ''}`} aria-hidden="true">
      {pictogramNode(emoji, size, color, word)}
    </span>
  );
}
