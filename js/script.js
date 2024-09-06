let gameBoxNode = document.querySelector("#game-box")
let scope = null









scope = new Scope()
setInterval(() => {
  
  gameLoop()

},1000/60)

function gameLoop() {

  window.addEventListener("mousemove", (e) => {
    scope.scopeMove(e)
  });

  window.addEventListener("click", () => {
    console.log("BANG!")
  })

}
