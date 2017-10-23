<template>
  <transition-group name="fade" tag="v-layout" row wrap>
    <v-flex d-flex v-for="(c, id) in contents" :key="id">
      <v-card v-if="c.type === 'folder'" @click.native="openFolder(c.uri)" hover tile flat>
        <v-card-text>
          {{c.name}}
        </v-card-text>
        <!-- <v-card-actions>
              <div v-if="f.id === s.idFolder" v-for="(s, index) in linkedSensorsName" :key="index">
                <v-chip v-for="(name, index) in s.sensorNames" :key="index" label outline small class="primary green--text">{{name}}</v-chip>
              </div>
            </v-card-actions> -->
      </v-card>
      <v-card v-else @click="openFile(c)" hover tile flat>
        <v-card-text>
          {{c.name}}
        </v-card-text>
        <!-- <v-card-actions>
              <div v-if="f.id === s.idFolder" v-for="(s, index) in linkedSensorsName" :key="index">
                <v-chip v-for="(name, index) in s.sensorNames" :key="index" label outline small class="primary green--text">{{name}}</v-chip>
              </div>
            </v-card-actions> -->
      </v-card>
    </v-flex>
  </transition-group>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { VCard } from 'vuetify'

export default {
  name: 'FmListCard',
  comments: { VCard },
  props: {
    sortBy: String,
    toggle: Boolean
  },
  watch: {
    toggle: function () {
      this.toggleOrder()
    }
  },

  computed: {
    ...mapGetters('fileManagers', [
      'sortByName',
      'sortByType'
    ]),
    contents: function () {
      switch (this.sortBy) {
        case 'name':
          return this.sortByName
        case 'type':
          return this.sortByType
        default:
          return this.sortByType
      }
    }
  },

  methods: {
    ...mapActions('fileManagers/localFiles', [
      'openFolder',
      'openFile'
    ]),
    ...mapMutations('fileManagers', {
      toggleOrder: 'TOGGLE_ORDER'
    })
  }
}
</script>
