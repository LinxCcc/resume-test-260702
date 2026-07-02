<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in navs"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      active-class="active"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
const navs = [
  {
    label: 'AboutMe',
    path: '/about',
    icon: '●'
  },
  {
    label: 'Experience',
    path: '/projects',
    icon: '◆'
  },
  {
    label: 'More',
    path: '/more',
    icon: '•••'
  }
]
</script>