<template>
  <main class="page about-page">
    <section class="hero-section">
      <div class="hello">Hello! 👋</div>

      <div class="hero-content">
        <div class="avatar-card">
          <div class="avatar-glow"></div>
          <div class="avatar-ring"></div>
          <div class="avatar-text">AC</div>
        </div>

        <div class="hero-info">
          <h1>{{ profile.name }}</h1>
          <p class="role-pill">{{ profile.role }}</p>
          <p class="tagline">{{ profile.tagline }}</p>
        </div>
      </div>
    </section>

    <section class="card contact-card">
      <button
        v-for="item in contactItems"
        :key="item.label"
        class="contact-row"
        type="button"
        @click="copyText(item.value, item.label)"
      >
        <span class="contact-icon">{{ item.icon }}</span>
        <p>{{ item.value }}</p>
        <i>⧉</i>
      </button>

        <button class="resume-action" type="button" @click="handleResumeDownload">
        <span class="resume-icon">⇩</span>
        <span class="resume-text">
            <strong>Download Resume</strong>
            <em>PDF version · Coming soon</em>
        </span>
        <i>→</i>
        </button>
    </section>

    <section class="card section-card about-card">
      <div class="section-title">
        <h2>Desc</h2>
        <span>♟</span>
      </div>

      <p class="intro-text">{{ profile.intro }}</p>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>Skills</h2>
        <span>✦</span>
      </div>

      <ul class="skill-list">
        <li v-for="skill in skills" :key="skill">
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>Certificate</h2>
        <span>✓</span>
      </div>

      <div class="certificate-list">
        <p v-for="item in certificates" :key="item">
          {{ item }}
        </p>
      </div>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>Timeline</h2>
        <span>▣</span>
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
        <h2>Job Goal</h2>
        <span>▤</span>
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
import {
  profile,
  skills,
  certificates,
  experiences,
  jobExpectations
} from '../data/resume'

const toastText = ref('')

const contactItems = [
  {
    label: 'Phone',
    icon: '☎',
    value: profile.phone
  },
  {
    label: 'Email',
    icon: '✉',
    value: profile.email
  },
  {
    label: 'Location',
    icon: '⌖',
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
const handleResumeDownload = () => {
  showToast('Resume download is coming soon')
}



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
    showToast(`${label} copied`)
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