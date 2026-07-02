<template>
  <main class="page">
    <header class="page-header">
      <h1>More</h1>
      <p>TextTextTextText</p>
    </header>

    <section class="work-list">
      <article
        v-for="work in works"
        :key="work.title"
        class="work-card"
        @click="openPreview(work)"
      >
        <div class="work-cover" :style="{ background: work.cover }">
          <div class="cover-shine"></div>
        </div>

        <div class="work-info">
          <div>
            <h2>{{ work.title }}</h2>
            <p>{{ work.category }}</p>
          </div>

          <span>›</span>
        </div>
      </article>
    </section>

    <Transition name="modal-fade">
      <div v-if="selectedWork" class="preview-mask" @click="closePreview">
        <div class="preview-panel" @click.stop>
          <div
            class="preview-image"
            :style="{ background: selectedWork.cover }"
          ></div>

          <h2>{{ selectedWork.title }}</h2>
          <p>{{ selectedWork.category }}</p>

          <button @click="closePreview">Close</button>
        </div>
      </div>
    </Transition>
  </main>
</template>






<script setup>
import { ref } from 'vue'
import { works } from '../data/resume'

const selectedWork = ref(null)

const openPreview = (work) => {
  selectedWork.value = work
}

const closePreview = () => {
  selectedWork.value = null
}
</script>