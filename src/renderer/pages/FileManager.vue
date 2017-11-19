<template>
  <v-container grid-list-md text-xs-center align-baseline fluid>
    <v-layout row wrap>
      <Breadcrumbs/>
    </v-layout>
    <v-layout row wrap>
      <v-btn @click='openProject()'>openProject</v-btn>
      <v-btn @click='toggle = !toggle'>toggle order</v-btn>
      <v-btn @click='grouped = !grouped'>grouped order</v-btn>
      <input type="text" v-model="sortBy" />

      <v-dialog v-model="awsDialog" max-width="500px">
        <v-btn color="orange" slot="activator">AWS</v-btn>
        <v-container>
          <h5>AWS IoT</h5>
          <RegForm @success="awsDialog = false"/>
        </v-container>
      </v-dialog>
      
    </v-layout>
    <FolderFileViewer :contents.sync="contents" :sortBy="sortBy" :toggle="toggle" :grouped="grouped">
      <v-chip :slot="toURI('Pipfile')">asdsd</v-chip>
    </FolderFileViewer>
  </v-container>
</template>


<script>
import { mapActions } from 'vuex'
import { find, isPlainObject, filter, some } from 'lodash'

export default {
  name: 'FileManager',
  components: {
    Breadcrumbs: () => import('@/components/FmBreadcrumbs'),
    FolderFileViewer: () => import('@/components/FmGridView'),
    RegForm: () => import('@/components/AWSRegForm')
  },
  data () {
    return {
      awsDialog: false,
      toggle: false,
      grouped: false,
      sortBy: 'name',
      contents: null
    }
  },
  watch: {
    grouped: function (val) {
      this.sortBy = this.grouped ? 'type' : 'name'
    }
  },

  methods: {
    ...mapActions('fileManagers/localFiles', [
      'openProject'
    ]),
    toURI (filename) {
      try {
        if (isPlainObject(this.contents)) {
          let segment = filter(this.contents, typeContents => some(typeContents, ['name', filename]))
          return find(segment, ['name', filename]).uri
        } else return find(this.contents, ['name', filename]).uri
      } catch (error) { }
    }
  }
}
</script>
