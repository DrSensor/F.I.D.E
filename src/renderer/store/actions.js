// import validate from '@/utils/validate'
import db, {
  fileService,
  annotationService,
  knex
} from '@/services/fide'
// import {
//   thingSchema as thing,
//   telemetrySchema as telemetry,
//   telecommandSchema as telecommand
// } from '@/services/fide/schema'

const actions = {
  async registerFileAs ({ state, commit }, type) {
    if (type.length === 1) {
      if (type === 'E') type = 'Electronics Schematic'
      else if (type === 'D') type = 'Design Blueprint'
      else throw Error('type must be E, D, Electronics Schematic, or Design Blueprint')
    } else if (!/Electronics Schematic|Design Blueprint|^$/i.test(type)) {
      throw Error('type must be E, D, Electronics Schematic, or Design Blueprint')
    }

    let record = {
      name: state['fileManagers'].openedFile.name,
      origin: 'local-files',
      uri: state['fileManagers'].openedFile.uri
    }

    let file = []
    try { // Create or Update table
      if (await knex.schema.hasTable('file')) file = await db.findAll('file', record)
      if (file.length > 1) console.warn(`Warning: duplicate row in table 'file' at id:${file.filter(f => f.id)}`)
      if (!file.length) record.type = type
      file = file.length ? await db.update('file', file[0].id, { type: type }) : await db.create('file', record)
      commit('REGISTER_FILE', type)
      return file
    } catch (error) {
      throw (error, fileService.validate(record))
    }
  },

  async addAnnotation ({ state }, { name, type, dimension, data }) {
    let fileName = state['fileManagers'].openedFile.name
    let annotationName = name
    let file = (await db.findAll('file', { name: fileName }))[0]
    // console.log(annotationService.validate({
    //   name: annotationName,
    //   type: type,
    //   dimension: dimension
    // }))
    let annotation = await annotationService.create({
      name: annotationName,
      type: type,
      dimension: dimension,
      file_id: file.id
    })

    // const is = schema => validate(data, schema)
    // if (is(thing) && /design blueprint/i.test(type)) {
    //   db.create('thing', {
    //     ...data,
    //     annotation_id: annotation.id
    //   })
    // } else if (/electronic schematic/i.test(type)) {
    //   if (is(telemetry)) {
    //     db.create('telemetry', {
    //       ...data,
    //       annotation_id: annotation.id
    //     })
    //   } else if (is(telecommand)) {
    //     db.create('telecommand', {
    //       ...data,
    //       annotation_id: annotation.id
    //     })
    //   }
    // }

    return annotation
  }
}

export default {
  actions
}
