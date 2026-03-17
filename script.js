let qb = document.getElementById("qb");
let wr = document.getElementById("wr");
let def = document.getElementById("def");
let ball = document.getElementById("ball");

let qbX = 100, qbY = 200;
let wrX = 200, wrY = 200;
let defX = 500, defY = 200;

let offScore = 0;
let defScore = 0;

// Move QB
function moveQB(dir) {
  if (dir === "left") qbX -= 10;
  if (dir === "right") qbX += 10;
  if (dir === "up") qbY -= 10;
  if (dir === "down") qbY += 10;

  updatePositions();
}

// WR route (auto run)
setInterval(() => {
  wrX += 5; // go forward route
  updatePositions();
}, 100);

// Defender AI (chases WR)
setInterval(() => {
  if (defX > wrX) defX -= 3;
  if (defX < wrX) defX += 3;
  if (defY > wrY) defY -= 3;
  if (defY < wrY) defY += 3;

  updatePositions();

  // tackle check
  if (Math.abs(defX - wrX) < 20 && Math.abs(defY - wrY) < 20) {
    defScore++;
    alert("Tackled! Defense scores!");
    resetPlay();
  }

}, 100);

// Throw ball
function throwBall() {
  let ballX = qbX;
  let ballY = qbY;

  let interval = setInterval(() => {
    // aim toward WR
    ballX += (wrX - ballX) * 0.1;
    ballY += (wrY - ballY) * 0.1;

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // catch check
    if (Math.abs(ballX - wrX) < 15 && Math.abs(ballY - wrY) < 15) {
      clearInterval(interval);
      offScore++;
      alert("Catch! Touchdown!");
      resetPlay();
    }

  }, 30);
}

// Update positions
function updatePositions() {
  qb.style.left = qbX + "px";
  qb.style.top = qbY + "px";

  wr.style.left = wrX + "px";
  wr.style.top = wrY + "px";

  def.style.left = defX + "px";
  def.style.top = defY + "px";

  ball.style.left = qbX + "px";
  ball.style.top = qbY + "px";

  document.getElementById("offScore").innerText = offScore;
  document.getElementById("defScore").innerText = defScore;
}

// Reset play
function resetPlay() {
  qbX = 100; qbY = 200;
  wrX = 200; wrY = 200;
  defX = 500; defY = 200;
}
