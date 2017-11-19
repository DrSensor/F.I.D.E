<template>
  <v-layout transition="fade-transition" row wrap>
    <v-flex d-flex md1 v-for="(c, id) in contents" :key="id">
      <v-card hover tile flat>
        <v-card-media v-if="c.type === 'folder'" @click.native="openFolder(c.uri)">
          <v-spacer/>
          <v-icon x-large>{{c.type}}</v-icon>
          <v-spacer/>
        </v-card-media>
        <v-card-media v-else @click.native="viewFile(c.uri)" :src="c.thumbnail">
          <v-spacer/>
          <v-icon x-large v-if="!c.thumbnail">{{c.type | filetype2materialIcon}}</v-icon>
          <v-spacer/>
        </v-card-media>
        <v-card-text class="text-md-center fade-text" wrap>
          {{c.name}}
        </v-card-text>
        <v-card-actions v-if="hasSlot">
          <slot :name="c.uri" />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { VCard, VGrid } from 'vuetify'
import { isEmpty } from 'lodash'

export default {
  name: 'FmGridViewBase',
  components: { VCard, VGrid },
  props: {
    contents: Array
  },

  computed: {
    hasSlot: function () { return !isEmpty(this.$slots) }
  },

  methods: {
    // INFO: consider using this https://github.com/vuejs/vuex/issues/863 when its done
    ...mapActions('fileManagers/localFiles', [
      'openFolder',
      'openFile'
    ]),
    viewFile (uri) {
      this.openFile(uri)
      this.$router.push({ name: 'File Viewer' })
    }
  },

  filters: {
    filetype2materialIcon: function (value) {
      switch (value) {
        case 'font':
          return 'text_format'
        case 'text':
          return 'description'
        case 'document':
          return 'assignment'
        case 'image':
          return 'photo'
        case 'audio':
          return `${value}track`
        case 'video':
          return `${value}cam`
        case 'unknown':
          return `insert_drive_file`
        default:
          return value
      }
    }
  }
}
</script>

<style scoped>
.fade-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
}
</style>

