import Shape from './shape'
// import BN from 'bignumber' /** TODO: fix bug from over zoom-out/resizing */

let sketch
export const register = s => { sketch = s }

export default class Rect extends Shape {
  constructor (x = 0, y = 0, w = 0, h = 0, wt = 0) {
    super(sketch)
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.wt = wt < 1 ? 1 : wt
  }

  draw (...params) {
    [this.x, this.y, this.w, this.h] = params.length > 0 ? params : [this.x, this.y, this.w, this.h]
    sketch.noFill()
    sketch.stroke('red')
    sketch.strokeWeight(this.wt)
    sketch.rect(this.x, this.y, this.w, this.h)
  }

  drawAtDrag () {
    sketch.noFill()
    sketch.stroke('green')
    sketch.strokeWeight(this.wt + 1)
    sketch.rect(this.x, this.y, this.w, this.h)
  }

  drawAtResize (position) {
    sketch.noFill()
    sketch.stroke('blue')
    sketch.strokeWeight(this.wt)
    switch (position) {
      case 'left':
        this.leftResize()
        break
      case 'right':
        this.rightResize()
        break
      case 'top':
        this.topResize()
        break
      case 'bottom':
        this.bottomResize()
        break
      case 'left top':
        this.leftResize()
        this.topResize()
        break
      case 'right top':
        this.rightResize()
        this.topResize()
        break
      case 'left bottom':
        this.leftResize()
        this.bottomResize()
        break
      case 'right bottom':
        this.rightResize()
        this.bottomResize()
        break
      default:
        break
    }
    sketch.rect(this.x, this.y, this.w, this.h)
  }

  drawAtHover () {
    sketch.noFill()
    sketch.stroke('yellow')
    sketch.strokeWeight(this.wt + 2)
    sketch.rect(this.x, this.y, this.w, this.h)
  }

  scale (f) {
    this.x *= f
    this.y *= f
    this.w *= f
    this.h *= f
    this.show()
  }

  leftResize () {
    let diff = this.x - sketch.mouseX
    this.x = sketch.mouseX
    this.w = Math.abs(this.w + diff)
  }

  rightResize () {
    let diff = sketch.mouseX - this.x
    this.w = diff > 0 ? diff : 0
    this.x = diff < 0 ? sketch.mouseX : this.x
  }

  topResize () {
    let diff = this.y - sketch.mouseY
    this.y = sketch.mouseY
    this.h = Math.abs(this.h + diff)
  }

  bottomResize () {
    let diff = sketch.mouseY - this.y
    this.h = diff > 0 ? diff : 0
    this.y = diff < 0 ? sketch.mouseY : this.y
  }

  boundary () {
    let [mouseX, mouseY] = [sketch.mouseX, sketch.mouseY]
    return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h)
  }

  padding () {
    let [mouseX, mouseY] = [sketch.mouseX, sketch.mouseY]
    let cursorIdentifier = 'default'
    let position = 'none'
    let [leftX, rightX, topY, bottomY, pad] = [this.x, this.x + this.w, this.y, this.y + this.h, this.wt + 5]

    let left = (leftX < mouseX && mouseX < leftX + pad && topY < mouseY && mouseY < bottomY)
    let right = (rightX - pad < mouseX && mouseX < rightX && topY < mouseY && mouseY < bottomY)
    let top = (topY < mouseY && mouseY < topY + pad && leftX < mouseX && mouseX < rightX)
    let bottom = (bottomY - pad < mouseY && mouseY < bottomY && leftX < mouseX && mouseX < rightX)
    let leftTop = (leftX < mouseX && mouseX < leftX + pad && topY < mouseY && mouseY < topY + pad)
    let rightBottom = (rightX - pad < mouseX && mouseX < rightX && bottomY - pad < mouseY && mouseY < bottomY)
    let rightTop = (rightX - pad < mouseX && mouseX < rightX && topY < mouseY && mouseY < topY + pad)
    let leftBottom = (leftX < mouseX && mouseX < leftX + pad && bottomY - pad < mouseY && mouseY < bottomY)

    cursorIdentifier = left || right ? this.CURSOR.VERTICAL : cursorIdentifier
    cursorIdentifier = top || bottom ? this.CURSOR.HORIZONTAL : cursorIdentifier
    cursorIdentifier = leftTop || rightBottom ? this.CURSOR.MAIN_DIAGONAL : cursorIdentifier
    cursorIdentifier = rightTop || leftBottom ? this.CURSOR.ANTI_DIAGONAL : cursorIdentifier
    position = left ? 'left' : position
    position = right ? 'right' : position
    position = top ? 'top' : position
    position = bottom ? 'bottom' : position
    position = leftTop ? 'left top' : position
    position = rightBottom ? 'right bottom' : position
    position = rightTop ? 'right top' : position
    position = leftBottom ? 'left bottom' : position

    return [cursorIdentifier, position]
  }
}
