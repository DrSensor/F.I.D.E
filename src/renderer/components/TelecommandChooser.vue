<template>
  <v-form v-model="valid">
    <v-subheader>Filter</v-subheader>
    <!-- dynamic based on topicPattern -->

    <v-subheader>Select/set source</v-subheader>
    <v-text-field prepend-icon="settings_remote" label="thing name" :items="thingsName" v-model="selectedThing" autocomplete></v-text-field>
    <v-text-field prepend-icon="input" label="command name" hint="e.g `move` or `move/down`" v-model="commandName"></v-text-field>
    <v-text-field prepend-icon="code" label="quantity/variable name" hint="e.g `angle``" v-model="variableName" required></v-text-field>

    <v-btn color="secondary" :disabled="!valid" @click.native="set()">
      Set
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TelecommandChooser',
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
