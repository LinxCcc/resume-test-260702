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
      <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-width="2.4" />
    </template>
    <template v-else-if="name === 'moon'">
      <path
        d="M21 13.1A9.2 9.2 0 1 1 10.9 3a7.3 7.3 0 0 0 10.1 10.1Z"
        fill="currentColor"
        stroke="none"
      />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
