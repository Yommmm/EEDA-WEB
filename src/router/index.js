import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import devconfig from '../pages/devconfig/index.vue'
import visualization from '../pages/visualization/index.vue'
import visualizationNew from '../pages/visualization/indexNew.vue'
import menu from '../pages/menu/index.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/devconfig',
      name: 'devconfig',
      component: devconfig
    },
    {
      path: '/visualization',
      name: 'visualization',
      component: visualization
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/visualizationNew',
      name: 'visualizationNew',
      component: visualizationNew
    }
  ]
})
