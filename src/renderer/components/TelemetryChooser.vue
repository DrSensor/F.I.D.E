<template>
  <v-form v-model="valid">
    <h6 class="accent--text">Select/set source</h6>
    <div v-html="markdown('------')"></div>
    <v-select prepend-icon="settings_remote"
              v-model="thingName"
              :rules="thingNameRules"
              :items="thingsName"
              label="thing name"
              :multiple="false" required
    ></v-select>
    <v-text-field prepend-icon="hearing"
                  v-model="telemetryName"
                  :rules="telemetryNameRules"
                  :hint="markdown('e.g: __temperature__')"
                  label="quantity/variable name"
                  persistent-hint required
    ></v-text-field>

    <v-btn color="primary" :disabled="!valid" @click.native="watch()">
      Set
    </v-btn>

    <v-btn color="secondary" @click.native="$emit('close')">
      Close
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
                      :rules="topicRules"
                      class="topic"
                      auto-grow autofocus
        ></v-text-field>
      </template>
      <br/>
    </template>
  </v-form>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { find } from 'lodash'
import showdown from 'showdown'

let markdown = new showdown.Converter()

export default {
  name: 'TelemetryChooser',
  data () {
    let regexThingName = /[-_\w\d]+/
    let regexTelemetryName = /[a-z]+/
    let regexTopic = /^(([\w/][\w-_]+)|[+])(([/][\w-]+)|[/][+])*([/][\w-]+|[/][#])$/
    return {
      valid: false,
      thingName: '',
      thingNameRules: [
        str => regexThingName.test(str) || 'only `a-Z`, `-`, and `_` allowed'
      ],
      telemetryName: '',
      telemetryNameRules: [
        str => regexTelemetryName.test(str) || 'only lower case character allowed'
      ],
      topicRules: [
        str => regexTopic.test(str) || 'topic string invalid'
      ],
      hideSubscribedTopic: true,
      subscribedTopic: ''
    }
  },
  watch: {
    valid: function (val) { this.hideSubscribedTopic = val }
  },
  computed: {
    ...mapState('iotServices', ['things']),
    ...mapGetters('iotServices', {
      thingsName: 'thingsName'
    }),
    topic: {
      get: function () {
        return this.subscribedTopic || find(this.things, { name: this.thingName }).topic + '/' + this.telemetryName
      },
      set: function (value) {
        this.subscribedTopic = value
      }
    }
  },
  methods: {
    ...mapMutations({
      addTopic: 'SUBSCRIBE_TOPIC]add'
    }),
    watch () {
      this.$emit('set')
      this.addTopic(this.topic)
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
