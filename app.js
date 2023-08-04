let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;
const colors = ["red", "green", "blue", "yellow"];

let statusHeading = document.querySelector("h2");
const buttons = document.querySelectorAll(".button");
let body = document.querySelector("body");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game Started");
    started = true;
    nextLevel();
  }
});

function nextLevel() {
  userSequence = [];
  level++;
  statusHeading.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = colors[randomIndex];
  let randomButton = document.querySelector(`#${randomColor}`);
  gameSequence.push(randomColor);
  buttonFlash(randomButton);
}

function buttonFlash(button) {
  button.classList.add("flash");
  setTimeout(function () {
    button.classList.remove("flash");
  }, 100);
}

function buttonPressed() {
  let button = this;
  buttonFlash(button);
  pressedColor = button.getAttribute("id");
  userSequence.push(pressedColor);

  checkAnswer(userSequence.length - 1);
}

for (button of buttons) {
  button.addEventListener("click", buttonPressed);
}

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextLevel, 500);
    }
  } else {
    let score = level - 1;
    statusHeading.innerHTML = `Game Over! You score was <b>${score}</b> <br> Press any key to restart`;
    reset();
  }
}

function reset() {
  body.style.backgroundColor = "red";
  setTimeout(function () {
    body.style.backgroundColor = "white";
  }, 100);
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}

// Add User Highest Score
