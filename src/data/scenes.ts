// Picture-based vocabulary. Every item has a position (x, y) on a 420 x 520 canvas
// and a side ('l' or 'r') that decides which column its label sits in.

export type SceneKind = 'body' | 'house' | 'clothes' | 'clothes-female';

export interface SceneItem {
  id: string;   // German word with article, e.g. 'der Kopf' (also the answer key)
  en: string;
  x: number;
  y: number;
  side: 'l' | 'r';
}

export interface SceneInfo {
  kind: SceneKind;
  title: string;
  icon: string;
  color: string;
  items: SceneItem[];
}

const bodyItems: SceneItem[] = [
  { id: 'der Kopf', en: 'head', x: 210, y: 38, side: 'l' },
  { id: 'die Augen', en: 'eyes', x: 224, y: 68, side: 'r' },
  { id: 'die Ohren', en: 'ears', x: 248, y: 74, side: 'r' },
  { id: 'die Nase', en: 'nose', x: 210, y: 84, side: 'l' },
  { id: 'der Mund', en: 'mouth', x: 210, y: 98, side: 'l' },
  { id: 'der Hals', en: 'neck', x: 210, y: 118, side: 'r' },
  { id: 'der Arm', en: 'arm', x: 140, y: 200, side: 'l' },
  { id: 'die Hand', en: 'hand', x: 118, y: 276, side: 'l' },
  { id: 'das Knie', en: 'knee', x: 182, y: 370, side: 'r' },
  { id: 'der Fuß', en: 'foot', x: 178, y: 484, side: 'r' },
];

const houseItems: SceneItem[] = [
  { id: 'das Fenster', en: 'window', x: 120, y: 205, side: 'l' },
  { id: 'die Tür', en: 'door', x: 102, y: 280, side: 'l' },
  { id: 'die Küche', en: 'kitchen', x: 140, y: 300, side: 'l' },
  { id: 'der Schrank', en: 'cupboard', x: 170, y: 368, side: 'l' },
  { id: 'das Bett', en: 'bed', x: 140, y: 412, side: 'l' },
  { id: 'das Schlafzimmer', en: 'bedroom', x: 140, y: 470, side: 'l' },
  { id: 'die Lampe', en: 'lamp', x: 270, y: 180, side: 'r' },
  { id: 'der Tisch', en: 'table', x: 270, y: 266, side: 'r' },
  { id: 'der Stuhl', en: 'chair', x: 312, y: 262, side: 'r' },
  { id: 'das Wohnzimmer', en: 'living room', x: 300, y: 300, side: 'r' },
  { id: 'das Bad', en: 'bathroom', x: 300, y: 380, side: 'r' },
];

const clothesItems: SceneItem[] = [
  { id: 'der Hut', en: 'hat', x: 210, y: 22, side: 'r' },
  { id: 'der Schal', en: 'scarf', x: 210, y: 122, side: 'r' },
  { id: 'die Jacke', en: 'jacket', x: 168, y: 190, side: 'l' },
  { id: 'der Handschuh', en: 'glove', x: 118, y: 276, side: 'l' },
  { id: 'der Gürtel', en: 'belt', x: 210, y: 254, side: 'r' },
  { id: 'die Hose', en: 'trousers', x: 184, y: 380, side: 'l' },
  { id: 'die Tasche', en: 'bag', x: 305, y: 318, side: 'r' },
  { id: 'der Schuh', en: 'shoe', x: 176, y: 484, side: 'l' },
];

const femaleClothesItems: SceneItem[] = [
  { id: 'der Hut', en: 'hat', x: 210, y: 22, side: 'r' },
  { id: 'die Ohrringe', en: 'earrings', x: 250, y: 84, side: 'r' },
  { id: 'die Kette', en: 'necklace', x: 210, y: 134, side: 'l' },
  { id: 'das Kleid', en: 'dress', x: 168, y: 190, side: 'l' },
  { id: 'der Gürtel', en: 'belt', x: 210, y: 226, side: 'r' },
  { id: 'die Tasche', en: 'handbag', x: 305, y: 318, side: 'r' },
  { id: 'die Schuhe', en: 'shoes', x: 172, y: 478, side: 'l' },
];

export const pictureScenes: SceneInfo[] = [
  { kind: 'body', title: 'Der Körper', icon: '🧍', color: '#ff9600', items: bodyItems },
  { kind: 'house', title: 'Das Haus', icon: '🏠', color: '#1cb0f6', items: houseItems },
  { kind: 'clothes', title: 'Kleidung (Mann)', icon: '👔', color: '#ff8fab', items: clothesItems },
  { kind: 'clothes-female', title: 'Kleidung (Frau)', icon: '👗', color: '#e84393', items: femaleClothesItems },
];
