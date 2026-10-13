// Picture-based vocabulary. Every item has a position (x, y) on a 420 x 520 canvas,
// a side ('l' or 'r') that decides which column its label sits in, and an Arabic translation.

import { topicUnits } from './topics';
import { wordEmoji } from './wordEmoji';

// Hand-drawn scenes use fixed names; word-list pictures use 'topic-<id>'
export type SceneKind = string;

export interface SceneItem {
  id: string;   // German word with article, e.g. 'der Kopf' (also the answer key)
  en: string;
  ar: string;
  x: number;
  y: number;
  side: 'l' | 'r';
  emoji?: string; // shown as the picture for animal and vehicle scenes
}

export interface SceneInfo {
  kind: SceneKind;
  title: string;
  icon: string;
  color: string;
  items: SceneItem[];
  hint?: string;  // short explanation shown above the picture
}

const bodyItems: SceneItem[] = [
  { id: 'der Kopf', en: 'head', ar: 'رأس', x: 210, y: 38, side: 'l' },
  { id: 'die Augen', en: 'eyes', ar: 'عينان', x: 224, y: 68, side: 'r' },
  { id: 'die Ohren', en: 'ears', ar: 'أذنان', x: 248, y: 74, side: 'r' },
  { id: 'die Nase', en: 'nose', ar: 'أنف', x: 210, y: 84, side: 'l' },
  { id: 'der Mund', en: 'mouth', ar: 'فم', x: 210, y: 98, side: 'l' },
  { id: 'der Hals', en: 'neck', ar: 'رقبة', x: 210, y: 118, side: 'r' },
  { id: 'der Arm', en: 'arm', ar: 'ذراع', x: 140, y: 200, side: 'l' },
  { id: 'die Hand', en: 'hand', ar: 'يد', x: 118, y: 276, side: 'l' },
  { id: 'das Knie', en: 'knee', ar: 'ركبة', x: 182, y: 370, side: 'r' },
  { id: 'der Fuß', en: 'foot', ar: 'قدم', x: 178, y: 484, side: 'r' },
];

const houseItems: SceneItem[] = [
  { id: 'das Fenster', en: 'window', ar: 'نافذة', x: 120, y: 205, side: 'l' },
  { id: 'die Tür', en: 'door', ar: 'باب', x: 102, y: 280, side: 'l' },
  { id: 'die Küche', en: 'kitchen', ar: 'مطبخ', x: 140, y: 300, side: 'l' },
  { id: 'der Schrank', en: 'cupboard', ar: 'خزانة', x: 170, y: 368, side: 'l' },
  { id: 'das Bett', en: 'bed', ar: 'سرير', x: 140, y: 412, side: 'l' },
  { id: 'das Schlafzimmer', en: 'bedroom', ar: 'غرفة النوم', x: 140, y: 470, side: 'l' },
  { id: 'die Lampe', en: 'lamp', ar: 'مصباح', x: 270, y: 180, side: 'r' },
  { id: 'der Tisch', en: 'table', ar: 'طاولة', x: 270, y: 266, side: 'r' },
  { id: 'der Stuhl', en: 'chair', ar: 'كرسي', x: 312, y: 262, side: 'r' },
  { id: 'das Wohnzimmer', en: 'living room', ar: 'غرفة الجلوس', x: 300, y: 300, side: 'r' },
  { id: 'das Bad', en: 'bathroom', ar: 'حمام', x: 300, y: 380, side: 'r' },
];

