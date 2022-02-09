/*-------------------------------------------------------------------------------------------*/
/*-----------------------------------------DARK MODE-----------------------------------------*/
/*-------------------------------------------------------------------------------------------*/

let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-btn");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");

  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

/* -------------------------------------------------------------------------------------------*/
/* --------------------------------------Hand Visibility--------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

document.getElementById("u-rock").style.visibility = "visible";
document.getElementById("u-paper").style.visibility = "hidden";
document.getElementById("u-scissors").style.visibility = "hidden";
document.getElementById("c-rock").style.visibility = "visible";
document.getElementById("c-paper").style.visibility = "hidden";
document.getElementById("c-scissors").style.visibility = "hidden";

/* -------------------------------------------------------------------------------------------*/
/* ---------------------------------------Invalid Input---------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

let inputValue = document.getElementById("input-js");
let inputIsValid;
document.getElementById("invalid-input").style.visibility = "hidden";
const inputValidate = () => {
  if (inputValue.value < 1) {
    document.getElementById("invalid-input").style.visibility = "visible";
    inputIsValid = 0;
  } else if (inputValue.value % 2 == 0) {
    document.getElementById("invalid-input").style.visibility = "visible";
    inputIsValid = 0;
  } else if (inputValue.value > 1000) {
    document.getElementById("invalid-input").style.visibility = "visible";
    inputIsValid = 0;
  } else {
    document.getElementById("invalid-input").style.visibility = "hidden";
    inputIsValid = 1;
  }
};

/* -------------------------------------------------------------------------------------------*/
/* --------------------------------------First to x wins--------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

document.getElementById("round-text").style.visibility = "hidden";

let targetScore;
const getTargetScore = () => {
  inputValue.value++;
  targetScore = inputValue.value / 2;
  document.getElementById("number-of-rounds").innerHTML = targetScore;
};

const resetTargetScore = () => {
  inputValue.value--; //getTargetScore adds one to the input value when the "change series" button is clicked. this corrects that
};

/* -------------------------------------------------------------------------------------------*/
/* -----------------------------------Confirm Input Button------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

let confirmLatchMode;
document.getElementById("best-of-hidden").style.visibility = "hidden";
document.getElementById("series").style.visibility = "hidden";

const confirmButtonToggle = document.querySelector("#toggle-btn");
const changeSeriesToggle = document.querySelector("#series");

const setSeriesButton = () => {
  document.getElementById("series").style.visibility = "hidden";
  document.getElementById("best-of-visibility").style.visibility = "visible";
  document.getElementById("best-of-hidden").style.visibility = "hidden";
};

const disableLatchButton = () => {
  document.getElementById("toggle-btn").classList.add("confirm-latch");
  document.getElementById("toggle-btn").classList.remove("confirm-btn");
  document.getElementById("toggle-btn").style.visibility = "hidden";
  confirmLatchMode = 1;
  confirmButtonToggle.disabled = true;
};

const enableLatchButton = () => {
  document.getElementById("toggle-btn").classList.add("confirm-btn");
  document.getElementById("toggle-btn").classList.remove("confirm-latch");
  document.getElementById("toggle-btn").style.visibility = "visible";
  confirmLatchMode = 0;
  confirmButtonToggle.disabled = false;
};

confirmButtonToggle.addEventListener("click", () => {
  if (confirmLatchMode !== 1 && inputIsValid == 1) {
    disableLatchButton();
    document.getElementById("best-of-visibility").style.visibility = "hidden";
    document.getElementById("best-of-hidden").style.visibility = "visible";
    document.getElementById("series").style.visibility = "visible";
    document.getElementById("best-of-final").innerHTML = inputValue.value;
    document.getElementById("invalid-check").style.visibility = "hidden";
    document.getElementById("round-text").style.visibility = "visible";
    getTargetScore();
  } else {
    enableLatchButton();
  }
});

changeSeriesToggle.addEventListener("click", () => {
  setSeriesButton();
  enableLatchButton();
  confirmButtonToggle.disabled = false;
  resetTargetScore();
});

/* -------------------------------------------------------------------------------------------*/
/* --------------------------------------Picker Buttons---------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

let handState;
let goState;
let choice;
let choice2;
let userRockVisible;
let opponentRockVisible;

const rockToggle = document.querySelector("#rock-btn");
const paperToggle = document.querySelector("#paper-btn");
const scissorsToggle = document.querySelector("#scissors-btn");

const unlatchRock = () => {
  document.getElementById("rock-btn").classList.add("picker-btn");
  document.getElementById("rock-btn").classList.remove("picker-latch");
  choice2 = null;
  goState = 0;
  handState = 0;
};

const unlatchPaper = () => {
  document.getElementById("paper-btn").classList.add("picker-btn");
  document.getElementById("paper-btn").classList.remove("picker-latch");
  choice2 = null;
  goState = 0;
  handState = 0;
};

const unlatchScissors = () => {
  document.getElementById("scissors-btn").classList.add("picker-btn");
  document.getElementById("scissors-btn").classList.remove("picker-latch");
  choice2 = null;
  goState = 0;
  handState = 0;
};

const latchRock = () => {
  document.getElementById("rock-btn").classList.add("picker-latch");
  document.getElementById("rock-btn").classList.remove("picker-btn");
  handState = 1;
  goState = 1;
  choice2 = "rock";
};

const latchPaper = () => {
  document.getElementById("paper-btn").classList.add("picker-latch");
  document.getElementById("paper-btn").classList.remove("picker-btn");
  handState = 2;
  goState = 1;
  choice2 = "paper";
};

const latchScissors = () => {
  document.getElementById("scissors-btn").classList.add("picker-latch");
  document.getElementById("scissors-btn").classList.remove("picker-btn");
  handState = 3;
  goState = 1;
  choice2 = "scissors";
};

const goStateResult = () => {
  if (choice !== "rock" || choice !== "paper" || choice !== "scissors") {
    goState = 0;
  }
};

rockToggle.addEventListener("click", () => {
  if (handState !== 1) {
    unlatchPaper();
    unlatchScissors();
    latchRock();
    choice = "rock";
    document.getElementById("picker-check").style.visibility = "hidden";
  } else {
    unlatchRock();
  }
});

paperToggle.addEventListener("click", () => {
  if (handState !== 2) {
    unlatchRock();
    unlatchScissors();
    latchPaper();
    choice = "paper";
    document.getElementById("picker-check").style.visibility = "hidden";
  } else {
    unlatchPaper();
  }
});

scissorsToggle.addEventListener("click", () => {
  if (handState !== 3) {
    unlatchRock();
    unlatchPaper();
    latchScissors();
    choice = "scissors";
    document.getElementById("picker-check").style.visibility = "hidden";
  } else {
    unlatchScissors();
  }
});

/* -------------------------------------------------------------------------------------------*/
/* -----------------------------------------Go Button-----------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

const goToggle = document.querySelector("#go-btn");
let startGame;
document.getElementById("invalid-check").style.visibility = "hidden";
document.getElementById("picker-check").style.visibility = "hidden";

const startButtonGo = () => {
  document.getElementById("go-btn").classList.add("go-toggle-btn");
  document.getElementById("go-btn").classList.remove("start-game-btn");
  startGame = 1;
  rockToggle.disabled = true;
  paperToggle.disabled = true;
  scissorsToggle.disabled = true;
  goToggle.disabled = true;
};

const startButtonGoUnlatched = () => {
  document.getElementById("go-btn").classList.remove("go-toggle-btn");
  document.getElementById("go-btn").classList.add("start-game-btn");
  startGame = 0;
  rockToggle.disabled = false;
  paperToggle.disabled = false;
  scissorsToggle.disabled = false;
  goToggle.disabled = false;
};

const goVisibilityBegin = () => {
  document.getElementById("user-hand-bounce").classList.add("hand-animation");
  document
    .getElementById("computer-hand-bounce")
    .classList.add("hand-animation");
  document.getElementById("series").style.visibility = "hidden";
  document.getElementById("toggle-btn").style.visibility = "hidden";
  document.getElementById("invalid-check").style.visibility = "hidden";
  document.getElementById("picker-check").style.visibility = "hidden";
};

const goVisibilityEnd = () => {
  document
    .getElementById("user-hand-bounce")
    .classList.remove("hand-animation");
  document
    .getElementById("computer-hand-bounce")
    .classList.remove("hand-animation");
};

//the go button calls many functions to "start" the game
//the setTimeouts are used for animations and to make sure things such as scores aren't displayed too early

goToggle.addEventListener("click", () => {
  if (startGame !== 1 && goState == 1 && confirmLatchMode == 1) {
    startButtonGo();
    random();
    score();
    rockAnimation();
    goVisibilityBegin();
    setTimeout(firstTimer, 1200);
    setTimeout(secondTimer, 2125);
    setTimeout(userSelection, 2125);
    setTimeout(opponentSelection, 2125);
    setTimeout(startWinnerTransition, 3125);
    setTimeout(startLoserTransition, 3125);
    setTimeout(startDrawTransition, 3125);
    setTimeout(endWinnerTransition, 3125);
    setTimeout(endLoserTransition, 3125);
    setTimeout(endDrawTransition, 3125);
    setTimeout(scoreDisplay, 3125);
    setTimeout(nextRound, 4225);
    setTimeout(resultFinal, 4725);
  } else if (startGame !== 1 && goState !== 1 && confirmLatchMode == 1) {
    document.getElementById("invalid-check").style.visibility = "hidden";
    document.getElementById("picker-check").style.visibility = "visible";
  } else {
    document.getElementById("invalid-check").style.visibility = "visible";
    document.getElementById("picker-check").style.visibility = "hidden";
  }
});

/* -------------------------------------------------------------------------------------------*/
/* ----------------------------------Random Number Generator----------------------------------*/
/* -------------------------------------------------------------------------------------------*/

