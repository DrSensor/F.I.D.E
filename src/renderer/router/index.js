import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Page = (filename) => import(`@/pages/${filename}`)

export default new Router({
  routes: [
    {
      path: '/explorer',
      name: 'File Manager',
      component: () => Page('FileManager'),
      meta: {
        icon: 'view_compact'
      }
    },
    {
      path: '/view',
      name: 'View File',
      component: () => Page('FileViewer'),
      meta: {
        icon: 'pageview'
      }
    },
    {
      path: '/',
      component: () => Page('Welcome')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
