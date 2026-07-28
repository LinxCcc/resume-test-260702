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
            <img class="access-lock-icon" :src="lockIcon" alt="" aria-hidden="true">
            <span class="sr-only">邀请码</span>
            <input
              ref="inviteInput"
              v-model.trim="inviteCode"
              :type="isInviteVisible ? 'text' : 'password'"
              name="inviteCode"
              autocomplete="current-password"
              placeholder="请输入邀请码"
              :aria-invalid="Boolean(errorMessage)"
              :aria-describedby="errorMessage ? 'invite-error' : undefined"
              @input="errorMessage = ''"
            >
            <button
              class="invite-visibility"
              type="button"
              :aria-label="isInviteVisible ? '隐藏邀请码' : '查看邀请码'"
              :title="isInviteVisible ? '隐藏邀请码' : '查看邀请码'"
              @click="isInviteVisible = !isInviteVisible"
            >
              <BaseIcon :name="isInviteVisible ? 'eye-off' : 'eye'" />
            </button>
          </label>

          <p v-if="errorMessage" id="invite-error" class="invite-error" role="alert">
            {{ errorMessage }}
          </p>

          <button class="enter-button" type="submit">
            <span>进入我的空间</span>
            <span class="enter-arrow" aria-hidden="true">→</span>
          </button>
        </form>

        <a
          class="welcome-project-link"
          href="https://my.feishu.cn/docx/FMbGdLzuOoQGcmxRz4rcjD29nLh?from=from_copylink"
          target="_blank"
          rel="noopener noreferrer"
        >
          🍟 关于本项目的介绍 🍣
        </a>
      </div>
    </section>

    <SiteFooter welcome />
  </main>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseIcon from '../components/common/BaseIcon.vue'
import SiteFooter from '../components/common/SiteFooter.vue'
import avatarImage from '../assets/avatar_welcome.png'
import lockIcon from '../assets/lock.svg'

const router = useRouter()
const inviteCode = ref('')
const errorMessage = ref('')
const inviteInput = ref(null)
const isInviteVisible = ref(false)

const enterSite = async () => {
  if (!inviteCode.value) {
    errorMessage.value = '请先输入邀请码'
    await nextTick()
    inviteInput.value?.focus()
    return
  }

  router.push('/loading')
}
</script>
