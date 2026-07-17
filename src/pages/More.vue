<template>
  <main class="page more-page">
    <header class="page-header more-header">
      <div>
        <h1>More</h1>
        <p>Design experience, visual works and product thinking</p>
      </div>

      <div class="more-total">
        <strong>{{ works.length }}</strong>
        <span>Works</span>
      </div>
    </header>

    <section class="more-hero card">
      <div>
        <span class="more-label">Design Collection</span>
        <h2>Selected explorations across product, visual and interaction design.</h2>
      </div>

      <div class="more-hero-icon" aria-hidden="true">
        <span class="design-badge-dot"></span>
        <span class="design-badge-line"></span>
        <span class="design-badge-line short"></span>
      </div>
    </section>

    <section class="work-list refined-work-list">
      <article
        v-for="(work, index) in works"
        :key="work.title"
        class="work-card refined-work-card"
        :style="{ animationDelay: `${index * 0.06}s` }"
        @click="openPreview(work)"
      >
        <div class="work-cover refined-work-cover" :style="{ backgroundImage: work.cover }">
          <div class="cover-shine"></div>
        </div>

        <div class="work-info refined-work-info">
          <div>
            <h2>{{ work.title }}</h2>
            <p>{{ work.category }}</p>
          </div>

          <button type="button">
            View
            <span>→</span>
          </button>
        </div>
      </article>
    </section>

    <Transition name="modal-fade">
      <div v-if="selectedWork" class="preview-mask" @click="closePreview">
        <div class="preview-panel refined-preview-panel" @click.stop>
          <button class="preview-close" type="button" @click="closePreview">
            ×
          </button>

          <div
            class="preview-image refined-preview-image"
            :style="{ backgroundImage: selectedWork.cover }"
          ></div>

          <div class="preview-content">
            <h2>{{ selectedWork.title }}</h2>
            <p>{{ selectedWork.category }}</p>
          </div>

          <button class="preview-action" type="button" @click="closePreview">
            Close Preview
          </button>
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
