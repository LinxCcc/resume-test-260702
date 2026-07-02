<template>
  <div class="app-shell">
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
})

watch(isDark, (value) => {
  applyTheme(value)
})
</script>