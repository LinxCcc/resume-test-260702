<template>
  <div class="app-shell">
    <Transition name="splash-fade">
      <div v-if="isLoading" class="splash-screen">
        <div class="splash-logo">
          AC
        </div>

        <h1>Alex Carter</h1>
        <p>Product Manager Portfolio</p>

        <div class="splash-progress">
          <span></span>
        </div>
      </div>
    </Transition>

    <button
      class="theme-toggle"
      :class="{ dark: isDark }"
      type="button"
      aria-label="Toggle theme"
      @click="toggleTheme"
    >
      <span>{{ isDark ? '☀' : '☾' }}</span>
    </button>

    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <BottomNav />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import BottomNav from './components/common/BottomNav.vue'

const isDark = ref(false)
const isLoading = ref(true)

const applyTheme = (value) => {
  document.documentElement.classList.toggle('dark-theme', value)
  localStorage.setItem('resume-theme', value ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('resume-theme')
  isDark.value = savedTheme === 'dark'
  applyTheme(isDark.value)

  window.setTimeout(() => {
    isLoading.value = false
  }, 1100)
})

watch(isDark, (value) => {
  applyTheme(value)
})
</script>