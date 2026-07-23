<template>
  <main class="loading-page" aria-live="polite" aria-label="正在加载个人简历">
    <div class="loading-avatar">
      <img :src="avatarImage" alt="">
    </div>

    <h1>正在为你打开</h1>
    <p>MY PORTFOLIO</p>

    <div class="loading-progress" aria-hidden="true">
      <span></span>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import avatarImage from '../assets/avatar.png'

const router = useRouter()
let loadingTimer

onMounted(() => {
  loadingTimer = window.setTimeout(() => {
    router.replace('/about')
  }, 1250)
})

onBeforeUnmount(() => {
  window.clearTimeout(loadingTimer)
})
</script>
