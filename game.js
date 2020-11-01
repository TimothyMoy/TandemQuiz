const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score')

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];

let questions = [
  {
  "question": "What was Tandem previous name?",
  "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
  "correct": "Devmynd"
},
{
  "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
  "incorrect": ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana"],
  "correct": "Et tu, Brute?"
},
{
  "question": "A group of tigers are referred to as:",
  "incorrect": ["Chowder", "Pride", "Destruction"],
  "correct": "Ambush"
}
];




//Constants

const Correct_Bonus = 1;
const Max_Questions = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html")
  }

  questionCounter ++
  questionCounterText.innerText = questionCounter + "/" + Max_Questions;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  let newChoices = []
  newChoices.push(currentQuestion.incorrect[0],currentQuestion.incorrect[1],currentQuestion.incorrect[2],currentQuestion.correct)

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = newChoices[number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;


    let classToApply = 'incorrect';
      if(selectedChoice.innerText == currentQuestion.correct) {
        classToApply = 'correct';
      }
    if (classToApply === 'correct') {
      incrementScore(Correct_Bonus)
    }
      selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion(); 
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();



