import { createRouter, createWebHistory } from 'vue-router'

import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import More from '../pages/More.vue'

const routes = [
  {
    path: '/',
    redirect: '/about'
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
  routes
})

export default router