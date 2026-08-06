<template>
  <footer v-if="icpNumber" class="site-footer" :class="{ 'site-footer-welcome': welcome }">
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ icpNumber }}
    </a>
  </footer>
</template>

<script setup>
defineProps({
  welcome: {
    type: Boolean,
    default: false
  }
})

const icpNumber = import.meta.env.VITE_ICP_NUMBER
  || '沪ICP备2026037911号-1'
</script>
