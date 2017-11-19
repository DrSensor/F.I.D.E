import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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
      path: '/viewer',
      name: 'File Viewer',
      component: () => Page('FileViewer'),
      meta: {
        icon: 'pageview'
      },
      beforeEnter: (to, from, next) => {
        let openedFile = store.state.fileManagers.openedFile
        if (!openedFile) next('/explorer')
        else next(to.params.path)
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
