<template>
  <v-layout row wrap>
    <!-- https://codingexplained.com/coding/front-end/vue-js/looping-object-properties -->
    <v-container v-for="(contents, type, id) in groupedContents" :key="id">
      <v-subheader>{{type | capitalize}}</v-subheader>
      <fm-grid-view-base :contents="contents">
        <template v-for="content in contents" :slot="content.uri">
          <slot :name="content.uri" />
        </template>
      </fm-grid-view-base>
    </v-container>
  </v-layout>
</template>

<script>
import { VGrid, VSubheader } from 'vuetify'
import { capitalize } from 'lodash'

export default {
  name: 'FmGridViewGrouped',
  components: {
    VGrid,
    VSubheader,
    FmGridViewBase: () => import('./FmGridViewBase')
  },
  props: {
    groupedContents: Object
  },
  filters: {
    capitalize: string => capitalize(string)
  }
}
</script>

