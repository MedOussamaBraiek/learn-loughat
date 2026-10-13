import { useLang } from './LanguageContext';
import type { Language } from '../types';

// Interface labels in the four interface languages: [en, fr, de, ar].
// The German learning content itself (words, lessons, quiz questions) is not translated.
const text = {
  // Learning language
  'learning.label': ["I'm learning", "J'apprends", 'Ich lerne', 'أنا أتعلم'],

  // Home
  'home.signOut': ['🚪 Sign out', '🚪 Se déconnecter', '🚪 Abmelden', '🚪 تسجيل الخروج'],
  'home.admin': ['🛠️ Admin', '🛠️ Admin', '🛠️ Admin', '🛠️ الإدارة'],
  'home.memory': ['Quick memory', 'Mémoire rapide', 'Schnelles Lernen', 'تعلم سريع'],
  'home.memoryText': ['Pictures and word lists for quick practice.', 'Images et listes de mots pour t’entraîner vite.', 'Bilder und Wortlisten zum schnellen Üben.', 'صور وقوائم كلمات للتدريب السريع.'],
  'home.courses': ['Courses', 'Cours', 'Kurse', 'الدروس'],
  'home.coursesText': ['Levels A1 to B2: lessons, daily challenge, quizzes and word games.', 'Niveaux A1 à B2 : leçons, défi du jour, quiz et jeux de mots.', 'Stufen A1 bis B2: Lektionen, Tages-Challenge, Quiz und Wortspiele.', 'المستويات من A1 إلى B2: دروس وتحدي اليوم واختبارات وألعاب كلمات.'],
  'home.start': ['Start →', 'Commencer →', 'Start →', 'ابدأ →'],
  'home.chooseLevel': ['Choose a level →', 'Choisir un niveau →', 'Stufe wählen →', 'اختر مستوى →'],

  // Top learners
  'top.title': ['🏆 Top learners', '🏆 Meilleurs apprenants', '🏆 Beste Lernende', '🏆 أفضل المتعلمين'],
  'top.all': ['See all rankings →', 'Voir tous les classements →', 'Alle Ranglisten ansehen →', 'عرض كل الترتيب →'],
  'top.empty': ['No scores yet. Take today’s challenge to appear here!', 'Pas encore de score. Fais le défi du jour pour apparaître ici !', 'Noch keine Punkte. Mach die Tages-Challenge, um hier zu erscheinen!', 'لا توجد نتائج بعد. شارك في تحدي اليوم لتظهر هنا!'],
  'top.correct': ['correct', 'correct', 'richtig', 'صحيح'],

  // Courses
  'courses.title': ['🎓 Courses', '🎓 Cours', '🎓 Kurse', '🎓 الدروس'],
  'courses.hint': ['Choose your level. Inside: lessons, daily challenge, quizzes and word games.', 'Choisis ton niveau. Dedans : leçons, défi du jour, quiz et jeux de mots.', 'Wähle deine Stufe. Darin: Lektionen, Tages-Challenge, Quiz und Wortspiele.', 'اختر مستواك. بداخله: دروس وتحدي اليوم واختبارات وألعاب كلمات.'],
  'common.back': ['Back', 'Retour', 'Zurück', 'رجوع'],

  // Level page (inside a course)
  'hub.title': ['What do you want to do?', 'Que veux-tu faire ?', 'Was möchtest du tun?', 'ماذا تريد أن تفعل؟'],
  'hub.daily': ['Daily challenge', 'Défi du jour', 'Tages-Challenge', 'تحدي اليوم'],
  'hub.dailyText': ['New set every day, one try, rankings', 'Nouvelle série chaque jour, un seul essai, classement', 'Jeden Tag neue Fragen, ein Versuch, Rangliste', 'مجموعة جديدة كل يوم، محاولة واحدة، ترتيب'],
  'hub.learn': ['Learn', 'Apprendre', 'Lernen', 'تعلم'],
  'hub.learnText': ['Grammar rules and the der / die / das helper', 'Règles de grammaire et aide der / die / das', 'Grammatikregeln und der / die / das-Helfer', 'قواعد النحو ومساعد der / die / das'],
  'hub.games': ['Word games', 'Jeux de mots', 'Wortspiele', 'ألعاب الكلمات'],
  'hub.gamesText': ['Match each word with its meaning', 'Associe chaque mot à son sens', 'Ordne jedes Wort seiner Bedeutung zu', 'طابق كل كلمة مع معناها'],
  'hub.quiz': ['Quiz', 'Quiz', 'Quiz', 'اختبار'],
  'hub.quizText': ['Practice at your own pace, no timer', 'Entraîne-toi à ton rythme, sans minuteur', 'Üben in deinem Tempo, ohne Zeitlimit', 'تدرب بالسرعة التي تناسبك بدون مؤقت'],
  'hub.test': ['Timed test', 'Test chronométré', 'Test mit Zeit', 'اختبار بوقت محدد'],
  'hub.testText': ['20 seconds per question', '20 secondes par question', '20 Sekunden pro Frage', '20 ثانية لكل سؤال'],
  'hub.syllabus': ['📋 Syllabus', '📋 Programme', '📋 Lehrplan', '📋 المنهج'],
  'hub.flashcards': ['📚 All flashcards', '📚 Toutes les cartes', '📚 Alle Karteikarten', '📚 كل البطاقات'],

  // Quick memory / pictures
  'pic.title': ['🖼️ Picture Learning', '🖼️ Apprentissage en images', '🖼️ Lernen mit Bildern', '🖼️ التعلم بالصور'],
  'pic.hint': ['Pick a picture. Learn the words with arrows, then play to test yourself.', 'Choisis une image. Apprends les mots avec les flèches, puis joue pour te tester.', 'Wähle ein Bild. Lerne die Wörter mit Pfeilen, dann spiele zum Testen.', 'اختر صورة. تعلم الكلمات بالأسهم، ثم العب لتختبر نفسك.'],
  'pic.words': ['words', 'mots', 'Wörter', 'كلمات'],
  'board.learn': ['👀 Learn', '👀 Apprendre', '👀 Lernen', '👀 تعلم'],
  'board.play': ['🎯 Play', '🎯 Jouer', '🎯 Spielen', '🎯 العب'],
  'board.hintLearn': ['Tap a word or a dot to hear it.', 'Touche un mot ou un point pour l’entendre.', 'Tippe auf ein Wort oder einen Punkt, um es zu hören.', 'اضغط على كلمة أو نقطة لتسمعها.'],
  'board.prompt': ['Drag a word onto its place on the picture. Or tap a word, then tap its place.', 'Glisse un mot à sa place sur l’image. Ou touche un mot, puis sa place.', 'Zieh ein Wort an seinen Platz im Bild. Oder tippe ein Wort und dann seinen Platz an.', 'اسحب كلمة إلى مكانها في الصورة. أو اضغط كلمة ثم مكانها.'],
  'board.promptChip': ['Now tap the place for', 'Touche maintenant la place de', 'Tippe jetzt auf den Platz für', 'اضغط الآن على مكان'],
  'board.promptSpot': ['Now tap the word for this place (or 💡 reveal it).', 'Touche maintenant le mot pour cette place (ou 💡 pour le montrer).', 'Tippe jetzt das Wort für diesen Platz (oder 💡 zum Zeigen).', 'اضغط الآن الكلمة لهذا المكان (أو 💡 لإظهارها).'],
  'board.found': ['Found', 'Trouvé', 'Gefunden', 'تم العثور'],
  'board.mistakes': ['Mistakes:', 'Erreurs :', 'Fehler:', 'أخطاء:'],
  'board.showAnswer': ['💡 Show answer', '💡 Montrer la réponse', '💡 Antwort zeigen', '💡 أظهر الإجابة'],
  'board.great': ['🎉 Great job!', '🎉 Bravo !', '🎉 Super gemacht!', '🎉 أحسنت!'],
  'board.totalMistakes': ['Total mistakes:', 'Erreurs au total :', 'Fehler insgesamt:', 'مجموع الأخطاء:'],
  'board.playAgain': ['Play again', 'Rejouer', 'Nochmal spielen', 'العب مرة أخرى'],
  'board.toCourse': ['Back', 'Retour', 'Zurück', 'رجوع'],

  // Word games
  'match.step1': ['Step 1: tap a German word on the left.', 'Étape 1 : touche un mot allemand à gauche.', 'Schritt 1: Tippe links auf ein deutsches Wort.', 'الخطوة 1: اضغط كلمة ألمانية على اليسار.'],
  'match.wrong': ['❌ Not a match. Try again.', '❌ Ce n’est pas la bonne paire. Réessaie.', '❌ Passt nicht. Versuch es nochmal.', '❌ ليست متطابقة. حاول مرة أخرى.'],
  'match.german': ['🇩🇪 German', '🇩🇪 Allemand', '🇩🇪 Deutsch', '🇩🇪 الألمانية'],
  'match.meaning': ['🇬🇧 Meaning', '🇬🇧 Sens', '🇬🇧 Bedeutung', '🇬🇧 المعنى'],
  'match.round': ['Round', 'Manche', 'Runde', 'الجولة'],
  'match.allPairs': ['🎉 All pairs matched!', '🎉 Toutes les paires trouvées !', '🎉 Alle Paare gefunden!', '🎉 تمت كل المطابقات!'],
  'match.next': ['Next round →', 'Manche suivante →', 'Nächste Runde →', 'الجولة التالية →'],
  'match.backToTopic': ['Back to topic', 'Retour au thème', 'Zurück zum Thema', 'رجوع إلى الموضوع'],

  // Rankings
  'rank.title': ['🏆 Rankings', '🏆 Classements', '🏆 Rangliste', '🏆 الترتيب'],
  'rank.hint': ['Daily challenge results from all learners. Blocked accounts are not shown.', 'Résultats du défi du jour de tous les apprenants. Les comptes bloqués ne sont pas affichés.', 'Ergebnisse der Tages-Challenge aller Lernenden. Gesperrte Konten werden nicht angezeigt.', 'نتائج تحدي اليوم لكل المتعلمين. لا تظهر الحسابات المحظورة.'],
  'rank.today': ['Today', "Aujourd'hui", 'Heute', 'اليوم'],
  'rank.week': ['This week', 'Cette semaine', 'Diese Woche', 'هذا الأسبوع'],
  'rank.month': ['This month', 'Ce mois-ci', 'Diesen Monat', 'هذا الشهر'],
  'rank.level': ['Level', 'Niveau', 'Stufe', 'المستوى'],
  'rank.share': ['📸 Share this ranking', '📸 Partager ce classement', '📸 Rangliste teilen', '📸 شارك هذا الترتيب'],
  'rank.loading': ['Loading…', 'Chargement…', 'Lädt…', 'جارٍ التحميل…'],
  'rank.none': ['No scores yet. Be the first!', 'Pas encore de score. Sois le premier !', 'Noch keine Punkte. Sei der Erste!', 'لا توجد نتائج بعد. كن الأول!'],
  'rank.shared': ['Shared!', 'Partagé !', 'Geteilt!', 'تمت المشاركة!'],
  'rank.saved': ['Image saved. Post it anywhere!', 'Image enregistrée. Partage-la où tu veux !', 'Bild gespeichert. Teile es, wo du willst!', 'تم حفظ الصورة. شاركها أينما شئت!'],

  // Daily challenge
  'daily.title': ['Daily challenge', 'Défi du jour', 'Tages-Challenge', 'تحدي اليوم'],
  'daily.signinText': ['Sign in to play today’s challenge and appear on the rankings.', 'Connecte-toi pour jouer le défi du jour et apparaître dans les classements.', 'Melde dich an, um die Tages-Challenge zu spielen und in der Rangliste zu erscheinen.', 'سجّل الدخول لتلعب تحدي اليوم وتظهر في الترتيب.'],
  'daily.signin': ['Sign in with Google', 'Se connecter avec Google', 'Mit Google anmelden', 'سجّل الدخول بحساب Google'],
  'daily.start': ['Start today’s challenge', 'Commencer le défi du jour', 'Heutige Challenge starten', 'ابدأ تحدي اليوم'],
  'daily.oneTry': ['20 seconds per question. One attempt only: once you start, you have to finish it.', '20 secondes par question. Un seul essai : une fois commencé, il faut le terminer.', '20 Sekunden pro Frage. Nur ein Versuch: Wenn du anfängst, musst du fertig machen.', '20 ثانية لكل سؤال. محاولة واحدة فقط: بمجرد البدء يجب إنهاؤه.'],
  'daily.locked': ['You already started today’s challenge. You get one attempt per day, so come back tomorrow for a new set.', 'Tu as déjà commencé le défi du jour. Un seul essai par jour, reviens demain pour une nouvelle série.', 'Du hast die heutige Challenge schon begonnen. Ein Versuch pro Tag, komm morgen für neue Fragen wieder.', 'لقد بدأت تحدي اليوم. لك محاولة واحدة في اليوم، عُد غداً لمجموعة جديدة.'],
  'daily.inSeconds': ['in', 'en', 'in', 'في'],
  'daily.seconds': ['seconds', 'secondes', 'Sekunden', 'ثانية'],
  'daily.saved': ['✅ Saved to the rankings', '✅ Enregistré dans les classements', '✅ In der Rangliste gespeichert', '✅ تم الحفظ في الترتيب'],
  'daily.notSaved': ['Rankings are not set up yet, so this score is not saved.', 'Les classements ne sont pas encore configurés, ce score n’est pas enregistré.', 'Die Rangliste ist noch nicht eingerichtet, daher wird dieses Ergebnis nicht gespeichert.', 'الترتيب غير مفعّل بعد، لذلك لا يتم حفظ هذه النتيجة.'],
  'daily.signOut': ['Sign out', 'Se déconnecter', 'Abmelden', 'تسجيل الخروج'],
  'daily.saving': ['Saving your score…', 'Enregistrement de ton score…', 'Ergebnis wird gespeichert…', 'جارٍ حفظ نتيجتك…'],

  // Admin
  'admin.title': ['Admin', 'Admin', 'Admin', 'الإدارة'],
  'admin.users': ['Users', 'Utilisateurs', 'Nutzer', 'المستخدمون'],
  'admin.blockedCount': ['Blocked', 'Bloqués', 'Gesperrt', 'محظورون'],
  'admin.played': ['Challenges played', 'Défis joués', 'Gespielte Challenges', 'التحديات المنجزة'],
  'admin.search': ['🔍 Search by email or name', '🔍 Chercher par e-mail ou nom', '🔍 Nach E-Mail oder Name suchen', '🔍 ابحث بالبريد أو الاسم'],
  'admin.all': ['All', 'Tous', 'Alle', 'الكل'],
  'admin.active': ['Active', 'Actifs', 'Aktiv', 'نشط'],
  'admin.blocked': ['Blocked', 'Bloqués', 'Gesperrt', 'محظور'],
  'admin.loading': ['Loading users…', 'Chargement des utilisateurs…', 'Nutzer werden geladen…', 'جارٍ تحميل المستخدمين…'],
  'admin.noMatch': ['No users match this search.', 'Aucun utilisateur ne correspond.', 'Keine Nutzer gefunden.', 'لا يوجد مستخدمون مطابقون.'],
  'admin.block': ['⛔ Block', '⛔ Bloquer', '⛔ Sperren', '⛔ حظر'],
  'admin.unblock': ['✅ Unblock', '✅ Débloquer', '✅ Entsperren', '✅ رفع الحظر'],
  'admin.delete': ['🗑️ Delete', '🗑️ Supprimer', '🗑️ Löschen', '🗑️ حذف'],
  'admin.played2': ['played', 'joués', 'gespielt', 'منجز'],
  'admin.last': ['last', 'dernier', 'zuletzt', 'آخر'],
  'admin.joined': ['joined', 'inscrit le', 'beigetreten', 'انضم في'],
  'admin.page': ['Page', 'Page', 'Seite', 'صفحة'],
  'admin.of': ['of', 'sur', 'von', 'من'],
  'admin.previous': ['← Previous', '← Précédent', '← Zurück', '← السابق'],
  'admin.next': ['Next →', 'Suivant →', 'Weiter →', 'التالي →'],

  // Sign in landing
  'landing.tagline': ['Learn German step by step, with pictures, games and a daily challenge.', 'Apprends l’allemand étape par étape, avec des images, des jeux et un défi du jour.', 'Lerne Deutsch Schritt für Schritt, mit Bildern, Spielen und einer Tages-Challenge.', 'تعلّم الألمانية خطوة بخطوة، مع صور وألعاب وتحدي يومي.'],
  'landing.also': ['Also available: French, Spanish, English and Arabic. Levels A1 to B2.', 'Aussi disponible : français, espagnol, anglais et arabe. Niveaux A1 à B2.', 'Auch verfügbar: Französisch, Spanisch, Englisch und Arabisch. Stufen A1 bis B2.', 'متوفر أيضاً: الفرنسية والإسبانية والإنجليزية والعربية. المستويات من A1 إلى B2.'],
  'landing.start': ['Sign in with Google to start', 'Connecte-toi avec Google pour commencer', 'Mit Google anmelden und starten', 'سجّل الدخول بحساب Google للبدء'],
  'landing.whatYouCan': ['What you can do', 'Ce que tu peux faire', 'Was du tun kannst', 'ماذا يمكنك أن تفعل'],
  'landing.rankings': ['Rankings', 'Classements', 'Rangliste', 'الترتيب'],
  'landing.rankingsText': ['Top learners in the daily challenge. Pick a level to see its ranking.', 'Meilleurs apprenants du défi du jour. Choisis un niveau pour voir son classement.', 'Die besten Lernenden der Tages-Challenge. Wähle eine Stufe, um ihre Rangliste zu sehen.', 'أفضل المتعلمين في تحدي اليوم. اختر مستوى لترى ترتيبه.'],
  'landing.howItWorks': ['How it works', 'Comment ça marche', 'So funktioniert es', 'كيف يعمل'],
  'landing.blocked': ['Account blocked', 'Compte bloqué', 'Konto gesperrt', 'الحساب محظور'],
  'landing.blockedText': ['Your account has been blocked, so you can’t use Learn Loughat right now. Please contact the admin if you think this is a mistake.', 'Ton compte a été bloqué, tu ne peux pas utiliser Learn Loughat pour le moment. Contacte l’administrateur si tu penses que c’est une erreur.', 'Dein Konto wurde gesperrt, daher kannst du Learn Loughat gerade nicht nutzen. Wende dich an den Admin, wenn du denkst, dass das ein Fehler ist.', 'تم حظر حسابك، لذلك لا يمكنك استخدام Learn Loughat الآن. تواصل مع المشرف إذا كنت تعتقد أن هذا خطأ.'],
  'landing.account': ['Sign in with Google to start', 'Connecte-toi avec Google pour commencer', 'Mit Google anmelden und starten', 'سجّل الدخول بحساب Google للبدء'],
} as const;

export type UiKey = keyof typeof text;

const index: Record<Language, number> = { en: 0, fr: 1, de: 2, ar: 3 };

// Returns the label in the current interface language, falling back to English
export function useTx() {
  const { lang } = useLang();
  return (key: UiKey): string => {
    const row = text[key];
    return row[index[lang]] || row[0];
  };
}
