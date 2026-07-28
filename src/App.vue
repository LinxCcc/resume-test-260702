<template>
  <div class="app-shell" :class="{ 'immersive-shell': isImmersive }">
    <div v-if="!isImmersive" class="floating-actions">
      <button
        class="theme-toggle"
        :class="{ dark: isDark }"
        type="button"
        :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
        :title="isDark ? '浅色模式' : '深色模式'"
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

      <button
        class="logout-button"
        :class="{ loading: isLoggingOut }"
        type="button"
        :disabled="isLoggingOut"
        :aria-label="isLoggingOut ? '正在退出访问' : '退出访问'"
        title="退出访问"
        @click="logout"
      >
        <BaseIcon name="logout" />
      </button>
    </div>

    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <SiteFooter v-if="!isImmersive" />
    <BottomNav v-if="!isImmersive" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseIcon from './components/common/BaseIcon.vue'
import BottomNav from './components/common/BottomNav.vue'
import SiteFooter from './components/common/SiteFooter.vue'

const route = useRoute()
const isDark = ref(false)
const isLoggingOut = ref(false)
const isImmersive = computed(() => Boolean(route.meta.immersive))

const applyTheme = (value) => {
  document.documentElement.classList.toggle('dark-theme', value)
  localStorage.setItem('resume-theme', value ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const logout = async () => {
  if (isLoggingOut.value) {
    return
  }

  isLoggingOut.value = true

  if (import.meta.env.DEV) {
    window.location.replace('/')
    return
  }

  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin'
    })
  } finally {
    window.location.replace('/login')
  }
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
