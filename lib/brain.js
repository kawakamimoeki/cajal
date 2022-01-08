import p5 from 'p5'
import { Cell } from './cell'
import { Synapse } from './synapse'

class Brain {
  constructor (element, keywords, opts = {}) {
    this.element = element
    this.keywords = keywords
    this.opts = Object.assign(this.defaultOpts(), opts)
    if (document.getElementsByClassName('p5Canvas').length > 0) {
      this.element.removeChild(document.getElementsByClassName('p5Canvas')[0])
    }
    new p5(this.sketch.bind(this), this.element)
  }

  defaultOpts () {
    return { }
  }

  updateKeywords (keywords) {
    keywords.forEach((keyword) => {
      if (this.keywords.includes(keyword)) return
      this.keywords.push(keyword)
    })
  }

  sketch (p) {
    p.setup = () => {
      p.createCanvas(this.element.offsetWidth, this.element.offsetHeight)
      p.frameRate(this.fps)
      this.cells = []
      this.keywords.forEach((keyword) => {
        this.cells.push(new Cell(p, keyword, p.createVector(p.random(0, 1.1 * p.width), p.random(0, 1.1 * p.height)), this.opts.cellNum))
      })
    }
    
    p.draw = () => {
      p.background(255)
      this.cells.forEach((cellA) => {
        this.cells.forEach((cellB) => {
          new Synapse(p, cellA, cellB).update()
        })
      })
      this.cells.forEach((cell) => {
        if (p.mouseIsPressed) {
          if (p.abs(cell.position.x - p.mouseX) < p.textWidth(cell.text) && p.abs(cell.position.y - p.mouseY) < cell.size && p.dragged === null) {
            p.dragged = cell
          }
          if (p.dragged === cell) {
            cell.drag(p.pmouseX, p.pmouseY)
          } else {
            cell.update(this.cells)
          }
        } else {
          p.dragged = null
          cell.update(this.cells)
        }
      })
    }
  }
}

export { Brain }
