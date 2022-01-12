import { Controller } from 'stimulus'
import { Paper } from '../lib/paper'
import { Brain } from '../lib/brain'
import { World } from '../lib/world'

class CajalController extends Controller {
  static targets = ['paper', 'brain']

  cellNum () {
    return 20
  }

  defaultKeywords () {
    // return (await new World().words(this.cellNum())).join(',')
    '保険,いぬ,テトリス,電子レンジ,救急車,衛星,小説,パン,ジャングルジム,ボクシング'
  }

  async connect () {
    const keywords = localStorage.getItem('keywords') || this.defaultKeywords()
    this.paperTarget.value = keywords
    this.save()
    this.call()
  }

  async reset () {
    this.paperTarget.value = this.defaultKeywords()
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
