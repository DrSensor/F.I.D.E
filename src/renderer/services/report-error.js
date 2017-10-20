import LogRocket from 'logrocket'

const config = {
  // release: '0.0.0',
  console: {
    isEnabled: {
      log: false,
      debug: false
    }
  },
  dom: {
    isEnabled: false,
    baseHref: 'https://fide.surge.sh/assets/'
  }
}

if (process.env.NODE_ENV === 'production') {
  LogRocket.init(process.env.LOGROCKET_APPID, config)
}

export default LogRocket
