// Importing countries
import countries from "./countries.json" assert { type: "json" };

// Selecting elements
let startScreen = document.querySelector(".startScreen");
let gameScreen = document.querySelector(".gameScreen");
let endScreen = document.querySelector(".endScreen");
let startBtn = document.querySelector(".startBtn");
let highScoreEl = document.querySelector(".highScore");
let scoreEl = document.querySelector(".score");
let healthEl = document.querySelector(".health");
let flag = document.querySelector(".flag");
let answer1 = document.querySelector(".option1");
let answer2 = document.querySelector(".option2");
let answer3 = document.querySelector(".option3");
let answer4 = document.querySelector(".option4");
let endScore = document.querySelector(".endScore");
let tryAgain = document.querySelector(".tryAgain");

// Variables
let highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;
let score = 0;
let health = 3;
let countryName;
let answerArray = [answer1, answer2, answer3, answer4];
let trueAnswer;

// Starting game
startBtn.addEventListener("click", () => {
    gameScreen.style.display = "flex";
    startScreen.style.display = "none";
});

// Preparing information part
window.onload = () => {
    getRandomFlag();
    highScoreEl.innerHTML = highScore;
    scoreEl.innerHTML = score;
    healthEl.innerHTML = health;
};

const getRandomFlag = () => {
    // Selecting true answer and wrong answers
    let randomSelectedAnswer = Math.floor(Math.random() * 4);
    trueAnswer = answerArray[randomSelectedAnswer];
    let wrongAnswers = answerArray.filter((val, index, el) => {
        if (val == trueAnswer) {
            // Do nothing
        } else {
            return val;
        }
    });

    // Getting random country
    let random = Math.floor(Math.random() * countries.length);
    countryName = countries[random].name;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((res) => res.json())
        .then((res) => {
            flag.setAttribute("src", res["0"].flags.png);
            trueAnswer.innerHTML = res["0"].name.common;

            wrongAnswers.forEach((answer) => {
                let random = Math.floor(Math.random() * countries.length + 1);
                countryName = countries[random].name;
                answer.innerHTML = countryName;
            });

            console.log(res["0"].name.common);
        });
};

// Checking answer
answerArray.forEach((answer) => {
    answer.onclick = () => {
        if (answer == trueAnswer) {
            score++;
            scoreEl.innerHTML = score;
        } else {
            health--;

            if (health === 0) {
                if (score > highScoreEl.innerHTML) {
                    localStorage.setItem("highScore", score);
                    highScoreEl.innerHTML = score;
                }

                endScore.innerHTML = score;

                health = 3;
                score = 0;
                scoreEl.innerHTML = score;
                endScreen.style.display = "flex";
                gameScreen.style.display = "none";
            }

            healthEl.innerHTML = health;
        }

        getRandomFlag();
    };
});

// Try again button
tryAgain.onclick = () => {
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";
};
