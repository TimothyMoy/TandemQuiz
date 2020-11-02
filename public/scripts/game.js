const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score')

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];

let questions = [];

fetch("scripts/Apprentice_TandemFor400_Data.json")
.then(res => res.json())
  .then(loadedQuestions => {
    console.log(loadedQuestions)
    questions = loadedQuestions.map(loadedQuestions => {
      const formattedQuestion = {
        question: loadedQuestions.question
    }
      const answerChoices = [ ...loadedQuestions.incorrect];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(formattedQuestion.answer -1, 0,loadedQuestions.correct);

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index+1)] = choice;
      })

      return formattedQuestion
    })
    startGame();
  })
  .catch(err => {
    console.log(err);
  });


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
    return window.location.assign("/end")
  }

  questionCounter ++
  questionCounterText.innerText = questionCounter + "/" + Max_Questions;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = 'incorrect';
      if(selectedAnswer == currentQuestion.answer) {
        classToApply = 'correct';
      }
      if (classToApply === 'correct') {
        incrementScore(Correct_Bonus)
      }
      console.log(currentQuestion)
      if (selectedAnswer != currentQuestion.answer) {
        if (currentQuestion.answer === 1 ){
          alert('The correct answer is ' + currentQuestion.choice1)
        }
        else if (currentQuestion.answer === 2 ) {
          alert('The correct answer is ' + currentQuestion.choice2)
        }
        else if (currentQuestion.answer === 3 ){
          alert('The correct answer is ' + currentQuestion.choice3)
        }
        else
        alert('The correct answer is ' + currentQuestion.choice)
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





