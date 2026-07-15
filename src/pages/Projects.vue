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
        @click="toggleProject(index)">

        <div
          class="project-visual"
          :class="[
            `project-visual-${index + 1}`,
            { 'project-visual-image': projectCoverImages[index] }
          ]"
          :style="getProjectCoverStyle(project, index)"
        >
          <img
            v-if="projectCoverImages[index]"
            class="project-cover-image"
            :src="projectCoverImages[index]"
            :alt="`${project.title} cover`"
          >

          <div v-else class="browser-card">
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
            <button
              type="button"
              class="project-toggle"
              :aria-expanded="activeProjectIndex === index"
              @click.stop="toggleProject(index)"
            >
              <span>{{ activeProjectIndex === index ? '收起' : '展开' }}</span>
              <i aria-hidden="true"></i>
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
              <div class="detail-panel-head">
                <span>Contribution Snapshot</span>
                <strong>What I drove in this project</strong>
              </div>

              <div class="detail-list">
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
import ex01Cover from '../assets/experience/ex-01.jpg'
import ex02Cover from '../assets/experience/ex-02.jpg'
import ex03Cover from '../assets/experience/ex-03.jpg'
import ex04Cover from '../assets/experience/ex-04.jpg'
import ex05Cover from '../assets/experience/ex-05.jpg'
import ex06Cover from '../assets/experience/ex-06.jpg'
import ex07Cover from '../assets/experience/ex-07.jpg'
import ex08Cover from '../assets/experience/ex-08.jpg'
import ex09Cover from '../assets/experience/ex-09.jpg'

const activeProjectIndex = ref(0)
const projectCoverImages = [
  ex01Cover,
  ex02Cover,
  ex03Cover,
  ex04Cover,
  ex09Cover,
  ex05Cover,
  ex06Cover,
  ex07Cover,
  ex08Cover
]

const getProjectCoverStyle = (project, index) => {
  if (projectCoverImages[index]) {
    return {}
  }

  return { background: project.cover }
}

const toggleProject = (index) => {
  activeProjectIndex.value = activeProjectIndex.value === index ? -1 : index
}

</script>
