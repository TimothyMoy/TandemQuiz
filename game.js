const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


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
];




//Constants

const Correct_Bonus = 1;
const Max_Questions = 1;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
}

getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    return window.location.assign("/end.html")
  }

  questionCounter ++
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  let newChoices = []
  newChoices.push(currentQuestion.incorrect[0],currentQuestion.incorrect[1],currentQuestion.incorrect[2])
  newChoices.push(currentQuestion.correct)
  console.log(newChoices)

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = newChoices[number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', event => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer);
    getNewQuestion();
  });
});

startGame();