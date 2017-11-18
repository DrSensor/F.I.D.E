<template>
  <v-app dark>
    <LeftSidebar :toggle='sidebar' />
    <HeaderToolbar id="header" @show-sidebar='val => { sidebar = val }' />
    <main>
      <v-content style="padding-top: 0px;">
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'FIDE',
  components: {
    LeftSidebar: () => import('@/components/NavigationSidebar'),
    HeaderToolbar: () => import('@/components/HeaderToolbar')
  },

  data () {
    return {
      sidebar: true,
      sensorbar: true,
      menuReady: true,
      logoutHover: false,
      hideApikey: true,
      apikey: window.localStorage.getItem('apikey')
    }
  }
}
</script>

<style scoped>
#header {
  position: sticky;
}
</style>


<style lang="stylus">
@import './assets/stylus/main.styl';
</style>


<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
html {
  overflow: hidden;
}
</style>
