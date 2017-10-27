<template>
  <v-layout row wrap>
    <!-- https://codingexplained.com/coding/front-end/vue-js/looping-object-properties -->
    <v-container v-for="(contents, type, id) in groupedContents" :key="id">
      <v-subheader>{{type}}</v-subheader>
      <FmGridViewBase :contents="contents">
        <slot/>
      </FmGridViewBase>
    </v-container>
  </v-layout>
</template>

<script>
import { VGrid, VSubheader } from 'vuetify'

export default {
  name: 'FmGridViewGrouped',
  components: {
    VGrid,
    VSubheader,
    FmGridViewBase: () => import('./FmGridViewBase')
  },
  props: {
    groupedContents: Object
  }
}
</script>

