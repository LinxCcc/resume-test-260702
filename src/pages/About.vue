<template>
  <main class="page about-page">
    <aside class="profile-rail">
      <section class="hero-section">
        <div class="hello">Hello! 👋</div>

        <div class="hero-content">
          <div
            class="avatar-card"
            role="img"
            :aria-label="`${profile.name} avatar carousel`"
          >
            <div class="avatar-glow"></div>
            <div
              v-for="(avatar, index) in avatarImages"
              :key="avatar"
              class="avatar-slide"
              :class="{ active: activeAvatarIndex === index }"
              aria-hidden="true"
            >
              <img
                class="avatar-image"
                :src="avatar"
                alt=""
              >
            </div>
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
    </aside>

    <div class="resume-content">
      <section class="card section-card about-card">
        <div class="section-title">
          <h2>个人简介</h2>
          <span><BaseIcon name="profile" /></span>
        </div>

        <p class="intro-text">{{ profile.intro }}</p>
      </section>

      <section class="card section-card skills-card">
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

      <section class="card section-card certificates-card">
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

      <section class="card section-card experience-card">
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

      <section class="card section-card expectations-card">
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
    </div>

    <Transition name="toast-fade">
      <div v-if="toastText" class="toast">
        {{ toastText }}
      </div>
    </Transition>
  </main>
</template>





<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from '../components/common/BaseIcon.vue'
import avatar01 from '../assets/avatar/avatar_01.png'
import avatar02 from '../assets/avatar/avatar_02.png'
import avatar03 from '../assets/avatar/avatar_03.png'
import avatar04 from '../assets/avatar/avatar_04.png'
import avatar05 from '../assets/avatar/avatar_05.png'
import avatar06 from '../assets/avatar/avatar_06.png'
import {
  profile,
  skills,
  certificates,
  experiences,
  jobExpectations
} from '../data/resume'

const toastText = ref('')
const copiedLabel = ref('')
const activeAvatarIndex = ref(0)
const avatarImages = [
  avatar01,
  avatar02,
  avatar03,
  avatar04,
  avatar05,
  avatar06
]
let avatarTimer

onMounted(() => {
  avatarTimer = window.setInterval(() => {
    activeAvatarIndex.value = (activeAvatarIndex.value + 1) % avatarImages.length
  }, 3600)
})

onBeforeUnmount(() => {
  window.clearInterval(avatarTimer)
})

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
