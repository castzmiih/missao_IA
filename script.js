// Estrutura com as 5 perguntas e 2 opções de resposta para cada uma
const questions = [
  {
    question: "1. Como você prefere estudar novos conteúdos?",
    options: [
      "Assistindo a videoaulas explicativas",
      "Lendo livros e artigos explicativos"
    ]
  },
  {
    question: "2. Qual ambiente de trabalho você prefere?",
    options: [
      "Trabalhar em equipe com bastante troca de ideias",
      "Trabalhar de forma individual e com foco total"
    ]
  },
  {
    question: "3. Diante de um grande desafio de lógica, qual a sua primeira reação?",
    options: [
      "Tentar resolver na hora por tentativa e erro",
      "Planejar e desenhar uma estratégia antes de começar"
    ]
  },
  {
    question: "4. Na escolha de um projeto prático, qual área te atrai mais?",
    options: [
      "Desenvolvimento de páginas e interfaces visuais (Front-end)",
      "Construção de regras de negócio e bancos de dados (Back-end)"
    ]
  },
  {
    question: "5. Qual seu ritmo ideal para realizar tarefas?",
    options: [
      "Fazer várias coisas curtas no mesmo dia",
      "Focar em uma única tarefa grande até finalizá-la"
    ]
  }
];

let currentQuestionIndex = 0;
const userAnswers = [];

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultList = document.getElementById("result-list");
const restartBtn = document.getElementById("restart-btn");

// Função para carregar a pergunta atual na tela
function loadQuestion() {
  const currentQuiz = questions[currentQuestionIndex];
  progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  questionText.innerText = currentQuiz.question;
  optionsContainer.innerHTML = "";

  currentQuiz.options.forEach((optionText) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.innerText = optionText;
    button.onclick = () => selectOption(optionText);
    optionsContainer.appendChild(button);
  });
}

// Função para registrar a escolha e ir para a próxima pergunta
function selectOption(selectedOption) {
  userAnswers.push({
    question: questions[currentQuestionIndex].question,
    answer: selectedOption
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Função para exibir o resumo na tela final
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultList.innerHTML = "";

  userAnswers.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("result-item");
    li.innerHTML = `<strong>${item.question}</strong> Sua resposta: ${item.answer}`;
    resultList.appendChild(li);
  });
}

// Função para reiniciar o questionário
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers.length = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

// Evento do botão de reiniciar
restartBtn.addEventListener("click", restartQuiz);

// Inicializa a primeira pergunta ao carregar a página
loadQuestion();