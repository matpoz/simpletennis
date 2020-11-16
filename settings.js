const canvas = document.getElementById("gameCanvas");

// START SCREEN AND SCORE SCREEN ELEMENTS
const startScreen = document.getElementById("startScreen");

// POPULATE POINTS DROPDOWN WITH OPTIONS BEFORE SELECTING ALL BUTTONS
const pointsDropdown = document.querySelector(".dropdown-points");

for (let i = 1; i <= 20; i++) {
  let dropdownElement = document.createElement("div");
  dropdownElement.innerHTML = `<div type="points" class="dropdown-item" value=${i}>${i}</div>`;
  pointsDropdown.appendChild(dropdownElement);
}

const startScreenSettingsButtonsAll = [
  ...document.querySelectorAll(".dropdown-item"),
];
const startScreenStartButton = document.getElementById("startGame");
const difficultyDisplay = document.getElementById("difficulty-display");
const speedDisplay = document.getElementById("speed-display");
const sizeDisplay = document.getElementById("size-display");
const scoreScreen = document.getElementById("scoreScreen");
const scoreScreenReplayButton = document.getElementById(
  "scoreScreen-btnReplay"
);
const scoreScreenSettingsButton = document.getElementById(
  "scoreScreen-btnSettings"
);
const scoreDisplay = document.getElementById("scoreScreen-scoreDisplay");
const pointsDisplay = document.getElementById("points-display");

// CANVAS CONTEXT
const canvasContext = canvas.getContext("2d");

difficultyDisplay.textContent = "medium";
speedDisplay.textContent = "normal";
sizeDisplay.textContent = "medium";

// SCORE
let score = { player: 0, AI: 0 };
let winScore = 3;
pointsDisplay.textContent = winScore;
const resetScore = () => {
  score.player = 0;
  score.AI = 0;
};

// CANVAS SIZE
let width = 600;
let height = 500;

canvas.width = width;
canvas.height = height;
// COLOURS
let paddleColor = "#8B6141";
let ballColor = "#F9CB40";
let canvasColor = "#24A810";

// GAME REFRESH RATE
const framesPerSecond = 60;
const refreshRate = 1000 / framesPerSecond;

// BALL SPEED
let ballSpeed = 8;

let ballSpeeds = {
  low: 4,
  medium: 8,
  high: 10,
};

let ballSpeedX = ballSpeed;
let ballSpeedY = 0;

const changeBallSpeed = () => {
  ballSpeedX = ballSpeed;
  ballSpeedY = 0;
};

// AI PADDLE SPEED - DIFFICULTY
let AIPaddleSpeeds = {
  low: ballSpeed / 2,
  medium: (ballSpeed * 2) / 3,
  high: ballSpeed,
};

let AIPaddleSpeed = AIPaddleSpeeds.medium;

// ELEMENTS SIZE
let ballSize = 15;
let paddleHeight = height / 5;
let paddleWidth = 10;

// BALL INITIAL POSITION
let ballX = width / 2 - ballSize / 2;
let ballY = height / 2 - ballSize / 2;

// INITIAL PADDLE POSITION
let playerPaddlePositionY = height / 2 - paddleHeight / 2;
let AIPaddlePositionY = height / 2 - paddleHeight / 2;

const resetElements = () => {
  paddleHeight = height / 5;
  paddleWidth = 10;
  ballX = width / 2 - ballSize / 2;
  ballY = height / 2 - ballSize / 2;
  playerPaddlePositionY = height / 2 - paddleHeight / 2;
  AIPaddlePositionY = height / 2 - paddleHeight / 2;
};

for (let button of startScreenSettingsButtonsAll) {
  button.addEventListener("click", (e) => {
    let type = e.target.getAttribute("type");
    let value = e.target.getAttribute("value");

    if (type === "difficulty") {
      switch (value) {
        case "low":
          AIPaddleSpeed = AIPaddleSpeeds.low;
          difficultyDisplay.textContent = "low";
          break;
        case "medium":
          AIPaddleSpeed = AIPaddleSpeeds.medium;
          difficultyDisplay.textContent = "medium";
          break;
        case "high":
          AIPaddleSpeed = AIPaddleSpeeds.high;
          difficultyDisplay.textContent = "high";
          break;
      }
    } else if (type === "speed") {
      switch (value) {
        case "low":
          ballSpeed = ballSpeeds.low;
          speedDisplay.textContent = "slow";
          break;
        case "medium":
          ballSpeed = ballSpeeds.medium;
          speedDisplay.textContent = "normal";
          break;
        case "high":
          ballSpeed = ballSpeeds.high;
          speedDisplay.textContent = "fast";
          break;
      }
      changeBallSpeed();
    } else if (type === "size") {
      switch (value) {
        case "small":
          {
            width = 300;
            height = 220;
            sizeDisplay.textContent = "small";
          }
          break;
        case "medium":
          {
            width = 600;
            height = 450;
            sizeDisplay.textContent = "medium";
          }
          break;
        case "big":
          {
            width = 800;
            height = 600;
            sizeDisplay.textContent = "big";
          }
          break;
      }
      resetElements();
    }
    if (type === "points") {
      winScore = Number(value);
      pointsDisplay.textContent = winScore;
    }
    canvas.width = width;
    canvas.height = height;
  });
}
