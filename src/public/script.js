// Importing countries
import countries from "./countries.json" assert { type: "json" };

// Selecting elements
let highScoreEl = document.querySelector(".highScore");
let scoreEl = document.querySelector(".score");
let healthEl = document.querySelector(".health");
let flagEl = document.querySelector(".flag");
let answerInput = document.querySelector(".answerInput");
let submitBtn = document.querySelector(".submitBtn");
let modalContainer = document.querySelector(".modalContainer");
let modal = document.querySelector(".modal");
let startBtn = document.querySelector(".startBtn");
let title = document.querySelector(".title");
let subTitle = document.querySelector(".subTitle");

// Creating values
let highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;
let score = 0;
let health = 3;

// Other variables
let random;
let countryName;

// Random flag select function
const getRandomFlag = () => {
    random = Math.floor(Math.random() * countries.length + 1);
    countryName = countries[random].name;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((res) => res.json())
        .then((res) => {
            flagEl.setAttribute("src", res["0"].flags.png);
        });
};

// Submit answer function
const submitAnswer = () => {
    if (answerInput.value.toLowerCase() === countryName.toLowerCase()) {
        score++;
        scoreEl.innerHTML = score;
        answerInput.value = "";
    } else {
        health--;
        answerInput.value = "";

        if (health === 0) {
            if (score > highScoreEl.innerHTML) {
                localStorage.setItem("highScore", score);
                highScoreEl.innerHTML = score;
            }

            title.innerHTML = "You lose";
            subTitle.innerHTML = "Press start button to try again";
            startBtn.innerHTML = "Try Again";
            modalContainer.style.zIndex = 10;
            modal.style.display = "flex";
            startBtn.focus();

            health = 3;
            score = 0;
            scoreEl.innerHTML = score;
        }

        healthEl.innerHTML = health;
    }

    getRandomFlag();
};

// Starting game
startBtn.addEventListener("click", () => {
    modalContainer.style.zIndex = -10;
    modal.style.display = "none";
    answerInput.focus();
});

// Settings highScore, score and health
window.addEventListener("load", () => {
    highScoreEl.innerHTML = highScore;
    scoreEl.innerHTML = score;
    healthEl.innerHTML = health;
});

// Submitting answer
submitBtn.addEventListener("click", submitAnswer);

// Submitting answer with keyboard
answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submitAnswer();
    }
});

getRandomFlag();
