<template>
  <v-tabs v-model="title" dark icons centered grow>
    <h5>{{title}}</h5>
    <v-tabs-items>
      <v-tabs-content id="Telemetry">
        <Telemetry @set="$emit('set')" />
      </v-tabs-content>
      <v-tabs-content id="Telecommand">
        <Telecommand @set="$emit('set')" />
      </v-tabs-content>
    </v-tabs-items>

    <v-tabs-bar class="no-background">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tabs-item href="#Telemetry">
        <v-icon>hearing</v-icon>
      </v-tabs-item>
      <v-tabs-item href="#Telecommand">
        <v-icon>input</v-icon>
      </v-tabs-item>
    </v-tabs-bar>

  </v-tabs>
</template>

<script>
export default {
  name: 'TelethingDialog',
  model: {
    event: 'tab'
  },
  components: {
    Telecommand: () => import('./TelecommandChooser'),
    Telemetry: () => import('./TelemetryChooser')
  },
  data () {
    return {
      title: ''
    }
  },
  watch: {
    title: function (val) {
      this.$emit('tab', val)
    }
  }
}
</script>

<style scoped>
.no-background {
  background-color: transparent;
}
</style>

