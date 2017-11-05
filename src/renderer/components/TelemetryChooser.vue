<template>
  <v-form v-model="valid">
    <v-subheader>Filter</v-subheader>
    <!-- dynamic based on topicPattern -->

    <v-subheader>Select/set source</v-subheader>
    <v-text-field prepend-icon="settings_remote" label="thing name" :items="thingsName" v-model="selectedThing" autocomplete></v-text-field>
    <v-text-field prepend-icon="hearing" label="quantity/variable name" hint="e.g `temperature``" v-model="variableName" required></v-text-field>

    <v-btn color="primary" :disabled="!valid" @click.native="set()">
      Set
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TelemetryChooser',
  data () {
    return {
      selectedThing: null,
      commandName: null,
      variableName: null
    }
  },
  computed: {
    ...mapGetters('iotServices', ['thingsName'])
  },
  methods: {
    set () {
      this.$emit('set')
    }
  }
}
</script>
