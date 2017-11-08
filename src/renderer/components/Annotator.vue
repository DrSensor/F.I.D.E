<template>
  <!-- http://www.ecofic.com/about/blog/vue-mouse-modifiers/ -->
  <div id="sketch" ref="annotator" @mousedown.middle="startDrag" @mousemove="onDrag" align-center @mouseup.middle="stopDrag">
    <slot>
      <span>Noting to display</span>
    </slot>
  </div>
</template>

<script>
import sketch from './Annotator.sketch'
import P5 from 'p5'

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
      start: { offsetX: 0, offsetY: 0 }
    }
  },

  mounted () {
    this.canvas = new P5(sketch, this.$refs['annotator'])

    // https://github.com/vuejs/Discussion/issues/394
    this.$ready(this.handleResize)
    window.addEventListener('resize', this.handleResize)
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
    handleResize () {
      let width = this.$refs['annotator'].scrollWidth
      let height = this.$refs['annotator'].scrollHeight
      this.canvas.resize(width, height)
    },
    startDrag (e) {
      this.dragging = true
      this.start.offsetX = e.clientX + this.$refs['annotator'].scrollLeft
      this.start.offsetY = e.clientY + this.$refs['annotator'].scrollTop
    },
    onDrag (e) {
      if (this.dragging) {
        let x = this.start.offsetX - e.clientX
        let y = this.start.offsetY - e.clientY
        this.$refs['annotator'].scrollLeft = x
        this.$refs['annotator'].scrollTop = y
      }
    },
    stopDrag () {
      this.dragging = false
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    this.$ready() // deregister
    this.canvas.remove() // clear canvas and all of its event listener
  }
}
</script>

<style scoped>
#sketch {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
}
#sketch > * {
  z-index: -1;
  position: absolute;
  user-select: none;
}
#sketch > canvas {
  z-index: 3;
  position: absolute;
}
</style>

<style scoped>

</style>
