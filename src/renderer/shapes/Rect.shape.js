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

    const leftResize = () => {
      let diff = this.x - sketch.mouseX
      this.x = sketch.mouseX - this.wt
      this.w = Math.abs(this.w + diff + this.wt)
    }
    const rightResize = () => {
      let diff = sketch.mouseX - this.x + this.wt
      this.w = diff > 0 ? diff : 0
      this.x = diff < 0 ? sketch.mouseX + this.wt : this.x
    }
    const topResize = () => {
      let diff = this.y - sketch.mouseY
      this.y = sketch.mouseY - this.wt
      this.h = Math.abs(this.h + diff + this.wt)
    }
    const bottomResize = () => {
      let diff = sketch.mouseY - this.y + this.wt
      this.h = diff > 0 ? diff : 0
      this.y = diff < 0 ? sketch.mouseY + this.wt : this.y
    }

    switch (position) {
      case 'left':
        leftResize()
        break
      case 'right':
        rightResize()
        break
      case 'top':
        topResize()
        break
      case 'bottom':
        bottomResize()
        break
      case 'left top':
        leftResize()
        topResize()
        break
      case 'right top':
        rightResize()
        topResize()
        break
      case 'left bottom':
        leftResize()
        bottomResize()
        break
      case 'right bottom':
        rightResize()
        bottomResize()
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

  overlapCondition (pointX, pointY) {
    return (pointX > this.x && pointX < this.x + this.w && pointY > this.y && pointY < this.y + this.h)
  }

  intersectCondition (pointX, pointY) {
    let cursorIdentifier = 'default'
    let position = 'none'
    let [leftX, rightX, topY, bottomY, pad] = [this.x, this.x + this.w, this.y, this.y + this.h, this.wt + 5]

    let left = (leftX < pointX && pointX < leftX + pad && topY < pointY && pointY < bottomY)
    let right = (rightX - pad < pointX && pointX < rightX && topY < pointY && pointY < bottomY)
    let top = (topY < pointY && pointY < topY + pad && leftX < pointX && pointX < rightX)
    let bottom = (bottomY - pad < pointY && pointY < bottomY && leftX < pointX && pointX < rightX)
    let leftTop = (leftX < pointX && pointX < leftX + pad && topY < pointY && pointY < topY + pad)
    let rightBottom = (rightX - pad < pointX && pointX < rightX && bottomY - pad < pointY && pointY < bottomY)
    let rightTop = (rightX - pad < pointX && pointX < rightX && topY < pointY && pointY < topY + pad)
    let leftBottom = (leftX < pointX && pointX < leftX + pad && bottomY - pad < pointY && pointY < bottomY)

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
