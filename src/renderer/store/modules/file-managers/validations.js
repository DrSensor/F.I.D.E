import {Schema} from 'js-data'

export const historySchema = new Schema({
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      uri: {
        type: 'string'
        // pattern: '\\g'
      }
    }
  }
})

export const foldersSchema = new Schema({
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      uri: {
        type: 'string'
        // pattern: '\\g'
      },
      itemCount: {
        type: 'number',
        minimum: 0
      }
    },
    required: ['name', 'uri']
  }
})

export const filesSchema = new Schema({
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      uri: {
        type: 'string'
        // pattern: '\\g' // uri pattern
      },
      thumbnail: {
        type: 'string'
        // pattern: '*.jpg|*.png' // check if media
      },
      required: ['name', 'uri']
    }
  }
})
