class Tabla {
//voy a generar que cuando quiera salir un tablon donde ya hay uno, espere al siguiente, por si el jugador se esta abrumando (a testear si es bueno o si lo paso a otro)
  constructor (pos) {
    this.pos = pos
    this.h = 200
    this.w = 100
    let personaje = (Math.ceil(Math.random()*4))
    console.log(`img:${personaje}, posicion:${this.pos.posicion}`)
    this.node = document.createElement("img")
    this.node.src = `./images/zombie-boards-${personaje}-TEST.jpg`
    this.node.style.position = `absolute`
    this.node.style.top = `${this.pos.y}px`
    this.node.style.left = `${this.pos.x}px`
    this.node.style.height = `${this.h}px`
    this.node.style.width = `${this.w}px`


    this.node.style.animation = `fadein 0.5s, fadeout 0.9s 2.5s`;


    if (this.pos.posicion === "adelante"){
      enemigosDelanteNode.append(this.node)
    } else {
      enemigosAtrasNode.append(this.node)
    }

    setTimeout(() => {
      this.node.remove()
    },boardDuration)
  }

  goingUp() {

  }

  goingDown() {

  }
}