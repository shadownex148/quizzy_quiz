const entryBtn = document.getElementById("entry-btn");
const entryScreen = document.getElementById("entry-screen");
const mainContent = document.getElementById("main-content");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// Base complète des questions (30 au total, tu peux en ajouter autant que tu veux)
const allQuestions = [
  { question: "Capitale de la France ?", answers: ["Londres", "Berlin", "Paris", "Madrid"], correct: 2 },
  { question: "5 x 6 ?", answers: ["11", "30", "56", "25"], correct: 1 },
  { question: "Peintre de la Joconde ?", answers: ["Van Gogh", "Léonard de Vinci", "Picasso", "Monet"], correct: 1 },
  { question: "Symbole de l’eau ?", answers: ["O2", "H2O", "CO2", "HO"], correct: 1 },
  { question: "Instrument pour mesurer la température ?", answers: ["Baromètre", "Chronomètre", "Thermomètre", "Altimètre"], correct: 2 },
  { question: "Pays de Tokyo ?", answers: ["Chine", "Corée", "Japon", "Thaïlande"], correct: 2 },
  { question: "Nombre de continents ?", answers: ["5", "6", "7", "8"], correct: 2 },
  { question: "Plus grand océan ?", answers: ["Atlantique", "Arctique", "Indien", "Pacifique"], correct: 3 },
  { question: "Président actuel de la France ?", answers: ["Sarkozy", "Hollande", "Macron", "Chirac"], correct: 2 },
  { question: "100 ÷ 4 ?", answers: ["20", "25", "30", "40"], correct: 1 },
  { question: "Plus grand pays ?", answers: ["Chine", "Canada", "États-Unis", "Russie"], correct: 3 },
  { question: "Nombre de jours en février non-bissextile ?", answers: ["28", "29", "30", "27"], correct: 0 },
  { question: "Créateur de Facebook ?", answers: ["Elon Musk", "Mark Zuckerberg", "Jeff Bezos", "Bill Gates"], correct: 1 },
  { question: "Langage utilisé pour les sites web ?", answers: ["Python", "C++", "HTML", "Java"], correct: 2 },
  { question: "Planète la plus proche du Soleil ?", answers: ["Terre", "Mars", "Vénus", "Mercure"], correct: 3 },
  { question: "Quel est un gaz noble ?", answers: ["Oxygène", "Hélium", "Azote", "CO2"], correct: 1 },
  { question: "Combien d’heures dans une journée ?", answers: ["12", "24", "48", "36"], correct: 1 },
  { question: "Combien de côtés a un hexagone ?", answers: ["5", "6", "7", "8"], correct: 1 },
  { question: "Langue parlée au Brésil ?", answers: ["Espagnol", "Français", "Portugais", "Italien"], correct: 2 },
  { question: "1 km = ? m", answers: ["100", "1000", "10 000", "1"], correct: 1 },
  { question: "Symbole chimique de l’or ?", answers: ["Ag", "Au", "Fe", "O"], correct: 1 },
  { question: "Qui a écrit 'Les Misérables' ?", answers: ["Hugo", "Zola", "Molière", "Voltaire"], correct: 0 },
  { question: "Plus petit nombre premier ?", answers: ["0", "1", "2", "3"], correct: 2 },
  { question: "Quel est un pays scandinave ?", answers: ["Allemagne", "Suède", "France", "Belgique"], correct: 1 },
  { question: "Combien de zéros dans un milliard ?", answers: ["6", "9", "12", "3"], correct: 1 },
  { question: "Un triangle a combien de côtés ?", answers: ["2", "3", "4", "5"], correct: 1 },
  { question: "Quel est le plus long fleuve du monde ?", answers: ["Nil", "Amazone", "Yangtsé", "Mississippi"], correct: 1 },
  { question: "Langue parlée en Égypte ?", answers: ["Arabe", "Anglais", "Français", "Persan"], correct: 0 },
  { question: "Qui a inventé l’ampoule ?", answers: ["Tesla", "Edison", "Einstein", "Newton"], correct: 1 },
  { question: "Quel est un métal ?", answers: ["Verre", "Argent", "Bois", "Eau"], correct: 1 },
  { question: "Quel est le mode verbal de la phrase : « Il faut que tu viennes » ?", answers: ["Indicatif", "Conditionnel", "Impératif", "Subjonctif"], correct: 3 },
  { question: "Quelle est la figure de style dans : « Cet homme est un lion » ?", answers: ["Comparaison", "Métaphore", "Personnification", "Hyperbole"], correct: 1 },
  { question: "Dans une pièce de théâtre, qui parle seul sur scène ?", answers: ["Un chœur", "Un monologue", "Un aparté", "Une didascalie"], correct: 1 },
  { question: "Quelle est la valeur du passé simple dans : « Il entra, regarda, et s’assit » ?", answers: ["Action longue", "Action répétée", "Action brève", "Action incertaine"], correct: 2 },
  { question: "Quel est le complément circonstanciel dans : « Il parle avec assurance » ?", answers: ["Il", "Parle", "Avec", "Avec assurance"], correct: 3 },
  { question: "Quel est le PGCD de 36 et 60 ?", answers: ["6", "12", "18", "24"], correct: 1 },
  { question: "Si un triangle a deux angles de 45°, le troisième angle mesure :", answers: ["45°", "60°", "90°", "100°"], correct: 2 },
  { question: "Quel est le développement de (a + b)² ?", answers: ["a² + b²", "a² + 2ab + b²", "2a² + 2b²", "a² - 2ab + b²"], correct: 1 },
  { question: "Combien y a-t-il de diagonales dans un hexagone ?", answers: ["6", "9", "12", "15"], correct: 3 },
  { question: "Quelle est la valeur de π arrondie à deux décimales ?", answers: ["3.12", "3.14", "3.15", "3.16"], correct: 1 },
  { question: "Quel roi est surnommé le « Roi Soleil » ?", answers: ["François Ier", "Louis XIV", "Napoléon Ier", "Henri IV"], correct: 1 },
  { question: "Quel événement marque la fin de l’Empire romain d’Occident ?", answers: ["476", "800", "1453", "1789"], correct: 0 },
  { question: "Comment s’appelle l’ensemble des seigneurs au Moyen Âge ?", answers: ["Le clergé", "La féodalité", "Les corporations", "Les bourgeois"], correct: 1 },
  { question: "Qu’est-ce qu’une métropole ?", answers: ["Une ville moyenne", "Une capitale", "Une grande ville influente", "Une région rurale"], correct: 2 },
  { question: "Quel continent est le plus peuplé ?", answers: ["Europe", "Afrique", "Asie", "Amérique"], correct: 2 },
  { question: "Où se fait la digestion chimique principalement ?", answers: ["Bouche", "Estomac", "Foie", "Intestin grêle"], correct: 3 },
  { question: "Quel est le rôle des globules rouges ?", answers: ["Combattre les microbes", "Transporter l’oxygène", "Digérer", "Fabriquer des hormones"], correct: 1 },
  { question: "Quel organe filtre le sang ?", answers: ["Poumon", "Intestin", "Rein", "Cœur"], correct: 2 },
  { question: "Quel est l’organe principal du système nerveux ?", answers: ["La moelle épinière", "Le cerveau", "Le nerf optique", "Le cervelet"], correct: 1 },
  { question: "Comment s'appelle la transformation d’une chenille en papillon ?", answers: ["Mutation", "Fécondation", "Métamorphose", "Clonage"], correct: 2 },
  { question: "Quel est l'état physique de l’eau à 100°C sous pression normale ?", answers: ["Solide", "Liquide", "Gaz", "Plasma"], correct: 2 },
  { question: "Quel gaz est indispensable à la respiration ?", answers: ["Dioxyde de carbone", "Hydrogène", "Oxygène", "Azote"], correct: 2 },
  { question: "Qu’est-ce qu’une transformation chimique ?", answers: ["Un changement d’état", "Un changement de forme", "Une création de matière", "Une réaction avec formation de nouvelles substances"], correct: 3 },
  { question: "Quelle est la source d’énergie principale du Soleil ?", answers: ["La fusion nucléaire", "L’électricité", "La combustion", "La fission nucléaire"], correct: 0 },
  { question: "Que mesure un voltmètre ?", answers: ["La température", "La tension électrique", "La masse", "La résistance"], correct: 1 },
  { question: "Quel est le résultat de l'intégrale ∫(3x² + 2x)dx ?", "answers": ["x³ + x² + C", "x³ + x + C", "3x³ + 2x² + C", "3x² + x + C"], "correct": 0 },
  { question: "Quel est le discriminant de l'équation x² - 6x + 9 = 0 ?", "answers": ["0", "9", "6", "1"], "correct": 0 },
  { question: "Si A(2,3) et B(4,5), quelle est la pente de la droite passant par ces deux points ?", "answers": ["1", "2", "3", "4"], "correct": 0 },
  { question: "Quel est le résultat de la dérivée de f(x) = 5x² - 3x ?", "answers": ["10x - 3", "10x - 2", "5x - 3", "5x² - 3"], "correct": 0 },
  { question: "Quelle est la solution de l'équation trigonométrique cos(x) = 0 ?", "answers": ["x = π/2 + kπ", "x = 0 + kπ", "x = π + kπ", "x = π/4 + kπ"], "correct": 0 },
  { question: "Quelle est la longueur de l'hypoténuse d'un triangle rectangle de côtés 9 et 12 ?", "answers": ["15", "13", "14", "12"], "correct": 0 },
  { question: "Dans un repère, quelle est la distance entre A(1, 1) et B(4, 5) ?", "answers": ["5", "4", "6", "7"], "correct": 0 },
  { question: "Quelle est la solution de l'inéquation 2x - 3 > 7 ?", "answers": ["x > 5", "x > 7", "x < 5", "x < 7"], "correct": 0 },
  { question: "Quel est le volume d'une sphère de rayon 4 cm ?", "answers": ["64π cm³", "32π cm³", "16π cm³", "48π cm³"], "correct": 0 },
  { question: "Quel est le produit de (x + 4)(x - 1) ?", "answers": ["x² + 3x - 4", "x² + 3x + 4", "x² - 3x - 4", "x² - 3x + 4"], "correct": 0 },
  { question: "Si f(x) = 2x³ - 5x² + 3, quelle est la dérivée de f(x) ?", "answers": ["6x² - 10x", "6x² - 5", "5x² - 10", "2x² - 5x"], "correct": 0 },
  { question: "Quel est le résultat de log10(1000) ?", "answers": ["3", "2", "4", "5"], "correct": 0 },
  { question: "Quel est le taux d'augmentation de f(x) = 2x² + 3x à x = 3 ?", "answers": ["15", "18", "12", "10"], "correct": 0 },
  { question: "Quel est le produit scalaire de A(3, 2) et B(1, 4) ?", "answers": ["11", "10", "8", "7"], "correct": 0 },
  { question: "Quel est le carré de la matrice A = [[2, 3], [1, 4]] ?", "answers": ["[[8, 15], [10, 16]]", "[[7, 10], [11, 16]]", "[[7, 13], [10, 17]]", "[[6, 11], [9, 14]]"], "correct": 0 },
  { question: "Si f(x) = 3x² - 2x + 1, quelle est la valeur de f'(x) ?", "answers": ["6x - 2", "3x - 2", "6x + 2", "3x + 2"], "correct": 0 },
  { question: "Quel est le volume d'un cône de hauteur 6 cm et de rayon 2 cm ?", "answers": ["8π cm³", "10π cm³", "12π cm³", "6π cm³"], "correct": 0 },
  { question: "Que vaut ∑(i=1 à 5) i ?", "answers": ["15", "10", "5", "12"], "correct": 0 },
  { question: "Quel est le centre de la conique 3x² - 4y² = 12 ?", "answers": ["(0, 0)", "(1, 1)", "(2, 3)", "(3, 1)"], "correct": 0 },
  { question: "Quelle est la formule pour l'aire d'un rectangle ?", "answers": ["longueur × largeur", "longueur + largeur", "2 × (longueur + largeur)", "longueur - largeur"], "correct": 0 },
  { question: "Quel est l'élément chimique avec le numéro atomique 15 ?", "answers": ["Phosphore", "Sodium", "Calcium", "Potassium"], "correct": 0 },
  { question: "Quel est l'ion qui compose le sel NaCl ?", "answers": ["Cl-", "Na+", "O2", "H2O"], "correct": 0 },
  { question: "Quel est le produit chimique formé lors de la réaction entre H2SO4 et NaOH ?", "answers": ["Na2SO4 + H2O", "Na2SO4 + H2", "NaOH + H2SO4", "Na + H2SO4"], "correct": 0 },
  { question: "Quelle est la formule du dioxygène ?", "answers": ["O2", "CO2", "H2O", "N2"], "correct": 0 },
  { question: "Quel est l'élément chimique de la formule HCl ?", "answers": ["Hydrogène et Chlore", "Hydrogène et Oxygène", "Chlore et Oxygène", "Chlore et Fluor"], "correct": 0 },
  { question: "Quel est le principe de conservation de la masse ?", "answers": ["La masse totale reste constante dans une réaction chimique", "L'énergie se conserve", "Le volume est conservé", "Le nombre d'atomes est conservé"], "correct": 0 },
  { question: "Quel est le type de réaction dans 2H2 + O2 → 2H2O ?", "answers": ["Réaction de synthèse", "Réaction de décomposition", "Réaction de substitution", "Réaction d'oxydoréduction"], "correct": 0 },
  { question: "Quel est le principal gaz responsable de l'effet de serre ?", "answers": ["CO2", "O2", "H2O", "N2"], "correct": 0 },
  { question: "Quel est le nom de la loi qui relie la pression, le volume et la température des gaz ?", "answers": ["Loi des gaz parfaits", "Loi de Boyle", "Loi de Charles", "Loi de Dalton"], "correct": 0 },
  { question: "Quel est le produit chimique formé lors de la réaction de combustion complète du méthane ?", "answers": ["CO2 et H2O", "CO et H2O", "CO2 et CH4", "H2 et O2"], "correct": 0 },
  { question: "Dans un circuit électrique, quelle grandeur est mesurée en ohms ?", "answers": ["Résistance", "Courant", "Tension", "Puissance"], "correct": 0 },
  { question: "Quel est le type de mouvement d'un objet soumis à une force constante ?", "answers": ["Mouvement rectiligne uniformément accéléré", "Mouvement circulaire uniforme", "Mouvement rectiligne uniforme", "Mouvement oscillant"], "correct": 0 },
  { question: "Quel est le nom de la particule subatomique ayant une charge négative ?", "answers": ["Électron", "Proton", "Neutron", "Positron"], "correct": 0 },
  { question: "Quelle est l'unité de la force dans le Système international ?", "answers": ["Le newton", "Le joule", "Le pascal", "Le watt"], "correct": 0 },
  { question: "Quelle est la relation entre la vitesse, la distance et le temps ?", "answers": ["v = d/t", "v = t/d", "v = d + t", "v = t - d"], "correct": 0 },
  { question: "Quel est le type de liaison chimique entre un atome de sodium et un atome de chlore ?", "answers": ["Liaison ionique", "Liaison covalente", "Liaison métallique", "Liaison hydrogène"], "correct": 0 },
  { question: "Quelle est la vitesse de la lumière dans le vide ?", "answers": ["3 × 10^8 m/s", "2 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^9 m/s"], "correct": 0 }
];

// Fonction pour tirer 10 questions aléatoires
function pickRandomQuestions() {
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 20);
}

entryBtn.addEventListener("click", () => {
  entryScreen.classList.add("hide");
  mainContent.classList.remove("hide");
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultEl.classList.add("hide");
  selectedQuestions = pickRandomQuestions(); // choisir 10 questions
  showQuestion();
}

function showQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  answersEl.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hide");
}

function selectAnswer(index) {
  const correct = selectedQuestions[currentQuestionIndex].correct;
  if (index === correct) {
    score++;
  }

  Array.from(answersEl.children).forEach((btn, i) => {
    btn.disabled = true;
    btn.style.backgroundColor = i === correct ? "#28a745" : "#dc3545";
    btn.style.color = "white";
  });

  nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.classList.add("hide");
  resultEl.classList.remove("hide");
  resultEl.textContent = `Tu as eu ${score} bonne(s) réponse(s) sur ${selectedQuestions.length} !`;
}
