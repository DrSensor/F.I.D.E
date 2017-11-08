<template>
  <div :style="styles" id="container">
    <img :height="height" :width="width" :src="source" draggable="false" alt="File not found" />
  </div>
</template>

<script>
// https://vuejs.org/v2/examples/elastic-header.html
export default {
  name: 'FvViewerPdf',
  data () {
    return {
      height: 'auto',
      width: 'auto',
      source: 'file:///home/wildan/Pictures/wallhaven-148344.png',
      styles: ''
    }
  }
}
</script>

<style scoped>
#container {

}
</style>

