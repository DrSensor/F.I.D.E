<template>
  <v-container grid-list-md text-xs-center align-baseline fluid>
    <v-layout row wrap>
      <Breadcrumbs/>
    </v-layout>
    <v-layout row wrap>
      <v-btn @click='openFolder(folders[0].uri)'>openFolder</v-btn>
      <v-btn @click='openProject()'>openProject</v-btn>
    </v-layout>
  </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FileManager',
  components: {
    Breadcrumbs: () => import('@/components/FmBreadcrumbs')
  },

  computed: {
    ...mapState('fileManagers', [
      'folders'
    ])
  },
  methods: {
    ...mapActions('fileManagers/localFiles', [
      'openProject',
      'openFolder'
    ])
  }
}
</script>
