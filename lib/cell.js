import p5 from 'p5'

class Cell {
  constructor (p, keyword, vector, n) {
    this.p = p
    this.keyword = keyword
    this.acceleration = this.p.createVector(0, 0)
    this.velocity = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1))
    this.position = vector
    this.size = 12
    this.n = n
    this.view = 10000 / this.n
    this.tactile = 8000 / this.n
    this.maxspeed = 0.1
  }

  update (others) {
    let touchers = 0
    let neighbors = 0
    let force = this.p.createVector(0, 0)
    const diffs = this.p.createVector(0, 0)

    others.forEach((other) => {
      const distance = p5.Vector.dist(other.position, this.position)

      if (0 < distance && distance < this.tactile) {
        const diff = p5.Vector.sub(this.position, other.position)
        diff.div(distance)
        diffs.add(diff)
        touchers++
      }

      if (distance < this.view) {
        neighbors++
      }
    })

    if (touchers > 0) {
      const separate = diffs.div(touchers)
      if (separate.mag() > 0) {
        separate.normalize()
        separate.mult(this.maxspeed)
        separate.sub(this.velocity)
        force = separate
      }
    } else if (this.p.random(10) < 0.01) {
      force = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1))
    }

    this.acceleration.add(force)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)

    this.p.noStroke()
    let color = 230 - 230 * neighbors / 6
    if (color < 100) color = 100
    this.p.fill(color)
    this.p.textSize(this.size)
    this.p.textStyle(this.p.BOLDITALIC)
    this.p.text(this.keyword, this.position.x - 0.5 * this.p.textWidth(this.keyword), this.position.y + 0.5 * this.size)
    this.wraparound(this.position)
  }

  wraparound (position) {
    if (position.x > 1.1 * this.p.width) position.x = position.x - 1.1 * this.p.width
    if (position.x < -1 * 0.1 * this.p.width) position.x = 1.1 * this.p.width + position.x
    if (position.y > 1.1 * this.p.height) position.y = position.y - 1.1 * this.p.height
    if (position.y < -1 * 0.1 * this.p.height) position.y = 1.1 * this.p.height + position.y
    return this.p.createVector(position.x, position.y)
  }

  drag (x, y) {
    this.position = this.p.createVector(x, y)
    this.p.noStroke()
    this.p.fill(100)
    this.p.textSize(this.size)
    this.p.textStyle(this.p.BOLDITALIC)
    this.p.text(this.keyword, this.position.x - 0.5 * this.p.textWidth(this.keyword), this.position.y + 0.5 * this.size)
  }
}

export { Cell }
