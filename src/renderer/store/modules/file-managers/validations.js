import { Schema } from 'js-data'

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
      type: { type: 'string' },
      itemCount: {
        type: 'number',
        minimum: 0
      }
    },
    required: ['name', 'uri', 'type']
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
        // pattern: '/^$/' // uri pattern
      },
      type: { type: 'string' },
      thumbnail: {
        type: 'string',
        pattern: /[.](jpg|jpeg|png)$/i // check if media
      },
      required: ['name', 'uri', 'type']
    }
  }
})

export const supportedFileSchema = new Schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    uri: {
      type: 'string',
      pattern: /[.](jpg|jpeg|png|tiff)$/i // uri pattern
    },
    type: { type: 'string' },
    thumbnail: {
      type: 'string',
      pattern: /[.](jpg|jpeg|png)$/i // check if media
    },
    required: ['name', 'uri', 'type']
  }
})
