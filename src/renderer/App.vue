<template>
  <div id="app">
    <v-app dark>
      <LeftSidebar :toggle='sidebar'/>
      <HeaderToolbar @show-sidebar='val => { sidebar = val }'/>
      <main>
        <v-content>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
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
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
</style>