//random number generated for the computer selection

let randomNum;

const random = () => {
  randomNum = Math.floor(Math.random() * 3 + 1);
};

/* -------------------------------------------------------------------------------------------*/
/* --------------------------------------Time Animation---------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

const firstTimer = () => {
  document
    .getElementById("user-hand-bounce")
    .classList.add("animation-invisible");
  document
    .getElementById("computer-hand-bounce")
    .classList.add("animation-invisible");
};

const disableFirstTimer = () => {
  document
    .getElementById("user-hand-bounce")
    .classList.remove("animation-invisible");
  document
    .getElementById("computer-hand-bounce")
    .classList.remove("animation-invisible");
};

const secondTimer = () => {
  document
    .getElementById("computer-hand-bounce")
    .classList.add("animation-visible");
  document
    .getElementById("user-hand-bounce")
    .classList.add("animation-visible");
};

const disableSecondTimer = () => {
  document
    .getElementById("computer-hand-bounce")
    .classList.remove("animation-visible");
  document
    .getElementById("user-hand-bounce")
    .classList.remove("animation-visible");
};

const rockAnimation = () => {
  document.getElementById("u-paper").style.visibility = "hidden";
  document.getElementById("u-rock").style.visibility = "visible";
  document.getElementById("u-scissors").style.visibility = "hidden";
  document.getElementById("c-paper").style.visibility = "hidden";
  document.getElementById("c-rock").style.visibility = "visible";
  document.getElementById("c-scissors").style.visibility = "hidden";
};

const userSelection = () => {
  if (choice == "paper") {
    document.getElementById("u-paper").style.visibility = "visible";
    document.getElementById("u-rock").style.visibility = "hidden";
    document.getElementById("u-scissors").style.visibility = "hidden";
    userRockVisible = 0;
  } else if (choice == "scissors") {
    document.getElementById("u-scissors").style.visibility = "visible";
    document.getElementById("u-rock").style.visibility = "hidden";
    document.getElementById("u-paper").style.visibility = "hidden";
    userRockVisible = 0;
  } else {
    document.getElementById("u-scissors").style.visibility = "hidden";
    document.getElementById("u-rock").style.visibility = "visible";
    document.getElementById("u-paper").style.visibility = "hidden";
    userRockVisible = 1;
  }
};

const opponentSelection = () => {
  if (randomNum == 2) {
    document.getElementById("c-paper").style.visibility = "visible";
    document.getElementById("c-rock").style.visibility = "hidden";
    document.getElementById("c-scissors").style.visibility = "hidden";
    opponentRockVisible = 0;
  } else if (randomNum == 3) {
    document.getElementById("c-scissors").style.visibility = "visible";
    document.getElementById("c-rock").style.visibility = "hidden";
    document.getElementById("c-paper").style.visibility = "hidden";
    opponentRockVisible = 0;
  } else {
    document.getElementById("c-scissors").style.visibility = "hidden";
    document.getElementById("c-rock").style.visibility = "visible";
    document.getElementById("c-paper").style.visibility = "hidden";
    opponentRockVisible = 1;
  }
};

/* -------------------------------------------------------------------------------------------*/
/* -------------------------------------Scoreboard Logic--------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

let userScore = 0;
let opponentScore = 0;
let userScoreForResult;
let opponentScoreForResult;

const score = () => {
  if (
    (handState == 1 && randomNum == 2) ||
    (handState == 2 && randomNum == 3) ||
    (handState == 3 && randomNum == 1)
  ) {
    opponentScore += 1;
    opponentScoreForResult++;
    setTimeout(() => {
      document.getElementById("live-user-score").innerHTML = userScore;
      document.getElementById("live-opponent-score").innerHTML = opponentScore;
      document.getElementById("final-user-score").innerHTML = userScore;
      document.getElementById("final-opponent-score").innerHTML = opponentScore;
    }, 3225);
  } else if (
    (handState == 1 && randomNum == 3) ||
    (handState == 2 && randomNum == 1) ||
    (handState == 3 && randomNum == 2)
  ) {
    userScore += 1;
    userScoreForResult++;
    setTimeout(() => {
      document.getElementById("live-user-score").innerHTML = userScore;
      document.getElementById("live-opponent-score").innerHTML = opponentScore;
      document.getElementById("final-user-score").innerHTML = userScore;
      document.getElementById("final-opponent-score").innerHTML = opponentScore;
    }, 3225);
  } else {
    setTimeout(() => {
      document.getElementById("live-user-score").innerHTML = userScore;
      document.getElementById("live-opponent-score").innerHTML = opponentScore;
      document.getElementById("final-user-score").innerHTML = userScore;
      document.getElementById("final-opponent-score").innerHTML = opponentScore;
    }, 3225);
    userScore += 0;
    userScoreForResult += 0;
    opponentScoreForResult += 0;
  }
};

/* -------------------------------------------------------------------------------------------*/
/* ----------------------------------Win-Lose-Draw Displays-----------------------------------*/
/* -------------------------------------------------------------------------------------------*/

