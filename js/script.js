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
let bulletsNode = document.querySelector("#bullets");
let restartButtonNode = document.querySelector("#restart-button");
let easyButtonNode = document.querySelector("#easy");
let mediumButtonNode = document.querySelector("#medium");
let hardButtonNode = document.querySelector("#hard");
let playing = false;
let score = 0;
let easy = false;
let medium = false;
let hard = false;
const niveles = {
  easy: { frecuency: 2500, duration: 4000 },
  medium: { frecuency: 1300, duration: 2500 },
  hard: { frecuency: 800, duration: 1000 },
};
let boardFrecuency;
let boardDuration;
let scope = new Scope();
const totalTime = 30;
let timeRemaining = totalTime;
let badGuyCounter;
let theGame;
let crono;
let isShooting = false;
const clipSize = 12;
const reloadTime = 2000;
let bullets = clipSize;
let reloding = false;
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

const rainAudio = new Audio("./audio/rain.mp3");
rainAudio.loop = true;
rainAudio.volume = 0.05;
rainAudio.muted = false;
const disparo1Audio = new Audio("./audio/disparo-1.mp3");
disparo1Audio.loop = false;
disparo1Audio.volume = 0.4;
disparo1Audio.muted = false;
const reloadAudio = new Audio("./audio/reload.mp3");
reloadAudio.loop = false;
reloadAudio.volume = 0.5;
reloadAudio.muted = false;

function gameStart() {
  playing = true;
  if (easy === true) {
    boardFrecuency = niveles.easy.frecuency;
    boardDuration = niveles.easy.duration;
  } else if (medium === true) {
    boardFrecuency = niveles.medium.frecuency;
    boardDuration = niveles.medium.duration;
  } else if (hard === true) {
    boardFrecuency = niveles.hard.frecuency;
    boardDuration = niveles.hard.duration;
  }
  bullets = clipSize;
  bulletsNode.innerText = `${bullets}`;
  cronometro();
  boardMechanics();
  startPageNode.style.display = `none`;
  gamePageNode.style.display = `flex`;
  theGame = setInterval(() => {
    gameLoop();
  }, 1000 / 60);
}

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
    if (playing === true) {
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
    }
  }, boardFrecuency);
}

function checkShoot() {
  if (playing === true) {
    if (isShooting === false && bullets > 0) {
      isShooting = true;
      disparo1Audio.play();
      if (
        posicion1Bool === true &&
        pos1.x < scope.x &&
        scope.x < pos1.x + 100 &&
        pos1.y < scope.y &&
        scope.y < pos1.y + 200
      ) {
        posicion1Bool = false;
        enemigo1.goingDown();
        score++;
      } else if (
        posicion2Bool === true &&
        pos2.x < scope.x &&
        scope.x < pos2.x + 100 &&
        pos2.y < scope.y &&
        scope.y < pos2.y + 200
      ) {
        posicion2Bool = false;
        enemigo2.goingDown();
        score++;
      } else if (
        posicion3Bool === true &&
        pos3.x < scope.x &&
        scope.x < pos3.x + 100 &&
        pos3.y < scope.y &&
        scope.y < pos3.y + 200
      ) {
        posicion3Bool = false;
        enemigo3.goingDown();
        score++;
      } else if (
        posicion4Bool === true &&
        pos4.x < scope.x &&
        scope.x < pos4.x + 100 &&
        pos4.y < scope.y &&
        scope.y < pos4.y + 200
      ) {
        posicion4Bool = false;
        enemigo4.goingDown();
        score++;
      }
      bullets--;
      bulletsNode.innerText = `${bullets}`;
      setTimeout(() => {
        isShooting = false;
      }, 550);
    }
  }
}

function reload() {
  setTimeout(() => {
    bullets = clipSize;
    bulletsNode.innerText = `${bullets}`;
    reloding = false;
  }, reloadTime);
}

function gameLoop() {

  if (bullets === 0 && reloding === false) {
    reloding = true;
    reloadAudio.play();
    reload();
  }
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

function gameOver() {
  gamePageNode.style.display = `none`;
  endPageNode.style.display = `flex`;
  finalScoreNode.innerText = `${score}`;
  bullets = clipSize;
  playing = false;
  clearInterval(theGame);
  clearInterval(crono);
  clearInterval(badGuyCounter);
  clearAllBoards();
}

gameBoxNode.addEventListener("click", () => {
  checkShoot();
});
window.addEventListener("mousemove", (e) => {
  scope.scopeMove(e);
});
startButtonNode.addEventListener("click", () => {
  gameStart();
});
restartButtonNode.addEventListener("click", () => {
  endPageNode.style.display = `none`;
  startPageNode.style.display = `flex`;
  score = 0;
  timeRemaining = totalTime;
  mediumButtonNode.click();
});
easyButtonNode.addEventListener("click", () => {
  easyButtonNode.style.backgroundColor = `rgba(100,0,0,0.6)`;
  mediumButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  hardButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  easy = true;
  medium = false;
  hard = false;
});
mediumButtonNode.addEventListener("click", () => {
  easyButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  mediumButtonNode.style.backgroundColor = `rgba(100,0,0,0.6)`;
  hardButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  easy = false;
  medium = true;
  hard = false;
});
hardButtonNode.addEventListener("click", () => {
  easyButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  mediumButtonNode.style.backgroundColor = `rgba(0,0,0,0.8)`;
  hardButtonNode.style.backgroundColor = `rgba(100,0,0,0.6)`;
  easy = false;
  medium = false;
  hard = true;
});
mediumButtonNode.click();

startPageNode.addEventListener("mousemove", () => {
  rainAudio.play();
});
