class Tabla {
//voy a generar que cuando quiera salir un tablon donde ya hay uno, espere al siguiente, por si el jugador se esta abrumando (a testear si es bueno o si lo paso a otro)
  constructor (pos) {
    this.pos = pos
    this.h = 200
    this.w = 100
    let personaje = (Math.ceil(Math.random()*5))
    this.node = document.createElement("img")
    this.node.src = `./images/zombie-boards-${personaje}.jpg`
    this.node.style.position = `absolute`
    this.node.style.left = `${this.pos.x}px`
    this.node.style.width = `${this.w}px`
    this.node.style.height = `0px`
    this.node.style.top = `${this.pos.y + this.h}px`
    this.node.style.transition = `0.15s`
    
    if (this.pos.posicion === "adelante"){
      enemigosDelanteNode.append(this.node)
    } else {
      enemigosAtrasNode.append(this.node)
    }
    
    setTimeout(() => {
      this.node.style.height = `${this.h}px`
      this.node.style.top = `${this.pos.y}px`
    }, 10);
    
    setTimeout(() => {
      this.node.style.display = `none`
      this.node.remove()
    },boardDuration)
  }

  goingDown() {
    this.node.style.height = `0px`
    this.node.style.top = `${this.pos.y + this.h}px`
    setTimeout(() => {
      this.node.style.display = `none`
      this.node.remove()
    }, 150);
  }
}