const clothesItems: SceneItem[] = [
  { id: 'der Hut', en: 'hat', ar: 'قبعة', x: 210, y: 22, side: 'r' },
  { id: 'der Schal', en: 'scarf', ar: 'وشاح', x: 210, y: 122, side: 'r' },
  { id: 'die Jacke', en: 'jacket', ar: 'سترة', x: 168, y: 190, side: 'l' },
  { id: 'der Handschuh', en: 'glove', ar: 'قفاز', x: 118, y: 276, side: 'l' },
  { id: 'der Gürtel', en: 'belt', ar: 'حزام', x: 210, y: 254, side: 'r' },
  { id: 'die Hose', en: 'trousers', ar: 'بنطال', x: 184, y: 380, side: 'l' },
  { id: 'die Tasche', en: 'bag', ar: 'حقيبة', x: 305, y: 318, side: 'r' },
  { id: 'der Schuh', en: 'shoe', ar: 'حذاء', x: 176, y: 484, side: 'l' },
];

const femaleClothesItems: SceneItem[] = [
  { id: 'der Hut', en: 'hat', ar: 'قبعة', x: 210, y: 22, side: 'r' },
  { id: 'die Ohrringe', en: 'earrings', ar: 'أقراط', x: 250, y: 84, side: 'r' },
  { id: 'die Kette', en: 'necklace', ar: 'عقد', x: 210, y: 134, side: 'l' },
  { id: 'das Kleid', en: 'dress', ar: 'فستان', x: 168, y: 190, side: 'l' },
  { id: 'der Gürtel', en: 'belt', ar: 'حزام', x: 210, y: 226, side: 'r' },
  { id: 'die Tasche', en: 'handbag', ar: 'حقيبة يد', x: 305, y: 318, side: 'r' },
  { id: 'die Schuhe', en: 'shoes', ar: 'أحذية', x: 172, y: 478, side: 'l' },
];

// Family tree seen from "Du" (you, in the middle of the children row, not a target).
// Row 1: grandparents. Row 2: parents and their siblings. Row 3: you and your siblings.
const familyItems: SceneItem[] = [
  { id: 'der Opa', en: 'grandfather', ar: 'الجد', x: 130, y: 70, side: 'l' },
  { id: 'die Oma', en: 'grandmother', ar: 'الجدة', x: 290, y: 70, side: 'r' },
  { id: 'der Onkel', en: 'uncle', ar: 'العم', x: 40, y: 205, side: 'l' },
  { id: 'der Vater', en: 'father', ar: 'الأب', x: 130, y: 205, side: 'l' },
  { id: 'die Mutter', en: 'mother', ar: 'الأم', x: 290, y: 205, side: 'r' },
  { id: 'die Tante', en: 'aunt', ar: 'العمة', x: 380, y: 205, side: 'r' },
  { id: 'der Bruder', en: 'brother', ar: 'الأخ', x: 110, y: 345, side: 'l' },
  { id: 'die Schwester', en: 'sister', ar: 'الأخت', x: 310, y: 345, side: 'r' },
];

const animalItems: SceneItem[] = [
  { id: 'der Hund', en: 'dog', ar: 'كلب', x: 160, y: 120, side: 'l', emoji: '🐶' },
  { id: 'die Katze', en: 'cat', ar: 'قطة', x: 260, y: 120, side: 'r', emoji: '🐱' },
  { id: 'der Vogel', en: 'bird', ar: 'طائر', x: 160, y: 240, side: 'l', emoji: '🐦' },
  { id: 'der Fisch', en: 'fish', ar: 'سمكة', x: 260, y: 240, side: 'r', emoji: '🐟' },
  { id: 'das Pferd', en: 'horse', ar: 'حصان', x: 160, y: 360, side: 'l', emoji: '🐴' },
  { id: 'die Kuh', en: 'cow', ar: 'بقرة', x: 260, y: 360, side: 'r', emoji: '🐮' },
  { id: 'das Schwein', en: 'pig', ar: 'خنزير', x: 160, y: 470, side: 'l', emoji: '🐷' },
  { id: 'der Hase', en: 'rabbit', ar: 'أرنب', x: 260, y: 470, side: 'r', emoji: '🐰' },
];

