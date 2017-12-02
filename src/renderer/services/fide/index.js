import { SqlAdapter } from 'js-data-autosql'
import { DataStore } from 'js-data'
import { remote } from 'electron'
import path from 'path'

import { fileSchema, annotationSchema, thingSchema, telemetrySchema, telecommandSchema } from './schema'

let adapter = new SqlAdapter({
  knexOpts: {
    client: 'sqlite3',
    connection: {
      filename: path.join(remote.app.getPath('desktop'), 'fide.db')
    },
    useNullAsDefault: true
  },
  auto: {
    timestamp: true,
    alterTable: true,
    arrayAs: {
      type: 'string',
      delimiter: '\t'
    }
  }
})
export const knex = adapter.knex

let store = new DataStore({ autoload: true })
store.registerAdapter('sql', adapter, { default: true })
export default store

export let fileService = store.defineMapper('file', {
  timestamp: true,
  schema: fileSchema,
  relations: {
    hasMany: {
      annotation: {
        foreignKey: 'file_id',
        localField: 'annotation'
      }
    }
  }
})

export let annotationService = store.defineMapper('annotation', {
  timestamp: true,
  schema: annotationSchema,
  relations: {
    belongsTo: {
      file: {
        foreignKey: 'file_id',
        localField: 'file'
      }
    },
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
    }
  }
})

export let thingService = store.defineMapper('thing', {
  schema: thingSchema,
  relations: {
    hasMany: {
      telemetry: {
        foreignKey: 'thing_id',
        localField: 'telemetry'
      },
      telecommand: {
        foreignKey: 'thing_id',
        localField: 'telecommand'
      }
    },
    belongsTo: {
      annotation: {
        foreignKey: 'annotation_id',
        localField: 'annotation'
      }
    }
  }
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

export let telemetryService = store.defineMapper('telemetry', {
  schema: telemetrySchema,
  relations: teleDataRelation
})

export let telecommandService = store.defineMapper('telecommand', {
  schema: telecommandSchema,
  relations: teleDataRelation
})
