let player = document.getElementById("player");
let ball = document.getElementById("ball");

let x = 50;
let y = 130;

function move(direction) {
  if (direction === "left") x -= 10;
  if (direction === "right") x += 10;
  if (direction === "up") y -= 10;
  if (direction === "down") y += 10;

  player.style.left = x + "px";
  player.style.top = y + "px";

  ball.style.left = (x + 30) + "px";
  ball.style.top = (y + 10) + "px";
}

function throwBall() {
  let ballX = x + 30;

  let interval = setInterval(() => {
    ballX += 10;
    ball.style.left = ballX + "px";

    if (ballX > 580) {
      clearInterval(interval);
      alert("Touchdown! 🏈");
    }
  }, 50);
}