const transportItems: SceneItem[] = [
  { id: 'das Auto', en: 'car', ar: 'سيارة', x: 160, y: 120, side: 'l', emoji: '🚗' },
  { id: 'das Fahrrad', en: 'bicycle', ar: 'دراجة', x: 260, y: 120, side: 'r', emoji: '🚲' },
  { id: 'der Bus', en: 'bus', ar: 'حافلة', x: 160, y: 240, side: 'l', emoji: '🚌' },
  { id: 'der Zug', en: 'train', ar: 'قطار', x: 260, y: 240, side: 'r', emoji: '🚆' },
  { id: 'das Flugzeug', en: 'airplane', ar: 'طائرة', x: 160, y: 360, side: 'l', emoji: '✈️' },
  { id: 'das Taxi', en: 'taxi', ar: 'تاكسي', x: 260, y: 360, side: 'r', emoji: '🚕' },
  { id: 'das Schiff', en: 'ship', ar: 'سفينة', x: 160, y: 470, side: 'l', emoji: '🚢' },
  { id: 'das Motorrad', en: 'motorbike', ar: 'دراجة نارية', x: 260, y: 470, side: 'r', emoji: '🏍️' },
];

export const pictureScenes: SceneInfo[] = [
  { kind: 'body', title: 'Der Körper', icon: '🧍', color: '#ff9600', items: bodyItems },
  { kind: 'house', title: 'Das Haus', icon: '🏠', color: '#1cb0f6', items: houseItems },
  { kind: 'clothes', title: 'Kleidung (Mann)', icon: '👔', color: '#ff8fab', items: clothesItems },
  { kind: 'clothes-female', title: 'Kleidung (Frau)', icon: '👗', color: '#e84393', items: femaleClothesItems },
  {
    kind: 'family',
    title: 'Die Familie',
    icon: '👪',
    color: '#58cc02',
    items: familyItems,
    hint: 'You are "Du" in the middle of the bottom row. Bruder and Schwester are your brother and sister (same parents as you). Vater and Mutter are your parents. Opa and Oma are your grandparents. Onkel and Tante are your parents’ siblings.',
  },
  { kind: 'animals', title: 'Die Tiere', icon: '🐶', color: '#f39c12', items: animalItems },
  { kind: 'transport', title: 'Transport', icon: '🚗', color: '#2b9cb0', items: transportItems },
];

// Word lists turned into pictures. Each word is a card with its picture, laid out in two columns.
const pictureTopicIds = ['party', 'sport', 'health', 'food', 'travel', 'city', 'weather', 'colors', 'time', 'numbers', 'emotions', 'travel-a2', 'work-a2'];

function gridLayout(words: { id: string; en: string; ar: string; emoji: string }[]): SceneItem[] {
  const rows = Math.ceil(words.length / 2);
  const top = 70;
  const bottom = 470;
  const step = rows > 1 ? (bottom - top) / (rows - 1) : 0;
  return words.map((w, i) => {
    const left = i % 2 === 0;
    return {
      id: w.id,
      en: w.en,
      ar: w.ar,
      emoji: w.emoji,
      x: left ? 165 : 255,
      y: Math.round(top + Math.floor(i / 2) * step),
      side: left ? 'l' : 'r',
    } as SceneItem;
  });
}

function topicPicture(id: string): SceneInfo | null {
  const allTopics = Object.values(topicUnits.de ?? {}).flatMap((list) => list ?? []);
  const topic = allTopics.find((t) => t.id === id);
  if (!topic) return null;
  const words = topic.words.map((w) => ({
    id: w.article ? `${w.article} ${w.word}` : w.word,
    en: w.translation,
    ar: w.ar ?? '',
    emoji: wordEmoji[w.word] ?? '🔹',
  }));
  return {
    kind: `topic-${id}`,
    title: topic.title,
    icon: topic.icon,
    color: topic.color,
    items: gridLayout(words),
  };
}

pictureScenes.push(...pictureTopicIds.map(topicPicture).filter((s): s is SceneInfo => s !== null));
