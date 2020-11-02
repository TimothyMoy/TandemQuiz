// End Screen
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore')
finalScore.innerText = mostRecentScore;

console.log(finalScore)
// Restart Game