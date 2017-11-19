<template>
  <v-container id="viewer" fluid>
    <v-btn @click='listThings()'>list things</v-btn>
    <v-dialog v-model="dialog" max-width="720px" :content-class="dialogColor" lazy scrollable>
      <v-btn color="orange" slot="activator">Telemetry</v-btn>      
      <v-container>
        <ThingDialog v-model="tab" @set="dialog = false" />
      </v-container>
    </v-dialog>
    <v-btn color="green" @click.native="registerFileAs('electronic schematic')">Register file as E</v-btn>
    <v-btn color="green" @click.native="annotate = true">Annotate</v-btn>
    <annotator :annotating.sync="annotate" @add="annotationAdded" @change="annotationUpdated">
      <ImageViewer :source="openedFile.uri" />
    </annotator>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
      annotate: false,
      dialogColor: 'purple'
    }
  },
  computed: {
    ...mapState('fileManagers', [ 'openedFile' ]),
    tab: {
      get: function (val) {
        return this.activeTab
      },
      set: function (val) {
        if (val === 'Telemetry') this.dialogColor = 'brown'
        else if (val === 'Telecommand') this.dialogColor = 'indigo'
        this.activeTab = val
      }
    }
  },
  methods: {
    ...mapActions('iotServices/awsIot', [
      'listThings'
    ]),
    ...mapActions([
      'registerFileAs'
    ]),
    annotationUpdated (annotations) {
    },
    annotationAdded (annotation) {
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

