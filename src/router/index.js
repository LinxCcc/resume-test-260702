import { createRouter, createWebHistory } from 'vue-router'

import Loading from '../pages/Loading.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import More from '../pages/More.vue'

const entryRoute = import.meta.env.DEV
  ? {
      path: '/',
      name: 'Welcome',
      component: () => import('../pages/Welcome.vue'),
      meta: {
        immersive: true
      }
    }
  : {
      path: '/',
      redirect: '/about'
    }

const routes = [
  entryRoute,
  {
    path: '/loading',
    name: 'Loading',
    component: Loading,
    meta: {
      immersive: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/more',
    name: 'More',
    component: More
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
