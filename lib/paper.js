class Paper {
  constructor (element) {
    this.element = element
  }

  keywords () {
    return this.element.value.split(',')
  }
}

export { Paper }
