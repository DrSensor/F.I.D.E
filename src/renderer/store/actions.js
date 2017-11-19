import { last, find } from 'lodash'
import validate from '@/utils/validate'
import db, {
  fileService,
  annotationService
} from '@/services/fide'
import {
  thingSchema as thing,
  telemetrySchema as telemetry,
  telecommandSchema as telecommand
} from '@/services/fide/schema'

const actions = {
  async registerFileAs ({ state }, type) {
    let name = last(state['fileManagers'].history)
    let uri = find(state['fileManagers'].files, ['name', name]).uri
    let file = await fileService.create({
      name: name,
      type: type,
      origin: 'local-files',
      uri: uri
    })
    return file
  },

  async addAnnotation ({ state }, { name, type, dimension, data }) {
    let fileName = last(state['fileManagers'].history)
    let annotationName = name
    let file = await fileService.find({ name: fileName })
    let annotation = await annotationService.create({
      name: annotationName,
      type: type,
      dimension: dimension,
      file_id: file.id
    })

    const is = schema => validate(data, schema)
    if (is(thing) && /design blueprint/i.test(type)) {
      db.create('thing', {
        ...data,
        annotation_id: annotation.id
      })
    } else if (/electronic schematic/i.test(type)) {
      if (is(telemetry)) {
        db.create('telemetry', {
          ...data,
          annotation_id: annotation.id
        })
      } else if (is(telecommand)) {
        db.create('telecommand', {
          ...data,
          annotation_id: annotation.id
        })
      }
    }

    return annotation
  }
}

export default {
  actions
}
