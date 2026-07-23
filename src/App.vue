<template>
  <div class="app-shell" :class="{ 'immersive-shell': isImmersive }">
    <button
      v-if="!isImmersive"
      class="theme-toggle"
      :class="{ dark: isDark }"
      type="button"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggleTheme"
    >
      <Transition name="theme-icon" mode="out-in">
        <BaseIcon
          :key="isDark ? 'sun' : 'moon'"
          :class="isDark ? 'sun-icon' : 'moon-icon'"
          :name="isDark ? 'sun' : 'moon'"
        />
      </Transition>
    </button>

    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <BottomNav v-if="!isImmersive" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseIcon from './components/common/BaseIcon.vue'
import BottomNav from './components/common/BottomNav.vue'

const route = useRoute()
const isDark = ref(false)
const isImmersive = computed(() => Boolean(route.meta.immersive))

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
