<template>
  <!-- http://www.ecofic.com/about/blog/vue-mouse-modifiers/ -->
  <div id="sketch" ref="annotator" @mousedown.middle="startDrag" @mousemove="onDrag" align-center @mouseup.middle="stopDrag" @contextmenu="rightClickMenu" @wheel="onResize">
    <slot>
      <span>Noting to display</span>
    </slot>
  </div>
</template>

<script>
import sketch from './Annotator.sketch'
import { clamp, debounce } from 'lodash'
import P5 from 'p5'

let zoom = 1.00
let zDirection = false
let zMin = 0.05
let zMax = 9.00
let sensitivity = 0.00005

export default {
  name: 'Annotator',
  props: {
    annotateMode: {
      default: false,
      type: Boolean
    }
  },

  data () {
    return {
      canvas: null,
      dragging: false,
      start: { offsetX: 0, offsetY: 0 },
      counter: 0
    }
  },

  mounted () {
    this.canvas = new P5(sketch, this.$refs['annotator'])

    // https://github.com/vuejs/Discussion/issues/394
    this.$ready(this.canvasResize)
    window.addEventListener('resize', debounce(this.canvasResize, 33))
  },

  watch: {
    annotateMode: function (val) {
      if (val) {
        this.canvas.annotateMode()
        let interval = setInterval(() => { // I hate to use internal :cry:
          if (!sketch.annotate) {
            this.$emit('update:annotateMode', sketch.annotate)
            clearInterval(interval)
          }
        }, 700)
      }
    }
  },

  methods: {
    rightClickMenu () {

    },
    onResize (event) {
      if (event.ctrlKey) {
        let nowDirection = (event.deltaY > 0)
        zoom -= sensitivity * event.deltaY
        zoom = clamp(zoom, zMin, zMax)
        if (zDirection !== (nowDirection)) zoom = 1
        console.log('image: ' + this.counter++)
        let sizes = this.$slots.default.map(slot => {
          slot.elm.width *= zoom
          slot.elm.height *= zoom

          return [slot.elm.width, slot.elm.height]
        }, this)
        let width = Math.max(sizes.map(([w, h]) => w))
        let height = Math.max(sizes.map(([w, h]) => h))
        this.canvas.resize(width, height)
        zDirection = nowDirection
      }
    },
    canvasResize () {
      let ratio = 1
      let sizes = this.$slots.default.map(slot => {
        /** maintain aspect ratio */
        let [srcWidth, srcHeight] = [slot.elm.width, slot.elm.height]
        let [maxWidth, maxHeight] = [this.$refs['annotator'].clientWidth, this.$refs['annotator'].clientHeight]
        ratio = Math.max(maxWidth / srcWidth, maxHeight / srcHeight);
        ([slot.elm.width, slot.elm.height] = [srcWidth * ratio, srcHeight * ratio])
        /** end */
        return [slot.elm.width, slot.elm.height]
      }, this)
      let width = Math.max(sizes.map(([w, h]) => w))
      let height = Math.max(sizes.map(([w, h]) => h))
      this.canvas.resize(width, height, ratio)
    },
    startDrag (event) {
      this.dragging = true
      this.start.offsetX = event.clientX + this.$refs['annotator'].scrollLeft
      this.start.offsetY = event.clientY + this.$refs['annotator'].scrollTop
    },
    onDrag (event) {
      if (this.dragging) {
        let x = this.start.offsetX - event.clientX
        let y = this.start.offsetY - event.clientY
        this.$refs['annotator'].scrollLeft = x
        this.$refs['annotator'].scrollTop = y
      }
    },
    stopDrag () {
      this.dragging = false
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
    this.$ready() // deregister
    this.canvas.remove() // clear canvas and all of its event listener
  }
}
</script>

<style scoped>
#sketch {
  position: fixed;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#sketch::-webkit-scrollbar {
  display: none;
}
#sketch > * {
  z-index: -1;
  position: absolute;
  user-select: none;
  /* width: auto; */
  /* height: auto; */
}
#sketch > canvas {
  z-index: 3;
  position: absolute;
}
</style>

<style scoped>

</style>