//document.getElementById("win-lose-draw-display").style.visibility = "hidden";

const startWinnerTransition = () => {
  if (
    (handState === 1 && randomNum === 3) ||
    (handState === 2 && randomNum === 1) ||
    (handState === 3 && randomNum === 2)
  ) {
    document
      .getElementById("user-player-text")
      .classList.add("score-animation-visible");
    document
      .getElementById("user-player-text")
      .classList.remove("score-animation-invisible");
    document
      .getElementById("winner-w")
      .classList.add("popup-display-animation-visible");
    document
      .getElementById("winner-w")
      .classList.remove("popup-display-animation-invisible");
    setTimeout(() => {
      document
        .getElementById("winner-i")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("winner-i")
        .classList.remove("popup-display-animation-invisible");
    }, 150);
    setTimeout(() => {
      document
        .getElementById("winner-n")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("winner-n")
        .classList.remove("popup-display-animation-invisible");
    }, 300);
    setTimeout(() => {
      document
        .getElementById("winner-n1")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("winner-n1")
        .classList.remove("popup-display-animation-invisible");
    }, 450);
    setTimeout(() => {
      document
        .getElementById("winner-e")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("winner-e")
        .classList.remove("popup-display-animation-invisible");
    }, 600);
    setTimeout(() => {
      document
        .getElementById("winner-r")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("winner-r")
        .classList.remove("popup-display-animation-invisible");
    }, 750);
  } else {
    return;
  }
};

