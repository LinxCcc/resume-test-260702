<template>
  <main class="page about-page">
    <section class="hero-section">
      <div class="hello">Hello! 👋</div>

      <div class="hero-content">
        <div class="avatar-card">
          <div class="avatar-glow"></div>
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
      <div class="contact-row">
        <span>☎</span>
        <p>{{ profile.phone }}</p>
        <button type="button">⧉</button>
      </div>

      <div class="contact-row">
        <span>✉</span>
        <p>{{ profile.email }}</p>
        <button type="button">⧉</button>
      </div>

      <div class="contact-row">
        <span>⌖</span>
        <p>{{ profile.location }}</p>
        <button type="button">⧉</button>
      </div>

      <div class="quick-actions">
        <button type="button">
          <strong>▣</strong>
          <span>{{ profile.portfolio }}</span>
        </button>

        <button type="button">
          <strong>◉</strong>
          <span>{{ profile.github }}</span>
        </button>

        <button type="button">
          <strong>in</strong>
          <span>{{ profile.linkedin }}</span>
        </button>

        <button type="button">
          <strong>⇩</strong>
          <span>{{ profile.resume }}</span>
        </button>
      </div>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>个人简介</h2>
        <span>♟</span>
      </div>

      <p class="intro-text">{{ profile.intro }}</p>
    </section>

    <section class="card section-card">
      <div class="section-title">
        <h2>核心技能</h2>
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
        <h2>个人证书</h2>
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
        <h2>工作经历</h2>
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
        <h2>求职期望</h2>
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
  </main>
</template>

<script setup>
import {
  profile,
  skills,
  certificates,
  experiences,
  jobExpectations
} from '../data/resume'
</script>