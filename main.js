// CREATE RECT HELPER FUNCTION
const renderRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

// CREATE CIRCLE HELPER FUNCTION
const renderCircle = (x, y, radius, color) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};

const drawNet = () => {
  for (let i = 0; i < height; i += 40) {
    renderRect(width / 2 - 1, i, 2, 20, "white");
  }
};
// DRAW ALL RECTANGLES FN
const draw = () => {
  // CANVAS
  renderRect(0, 0, width, height, canvasColor);

  // SCORE DISPLAY
  canvasContext.fillStyle = "#000000";
  canvasContext.font = "30px Arial";
  canvasContext.fillText(score.player, width / 4, height / 3);
  canvasContext.fillText(score.AI, (width * 3) / 4 - width / 38, height / 3);

  // BALL
  renderCircle(ballX, ballY, ballSize / 2, ballColor);

  // PADDLE 1 - PLAYER
  renderRect(
    paddleWidth,
    playerPaddlePositionY,
    paddleWidth,
    paddleHeight,
    paddleColor
  );

  // PADDLE 2 - COOMPUTER
  renderRect(
    width - paddleWidth * 2,
    AIPaddlePositionY,
    paddleWidth,
    paddleHeight,
    paddleColor
  );
  drawNet();
};

const AIPaddleMove = () => {
  if (AIPaddlePositionY + paddleHeight / 3 > ballY) {
    AIPaddlePositionY -= AIPaddleSpeed;
  } else if (AIPaddlePositionY + paddleHeight - paddleHeight / 3 < ballY) {
    AIPaddlePositionY += AIPaddleSpeed;
  }
};

// BALL MOVEMENT
const move = () => {
  if (ballX >= width - ballSize / 2) {
    ballPositionReset("player");
  } else if (ballX <= 0) {
    ballPositionReset("AI");
  }
  if (ballY >= height - ballSize / 2 || ballY <= 0 + ballSize / 2)
    ballSpeedY = -ballSpeedY;

  // WHEN BALL HITS THE PADDLE (PLAYER SIDE)
  if (
    ballX <= paddleWidth * 2 &&
    ballX > paddleWidth &&
    ballY > playerPaddlePositionY - ballSize &&
    ballY < playerPaddlePositionY + paddleHeight + ballSize
  ) {
    ballBounce(playerPaddlePositionY);
  }

  if (
    ballX >= width - paddleWidth * 2 &&
    ballY > AIPaddlePositionY - ballSize &&
    ballY < AIPaddlePositionY + paddleHeight + ballSize
  ) {
    ballBounce(AIPaddlePositionY);
  }

  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
};

// MATHS FOR HOW THE BALL BEHAVES AFTER HITTING THE PADDLE
const ballBounce = (paddlepositionY) => {
  // IMPACT POINT INDICATES THE POINT WHERE THE BALL HIST THE PADDLE
  let impactPoint = ballY - paddlepositionY;

  // SPEED RATIO DECIDES THE SPEED (AND ANGLE) THE BALL WILL GO AFTER IT HITS THE PADDLE
  let speedRatio = Math.abs(paddleHeight / 2 - impactPoint) / 10 / 4;

  // IF THE IMPACT POINT IS ABOVE THE CENTRE OF PADDLE, THE BALL WILL GO UP
  if (impactPoint > paddleHeight / 2) {
    ballSpeedY = ballSpeed * speedRatio;
    // IF THE IMPACT POINT IS ABOVE THE CENTRE OF PADDLE, THE BALL WILL GO DOWN
  } else if (impactPoint < paddleHeight / 2) {
    ballSpeedY = -ballSpeed * speedRatio;
  }
  ballSpeedX = -ballSpeedX;
};

// CONTROL PLAYER PADDLE WITH MOUSE
const getMousePosition = (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseY = e.clientY - rect.top;
  return mouseY;
};

canvas.addEventListener("mousemove", (e) => {
  let mousePosY = getMousePosition(e);
  playerPaddlePositionY = mousePosY - paddleHeight / 2;
});

let startGameInterval;

const startGame = () => {
  clearInterval(startGameInterval);
  resetScore();
  startGameInterval = setInterval(() => {
    move();
    AIPaddleMove();
    draw();
  }, refreshRate);
};

startScreenStartButton.addEventListener("click", () => {
  startScreen.classList.add("inactive");
  startGame();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    startScreen.classList.remove("inactive");
    clearInterval(startGameInterval);
  }
});

const ballPositionReset = (pointFor) => {
  score[pointFor]++;
  if (score[pointFor] === winScore) {
    clearInterval(startGameInterval);
    scoreScreen.classList.remove("inactive");
    if (pointFor === "player") {
      scoreDisplay.textContent = "YOU WIN";
    } else {
      scoreDisplay.textContent = "YOU LOSE";
    }
  }
  ballX = width / 2 - ballSize / 2;
  ballY = height / 2 - ballSize / 2;
  ballSpeedX = ballSpeed;
  ballSpeedY = 0;
};

scoreScreenReplayButton.addEventListener("click", () => {
  scoreScreen.classList.add("inactive");
  startGame();
});

scoreScreenSettingsButton.addEventListener("click", () => {
  scoreScreen.classList.add("inactive");
  startScreen.classList.remove("inactive");
});
