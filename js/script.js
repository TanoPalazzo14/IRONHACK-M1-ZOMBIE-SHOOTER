let gameBoxNode = document.querySelector("#game-box")
let gamePageNode = document.querySelector("#game-page")
let timerNode = document.querySelector("#timer")
let startPageNode = document.querySelector("#start-page")
let startButtonNode = document.querySelector("#startButton")
let endPageNode = document.querySelector("#end-page")
let scope = null
const totalTime = 9999999
let timeRemaining = totalTime

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
}

function gameStart () {
  startPageNode.style.display = `none`
  gamePageNode.style.display = `flex`
  scope = new Scope()
  let theGame = setInterval(() => {
  
    gameLoop()
  
  },1000/60)
  cronometro ()
}

function gameOver () {
  gamePageNode.style.display = `none`
  endPageNode.style.display = `flex`
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
  console.log("START")
  gameStart()
})