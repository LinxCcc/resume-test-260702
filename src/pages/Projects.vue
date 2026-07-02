<template>
  <main class="page">
    <header class="page-header">
      <h1>项目经历</h1>
      <p>精选项目展示</p>
    </header>

    <section
      v-for="project in projects"
      :key="project.title"
      class="project-card"
    >
      <div class="project-cover" :style="{ background: project.cover }">
        <div class="mock-window">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="project-info">
        <h2>{{ project.title }}</h2>

        <div class="tag-row">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>

        <p>{{ project.desc }}</p>

        <div class="result-grid">
          <div v-for="result in project.results" :key="result.label">
            <strong>{{ result.value }}</strong>
            <span>{{ result.label }}</span>
          </div>
        </div>
      </div>

      <div class="project-arrow">↗</div>
    </section>
  </main>
</template>

<script setup>
import { projects } from '../data/resume'
</script>