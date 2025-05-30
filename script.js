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

const allQuestions = [
  {question: "Quel est le plus long fleuve du monde ?", options: ["Nil", "Amazone", "Yangtsé", "Mississippi"], answer: "Amazone"},
  {question: "Quel pays a la plus grande superficie ?", options: ["Chine", "États-Unis", "Canada", "Russie"], answer: "Russie"},
  {question: "Qui a peint 'Les Nymphéas' ?", options: ["Monet", "Manet", "Van Gogh", "Picasso"], answer: "Monet"},
  {question: "Quelle est la langue la plus parlée au monde ?", options: ["Anglais", "Hindi", "Espagnol", "Mandarin"], answer: "Mandarin"},
  {question: "Quel est le symbole chimique du tungstène ?", options: ["Tu", "Tg", "W", "T"], answer: "W"},
  {question: "Combien de temps met la lumière du Soleil à atteindre la Terre ?", options: ["8 min", "1 s", "12 h", "24 h"], answer: "8 min"},
  {question: "Quel écrivain a reçu le prix Nobel en 1957 ?", options: ["Camus", "Sartre", "Malraux", "Hugo"], answer: "Camus"},
  {question: "Quel pays est surnommé 'le pays du Soleil-Levant' ?", options: ["Chine", "Japon", "Corée du Sud", "Vietnam"], answer: "Japon"},
  {question: "Qui a découvert la pénicilline ?", options: ["Fleming", "Pasteur", "Curie", "Einstein"], answer: "Fleming"},
  {question: "Quel est l’organe responsable de la production d’insuline ?", options: ["Foie", "Rate", "Pancréas", "Rein"], answer: "Pancréas"},
  {question: "Quel est le nom de la mission spatiale qui a amené les premiers hommes sur la Lune ?", options: ["Apollo 11", "Voyager 1", "Gemini 7", "Luna 9"], answer: "Apollo 11"},
  {question: "Quel est le plus haut sommet du monde ?", options: ["Everest", "K2", "Kangchenjunga", "Makalu"], answer: "Everest"},
  {question: "Quel est le métal liquide à température ambiante ?", options: ["Mercure", "Plomb", "Zinc", "Argent"], answer: "Mercure"},
  {question: "Quel est l’élément chimique dont le numéro atomique est 79 ?", options: ["Or", "Argent", "Platine", "Cuivre"], answer: "Or"},
  {question: "Quel philosophe grec a enseigné à Alexandre le Grand ?", options: ["Platon", "Socrate", "Aristote", "Pythagore"], answer: "Aristote"},
  {question: "Quel pays a inventé le papier ?", options: ["Chine", "Égypte", "Grèce", "Inde"], answer: "Chine"},
  {question: "Quel philosophe a écrit « Critique de la raison pure » ?", options: ["Kant", "Hegel", "Descartes", "Nietzsche"], answer: "Kant"},
  {question: "Quel pays possède la plus grande réserve de pétrole prouvée ?", options: ["Arabie Saoudite", "Canada", "Venezuela", "Russie"], answer: "Venezuela"},
  {question: "Quel est le plus haut sommet d’Afrique ?", options: ["Mont Kilimandjaro", "Mont Kenya", "Mont Elgon", "Mont Meru"], answer: "Mont Kilimandjaro"},
  {question: "Quel pays est enclavé entre l’Inde et la Chine ?", options: ["Bhoutan", "Népal", "Laos", "Mongolie"], answer: "Bhoutan"},
  {question: "Quel est le nom de la théorie scientifique qui décrit l’expansion de l’univers ?", options: ["La relativité générale", "Le modèle standard", "La théorie du Big Bang", "La mécanique quantique"], answer: "La théorie du Big Bang"},
  {question: "Dans quelle ville se trouve le siège de l’OMC ?", options: ["Bruxelles", "New York", "Genève", "Paris"], answer: "Genève"},
  {question: "Quel pays a été le premier à accorder le droit de vote aux femmes ?", options: ["États-Unis", "France", "Nouvelle-Zélande", "Norvège"], answer: "Nouvelle-Zélande"},
  {question: "Quel est le point commun entre ‘kayak’, ‘radar’ et ‘ressasser’ ?", options: ["Ils sont des palindromes", "Ils sont des antonymes", "Ce sont des adjectifs", "Ils viennent du grec"], answer: "Ils sont des palindromes"},
  {question: "Quel pays a inventé l’imprimerie à caractères mobiles ?", options: ["Allemagne", "Chine", "Italie", "Japon"], answer: "Chine"},
  {question: "Quel mathématicien est connu pour son dernier théorème prouvé en 1994 ?", options: ["Euclide", "Pythagore", "Fermat", "Gauss"], answer: "Fermat"},
  {question: "Combien y a-t-il d’os dans le corps humain adulte ?", options: ["206", "208", "210", "202"], answer: "206"},
  {question: "Qui a écrit ‘Le Meilleur des mondes’ ?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Isaac Asimov"], answer: "Aldous Huxley"},
  {question: "Quel empire a succédé à l’Empire romain d’Occident ?", options: ["Empire carolingien", "Empire byzantin", "Empire ottoman", "Saint-Empire romain germanique"], answer: "Empire byzantin"},
  {question: "Quelle est la capitale de la Birmanie (Myanmar) ?", options: ["Rangoun", "Mandalay", "Naypyidaw", "Bago"], answer: "Naypyidaw"}
];

function pickRandomQuestions(count = 10) {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
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
  selectedQuestions = pickRandomQuestions(30);
  showQuestion();
}

function showQuestion() {
  const current = selectedQuestions[currentQuestionIndex];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => selectAnswer(option));
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hide");
}

function selectAnswer(selected) {
  const current = selectedQuestions[currentQuestionIndex];
  const buttons = Array.from(answersEl.children);

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === current.answer) {
      btn.style.backgroundColor = "#28a745";
      btn.style.color = "white";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#dc3545";
      btn.style.color = "white";
    }
  });

  if (selected === current.answer) score++;
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
