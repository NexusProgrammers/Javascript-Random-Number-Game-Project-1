"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let secretNumber, score, highscore, time, timerInterval;

  const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };

  const updateScore = function (newScore) {
    score = newScore;
    document.querySelector('.score').textContent = score;
  };

  const updateHighscore = function (newHighscore) {
    highscore = newHighscore;
    document.querySelector('.highscore').textContent = highscore;
    // Store the highscore in local storage
    localStorage.setItem('highscore', highscore);
  };

  const updateTimer = function (newTime) {
    time = newTime;
    document.querySelector('.time').textContent = time;
  };

  const startTimer = function () {
    updateTimer(60);
    timerInterval = setInterval(function () {
      time--;
      updateTimer(time);
      if (time === 0) {
        clearInterval(timerInterval);
        displayMessage('Time is up! You lost the game.');
        endGame();
      }
    }, 1000);
  };

  const endGame = function () {
    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
    document.querySelector('.again').textContent = 'Play Again';
  };

  const resetGame = function () {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    time = 60;
    displayMessage('Start guessing...');
    updateScore(score);
    updateTimer(time);
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('.guess').disabled = false;
    document.querySelector('.check').disabled = false;
    document.querySelector('.again').textContent = 'Again!';
    clearInterval(timerInterval);
    startTimer();
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  };

  document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
      displayMessage('⛔️ No number!');
    } else if (guess === secretNumber) {
      displayMessage('🎉 Correct Number!');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highscore) {
        updateHighscore(score);
      }

      clearInterval(timerInterval); // Clear the timer interval
      updateTimer(0); // Reset the timer to zero
      endGame();
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        updateScore(score);
      } else {
        displayMessage('💥 You lost the game!');
        updateScore(0);
        endGame();
      }
    }
  });

  document.querySelector('.again').addEventListener('click', resetGame);

  // Check if there is a highscore in local storage, and if so, set it
  if (localStorage.getItem('highscore')) {
    highscore = Number(localStorage.getItem('highscore'));
    updateHighscore(highscore);
  } else {
    // If there is no highscore in local storage, set it to 0
    highscore = 0;
    updateHighscore(highscore);
  }

  resetGame();
});
