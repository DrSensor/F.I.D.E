<template>
  <v-container id="viewer" fluid>

    <v-dialog v-model="openThingDialog" max-width="720px" :content-class="dialogColor" lazy persistent scrollable>
      <v-container>
        <ThingDialog v-model="tab" @set="setThing" @close="openThingDialog = false" />
      </v-container>
    </v-dialog>

    <v-speed-dial id="ed-btn" fixed top left hover direction="bottom" v-model="edBtn.isOpen">
      <v-btn slot="activator" :color="edBtn.color" fab flat v-model="edBtn.isOpen">
        <v-icon :class="edBtn.icon">{{edBtn.icon}}</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn @click.native="registerAs('E')" fab color="teal">
        <v-icon>E</v-icon>
      </v-btn>
      <v-btn @click.native="registerAs('D')" fab color="indigo">
        <v-icon>D</v-icon>
      </v-btn>
      <v-btn @click.native="registerAs('')" fab outline small>
        <v-icon>close</v-icon>
      </v-btn>
    </v-speed-dial>

    <annotator inertia :minSize="[50, 50]" 
               :drawing="annotateMode.add" :nointeract="!annotateMode.edit"
               @select="editAnnotation" @drawfinish="addAnnotation"
               @unselect="selectedAnnotation = null"
    >
      <rect class="annotation-box" slot="drawing" />
      <rect class="annotation-box" slot="annotation" x="100" y="150" width="70" height="50" />
      <rect class="annotation-box" slot="annotation" x="300" y="150" width="170" height="100" />
      <ImageViewer :source="openedFile.uri" />
    </annotator>

    <v-speed-dial fixed bottom right hover direction="left" v-model="annotateMode.dialOpen" v-if="openedFile.registerAs">
      <v-btn slot="activator" :color="annotateMode.color || edBtn.color" fab v-model="annotateMode.dialOpen">
        <v-icon>{{annotateMode.icon}}</v-icon>
        <v-icon small>close</v-icon>
      </v-btn>

      <template v-if="annotateMode.on">
        <v-btn @click.native="cancelAnnotation" fab large color="secondary">
          <v-icon>cancel</v-icon>
        </v-btn>
        <v-btn v-if="!annotateMode.add" @click.native="deleteAnnotation" fab small color="warning">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-btn @click.native="annotateMode.add = true" fab color="primary">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn @click.native="annotateMode.edit = true" fab color="secondary">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn @click.native="deleteAnnotation" fab color="warning">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>

  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Annotator from 'vue-annotator/src/Annotator'
import {
  TelecommandChooser,
  FvViewerImage,
  TeleAllDialog
} from '@/components'

// default value
let edBtn = {
  icon: 'expand_more',
  color: ''
}
let annotateMode = {
  icon: 'crop_free'
}

export default {
  name: 'FileViewer',
  components: {
    Annotator: Annotator,
    Telecommand: TelecommandChooser,
    ImageViewer: FvViewerImage,
    ThingDialog: TeleAllDialog
  },

  data () {
    return {
      openThingDialog: false,
      dialogColor: 'purple',
      edBtn: {
        icon: edBtn.icon,
        color: ''
      },
      annotateMode: {
        icon: annotateMode.icon,
        add: false,
        edit: false,
        delete: false,
        on: false
      },
      selectedAnnotation: null
    }
  },

  mounted () {
    this.registerAs(this.openedFile.registerAs, false)
  },

  watch: {
    annotateMode: {
      handler (val, oldVal) { // handle annotate button style
        if (val['add']) {
          this.annotateMode.icon = 'add'
          this.annotateMode.color = 'primary'
          this.annotateMode.on = true
        } else if (val['edit']) {
          this.annotateMode.icon = 'edit'
          this.annotateMode.color = 'secondary'
          this.annotateMode.on = true
        } else this.cancelAnnotation()
      },
      deep: true
    }
  },

  computed: {
    ...mapState('fileManagers', ['openedFile']),
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
      'registerFileAs',
      'addAnnotation'
    ]),

    registerAs (type, store = true) {
      type = type ? type.charAt(0) : ''
      switch (type.charAt(0)) {
        case 'E':
          this.edBtn.color = 'teal'
          break
        case 'D':
          this.edBtn.color = 'indigo'
          break
        default:
          this.edBtn.color = edBtn.color
          break
      }
      this.edBtn.icon = type.length > 0 ? type : edBtn.icon
      if (store) this.registerFileAs(type).then(result => this.$forceUpdate()) // WARN: force to update because speed dial not show/hide properly
      // this.addAnnotation({
      //   name: 'lala',
      //   type: 'Rectangle',
      //   dimension: '[11, 23]',
      //   data: null
      // })
    },

    cancelAnnotation () {
      this.annotateMode['add'] = this.annotateMode['edit'] = this.annotateMode.on = false
      this.annotateMode.icon = annotateMode.icon
      this.annotateMode.color = edBtn.color
    },

    deleteAnnotation () {
      this.annotateMode.delete = true
      this.selectedAnnotation.remove()
      this.selectedAnnotation = null
      this.annotateMode.delete = false
    },

    editAnnotation (rect) {
      this.selectedAnnotation = rect.node
      if (this.annotateMode.edit) {
        this.openThingDialog = true
      }
    },

    addAnnotation (rect) {
      if (this.annotateMode.add) {
        this.openThingDialog = true
      }
    },

    setThing (thing) {
      if (annotateMode.on) {
        this.openThingDialog = false
      }
    },

    annotationUpdated (annotations) {
    },

    annotationAdded (annotation) {
    }
  }
}
</script>

<style>
@import "~vue-annotator/dist/vue-annotator.css";
</style>


<style scoped>
#viewer {
  user-select: none;
}

#ed-btn {
  margin: -15px 40px;
  z-index: 3;
}

.E {
  background: url("../assets/icons/E_file.svg");
}

.annotation-box {
  stroke: limegreen;
  stroke-width: 3px;
}
.annotation-box:hover {
  stroke: orange;
  stroke-width: 3px;
}
</style>
