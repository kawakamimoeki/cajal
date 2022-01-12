class Paper {
  constructor (element) {
    this.element = element
  }

  keywords () {
    return this.element.value.split(/[\x20\u3000]/).filter(Boolean)
  }
}

export { Paper }
