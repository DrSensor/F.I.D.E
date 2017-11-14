<template>
  <v-form v-model="valid">
    <v-text-field prepend-icon="supervisor_account"
                  label="Access key ID"
                  v-model="accessKey"
                  :rules="accessKeyRules"
                  required
    ></v-text-field>
    <v-text-field prepend-icon="vpn_key"
                  :append-icon="keyVisible ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (keyVisible = !keyVisible)"
                  :type="keyVisible ? 'password' : 'text'"
                  label="Secret access key"
                  v-model="secretKey"
                  :rules="secretKeyRules"
                  required
    ></v-text-field>
    <v-text-field prepend-icon="public" label="Region" v-model="region" :rules="regionRules" required></v-text-field>

    <v-btn color="orange" :loading="authenticating" :disabled="!valid || authenticating" @click.native="verify()">
      Configure
      <span slot="loader" class="custom-loader">
        <v-icon>cached</v-icon>
      </span>
    </v-btn>

    <v-icon v-if="isError" color="error" class="pr-2">error</v-icon>
    <span v-if="isError" class="error--text">{{error}}</span>

    <v-icon v-if="authenticated" color="success" class="pr-2">check</v-icon>
    <span v-if="authenticated" class="success--text">Success</span>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { isEmpty } from 'lodash'

const opts = JSON.parse(window.localStorage.getItem('aws')) || {}

export default {
  name: 'AWSRegForm',
  data () {
    let regexAccessKey = /(^|[^A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/
    let regexSecretKey = /(^|[^A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/
    let regexRegion = /(([a-z]{2})-([a-z]*)-[1-2])/
    return {
      valid: false,
      keyVisible: true,
      accessKey: opts.accessKeyId || '',
      accessKeyRules: [ str => regexAccessKey.test(str) || 'invalid access key' ],
      secretKey: opts.secretAccessKey || '',
      secretKeyRules: [ str => regexSecretKey.test(str) || 'invalid secret key' ],
      region: opts.region || '',
      regionRules: [ str => regexRegion.test(str) || 'invalid region' ]
    }
  },

  computed: {
    ...mapState('iotServices/awsIot', [
      'authenticating',
      'authenticated',
      'error'
    ]),
    isError: function () {
      return !isEmpty(this.error) && !this.authenticating && !this.authenticated && this.valid
    }
  },

  methods: {
    isEmpty: str => isEmpty(str),
    ...mapActions('iotServices/awsIot', [
      'auth'
    ]),
    verify () {
      this.auth({
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
        region: this.region
      }).then(success => setTimeout(() => this.$emit('success'), 1500))
    }
  }
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
