let gameBoxNode = document.querySelector("#game-box")
let scope = null









console.log(scope)
scope = new Scope()
console.log(scope)
setInterval(() => {
  
  window.addEventListener("mousemove", (e) => {
    scope.scopeMove(e)
  });

},1000/60)