const startLoserTransition = () => {
  if (
    (handState === 2 && randomNum === 3) ||
    (handState === 3 && randomNum === 1) ||
    (handState === 1 && randomNum === 2)
  ) {
    document
      .getElementById("computer-player-text")
      .classList.add("score-animation-visible");
    document
      .getElementById("computer-player-text")
      .classList.remove("score-animation-invisible");
    document
      .getElementById("loser-l")
      .classList.add("popup-display-animation-visible");
    document
      .getElementById("loser-l")
      .classList.remove("popup-display-animation-invisible");
    setTimeout(() => {
      document
        .getElementById("loser-o")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("loser-o")
        .classList.remove("popup-display-animation-invisible");
    }, 187);
    setTimeout(() => {
      document
        .getElementById("loser-s")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("loser-s")
        .classList.remove("popup-display-animation-invisible");
    }, 375);
    setTimeout(() => {
      document
        .getElementById("loser-e")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("loser-e")
        .classList.remove("popup-display-animation-invisible");
    }, 562);
    setTimeout(() => {
      document
        .getElementById("loser-r")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("loser-r")
        .classList.remove("popup-display-animation-invisible");
    }, 750);
  } else {
    return;
  }
};

const startDrawTransition = () => {
  if (
    (handState === 1 && randomNum === 1) ||
    (handState === 2 && randomNum === 2) ||
    (handState === 3 && randomNum === 3)
  ) {
    document
      .getElementById("draw-d")
      .classList.add("popup-display-animation-visible");
    document
      .getElementById("draw-d")
      .classList.remove("popup-display-animation-invisible");
    // }, 1);
    setTimeout(() => {
      document
        .getElementById("draw-r")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("draw-r")
        .classList.remove("popup-display-animation-invisible");
    }, 200);
    setTimeout(() => {
      document
        .getElementById("draw-a")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("draw-a")
        .classList.remove("popup-display-animation-invisible");
    }, 400);
    setTimeout(() => {
      document
        .getElementById("draw-w")
        .classList.add("popup-display-animation-visible");
      document
        .getElementById("draw-w")
        .classList.remove("popup-display-animation-invisible");
    }, 600);
  } else {
    return;
  }
};

