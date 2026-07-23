import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../pages/Welcome.vue'
import Loading from '../pages/Loading.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import More from '../pages/More.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      immersive: true
    }
  },
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
