import { Schema } from 'js-data'

const file = {
  type: 'object',
  required: ['name', 'type', 'origin', 'relativePath'],
  properties: {
    id: {
      description: 'The unique identifier for a file',
      type: 'number'
    },
    name: {
      type: 'string'
    },
    type: {
      type: 'string',
      pattern: /Electronics Schematic|Design Blueprint/i
    },
    origin: {
      description: 'Where the file come from (e.g GDrive or local-files)',
      type: 'string',
      pattern: /local-files|gdrive|bim360|s3/i
    },
    uri: {
      description: 'URI with respect to project origin',
      type: 'string',
      pattern: /^(\w+:[/\\]{2}).+/
    }
  }
}
export const fileSchema = new Schema(file)

const annotation = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'Annotation',

  description: 'Schema for describing Annotation object.',
  type: 'object',
  required: ['id', 'name', 'broker', 'topic', 'topicPattern'],
  properties: {
    id: {
      description: 'The unique identifier for a annotation',
      type: 'integer'
    },
    name: {
      description: 'Name of the annotation (e.g JojoRoom)',
      type: 'string'
    },
    type: {
      description: 'Type of the annotation (e.g Rectangle)',
      type: 'string'
    },
    dimension: {
      description: 'Dimension of the annotation shape (e.g [0,0,50,50] while it represent the value of [x,y,width,height]',
      type: 'array',
      items: {
        type: 'number'
      }
    }
  }
}
export const annotationSchema = new Schema(annotation)

const thing = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'Thing',

  description: 'Schema for describing thing/device.',
  type: 'object',
  required: ['id', 'name', 'broker', 'topic', 'topicPattern'],
  properties: {
    id: {
      description: 'The unique identifier for a thing',
      type: 'integer'
    },
    name: {
      description: 'Name of the device/thing (e.g Jojo Ball)',
      type: 'string'
    },
    broker: {
      description: 'The MQTT broker (e.g mosquitto, ponte, AWSIoT)',
      type: 'string'
    },
    topic: {
      description: 'MQTT root topic of the device/thing (e.g rangefinder/Jojo_Ball/SansSung)',
      type: 'string',
      pattern: /^([\w/][\w-]+)([/][\w-]+)*([/][\w-]+)$/
    },
    topicPattern: {
      description: 'MQTT topic pattern of the device/thing that represent topic name (e.g +thingType/+thingName/+Manufacture)',
      type: 'string',
      pattern: /^([/]\w+|\w+)([/][\w-]+)*([/][\w-]+)$/
    }
  }
}
export const thingSchema = new Schema(thing)

const subTopics = {
  description: `list of MQTT sub topic and the unit measurement`,
  type: 'array',
  items: {
    type: 'object',
    required: ['topic'],
    properties: {
      topic: {
        type: 'string',
        pattern: /^([\w-]+)([/][\w-]+)*([/][\w-]+)$/
      },
      unit: {
        type: 'string',
        pattern: /^[a-z]+$/
      }
    }
  }
}

const telemetry = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'Telemetry/Telecommand',

  description: 'Schema for describing telemetry.',
  type: 'object',
  required: ['id', 'name', 'subTopics'],
  properties: {
    id: {
      description: 'The unique identifier for a telemetry/telecommand',
      type: 'integer'
    },
    variable: {
      description: 'Name of the quantity/variable (e.g weight, move)',
      type: 'string'
    },
    subTopics
  }
}
export const telemetrySchema = new Schema(telemetry)

const telecommand = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'Telemetry/Telecommand',

  description: 'Schema for describing telemetry.',
  type: 'object',
  required: ['id', 'name', 'subTopics'],
  properties: {
    id: {
      description: 'The unique identifier for a telemetry/telecommand',
      type: 'integer'
    },
    command: {
      description: 'Name of the command (e.g weight, move)',
      type: 'string'
    },
    subTopics
  }
}
export const telecommandSchema = new Schema(telecommand)
