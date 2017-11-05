<template>
  <v-layout id="sketch" ref="annotator">
    <v-btn @click.native="clik()"></v-btn>
    <img src="../assets/default.png" />
  </v-layout>
</template>

<script>
import sketch from './AnnotatorImage.sketch'

let canvas

export default {
  name: 'AnnotatorImage',
  data () {
    return {
      toogle: true
    }
  },
  methods: {
    clik () {
      canvas.refresh()
    }
  },
  mounted () {
    canvas = sketch(this.$refs['annotator'])
    canvas.extHeight = 1000
    canvas.extWidth = 1000
    canvas.setup()
  }
}
</script>

<style scoped>
#sketch {
  position: fixed;
}
#sketch > .btn {
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

