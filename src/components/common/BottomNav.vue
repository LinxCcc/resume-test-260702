<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in navs"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      active-class="active"
    >
      <span class="nav-icon">
        <BaseIcon :name="item.icon" />
      </span>

      <span class="nav-label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import BaseIcon from './BaseIcon.vue'

const navs = [
  {
    label: '关于我',
    path: '/about',
    icon: 'profile'
  },
  {
    label: '项目经历',
    path: '/projects',
    icon: 'briefcase'
  },
  {
    label: '更多',
    path: '/more',
    icon: 'grid'
  }
]
</script>
