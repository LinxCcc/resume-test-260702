<template>
  <main class="welcome-page">
    <div class="welcome-orb welcome-orb-one" aria-hidden="true"></div>
    <div class="welcome-orb welcome-orb-two" aria-hidden="true"></div>

    <section class="welcome-layout">
      <div class="welcome-visual" aria-hidden="true">
        <div class="welcome-dot-grid"></div>
        <span class="welcome-spark welcome-spark-one">✦</span>
        <span class="welcome-spark welcome-spark-two">✦</span>
        <div class="welcome-avatar-halo"></div>
        <img class="welcome-avatar" :src="avatarImage" alt="">
        <div class="welcome-avatar-shadow"></div>
      </div>

      <div class="welcome-content">
        <div class="welcome-eyebrow">
          <span></span>
          HELLO, NICE TO MEET YOU
        </div>

        <div class="welcome-heading">
          <p>Welcome</p>
          <h1>个人简历网站</h1>
        </div>

        <div class="welcome-divider" aria-hidden="true">
          <span></span>
          <i></i>
        </div>

        <h2>欢迎来到我的个人简历网站！</h2>
        <p class="welcome-intro">这里展示了我的经历、能力与作品，期待与你相遇。</p>

        <form class="invite-form" novalidate @submit.prevent="enterSite">
          <label class="invite-field" :class="{ invalid: errorMessage }">
            <span class="ticket-icon" aria-hidden="true"></span>
            <span class="sr-only">邀请码</span>
            <input
              ref="inviteInput"
              v-model.trim="inviteCode"
              type="text"
              name="inviteCode"
              inputmode="text"
              autocomplete="off"
              placeholder="请输入邀请码"
              :aria-invalid="Boolean(errorMessage)"
              :aria-describedby="errorMessage ? 'invite-error' : undefined"
              @input="errorMessage = ''"
            >
          </label>

          <p v-if="errorMessage" id="invite-error" class="invite-error" role="alert">
            {{ errorMessage }}
          </p>

          <button class="enter-button" type="submit">
            <span>进入网站</span>
            <span class="enter-arrow" aria-hidden="true">→</span>
          </button>
        </form>

        <p class="welcome-security">
          <span aria-hidden="true">✓</span>
          专属邀请制 · 保护隐私，安全访问
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import avatarImage from '../assets/avatar.png'

const router = useRouter()
const inviteCode = ref('')
const errorMessage = ref('')
const inviteInput = ref(null)

const enterSite = async () => {
  if (!inviteCode.value) {
    errorMessage.value = '请先输入邀请码'
    await nextTick()
    inviteInput.value?.focus()
    return
  }

  sessionStorage.setItem('resume-invite', inviteCode.value)
  router.push('/loading')
}
</script>
