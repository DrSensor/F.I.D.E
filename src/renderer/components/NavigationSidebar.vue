<template>
  <v-navigation-drawer clipped persistent app v-model="draw" :mini-variant="mini" enable-resize-watcher>
    <v-list v-if="!mini" class="pa-0">
      <v-list-tile avatar>
        <!-- avatar -->
        <v-list-tile-content>
          <v-list-tile-title>{{this.$route.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list dense class="pt-0">
      <v-divider light></v-divider>

      <v-list-tile v-for="item in items" :key="item.path" :to="{name: item.name}" router>
        <v-list-tile-action>
          <v-icon>{{item.meta.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <v-list class="pa-1 bottom">
      <v-list-tile v-if="mini" @click.native.stop="mini = !mini">
        <v-list-tile-action>
          <v-btn color="yellow" flat icon @click.native.stop="mini = !mini">
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-else flat class="deep-orange">
        <v-list-tile-action>
          <v-btn color="yellow" flat icon @click.native.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-spacer/>
        <v-list-tile-content>
          <v-list-tile-title class="title">{{timenow}}</v-list-tile-title>
        </v-list-tile-content>
        <v-spacer/>        
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import { collection as _, omit } from 'lodash'

export default {
  name: 'NavigationSidebar',
  props: {
    toggle: Boolean
  },
  data () {
    return {
      items: [],
      mini: true,
      draw: this.toggle,
      timenow: new Date(Date.now())
    }
  },

  computed: {
    ...mapState('fileManagers', [ 'openedFile' ])
  },

  watch: {
    toggle: function () {
      this.draw = !this.draw
    },
    openedFile: function (val) {
      this.updateNavigation()
    }
  },

  methods: {
    updateNavigation () {
      let list = _.filter(this.$router.options.routes, 'meta.icon')

      // save memory by removing unused key
      list = _.map(list, obj => {
        return omit(obj, ['component', 'children', 'beforeEnter'])
      })

      if (!this.openedFile) list = _.reject(list, obj => obj.name === 'File Viewer')
      this.items = list
    }
  },

  created () {
    setInterval(() => {
      this.timenow = new Date(Date.now()).toLocaleTimeString()
    }, 500)
  },

  mounted () {
    this.updateNavigation()
  }
}
</script>

<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
