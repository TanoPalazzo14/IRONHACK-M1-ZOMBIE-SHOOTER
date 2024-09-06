class Scope {

  constructor () {

    this.x = -20
    this.y = -20
    this.h = 20
    this.w = 20
    this.radius = this.h/2
    this.node = document.createElement("img")
    this.node.src = "./images/scope.png"
    this.node.style.position = `absolute`
    this.node.style.height = `${this.h}px`
    this.node.style.width = `${this.w}px`
    this.node.style.left = `${this.x}px`
    this.node.style.top = `${this.y}px`
    gameBoxNode.append(this.node)
  }
  
  scopeMove (e) {
    this.node.style.top = `${(e.clientY-this.radius)}px`;
    this.node.style.left = `${(e.clientX-this.radius)}px`;
    };

}