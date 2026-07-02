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
        <h2>Product design is not only about screens, but also about solving real problems.</h2>
      </div>

      <div class="more-hero-icon">
        ✦
      </div>
    </section>

    <section class="work-list refined-work-list">
      <article
        v-for="(work, index) in works"
        :key="work.title"
        class="work-card refined-work-card"
        :style="{ animationDelay: `${index * 0.06}s` }"
        @click="openPreview(work, index)"
      >
        <div class="work-cover refined-work-cover" :style="{ background: work.cover }">
          <div class="cover-shine"></div>

          <div class="work-mock-card">
            <div class="mock-dot-row">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div class="mock-content">
              <div class="mock-block large"></div>
              <div class="mock-block small"></div>
              <div class="mock-line"></div>
              <div class="mock-line short"></div>
            </div>
          </div>
          
          <!-- 作品编号不需要 -->
          <!-- <span class="work-number">
            {{ formatIndex(index + 1) }}
          </span> -->
          
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
            :style="{ background: selectedWork.cover }"
          >
            <div class="preview-device">
              <div class="preview-device-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div class="preview-device-body">
                <div class="preview-card-main"></div>
                <div class="preview-card-side"></div>
                <div class="preview-line"></div>
                <div class="preview-line short"></div>
              </div>
            </div>
          </div>

          <div class="preview-content">
            <!-- 作品编号不需要 -->
            <!-- <span>Work {{ formatIndex(selectedIndex + 1) }}</span> -->
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
const selectedIndex = ref(0)

const openPreview = (work, index) => {
  selectedWork.value = work
  selectedIndex.value = index
}

const closePreview = () => {
  selectedWork.value = null
}

const formatIndex = (index) => {
  return String(index).padStart(2, '0')
}
</script>