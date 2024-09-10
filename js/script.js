let gameBoxNode = document.querySelector("#game-box");
let gamePageNode = document.querySelector("#game-page");
let timerNode = document.querySelector("#timer");
let startPageNode = document.querySelector("#start-page");
let startButtonNode = document.querySelector("#startButton");
let endPageNode = document.querySelector("#end-page");
let enemigosDelanteNode = document.querySelector("#front-boards");
let enemigosAtrasNode = document.querySelector("#back-boards");
let finalScoreNode = document.querySelector("#final-score");
let currentScoreNode = document.querySelector("#puntos");
let restartButtonNode = document.querySelector("#restart-button");
let easyButtonNode = document.querySelector("#easy");
let mediumButtonNode = document.querySelector("#medium");
let hardButtonNode = document.querySelector("#hard");
let score = 0;
let easy = false
let medium = false
let hard = false
const niveles = {
  easy:{frecuency:2000, duration:3000},
  medium:{frecuency:1500, duration:2500},
  hard:{frecuency:800, duration:1000}
}
let boardFrecuency
let boardDuration
let scope = new Scope();
const totalTime = 10;
let timeRemaining = totalTime;
let badGuyCounter
let theGame;
let shooting;
let crono;
let posicion1Bool = false;
let posicion2Bool = false;
let posicion3Bool = false;
let posicion4Bool = false;
let enemigo1;
let enemigo2;
let enemigo3;
let enemigo4;
const pos1 = {
  y: 210,
  x: 140,
  posicion: "adelante",
};
const pos2 = {
  y: 140,
  x: 305,
  posicion: "atras",
};
const pos3 = {
  y: 150,
  x: 460,
  posicion: "atras",
};
const pos4 = {
  y: 210,
  x: 625,
  posicion: "adelante",
};

function cronometro() {
  crono = setInterval(() => {
    timeRemaining--;
    let minutos = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    let segundos = (timeRemaining % 60).toString().padStart(2, "0");
    timerNode.innerText = `${minutos}:${segundos}`;
    if (timeRemaining <= 0) {
      clearInterval(cronometro);
      timeRemaining = totalTime;
      gameOver();
    }
  }, 1000);
}
function boardMechanics() {
  badGuyCounter = setInterval(() => {
    let posicionDeTabla = Math.ceil(Math.random() * 4);
    if (posicionDeTabla === 1 && !posicion1Bool) {

      enemigo1 = new Tabla(pos1);
      posicion1Bool = true;
      setTimeout(() => {
        posicion1Bool = false;
      }, boardDuration);

    } else if (posicionDeTabla === 2 && !posicion2Bool) {

      enemigo2 = new Tabla(pos2);
      posicion2Bool = true;
      setTimeout(() => {
        posicion2Bool = false;
      }, boardDuration);

    } else if (posicionDeTabla === 3 && !posicion3Bool) {

      enemigo3 = new Tabla(pos3);
      posicion3Bool = true;
      setTimeout(() => {
        posicion3Bool = false;
      }, boardDuration);

    } else if (posicionDeTabla === 4 && !posicion4Bool) {

      enemigo4 = new Tabla(pos4);
      posicion4Bool = true;
      setTimeout(() => {
        posicion4Bool = false;
      }, boardDuration);
    }
  }, boardFrecuency);
}

function gameStart() {
  if (easy === true){
    boardFrecuency = niveles.easy.frecuency
    boardDuration = niveles.easy.duration
    console.log(boardDuration,boardFrecuency)
  } else if (medium === true){
    boardFrecuency = niveles.medium.frecuency
    boardDuration = niveles.medium.duration
    console.log(boardDuration,boardFrecuency)
  } else if (hard === true){
    boardFrecuency = niveles.hard.frecuency
    boardDuration = niveles.hard.duration
    console.log(boardDuration,boardFrecuency)
  }
  cronometro();
  boardMechanics()
  startPageNode.style.display = `none`;
  gamePageNode.style.display = `flex`;
  theGame = setInterval(() => {
    gameLoop();
  }, 1000 / 60);
}

function checkShoot() {
  window.addEventListener("click", () => {
    if (
      posicion1Bool === true &&
      pos1.x < scope.x &&
      scope.x < pos1.x + 100 &&
      pos1.y < scope.y &&
      scope.y < pos1.y + 200
    ) {
      console.log(
        "target 1 hit     X:",
        scope.x,
        "   Y:",
        scope.y,
        posicion1Bool
      );
      enemigo1.getShot();
      posicion1Bool = false;
      score++;
    } else if (
      posicion2Bool === true &&
      pos2.x < scope.x &&
      scope.x < pos2.x + 100 &&
      pos2.y < scope.y &&
      scope.y < pos2.y + 200
    ) {
      console.log(
        "target 2 hit     X:",
        scope.x,
        "   Y:",
        scope.y,
        posicion2Bool
      );
      enemigo2.getShot();
      posicion2Bool = false;
      score++;
    } else if (
      posicion3Bool === true &&
      pos3.x < scope.x &&
      scope.x < pos3.x + 100 &&
      pos3.y < scope.y &&
      scope.y < pos3.y + 200
    ) {
      console.log(
        "target 3 hit     X:",
        scope.x,
        "   Y:",
        scope.y,
        posicion3Bool
      );
      enemigo3.getShot();
      posicion3Bool = false;
      score++;
    } else if (
      posicion4Bool === true &&
      pos4.x < scope.x &&
      scope.x < pos4.x + 100 &&
      pos4.y < scope.y &&
      scope.y < pos4.y + 200
    ) {
      console.log(
        "target 4 hit     X:",
        scope.x,
        "   Y:",
        scope.y,
        posicion4Bool
      );
      enemigo4.getShot();
      posicion4Bool = false;
      score++;
    }
  });
}

function gameLoop() {
  window.addEventListener("mousemove", (e) => {
    scope.scopeMove(e);
  });

  checkShoot();
  currentScoreNode.innerText = `${score}`;
}

function clearAllBoards() {
  enemigo1.node.style.display = `none`;
  enemigo1.node.remove();
  enemigo1 = null;
  enemigo2.node.style.display = `none`;
  enemigo2.node.remove();
  enemigo2 = null;
  enemigo3.node.style.display = `none`;
  enemigo3.node.remove();
  enemigo3 = null;
  enemigo4.node.style.display = `none`;
  enemigo4.node.remove();
  enemigo4 = null;
}

startButtonNode.addEventListener("click", () => {
  gameStart();
});

restartButtonNode.addEventListener("click", () => {
  endPageNode.style.display = `none`;
  startPageNode.style.display = `flex`;
  score = 0;
  timeRemaining = totalTime;
  clearInterval(shooting);
  clearInterval(crono);
  clearInterval(badGuyCounter);
});

function gameOver() {
  gamePageNode.style.display = `none`;
  endPageNode.style.display = `flex`;
  finalScoreNode.innerText = `${score}`;
  clearInterval(theGame);
  clearAllBoards();
}

easyButtonNode.addEventListener("click", () => {
  easy = true
  medium = false
  hard = false
  console.log(easy,medium,hard)
})
mediumButtonNode.addEventListener("click", () => {
  easy = false
  medium = true
  hard = false
  console.log(easy,medium,hard)
})
hardButtonNode.addEventListener("click", () => {
  easy = false
  medium = false
  hard = true
  console.log(easy,medium,hard)
})