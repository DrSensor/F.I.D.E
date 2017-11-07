<template>
  <v-layout id="sketch" ref="annotator">
    <slot>
      <span>Noting to display</span>
    </slot>
  </v-layout>
</template>

<script>
import sketch from './AnnotatorImage.sketch'
import P5 from 'p5'

export default {
  name: 'AnnotatorImage',
  props: {
    annotateMode: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      canvas: null
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
        let interval = setInterval(() => {
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
      this.canvas.extHeight = this.$refs['annotator'].clientHeight
      this.canvas.extWidth = this.$refs['annotator'].clientWidth
      this.canvas.refresh()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    this.$ready()
    this.canvas.remove()
  }
}
</script>

<style scoped>
#sketch {
  position: fixed;
  height: 100%;
  width: 100%;
}
#sketch > * {
  z-index: 0;
  position: absolute;
}
#sketch > img {
  z-index: -1;
  position: absolute;
}
#sketch > canvas {
  z-index: 3;
  position: absolute;
}
</style>

