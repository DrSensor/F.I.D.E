<template>
  <v-form v-model="valid">
    <h6 class="accent--text">Select/set source</h6>
    <div v-html="markdown('------')"></div>
    <v-select prepend-icon="settings_remote" 
              label="thing name" 
              :items="thingsName" 
              v-model="thingName" 
              autocomplete required
    ></v-select>
    <v-text-field prepend-icon="hearing" 
                  label="quantity/variable name" 
                  :hint="markdown('e.g: __temperature__')" 
                  v-model="telemetryName" 
                  required
    ></v-text-field>

    <v-btn color="primary" :disabled="!valid" @click.native="set()">
      Set
    </v-btn>

    <template v-if="valid">
      <br/>
      <v-btn @click.native="hideSubscribedTopic = !hideSubscribedTopic" 
             :ripple="false" class="dropdown" 
             flat icon small
      >
        <v-icon v-if="hideSubscribedTopic">keyboard_arrow_right</v-icon>
        <v-icon v-else>keyboard_arrow_down</v-icon>
      </v-btn>
      <span>Subscribed Topic</span>
      <template v-if="!hideSubscribedTopic">
        <v-text-field v-model="topic"
                      class="topic"
                      auto-grow autofocus counter readonly
        ></v-text-field>
      </template>
      <br/>
    </template>
  </v-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { find } from 'lodash'
import showdown from 'showdown'

let markdown = new showdown.Converter()

export default {
  name: 'TelemetryChooser',
  data () {
    return {
      valid: false,
      thingName: '',
      telemetryName: '',
      hideSubscribedTopic: true,
      subscribedTopic: ''
    }
  },
  computed: {
    ...mapState('iotServices', ['things']),
    ...mapGetters('iotServices', {
      thingsName: 'thingsName'
    }),
    topic: {
      get: function () {
        return find(this.things, { name: this.thingName }).topic + '/' + this.telemetryName
      },
      set: function (value) {
        this.subscribedTopic = value
      }
    }
  },
  methods: {
    set () {
      this.$emit('set')
    },
    markdown: text => markdown.makeHtml(text)
  }
}
</script>

<style scoped>
h6 {
  font-size: 15px;
  font-weight: 500;
}
.dropdown {
  margin-left: -10px;
}
.topic {
  margin-top: -10px;
}
</style>
