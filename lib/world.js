import ky from 'ky'

class World {
  async words (limit) {
    const result = await ky.get(`https://wordam.herokuapp.com?limit=${limit}`).json()
    return result.words
  }
}

export { World }
