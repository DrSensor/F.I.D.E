import Rollbar from 'rollbar'

const config = {
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  verbose: process.env.NODE_ENV === 'development',
  enabled: process.env.NODE_ENV === 'production',
  payload: {
    environment: process.env.NODE_ENV
  }
}

export default new Rollbar(config)
