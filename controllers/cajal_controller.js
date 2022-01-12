import tippy from 'tippy.js'
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
    return '保険,いぬ,テトリス,電子レンジ,救急車,衛星,小説,パン,ジャングルジム,ボクシング'
  }

  sharedKeywords () {
    const string = location.search
    const params = new URLSearchParams(string)
    return params.get("keywords")
  }

  myKeywords () {
    return localStorage.getItem('keywords')
  }

  async connect () {
    if (!this.myKeywords()) {
      tippy(this.paperTarget, {
        content: 'キーワードを書いてみよう👩‍🎨',
        triggerTarget: this.brainTarget,
        trigger: 'click'
      })
    }
    const keywords = this.sharedKeywords() || this.myKeywords() || this.defaultKeywords()
    this.paperTarget.value = keywords
    this.save()
    this.call()
  }

  async reset () {
    this.paperTarget.value = this.defaultKeywords()
    this.save()
  }

  save () {
    if (!this.sharedKeywords()) {
      localStorage.setItem('keywords', this.paperTarget.value)
    }
  }

  async share () {
    await navigator.clipboard.writeText(`${location.href}?keywords=${encodeURI(this.paperTarget.value)}`)
    alert('キーワードをシェアできるURLをクリップボードにコピーしました 🧙‍♀️')
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
