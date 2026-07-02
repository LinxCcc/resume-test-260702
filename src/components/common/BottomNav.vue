<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in navs"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      active-class="active"
    >
      <span class="nav-icon" :class="item.iconClass">
        <i></i>
      </span>

      <span class="nav-label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
const navs = [
  {
    label: 'AboutMe',
    path: '/about',
    iconClass: 'icon-about'
  },
  {
    label: 'Experience',
    path: '/projects',
    iconClass: 'icon-projects'
  },
  {
    label: 'More',
    path: '/more',
    iconClass: 'icon-more'
  }
]
</script>