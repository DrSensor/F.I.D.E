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
    <v-text-field prepend-icon="input"
                  v-model="commandName"
                  :rules="telecommandNameRules"
                  label="command name"
                  :hint="markdown('e.g: __move__ or __move/down__')"
                  persistent-hint required
    ></v-text-field>
    <v-text-field prepend-icon="code"
                  v-model="variableName"
                  :rules="telecommandNameRules"
                  label="quantity/variable name"
                  :hint="markdown('e.g: __angle__')"
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
      <v-btn @click.native="hidePublishedTopic = !hidePublishedTopic" 
             :ripple="false" class="dropdown" 
             flat icon small
      >
        <v-icon v-if="hidePublishedTopic">keyboard_arrow_right</v-icon>
        <v-icon v-else>keyboard_arrow_down</v-icon>
      </v-btn>
      <span>Published Topic</span>
      <template v-if="!hidePublishedTopic">
        <v-text-field v-model="topic"
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
  name: 'TelecommandChooser',
  data () {
    let regexThingName = /[-_\w\d]+/
    let regexTelecommandName = /[a-z]+/
    let regexTopic = /^(([\w/][\w-_]+)|[+])(([/]\w+)|[/][+])*([/]\w+|[/][#])$/
    return {
      valid: false,
      thingName: '',
      thingNameRules: [
        str => regexThingName.test(str) || 'only `a-Z`, `-`, and `_` allowed'
      ],
      commandName: '',
      variableName: '',
      telecommandNameRules: [
        str => regexTelecommandName.test(str) || 'only lower case character allowed'
      ],
      topicRules: [
        str => regexTopic.test(str) || 'topic string invalid'
      ],
      hidePublishedTopic: true,
      publishedTopic: ''
    }
  },
  watch: {
    valid: function (val) { this.hidePublishedTopic = val }
  },
  computed: {
    ...mapState('iotServices', ['things']),
    ...mapGetters('iotServices', {
      thingsName: 'thingsName'
    }),
    topic: {
      get: function () {
        return this.publishedTopic || find(this.things, { name: this.thingName }).topic + '/' + this.telemetryName
      },
      set: function (value) {
        this.publishedTopic = value
      }
    }
  },
  methods: {
    ...mapMutations({
      addTopic: 'PUBLISH_TOPIC]add'
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
