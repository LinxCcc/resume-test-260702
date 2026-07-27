<template>
  <svg
    class="base-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gradientId" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ffffff" />
        <stop offset="1" stop-color="#dbeafe" />
      </linearGradient>
    </defs>
    <template v-if="name === 'phone'">
      <path d="M6.6 3.8 9 7.7 7.6 9.5a15.2 15.2 0 0 0 6.9 6.9l1.8-1.4 3.9 2.4v2.1c0 .9-.7 1.7-1.6 1.7C9.9 20.6 3.4 14.1 2.8 5.4c0-.9.8-1.6 1.7-1.6h2.1Z" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m5 8 7 5 7-5" />
    </template>
    <template v-else-if="name === 'location'">
      <path d="M20 10c0 5-5.3 9.4-8 11-2.7-1.6-8-6-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </template>
    <template v-else-if="name === 'copy'">
      <rect x="8" y="8" width="11" height="11" rx="2.5" />
      <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </template>
    <template v-else-if="name === 'download'">
      <path d="M12 3v12" />
      <path d="m7.5 11 4.5 4.5 4.5-4.5" />
      <path d="M5 20h14" />
    </template>
    <template v-else-if="name === 'profile'">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" />
    </template>
    <template v-else-if="name === 'sparkles'">
      <path d="M12 3c.6 3.1 2.3 4.8 5.4 5.4-3.1.6-4.8 2.3-5.4 5.4-.6-3.1-2.3-4.8-5.4-5.4C9.7 7.8 11.4 6.1 12 3Z" />
      <path d="M18.2 14.8c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
    </template>
    <template v-else-if="name === 'award'">
      <circle cx="12" cy="9" r="5" />
      <path d="m8.8 13-1 8 4.2-2.5 4.2 2.5-1-8" />
      <path d="m10.2 9 1.2 1.2 2.5-2.7" />
    </template>
    <template v-else-if="name === 'briefcase'">
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12.5c5.3 2.1 12.7 2.1 18 0M12 12v3" />
    </template>
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m14.5 9.5 5-5M16 4.5h3.5V8" />
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="4" y="4" width="6" height="6" rx="2" />
      <rect x="14" y="4" width="6" height="6" rx="2" />
      <rect x="4" y="14" width="6" height="6" rx="2" />
      <rect x="14" y="14" width="6" height="6" rx="2" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4.5" :fill="gradientPaint" stroke="none" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        :stroke="gradientPaint"
        stroke-width="2.4"
      />
    </template>
    <template v-else-if="name === 'moon'">
      <path
        d="M21 13.1A9.2 9.2 0 1 1 10.9 3a7.3 7.3 0 0 0 10.1 10.1Z"
        :fill="gradientPaint"
        stroke="none"
      />
    </template>
    <template v-else-if="name === 'logout'">
      <path
        d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10"
        :stroke="gradientPaint"
      />
      <path d="M14 8l4 4-4 4M8.5 12H18" :stroke="gradientPaint" />
    </template>
    <template v-else-if="name === 'eye'">
      <path d="M2.8 12s3.2-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.2 5.5-9.2 5.5S2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </template>
    <template v-else-if="name === 'eye-off'">
      <path d="m4 4 16 16" />
      <path d="M10.6 6.6c.5-.1.9-.1 1.4-.1 6 0 9.2 5.5 9.2 5.5a15.8 15.8 0 0 1-2.3 3" />
      <path d="M6.1 7.5A15.7 15.7 0 0 0 2.8 12s3.2 5.5 9.2 5.5c1 0 1.9-.2 2.7-.4" />
      <path d="M10.2 10.2a2.5 2.5 0 0 0 3.6 3.6" />
    </template>
  </svg>
</template>

<script setup>
import { useId } from 'vue'

const gradientId = `base-icon-gradient-${useId().replaceAll(':', '')}`
const gradientPaint = `url(#${gradientId})`

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
