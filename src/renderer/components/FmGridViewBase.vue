<template>
  <v-layout transition="fade-transition" row wrap>
    <v-flex d-flex md1 v-for="(c, id) in contents" :key="id">
      <v-card hover tile flat>
        <v-card-media v-if="c.type === 'folder'" @click.native="openFolder(c.uri)">
          <v-spacer/>
          <v-icon x-large>{{c.type}}</v-icon>
          <v-spacer/>
        </v-card-media>
        <v-card-media v-else @click.native="openFile(c)" :src="c.thumbnail">
          <v-spacer/>
          <v-icon x-large v-if="!c.thumbnail">{{c.type | filetype2mdi}}</v-icon>
          <v-spacer/>
        </v-card-media>
        <v-card-text class="text-md-center" wrap>
          {{c.name | limitText}}
        </v-card-text>
        <v-card-actions v-if="hasSlot">
          <slot/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { VCard, VGrid } from 'vuetify'

export default {
  name: 'FmGridViewBase',
  components: { VCard, VGrid },
  props: {
    contents: Array
  },

  computed: {
    hasSlot: function () { return !!this.$slots.default }
  },

  methods: {
    // INFO: consider using this https://github.com/vuejs/vuex/issues/863 when its done
    ...mapActions('fileManagers/localFiles', [
      'openFolder',
      'openFile'
    ])
  },

  filters: {
    limitText: function (value) {
      return value
    },
    filetype2mdi: function (value) {
      switch (value) {
        case 'text':
          return 'text_format'
        case 'unknown':
          return 'help'
        default:
          return value
      }
    }
  }
}
</script>
