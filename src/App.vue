<template>
  <div class="app-shell">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './components/common/BottomNav.vue'
</script>