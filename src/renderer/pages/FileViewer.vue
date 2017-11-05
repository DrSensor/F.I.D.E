<template>
  <div>
    <v-btn @click='listThings()'>list things</v-btn>
    <AnnotatorImage/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FileViewer',
  components: {
    AnnotatorImage: () => import('@/components/AnnotatorImage')
  },
  methods: {
    ...mapActions('iotServices/awsIot', [
      'listThings'
    ])
  }
}
</script>
