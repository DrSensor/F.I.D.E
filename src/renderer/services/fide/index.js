import DSNedbAdapter from 'js-data-nedb'
import { DataStore } from 'js-data'
import { remote } from 'electron'
import path from 'path'

import { fileSchema, annotationSchema, thingSchema, telemetrySchema, telecommandSchema } from './schema'

let adapter = new DSNedbAdapter()

let store = new DataStore({ autoload: true })
store.registerAdapter('nedb', adapter, { default: true })
export default store

const fileMapper = {
  schema: fileSchema,
  hasMany: {
    annotation: {
      foreignKey: 'file_id',
      localField: 'annotations'
    }
  }
}

export let fileService = store.defineMapper({
  name: 'file',
  ...fileMapper,
  filepath: path.join(remote.app.getPath('desktop'), 'fide/files.db')
})

export let annotationService = store.defineMapper({
  name: 'annotation',
  schema: annotationSchema,
  hasOne: {
    thing: {
      foreignKey: 'annotation_id',
      localField: 'thing'
    },
    telemetry: {
      foreignKey: 'annotation_id',
      localField: 'telemetry'
    },
    telecommand: {
      foreignKey: 'annotation_id',
      localField: 'telecommand'
    }
  },
  filepath: path.join(remote.app.getPath('desktop'), 'fide/annotations.db')
})

export let thingService = store.defineMapper({
  name: 'thing',
  schema: thingSchema,
  hasMany: {
    telemetry: {
      foreignKey: 'thing_id',
      localField: 'telemetrys'
    },
    telecommand: {
      foreignKey: 'thing_id',
      localField: 'telecommands'
    }
  },
  belongsTo: {
    annotation: {
      foreignKey: 'annotation_id',
      localField: 'annotation'
    }
  },
  filepath: path.join(remote.app.getPath('desktop'), 'fide/things.db')
})

const teleDataRelation = {
  belongsTo: {
    annotation: {
      foreignKey: 'annotation_id',
      localField: 'annotation'
    },
    thing: {
      foreignKey: 'thing_id',
      localField: 'thing'
    }
  }
}

export let telemetryService = store.defineMapper({
  name: 'telemetry',
  schema: telemetrySchema,
  ...teleDataRelation,
  filepath: path.join(remote.app.getPath('desktop'), 'fide/telemetry.db')
})

export let telecommandService = store.defineMapper({
  name: 'telecommand',
  schema: telecommandSchema,
  ...teleDataRelation,
  filepath: path.join(remote.app.getPath('desktop'), 'fide/telecommand.db')
})

adapter.getDb(fileService).persistence.compactDatafile()
adapter.getDb(annotationService).persistence.compactDatafile()
adapter.getDb(thingService).persistence.compactDatafile()
adapter.getDb(telemetryService).persistence.compactDatafile()
adapter.getDb(telecommandService).persistence.compactDatafile()
