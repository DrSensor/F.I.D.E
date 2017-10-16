<<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="sidebar = !sidebar"></v-toolbar-side-icon>
    <v-spacer/>
    <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
    <v-spacer/>
  </v-toolbar>
</template>

<script>
export default {
  name: 'HeaderToolbar',

  data () {
    return {
      sidebar: true
    }
  },

  watch: {
    sidebar: function (newVal) {
      this.$emit('show-sidebar', newVal)
    }
  }
}
</script>
