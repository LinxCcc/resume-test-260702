<template>
  <main class="page about-page">
    <section class="hero-section">
      <div class="hello">Hello! 👋</div>

      <div class="hero-content">
        <div class="avatar-card">
          <div class="avatar-glow"></div>
          <img
            class="avatar-image"
            src="../assets/avatar.png"
            :alt="`${profile.name} avatar`"
          >
        </div>

        <div class="hero-info">
          <h1>{{ profile.name }}</h1>
          <div class="role-tags">
            <span v-for="tag in profile.identityTags" :key="tag" class="role-pill">
              {{ tag }}
            </span>
          </div>
          <p class="tagline">{{ profile.tagline }}</p>
        </div>
      </div>
    </section>

    <section class="card contact-card">
        <button
        v-for="item in contactItems"
        :key="item.label"
        class="contact-row"
        :class="{ copied: copiedLabel === item.label }"
        type="button"
        @click="copyText(item.value, item.label)"
        >
        <span class="contact-icon">
          <BaseIcon :name="item.icon" />
        </span>
        <p>{{ item.value }}</p>
        <BaseIcon
          class="contact-copy-icon"
          :name="copiedLabel === item.label ? 'check' : 'copy'"
        />
        </button>

    </section>

    <section class="card section-card about-card">
      <div class="section-title">
        <h2>个人简介</h2>
        <span><BaseIcon name="profile" /></span>
      </div>

      <p class="intro-text">{{ profile.intro }}</p>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>Skills</h2>
        <span><BaseIcon name="sparkles" /></span>
      </div>

      <ul class="skill-list">
        <li v-for="skill in skills" :key="skill">
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>相关证书</h2>
        <span><BaseIcon name="award" /></span>
      </div>

      <div class="certificate-list">
        <p v-for="item in certificates" :key="item">
          {{ item }}
        </p>
      </div>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>我的经历</h2>
        <span><BaseIcon name="briefcase" /></span>
      </div>

      <div class="timeline">
        <div
          v-for="item in experiences"
          :key="item.company"
          class="timeline-item"
        >
          <div class="timeline-dot"></div>

          <div class="timeline-content">
            <div class="timeline-head">
              <div>
                <p class="period">{{ item.period }}</p>
                <h3>{{ item.company }}</h3>
              </div>

              <strong>{{ item.role }}</strong>
            </div>

            <p class="timeline-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>我的期望</h2>
        <span><BaseIcon name="target" /></span>
      </div>

      <div class="expect-list">
        <div
          v-for="item in jobExpectations"
          :key="item.label"
          class="expect-item"
        >
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </div>
    </section>

    <Transition name="toast-fade">
      <div v-if="toastText" class="toast">
        {{ toastText }}
      </div>
    </Transition>
  </main>
</template>





<script setup>
import { ref } from 'vue'
import BaseIcon from '../components/common/BaseIcon.vue'
import {
  profile,
  skills,
  certificates,
  experiences,
  jobExpectations
} from '../data/resume'

const toastText = ref('')
const copiedLabel = ref('')

const contactItems = [
  {
    label: 'Email',
    icon: 'mail',
    value: profile.email
  },
  {
    label: 'Location',
    icon: 'location',
    value: profile.location
  }
]

/* const quickActions = [
  {
    label: profile.portfolio,
    icon: '▣',
    type: 'toast',
    message: 'Portfolio is coming soon'
  },
  {
    label: profile.github,
    icon: '◉',
    type: 'link',
    url: 'https://github.com/'
  },
  {
    label: profile.linkedin,
    icon: 'in',
    type: 'link',
    url: 'https://www.linkedin.com/'
  },
  {
    label: profile.resume,
    icon: '⇩',
    type: 'toast',
    message: 'Resume download is coming soon'
  }
] */
const showToast = (text) => {
  toastText.value = text

  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => {
    toastText.value = ''
  }, 1800)
}

const copyText = async (value, label) => {
  try {
    await navigator.clipboard.writeText(value)

    copiedLabel.value = label
    showToast(`${label} copied`)

    window.clearTimeout(copyText.timer)
    copyText.timer = window.setTimeout(() => {
      copiedLabel.value = ''
    }, 1600)
  } catch {
    showToast('Copy failed')
  }
}

const handleQuickAction = (item) => {
  if (item.type === 'link') {
    window.open(item.url, '_blank')
    return
  }

  showToast(item.message)
}
</script>
