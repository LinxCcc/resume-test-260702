<template>
  <main class="page projects-page">
    <header class="page-header projects-header">
      <div>
        <h1>Experience</h1>
        <p>Selected product cases and business outcomes</p>
      </div>

      <div class="project-total">
        <strong>{{ projects.length }}</strong>
        <span>Cases</span>
      </div>
    </header>

    <section class="project-summary">
      <div class="summary-item">
        <strong>6+</strong>
        <span>Years Experience</span>
      </div>

      <div class="summary-item">
        <strong>12+</strong>
        <span>Delivered Projects</span>
      </div>

      <div class="summary-item">
        <strong>B2B</strong>
        <span>Main Direction</span>
      </div>
    </section>

    <section class="project-stack">
      <article
        v-for="(project, index) in projects"
        :key="project.title"
        class="project-item"
        :class="{ active: activeProjectIndex === index }"
        @click="toggleProject(index)"
      >
        <div class="project-index">
          {{ formatIndex(index + 1) }}
        </div>

        <div class="project-visual" :style="{ background: project.cover }">
          <div class="browser-card">
            <div class="browser-top">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div class="browser-body">
              <div class="chart-card large"></div>
              <div class="chart-card small"></div>
              <div class="chart-line"></div>
              <div class="chart-line short"></div>
            </div>
          </div>
        </div>

        <div class="project-content">
          <div class="project-title-row">
            <h2>{{ project.title }}</h2>
            <button type="button">
              {{ activeProjectIndex === index ? '收起' : '展开' }}
            </button>
          </div>

          <div class="tag-row project-tags">
            <span v-for="tag in project.tags" :key="tag">
              {{ tag }}
            </span>
          </div>

          <p>{{ project.desc }}</p>

          <div class="result-grid refined-result-grid">
            <div v-for="result in project.results" :key="result.label">
              <strong>{{ result.value }}</strong>
              <span>{{ result.label }}</span>
            </div>
          </div>

          <Transition name="project-detail">
            <div
              v-if="activeProjectIndex === index"
              class="project-detail-panel"
            >
              <div class="detail-row">
                <span>Role</span>
                <strong>Product Planning / Requirement Analysis</strong>
              </div>

              <div class="detail-row">
                <span>Method</span>
                <strong>User Research / Data Analysis / Agile Delivery</strong>
              </div>

              <div class="detail-row">
                <span>Output</span>
                <strong>PRD / Prototype / Roadmap / Growth Review</strong>
              </div>
            </div>
          </Transition>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { projects } from '../data/resume'

const activeProjectIndex = ref(0)

const toggleProject = (index) => {
  activeProjectIndex.value = activeProjectIndex.value === index ? -1 : index
}

const formatIndex = (index) => {
  return String(index).padStart(2, '0')
}
</script>