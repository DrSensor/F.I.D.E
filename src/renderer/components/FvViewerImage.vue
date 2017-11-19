<template>
  <img :height="height" :width="width" :src="source" draggable="false" alt="File not found" />
</template>

<script>
// https://vuejs.org/v2/examples/elastic-header.html
export default {
  name: 'FvViewerImage',
  props: {
    source: String
  },
  data () {
    return {
      height: 'auto',
      width: 'auto',
      styles: ''
    }
  }
}
</script>
