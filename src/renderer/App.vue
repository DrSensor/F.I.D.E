<template>
  <div id="app">
    <v-app dark>
      <left-sidebar :toggle='sidebar'></left-sidebar>
      <header-toolbar @show-sidebar='val => { sidebar = val }'></header-toolbar>
      <main>
        <v-content>
          <v-container fluid fill-height>
            <v-slide-y-transition mode="out-in">
              <router-view></router-view>
            </v-slide-y-transition>
          </v-container>
        </v-content>
      </main>
    </v-app>
  </div>
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

<style lang="stylus">
@import './assets/stylus/main.styl';
</style>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');













/* Global CSS */
</style>
