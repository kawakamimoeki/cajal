import p5 from 'p5'

class Synapse {
  constructor (p, a, b) {
    this.p = p
    this.a = a
    this.b = b
  }

  update () {
    const distance = p5.Vector.dist(this.a.position, this.b.position)
    if (distance < this.a.view) {
      this.p.stroke(255 * distance / this.a.view)
      this.p.line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y)
    }
  }
}

export { Synapse }
