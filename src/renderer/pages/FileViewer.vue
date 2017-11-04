<template>
  <div>
    <v-btn @click='listThings()'>list things</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FileViewer',

  methods: {
    ...mapActions('iotServices/awsIot', [
      'listThings'
    ])
  }
}
</script>
