import P5 from 'p5'

const s = function (sketch) {
  // exported global variable

  // global variable
  var [x, y] = [100, 100]

  const main = {
    preload () {

    },

    setup () {
      sketch.createCanvas(sketch.extWidth, sketch.extHeight)
      console.log(sketch.extWidth, sketch.extHeight)
    },

    refresh () {
      sketch.width = sketch.extWidth
      sketch.height = sketch.extHeight
      console.log(sketch.extWidth, sketch.extHeight)
    },

    draw () {
      sketch.fill(255)
      sketch.rect(x, y, 50, 50)
    }
  }

  // end of main
  for (let key in main) {
    sketch[key] = main[key]
  }
}

export default (domElement) => new P5(s, domElement)
