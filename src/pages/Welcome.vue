<template>
  <main class="welcome-page">
    <div class="welcome-orb welcome-orb-two" aria-hidden="true"></div>

    <section class="welcome-layout">
      <div class="welcome-visual" aria-hidden="true">
        <div class="welcome-dot-grid"></div>
        <span class="welcome-spark welcome-spark-one">✦</span>
        <span class="welcome-spark welcome-spark-two">✦</span>
        <img class="welcome-avatar" :src="avatarImage" alt="">
      </div>

      <div class="welcome-content">
        <div class="welcome-eyebrow">
          <span></span>
          HELLO, NICE TO MEET YOU
        </div>

        <div class="welcome-heading">
          <p>Welcome</p>
          <h1>Nice to meet you! 👋</h1>
        </div>

        <div class="welcome-divider" aria-hidden="true">
          <span></span>
          <i></i>
        </div>

        <p class="welcome-intro">这是一个由我与 AI 共同完成的个人网站，很高兴在此遇见你。为保护个人隐私，请输入邀请码后继续访问。Thank you for your time！</p>

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
            <span>进入我的空间</span>
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
import avatarImage from '../assets/avatar_welcome.png'

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
