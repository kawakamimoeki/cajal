import { Controller } from 'stimulus'
import { Paper } from '../lib/paper'
import { Brain } from '../lib/brain'
import { World } from '../lib/world'

class CajalController extends Controller {
  static targets = ['paper', 'brain']

  cellNum () {
    return 100
  }

  async connect () {
    const keywords = localStorage.getItem('keywords') || (await new World().words(this.cellNum())).join(',')
    this.paperTarget.value = keywords
    this.save()
  }

  async shuffle () {
    this.paperTarget.value = (await new World().words(this.cellNum())).join(',')
    this.save()
  }

  save () {
    localStorage.setItem('keywords', this.paperTarget.value)
  }

  call () {
    new Brain(
      this.brainTarget,
      new Paper(this.paperTarget).keywords(),
      {
        cellNum: this.cellNum()
      }
    )
  }
}

export { CajalController }
