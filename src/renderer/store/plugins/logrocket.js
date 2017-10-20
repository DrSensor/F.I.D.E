/* for more detail see https://docs.logrocket.com/docs/vuex-plugin */
import createPlugin from 'logrocket-vuex'
import LogRocket from '@/services/report-error'

const logrocketPlugin = createPlugin(LogRocket, function (mutation) {
  var scrub = { // log mutation but don't send mutation payload
    ...mutation,
    removeThisKey: undefined
  }
  var ignore = null // never log mutation

  var contains = (str) => mutation.type.includes(str)
  switch (true) {
    case contains('TOKEN'):
      return ignore
    case contains('PROFILE'):
      return scrub
    default:
      return mutation
  }
})

export default logrocketPlugin
