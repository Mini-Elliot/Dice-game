"use strict";
// Elements
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score1El = document.getElementById("score--0");
const score2El = document.getElementById("score--1");

const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

const winningScoreEl = document.querySelector(".winning-score");

// modal
const modal = document.querySelector(".announcement");
const overlay = document.querySelector(".overlay");
const closeModalBtn1 = document.querySelector(".close-btn");
const closeModalBtn2 = document.querySelector(".close-modal");
const playAgain = document.querySelector(".play-again");
const message = document.querySelector(".announcement__body");

const hideModal = () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
};

// variable
let currentScore, scores, activePlayer;
const winningScore = 50;
winningScoreEl.textContent = `Score required: ${50}`;

score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add("hidden");

const init = () => {
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    diceEl.classList.add("hidden");
    rollBtn.removeAttribute("disabled");
    holdBtn.removeAttribute("disabled");
    score1El.textContent = 0;
    score2El.textContent = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

init();

const switchPlayers = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

rollBtn.addEventListener("click", function () {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        switchPlayers();
    }
});

holdBtn.addEventListener("click", function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }, // y=0 top, y=1 bottom
        });
        diceEl.classList.add("hidden");
        rollBtn.setAttribute("disabled", "");
        holdBtn.setAttribute("disabled", "");
        overlay.classList.remove("hidden");
        modal.classList.remove("hidden");
        message.textContent = `🎉 YAY! Player ${
            scores[0] > winningScore ? 1 : 2
        } Wins the game.`;
    }
    switchPlayers();
});

closeModalBtn1.addEventListener("click", function () {
    hideModal();
});

closeModalBtn2.addEventListener("click", function () {
    hideModal();
});

if (!overlay.classList.contains("hidden")) {
    document.addEventListener("click", function () {
        hideModal();
    });
}

newBtn.addEventListener("click", init);

playAgain.addEventListener("click", function () {
    hideModal();
    init();
});
