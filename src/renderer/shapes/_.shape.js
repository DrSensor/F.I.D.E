import Shape from './shape'

let sketch
export const register = s => { sketch = s }

export default class Template extends Shape {
  constructor () {
    super(sketch)
  }

  draw (...params) {

  }

  drawAtDrag () {

  }

  drawAtResize (position) {

  }

  drawAtHover () {

  }

  boundary () {
    return Boolean
  }

  padding () {
    let identifier
    let position

    return [identifier, position]
  }
}
