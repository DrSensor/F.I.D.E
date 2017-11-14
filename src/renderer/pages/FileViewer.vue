<template>
  <div id="viewer">
    <v-btn @click='listThings()'>list things</v-btn>
    <v-dialog v-model="dialog" max-width="720px" lazy scrollable>
      <v-btn color="orange" slot="activator">Telemetry</v-btn>      
      <v-container class="indigo">
        <ThingDialog />
      </v-container>
    </v-dialog>
    <v-btn color="green" @click.native="annotate = true">Annotate</v-btn>
    <annotator :annotating.sync="annotate" @add="annotationDialog" @change="annotationUpdate">
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
    ImageViewer: () => import('@/components/FvViewerImage'),
    ThingDialog: () => import('@/components/TeleAllDialog')
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
    ]),
    annotationUpdate (annotations) {
    },
    annotationDialog (annotation) {
      this.dialog = true
    }
  }
}
</script>

<style scoped>
#viewer {
  user-select: none;
}
</style>

