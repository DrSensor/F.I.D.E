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
    </v-layout>
    <FolderFileViewer :sortBy="sortBy" :toggle="toggle" :grouped="grouped" />
  </v-container>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  name: 'FileManager',
  components: {
    Breadcrumbs: () => import('@/components/FmBreadcrumbs'),
    FolderFileViewer: () => import('@/components/FmGridView')
  },
  data () {
    return {
      toggle: false,
      grouped: false,
      sortBy: 'name'
    }
  },

  methods: {
    ...mapActions('fileManagers/localFiles', [
      'openProject'
    ])
  }
}
</script>
