let game = document.querySelector("#game");
let scoreText = document.querySelector("#score");

let snake = [{ x: 100, y: 100 }];
let food = [
  { x: 200, y: 200 },
  { x: 300, y: 100 },
];

let direction = "right";
let score = 0;
let gameInterval;

//draw the snake
function drawsnake() {
  let scale = game.clientWidth / 400;
  game.innerHTML = "";

  for (let part of snake) {
    let div = document.createElement("div");
    div.classList.add("snake");
    div.style.left = part.x * scale + "px";
    div.style.top = part.y * scale + "px";
    game.appendChild(div);
  }

  //draw food
  for (let item of food) {
    let fooddiv = document.createElement("div");
    fooddiv.classList.add("food");
    fooddiv.style.left = item.x * scale + "px";
    fooddiv.style.top = item.y * scale + "px";
    game.appendChild(fooddiv);
  }
}

//move the snake

function move() {
  let head = {
    x: snake[0].x,
    y: snake[0].y,
  };
  if (direction === "right") {
    head.x += 10;
  }
  if (direction === "left") {
    head.x -= 10;
  }
  if (direction === "up") {
    head.y -= 10;
  }
  if (direction === "down") {
    head.y += 10;
  }
  if (head.x >= 400) {
    head.x = 0;
  }
  if (head.x < 0) {
    head.x = 380;
  }
  if (head.y >= 400) {
    head.y = 0;
  }
  if (head.y < 0) {
    head.y = 380;
  }
  snake.unshift(head);

  //check if snake touched it's own body

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameInterval);
      alert("Game Over! Score:" + score);

      //restart the game
      snake = [{ x: 100, y: 100 }];
      direction = "right";
      score = 0;
      scoreText.innerText = score;
      drawsnake();
      gameInterval = setInterval(move, 150);
      return;
    }
  }

  //did snake eat the food
  let ateFood = false;

  for (let i = 0; i < food.length; i++) {
    if (head.x === food[i].x && head.y === food[i].y) {
      score++;
      scoreText.innerText = score;

      food[i].x = Math.floor(Math.random() * 40) * 10;
      food[i].y = Math.floor(Math.random() * 40) * 10;

      ateFood = true;
      break;
    }
  }

  if (!ateFood) {
    snake.pop();
  }
  drawsnake();
}

//for android touchScreen
document.querySelector("#up").addEventListener("click", function () {
  if (direction !== "down") {
    direction = "up";
  }
});

document.querySelector("#down").addEventListener("click", function () {
  if (direction !== "up") {
    direction = "down";
  }
});

document.querySelector("#left").addEventListener("click", function () {
  if (direction !== "right") {
    direction = "left";
  }
});

document.querySelector("#right").addEventListener("click", function () {
  if (direction !== "left") {
    direction = "right";
  }
});

//keyboard controls
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
  if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }
  if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});

drawsnake();

gameInterval = setInterval(move, 150);
