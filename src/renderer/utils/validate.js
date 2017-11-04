import { isEmpty } from 'lodash'

const validate = (payload, schema) => {
  let errorDetails = schema.validate(payload)
  let isValid = isEmpty(errorDetails)
  if (isValid) return payload
  else {
    console.error(errorDetails)
    return undefined
  }
}

export default validate