const endWinnerTransition = () => {
  setTimeout(() => {
    if (
      (handState === 1 && randomNum === 3) ||
      (handState === 2 && randomNum === 1) ||
      (handState === 3 && randomNum === 2)
    ) {
      document
        .getElementById("user-player-text")
        .classList.add("score-animation-invisible");
      document
        .getElementById("user-player-text")
        .classList.remove("score-animation-visible");
      document
        .getElementById("winner-w")
        .classList.add("popup-display-animation-invisible");
      document
        .getElementById("winner-w")
        .classList.remove("popup-display-animation-visible");
      setTimeout(() => {
        document
          .getElementById("winner-i")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("winner-i")
          .classList.remove("popup-display-animation-visible");
      }, 150);
      setTimeout(() => {
        document
          .getElementById("winner-n")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("winner-n")
          .classList.remove("popup-display-animation-visible");
      }, 300);
      setTimeout(() => {
        document
          .getElementById("winner-n1")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("winner-n1")
          .classList.remove("popup-display-animation-visible");
      }, 450);
      setTimeout(() => {
        document
          .getElementById("winner-e")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("winner-e")
          .classList.remove("popup-display-animation-visible");
      }, 600);
      setTimeout(() => {
        document
          .getElementById("winner-r")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("winner-r")
          .classList.remove("popup-display-animation-visible");
      }, 750);
    } else {
      return;
    }
  }, 750);
};

const endLoserTransition = () => {
  setTimeout(() => {
    if (
      (handState === 2 && randomNum === 3) ||
      (handState === 3 && randomNum === 1) ||
      (handState === 1 && randomNum === 2)
    ) {
      document
        .getElementById("computer-player-text")
        .classList.add("score-animation-invisible");
      document
        .getElementById("computer-player-text")
        .classList.remove("score-animation-visible");
      document
        .getElementById("loser-l")
        .classList.add("popup-display-animation-invisible");
      document
        .getElementById("loser-l")
        .classList.remove("popup-display-animation-visible");
      setTimeout(() => {
        document
          .getElementById("loser-o")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("loser-o")
          .classList.remove("popup-display-animation-visible");
      }, 187);
      setTimeout(() => {
        document
          .getElementById("loser-s")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("loser-s")
          .classList.remove("popup-display-animation-visible");
      }, 375);
      setTimeout(() => {
        document
          .getElementById("loser-e")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("loser-e")
          .classList.remove("popup-display-animation-visible");
      }, 562);
      setTimeout(() => {
        document
          .getElementById("loser-r")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("loser-r")
          .classList.remove("popup-display-animation-visible");
      }, 750);
    } else {
      return;
    }
  }, 750);
};

const endDrawTransition = () => {
  setTimeout(() => {
    if (
      (handState === 1 && randomNum === 1) ||
      (handState === 2 && randomNum === 2) ||
      (handState === 3 && randomNum === 3)
    ) {
      document
        .getElementById("draw-d")
        .classList.add("popup-display-animation-invisible");
      document
        .getElementById("draw-d")
        .classList.remove("popup-display-animation-visible");
      setTimeout(() => {
        document
          .getElementById("draw-r")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("draw-r")
          .classList.remove("popup-display-animation-visible");
      }, 200);
      setTimeout(() => {
        document
          .getElementById("draw-a")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("draw-a")
          .classList.remove("popup-display-animation-visible");
      }, 400);
      setTimeout(() => {
        document
          .getElementById("draw-w")
          .classList.add("popup-display-animation-invisible");
        document
          .getElementById("draw-w")
          .classList.remove("popup-display-animation-visible");
      }, 600);
    } else {
      return;
    }
  }, 600);
};

document.getElementById("user-score-display").style.visibility = "visible";

