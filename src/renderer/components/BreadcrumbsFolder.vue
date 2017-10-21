<template>
  <v-breadcrumbs icons divider="send">
    <v-breadcrumbs-item @click.native="home()">
      <v-icon>home</v-icon>
    </v-breadcrumbs-item>
    <v-breadcrumbs-item v-for="(folder, id) in breadcrumbs" :key="id" @click.native="navigateTo(folder.uri)">
      {{ folder.name }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'BreadcrumbsFolder',

  computed: {
    ...mapState('fileManagers', [
      'openedProject',
      'folders'
    ]),
    ...mapGetters('fileManagers', [
      'breadcrumbs'
    ])
  },
  methods: {
    ...mapActions('fileManagers/localFiles', [
      'openProject',
      'openFolder',
      'closeFolder'
    ]),
    home () {
      this.openProject(this.openedProject.uri)
    },
    navigateTo (uri) {
      this.closeFolder(uri)
      this.openFolder(uri)
    }
  }
}
</script>

<style>
.breadcrumbs__item {
  display: inline;
}
</style>

<style scoped>
/* TODO: animate when width change */

.breadcrumbs {
  color: lightgray;
  border-radius: 10vw;
  border-style: solid;
  border-color: darkgray;
  border-left-width: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-left: -5.4ex;
  margin-top: 1vh;
  transition: all 0.5s;
  height: 40.5px;
  box-sizing: content-box;
}

.breadcrumbs li {
  cursor: pointer;
}
</style>
