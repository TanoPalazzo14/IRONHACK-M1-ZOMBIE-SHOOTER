let gameBoxNode = document.querySelector("#game-box")
let gamePageNode = document.querySelector("#game-page")
let timerNode = document.querySelector("#timer")
let startPageNode = document.querySelector("#start-page")
let startButtonNode = document.querySelector("#startButton")
let endPageNode = document.querySelector("#end-page")
let enemigosDelanteNode = document.querySelector("#front-boards")
let enemigosAtrasNode = document.querySelector("#back-boards")
let finalScoreNode = document.querySelector("#final-score")
let score = 10
const boardFrecuency = 2000
const boardDuration = 3000
let scope = null
const totalTime = 10
let timeRemaining = totalTime
let theGame
let posicion1Bool = false
let posicion2Bool = false
let posicion3Bool = false
let posicion4Bool = false
const pos1 = {
  y:210,
  x:140,
  posicion:"adelante",
}
const pos2 = {
  y:140,
  x:305,
  posicion:"atras",
}
const pos3 = {
  y:150,
  x:460,
  posicion:"atras",
}
const pos4 = {
  y:210,
  x:625,
  posicion:"adelante",
}




function cronometro (){
  let cronometro = setInterval (() => {
    timeRemaining--
    let minutos = Math.floor(timeRemaining/60).toString().padStart(2,"0")
    let segundos = (timeRemaining%60).toString().padStart(2,"0")
    timerNode.innerText = `${minutos}:${segundos}`
    if (timeRemaining <= 0){
      clearInterval(cronometro)
      timeRemaining = totalTime
      gameOver()
    }
  },1000)

  let badGuyCounter = setInterval (() => {

    let posicionDeTabla = (Math.floor(Math.random()*4))+1
    if (posicionDeTabla === 1 && !posicion1Bool) {

      let enemigo = new Tabla(pos1)
      posicion1Bool = true
      setTimeout(() => {
        posicion1Bool = false
      },boardDuration)

    } else if (posicionDeTabla === 2 && !posicion2Bool) {

      let enemigo = new Tabla(pos2)
      posicion2Bool = true
      setTimeout(() => {
        posicion2Bool = false
      },boardDuration)

    } else if (posicionDeTabla === 3 && !posicion3Bool) {

      let enemigo = new Tabla(pos3)
      posicion3Bool = true
      setTimeout(() => {
        posicion3Bool = false
      },boardDuration)

    } else if (posicionDeTabla === 4 && !posicion4Bool) {

      let enemigo = new Tabla(pos4)
      posicion4Bool = true
      setTimeout(() => {
        posicion4Bool = false
      },boardDuration)

    }

  },boardFrecuency)
}

function gameStart () {
  startPageNode.style.display = `none`
  gamePageNode.style.display = `flex`
  scope = new Scope()
  theGame = setInterval(() => {
  
    gameLoop()
  
  },1000/60)
  cronometro ()



}

function gameOver () {
  gamePageNode.style.display = `none`
  endPageNode.style.display = `flex`
  finalScoreNode.innerText = `${score}`
  clearInterval(theGame)

}

function gameLoop() {

  window.addEventListener("mousemove", (e) => {
    scope.scopeMove(e)
  });

  // window.addEventListener("click", () => {
  //   console.log("BANG!")
  // })

}

startButtonNode.addEventListener("click", () => {
  gameStart()
})