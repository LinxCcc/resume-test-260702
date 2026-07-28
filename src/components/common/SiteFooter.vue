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
  || (import.meta.env.DEV ? '粤ICP备XXXXXXXX号-1' : '')
</script>
