<template>
  <v-form v-model="valid">
    <v-subheader>Filter</v-subheader>
    <!-- dynamic based on topicPattern -->

    <v-subheader>Select/set source</v-subheader>
    <v-text-field prepend-icon="settings_remote" label="thing name" :items="thingsName" v-model="selectedThing" autocomplete></v-text-field>
    <v-text-field prepend-icon="input" label="command name" :hint="markdown('e.g: __move__ or __move/down__')" v-model="commandName" persistent-hint></v-text-field>
    <v-text-field prepend-icon="code" label="quantity/variable name" :hint="markdown('e.g: __angle__')" v-model="variableName" persistent-hint required></v-text-field>

    <v-btn color="secondary" :disabled="!valid" @click.native="set()">
      Set
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import showdown from 'showdown'

let markdown = new showdown.Converter()

export default {
  name: 'TelecommandChooser',
  data () {
    return {
      valid: false,
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
    },
    markdown: text => markdown.makeHtml(text)
  }
}
</script>
