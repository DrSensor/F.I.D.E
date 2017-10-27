<template>
  <v-container transition="fade-transition">
    <fm-grid-view-grouped :groupedContents="contents" v-if="grouped">
      <template v-for="contentsByType in contents">
        <template v-for="content in contentsByType" :slot="content.uri">
          <slot :name="content.uri" />
        </template>
      </template>
    </fm-grid-view-grouped>
    <fm-grid-view-base :contents="contents" v-else>
      <template v-for="content in contents" :slot="content.uri">
        <slot :name="content.uri" />
      </template>
    </fm-grid-view-base>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { VGrid } from 'vuetify'
import { groupBy } from 'lodash'

export default {
  name: 'FmGridView',
  components: {
    VGrid,
    FmGridViewBase: () => import('./FmGridViewBase'),
    FmGridViewGrouped: () => import('./FmGridViewGrouped')
  },
  props: {
    sortBy: {
      type: String,
      required: false,
      default: 'name'
    },
    toggle: {
      type: Boolean,
      required: false,
      default: false
    },
    grouped: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    toggle: function () {
      this.toggleOrder()
    },
    contents: function (data) {
      this.$emit('update:contents', data)
    }
  },
  methods: {
    ...mapMutations('fileManagers', {
      toggleOrder: 'TOGGLE_ORDER'
    })
  },

  computed: {
    ...mapGetters('fileManagers', [
      'sortByName',
      'sortByType'
    ]),
    contents: function () {
      let data
      switch (this.sortBy) {
        case 'name':
          data = this.sortByName
          break
        case 'type':
          data = this.sortByType
          break
        default:
          data = this.sortByType
          break
      }
      if (this.grouped) data = groupBy(data, datum => datum.type)
      return data
    }
  }
}
</script>
