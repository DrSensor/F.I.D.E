<template>
  <v-navigation-drawer
    clipped persistent app
    v-model="draw" :mini-variant="mini"
    enable-resize-watcher>
    <v-list class="pa-1">
      <v-list-tile v-if="mini"
        @click.native.stop="mini = !mini">
        <v-list-tile-action>
          <v-btn icon @click.native.stop="mini = !mini">
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-else avatar>
        <!-- avatar -->
        <v-list-tile-content>
          <v-list-tile-title>{{this.$route.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.native.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-list dense class="pt-0">
      <v-divider light></v-divider>

      <v-list-tile v-for="item in items"
        :key="item.path"
        :to="{name: item.name}"
        :router="true">
        <v-list-tile-action>
          <v-icon>{{item.meta.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
    </v-navigation-drawer>
</template>

<script>
import _ from 'lodash/collection'
import omit from 'lodash/omit'

export default {
  name: 'NavigationSidebar',
  props: {
    toggle: Boolean
  },
  data () {
    return {
      items: [],
      mini: true,
      draw: this.toggle
    }
  },

  watch: {
    toggle: function () {
      this.draw = !this.draw
    }
  },

  mounted () {
    let list = _.filter(this.$router.options.routes, 'meta.icon')

    // save memory by removing unused key
    list = _.map(list, obj => {
      return omit(obj, ['component', 'children', 'beforeEnter'])
    })

    this.items.push(...list)
  }
}
</script>

<style scoped>

</style>
