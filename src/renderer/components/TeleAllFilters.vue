<template>
  <v-form v-model="valid">
    <h6 class="accent--text">Filter</h6>
    <div v-html="markdown('------')"></div>

    <template v-if="vendorAttrs.length > 0">
      <v-select v-model="vendorAttrName[attr]" 
                :items="vendorAttrsName[attr]" 
                prepend-icon="last_page" 
                :label="attr" v-for="(attr, id) in vendorAttrs" :key="id" 
                tags clearable autocomplete
      ></v-select>
    </template>

    <template v-if="attributes.length > 0">
      <v-btn @click.native="hideAttributes = !hideAttributes" 
             :ripple="false" 
             class="dropdown"
             flat icon small
      >
        <v-icon v-if="hideAttributes">keyboard_arrow_right</v-icon>
        <v-icon v-else>keyboard_arrow_down</v-icon>
      </v-btn>
      <span>Attributes</span>
      <template v-if="!hideAttributes">
        <v-select v-model="attributeName[attr]" 
                  :items="attributesName[attr]" 
                  prepend-icon="first_page" 
                  :label="attr" 
                  v-for="(attr, id) in attributes" :key="id" 
                  tags clearable autocomplete
        ></v-select>
      </template>
      <template v-else><br/></template>
      <br/>
    </template>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      telemetryName: '',
      attributeName: {},
      vendorAttrName: {},
      hideAttributes: true,
    }
  },
  computed: {
    ...mapState('iotServices', ['things']),
    ...mapGetters('iotServices', {
      attributesName: 'attributesName',
      vendorAttrsName: 'vendorAttributesName',
      attributes: 'attributesType',
      vendorAttrs: 'vendorAttributesType'
    })
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
