import type { Level, Question } from '../types';
import { shuffle } from './vocabulary';

export type DialogPlace = 'cafe' | 'street' | 'shop';

export interface DialogLine {
  who: 'a' | 'b';
  de: string;
  en: string;
  ar: string;
}

export interface Dialog {
  id: string;
  level: Level;
  title: string;
  icon: string;
  color: string;
  place: DialogPlace;
  a: string; // name / role of speaker A
  b: string; // name / role of speaker B
  lines: DialogLine[];
}

export const dialogs: Dialog[] = [
  {
    id: 'cafe-a1',
    level: 'A1',
    title: 'Im Café',
    icon: '☕',
    color: '#ff9600',
    place: 'cafe',
    a: 'Kellner',
    b: 'Gast',
    lines: [
      { who: 'a', de: 'Guten Tag! Was möchten Sie bestellen?', en: 'Good day! What would you like to order?', ar: 'طاب يومك! ماذا تريد أن تطلب؟' },
      { who: 'b', de: 'Ich möchte einen Kaffee, bitte.', en: 'I would like a coffee, please.', ar: 'أريد قهوة من فضلك.' },
      { who: 'a', de: 'Möchten Sie auch etwas essen?', en: 'Would you like something to eat as well?', ar: 'هل تريد شيئًا تأكله أيضًا؟' },
      { who: 'b', de: 'Ja, ein Stück Kuchen, bitte.', en: 'Yes, a piece of cake, please.', ar: 'نعم، قطعة كيك من فضلك.' },
      { who: 'a', de: 'Sehr gern. Sonst noch etwas?', en: 'Of course. Anything else?', ar: 'بكل سرور. أي شيء آخر؟' },
      { who: 'b', de: 'Nein, danke. Das ist alles.', en: 'No, thank you. That is all.', ar: 'لا، شكرًا. هذا كل شيء.' },
      { who: 'a', de: 'Das macht 6,50 Euro.', en: 'That comes to 6.50 euros.', ar: 'المجموع 6.50 يورو.' },
      { who: 'b', de: 'Hier bitte. Stimmt so!', en: 'Here you go. Keep the change!', ar: 'تفضل. احتفظ بالباقي!' },
      { who: 'a', de: 'Vielen Dank! Guten Appetit!', en: 'Thank you very much! Enjoy your meal!', ar: 'شكرًا جزيلًا! بالهناء والشفاء!' },
    ],
  },
  {
    id: 'directions-a1',
    level: 'A1',
    title: 'Nach dem Weg fragen',
    icon: '🧭',
    color: '#1cb0f6',
    place: 'street',
    a: 'Touristin',
    b: 'Passant',
    lines: [
      { who: 'a', de: 'Entschuldigung, wo ist der Bahnhof?', en: 'Excuse me, where is the train station?', ar: 'عفوًا، أين محطة القطار؟' },
      { who: 'b', de: 'Der Bahnhof ist nicht weit. Gehen Sie geradeaus.', en: 'The station is not far. Go straight ahead.', ar: 'المحطة ليست بعيدة. اذهب مباشرة إلى الأمام.' },
      { who: 'a', de: 'Und dann?', en: 'And then?', ar: 'ثم ماذا؟' },
      { who: 'b', de: 'Dann biegen Sie links ab. Die Straße heißt Bahnhofstraße.', en: 'Then turn left. The street is called Bahnhofstraße.', ar: 'ثم انعطف يسارًا. الشارع اسمه بانهوف شتراسه.' },
      { who: 'a', de: 'Ist es weit von hier?', en: 'Is it far from here?', ar: 'هل هو بعيد من هنا؟' },
      { who: 'b', de: 'Nein, etwa fünf Minuten zu Fuß.', en: 'No, about five minutes on foot.', ar: 'لا، حوالي خمس دقائق سيرًا على الأقدام.' },
      { who: 'a', de: 'Super, vielen Dank!', en: 'Great, thank you very much!', ar: 'رائع، شكرًا جزيلًا!' },
      { who: 'b', de: 'Gern geschehen. Schönen Tag noch!', en: 'You are welcome. Have a nice day!', ar: 'على الرحب والسعة. يومًا سعيدًا!' },
    ],
  },
  {
    id: 'shopping-a1',
    level: 'A1',
    title: 'Kleidung kaufen',
    icon: '🛍️',
    color: '#ce82ff',
    place: 'shop',
    a: 'Verkäuferin',
    b: 'Kundin',
    lines: [
      { who: 'a', de: 'Guten Tag! Kann ich Ihnen helfen?', en: 'Good day! Can I help you?', ar: 'طاب يومك! هل يمكنني مساعدتك؟' },
      { who: 'b', de: 'Ja, ich suche ein T-Shirt.', en: 'Yes, I am looking for a T-shirt.', ar: 'نعم، أبحث عن تي شيرت.' },
      { who: 'a', de: 'Welche Größe brauchen Sie?', en: 'What size do you need?', ar: 'ما المقاس الذي تحتاجه؟' },
      { who: 'b', de: 'Größe M, bitte.', en: 'Size M, please.', ar: 'مقاس M من فضلك.' },
      { who: 'a', de: 'Welche Farbe möchten Sie?', en: 'Which colour would you like?', ar: 'أي لون تريد؟' },
      { who: 'b', de: 'Blau, wenn möglich.', en: 'Blue, if possible.', ar: 'أزرق إن أمكن.' },
      { who: 'a', de: 'Hier ist ein blaues T-Shirt. Es kostet 15 Euro.', en: 'Here is a blue T-shirt. It costs 15 euros.', ar: 'هذا تي شيرت أزرق. سعره 15 يورو.' },
      { who: 'b', de: 'Das gefällt mir. Ich nehme es.', en: 'I like it. I will take it.', ar: 'أعجبني. سآخذه.' },
      { who: 'a', de: 'Sehr gut. Zahlen Sie bar oder mit Karte?', en: 'Very good. Are you paying cash or by card?', ar: 'جيد جدًا. هل تدفع نقدًا أم بالبطاقة؟' },
      { who: 'b', de: 'Mit Karte, bitte.', en: 'By card, please.', ar: 'بالبطاقة من فضلك.' },
    ],
  },
];

export function getDialogs(level: Level): Dialog[] {
  return dialogs.filter((d) => d.level === level);
}

export function getDialog(id: string): Dialog | undefined {
  return dialogs.find((d) => d.id === id);
}

// Turn a dialogue into a "fill the missing reply" quiz: speaker B's lines are the
// answers, and their context is the line right before them.
export function buildDialogQuestions(dialog: Dialog): Question[] {
  const pool = dialogs.flatMap((d) => d.lines.filter((l) => l.who === 'b').map((l) => l.de));

  return dialog.lines
    .map((line, idx) => ({ line, idx }))
    .filter(({ line }) => line.who === 'b')
    .map(({ line, idx }, i) => {
      const prev = idx > 0 ? dialog.lines[idx - 1] : undefined;
      const wrongs: string[] = [];
      for (const candidate of shuffle(pool)) {
        if (candidate !== line.de && !wrongs.includes(candidate)) wrongs.push(candidate);
        if (wrongs.length === 3) break;
      }
      return {
        id: 20000 + i,
        type: 'multiple-choice',
        question: prev ? `${prev.who === 'a' ? dialog.a : dialog.b}: „${prev.de}“` : `${dialog.a}: …`,
        options: shuffle([line.de, ...wrongs]),
        correctAnswer: line.de,
        explanation: `${line.en} · ${line.ar}`,
        category: `${dialog.icon} ${dialog.title}`,
      } as Question;
    });
}
