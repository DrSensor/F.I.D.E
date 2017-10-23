<template>
  <v-container grid-list-md text-xs-center align-baseline fluid>
    <v-layout row wrap>
      <Breadcrumbs/>
    </v-layout>
    <v-layout row wrap>
      <v-btn @click='openProject()'>openProject</v-btn>
      <v-btn @click='toggle = !toggle'>toggle order</v-btn>
    </v-layout>
    <FolderFileCards sortBy="type" :toggle="toggle"/>
  </v-container>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FileManager',
  components: {
    Breadcrumbs: () => import('@/components/FmBreadcrumbs'),
    FolderFileCards: () => import('@/components/FmListCard')
  },
  data () {
    return {
      toggle: false
    }
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
