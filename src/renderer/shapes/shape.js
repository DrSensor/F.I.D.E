export let shape = {
  count: 0,
  hoverStatus: [],
  resizeStatus: []
}

let sketch
export const register = s => { sketch = s }
export default class Shape {
  constructor (s) {
    sketch = s
    shape.count++
    this._dragged = false
    this._id = shape.count - 1
    this.CURSOR = {}
    this.CURSOR.VERTICAL = 'ew-resize'
    this.CURSOR.HORIZONTAL = 'ns-resize'
    this.CURSOR.MAIN_DIAGONAL = 'nwse-resize'
    this.CURSOR.ANTI_DIAGONAL = 'nesw-resize'
  }

  hover () {
    sketch.push()
    if (this.boundary()) {
      shape.hoverStatus[this._id] = true
      sketch.cursor('pointer')
      this.drawAtHover()
    } else {
      this.draw()
      if (shape.hoverStatus[this._id]) sketch.cursor('default')
      shape.hoverStatus[this._id] = false
    }
    sketch.pop()
  }

  inBoundary () { return this.boundary() }
  startDrag () {
    let [mouseX, mouseY, mouseButton] = [sketch.mouseX, sketch.mouseY, sketch.mouseButton]
    if (this.boundary() && mouseButton === sketch.LEFT) {
      this.offsetX = this.x - mouseX
      this.offsetY = this.y - mouseY
      this._dragged = true
      sketch.cursor('move')
      sketch.clear()
    }
  }
  stopDrag () {
    this._dragged = false
    if (this.boundary()) sketch.cursor('pointer')
    else sketch.cursor('default')
  }

  inPadArea () {
    let cursor = this.padding()[0]
    for (let key in this.CURSOR) {
      if (this.CURSOR[key] === cursor) {
        sketch.cursor(cursor)
        return true
      }
    }
    return false
  }
  startResize () {
    // let [mouseX, mouseY, mouseButton] = [sketch.mouseX, sketch.mouseY, sketch.mouseButton]
    this._resized = this.inPadArea()
    if (this._resized) {
      this._pos = this.padding()[1]
    }
    sketch.clear()
  }
  stopResize () {
    this._resized = false
    this._pos = this.padding()[1]
    sketch.cursor('pointer')
  }

  show () {
    sketch.push()
    if (this._dragged) {
      this.x = sketch.mouseX + this.offsetX
      this.y = sketch.mouseY + this.offsetY
      this.drawAtDrag()
    } else if (this._resized) {
      this.drawAtResize(this._pos)
    } else this.draw()
    sketch.pop()
  }
}
