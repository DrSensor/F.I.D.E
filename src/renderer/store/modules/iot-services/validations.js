import {Schema} from 'js-data'

export const thingsSchema = new Schema({
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      topic: {
        type: 'string'
        // pattern: \\
      },
      topicPattern: {
        type: 'string'
        // pattern: \\
      }
    }
  }
})
