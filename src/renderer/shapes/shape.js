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
    this.dragged = false
    this.id = shape.count - 1
    this.VERTICAL = 'vertical'
    this.HORIZONTAL = 'horizontal'
    this.MAIN_DIAGONAL = 'main diagonal'
    this.ANTI_DIAGONAL = 'anti diagonal'
  }

  hover () {
    sketch.push()
    if (this.boundary()) {
      shape.hoverStatus[this.id] = true
      sketch.cursor('pointer')
      this.drawAtHover()
    } else {
      this.draw()
      if (shape.hoverStatus[this.id]) sketch.cursor('default')
      shape.hoverStatus[this.id] = false
    }
    sketch.pop()
  }

  inBoundary () { return this.boundary() }
  startDrag () {
    let [mouseX, mouseY, mouseButton] = [sketch.mouseX, sketch.mouseY, sketch.mouseButton]
    if (this.boundary() && mouseButton === sketch.LEFT) {
      this.offsetX = this.x - mouseX
      this.offsetY = this.y - mouseY
      this.dragged = true
      sketch.cursor('move')
      sketch.clear()
    }
  }
  stopDrag () {
    this.dragged = false
    if (this.boundary()) sketch.cursor('pointer')
    else sketch.cursor('default')
  }

  inPadArea () {
    let cursor = this.padding()[0]
    switch (cursor) {
      case this.VERTICAL:
        sketch.cursor('ew-resize')
        return true
      case this.HORIZONTAL:
        sketch.cursor('ns-resize')
        return true
      case this.MAIN_DIAGONAL:
        sketch.cursor('nwse-resize')
        return true
      case this.ANTI_DIAGONAL:
        sketch.cursor('nesw-resize')
        return true
      default:
        return false
    }
  }
  startResize () {
    // let [mouseX, mouseY, mouseButton] = [sketch.mouseX, sketch.mouseY, sketch.mouseButton]
    this.resized = this.inPadArea()
    if (this.resized) {
      this.pos = this.padding()[1]
    }
    sketch.clear()
  }
  stopResize () {
    this.resized = false
    this.pos = this.padding()[1]
    sketch.cursor('pointer')
  }

  show () {
    sketch.push()
    if (this.dragged) {
      this.x = sketch.mouseX + this.offsetX
      this.y = sketch.mouseY + this.offsetY
      this.drawAtDrag()
    } else if (this.resized) {
      this.drawAtResize(this.pos)
    } else this.draw()
    sketch.pop()
  }
}