const scoreDisplay = () => {
  document.getElementById("user-score-display").style.visibility = "visible";
  document.getElementById("user-score-placeholder").style.visibility = "hidden";
  document.getElementById("opponent-score-display").style.visibility =
    "visible";
  document.getElementById("opponent-score-placeholder").style.visibility =
    "hidden";
};

/* -------------------------------------------------------------------------------------------*/
/* ----------------------------------------Next Round-----------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

//this function essentially resets the game while keeping the score and series intact for each new round

const nextRound = () => {
  unlatchRock();
  unlatchPaper();
  unlatchScissors();
  startButtonGoUnlatched();
  goVisibilityEnd();
  disableFirstTimer();
  disableSecondTimer();
  disableLatchButton();
  goStateResult();
};

/* -------------------------------------------------------------------------------------------*/
/* ---------------------------------------Final Display---------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

document.getElementById("final-display").style.visibility = "hidden";

const resultFinal = () => {
  if (targetScore === userScore || targetScore === opponentScore) {
    disableGameButtons();
    resultFinalDisplay();
    document.getElementById("final-display").style.visibility = "visible";
  } else {
    document.getElementById("final-display").style.visibility = "hidden";
  }
};

disableGameButtons = () => {
  rockToggle.disabled = true;
  paperToggle.disabled = true;
  scissorsToggle.disabled = true;
  goToggle.disabled = true;
  confirmButtonToggle.disabled = true;
  quitToggle.disabled = true;
};

enableGameButtons = () => {
  rockToggle.disabled = false;
  paperToggle.disabled = false;
  scissorsToggle.disabled = false;
  goToggle.disabled = false;
  confirmButtonToggle.disabled = false;
  quitToggle.disabled = false;
};

const resultFinalDisplay = () => {
  if (targetScore === userScore) {
    document.getElementById("display-win").style.visibility = "visible";
    document.getElementById("display-lose").style.visibility = "hidden";
  } else {
    document.getElementById("display-win").style.visibility = "hidden";
    document.getElementById("display-lose").style.visibility = "visible";
  }
};

const quitToggle = document.querySelector("#end-game");
let quitDisplayValue;
document.getElementById("quit-display").style.visibility = "hidden";

quitToggle.addEventListener("click", () => {
  document.getElementById("quit-display").style.visibility = "visible";
  quitDisplayValue = 1;
});

const closeXToggle = document.querySelector("#button-close");
const closeQuitToggle = document.querySelector("#quit-cancelled");

closeXToggle.addEventListener("click", () => {
  quitDisplay();
});

closeQuitToggle.addEventListener("click", () => {
  quitDisplay();
});

const quitDisplay = () => {
  if (quitDisplayValue === 1) {
    document.getElementById("quit-display").style.visibility = "hidden";
    quitDisplayValue = 0;
  } else {
    document.getElementById("quit-display").style.visibility = "visible";
  }
};

/* -------------------------------------------------------------------------------------------*/
/* -----------------------------------------End Game------------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

const closeX1Toggle = document.querySelector("#button-close1");
let quitDisplayValue1;

closeX1Toggle.addEventListener("click", () => {
  quit1Display();
});

const quit1Display = () => {
  document.getElementById("final-display").style.visibility = "hidden";
  document.getElementById("display-win").style.visibility = "hidden";
  document.getElementById("display-lose").style.visibility = "hidden";
};

const confirmQuitToggle = document.querySelector("#quit-game-btn");
const endGameToggle = document.querySelector("#end-game-confirm");

const endGame = () => {
  setTimeout(() => {
    location.reload();
  }, 100);
};

confirmQuitToggle.addEventListener("click", () => {
  endGame();
});

endGameToggle.addEventListener("click", () => {
  endGame();
});

closeX1Toggle.addEventListener("click", () => {
  endGame();
});

/* -------------------------------------------------------------------------------------------*/
/* ----------------------------------------Play Again-----------------------------------------*/
/* -------------------------------------------------------------------------------------------*/

const playAgainToggle = document.querySelector("#play-again-btn");

const playAgain = () => {
  userScore = 0;
  opponentScore = 0;
  userScoreForResult = 0;
  opponentScoreForResult = 0;
  document.getElementById("live-user-score").innerHTML = userScore;
  document.getElementById("live-opponent-score").innerHTML = opponentScore;
};

playAgainToggle.addEventListener("click", () => {
  quit1Display();
  nextRound();
  playAgain();
  rockAnimation();
  enableGameButtons();
});
