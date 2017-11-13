import register, { Rect } from '@/shapes'
import { shape, register as shapeReg } from '@/shapes/shape'
export let annotations = []

const s = function (sketch) {
  // global variable
  register(sketch)
  let beginDrawAnnotation = false
  let setupDone = false
  let [x, y, w, h] = [0, 0, 0, 0]
  shape.count = 0

  let zoom = 1.00
  let zDirection = false
  const ZOOM_MIN = 0.05
  const ZOOM_MAX = 9.00
  const ZOOM_SENSITIVITY = 0.00005

  const main = {
    preload () {
      if (annotations < 1) {
        annotations[0] = new Rect(100, 100, 50, 50, 2)
        annotations[1] = new Rect(200, 200, 100, 50, 2)
        annotations[2] = new Rect(150, 150, 30, 50, 2)
      } else shapeReg(sketch) // because the all `sketch.mouseX` is off after remove()
    },

    setup () {
      sketch.createCanvas()
      sketch.clear()
      sketch.noLoop()
      setupDone = true
      sketch.redraw()
    },

    resize (width, height, ratio) {
      sketch.resizeCanvas(width, height)
      if (ratio) {
        sketch.clear()
        for (let rect of annotations) {
          rect.scale(ratio)
        }
      }
    },

    annotateMode () {
      sketch.cursor('crosshair')
      beginDrawAnnotation = true
    },

    draw () {
      sketch.clear()
      if (sketch.annotate) {
        sketch.push()
        annotations[annotations.length - 1].draw(x, y, w, h, 2)
        sketch.pop()
      }
      for (let rect of annotations) {
        rect.show()
      }
    },

    mouseWheel (event) {
      if (event.ctrlKey) {
        sketch.clear()
        let nowDirection = (event.delta > 0)
        zoom -= ZOOM_SENSITIVITY * event.delta
        zoom = sketch.constrain(zoom, ZOOM_MIN, ZOOM_MAX)
        if (zDirection !== (nowDirection)) zoom = 1
        for (let rect of annotations) {
          rect.scale(zoom)
        }
        zDirection = nowDirection
      }
    },

    mouseMoved () {
      if (!beginDrawAnnotation && setupDone) {
        sketch.clear()
        for (let rect of annotations) {
          rect.hover()
          rect.inPadArea()
        }
      }
    },

    mousePressed (event) {
      if (beginDrawAnnotation) {
        x = sketch.mouseX
        y = sketch.mouseY
        annotations.push(new Rect(x, y, w, h, 2))
        sketch.annotate = true
      } else if (sketch.mouseButton === sketch.LEFT) {
        for (let rect of annotations) {
          if (rect.inPadArea()) rect.startResize()
          else rect.startDrag()
          /** snippet for deleting shape */
          // if (sketch.mouseButton === sketch.RIGHT && rect.inBoundary()) {
          //   annotations.splice(rect.id, 1)
          // }
        }
      }
      sketch.loop()
    },

    mouseDragged () {
      if (sketch.annotate) {
        w = sketch.mouseX - x
        h = sketch.mouseY - y
      }
    },

    mouseReleased () {
      for (let rect of annotations) {
        rect.stopResize()
        rect.stopDrag()
      }
      if (sketch.annotate) {
        ([x, y, w, h] = [0, 0, 0, 0])
        sketch.annotate = beginDrawAnnotation = false
      }
      sketch.clear()
      sketch.noLoop()
    }
  }

  // end of main
  for (let key in main) {
    sketch[key] = main[key]
  }
}

export default s