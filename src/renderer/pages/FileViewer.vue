<template>
  <div id="viewer">
    <v-btn @click='listThings()'>list things</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="orange" slot="activator">Telemetry</v-btn>
      <v-container>
        <h5>Telemetry</h5>
        <Telecommand />
      </v-container>
    </v-dialog>
    <v-btn color="green" @click.native="annotate = true">Annotate</v-btn>
    <annotator :annotateMode.sync="annotate">
      <ImageViewer />
    </annotator>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FileViewer',
  components: {
    Annotator: () => import('@/components/Annotator'),
    Telecommand: () => import('@/components/TelecommandChooser'),
    ImageViewer: () => import('@/components/FvViewerImage')
  },
  data () {
    return {
      dialog: false,
      annotate: false
    }
  },
  methods: {
    ...mapActions('iotServices/awsIot', [
      'listThings'
    ])
  }
}
</script>

<style scoped>
#viewer {
  user-select: none;
}
</style>

