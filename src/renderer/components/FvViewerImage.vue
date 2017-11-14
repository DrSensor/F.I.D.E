<template>
  <img class="scroll" :height="height" :width="width" :src="source" draggable="false" alt="File not found" />
</template>

<script>
// https://vuejs.org/v2/examples/elastic-header.html
export default {
  name: 'FvViewerImage',
  data () {
    return {
      height: 'auto',
      width: 'auto',
      // source: 'file:///home/wildan/Pictures/wallhaven-148344.png',
      source: 'file:///home/wildan/Projects/Sensorfied/f.i.d.e/src/renderer/assets/light.png',
      styles: ''
    }
  }
}
</script>

<style scoped>
.scroll {
  /* overflow: scroll; */
}
</style>
