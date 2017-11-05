import P5 from 'p5'

const s = function (sketch) {
  // global variable

  const main = {
    preload () {

    },

    setup () {
      sketch.createCanvas(sketch.extWidth, sketch.extHeight)
    },

    refresh () {

    },

    draw () {

    }
  }

  // end of main
  for (let key in main) {
    sketch[key] = main[key]
  }
}

export default (domElement) => new P5(s, domElement)
