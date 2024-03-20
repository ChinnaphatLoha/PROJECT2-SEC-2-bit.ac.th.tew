<script setup>
import { ref } from 'vue'
import AngleDownArrow from './icons/AngleDownArrow.vue'
const openCollapse = ref(false)
const handleOpenCollapse = () => {
  openCollapse.value = !openCollapse.value
}
</script>

<template>
  <details class="collapse">
    <summary class="collapse-title" @click="handleOpenCollapse">
      <div class="flex gap-12 items-start">
        <h1 class="heading-title tracking-wide">
          <slot name="title"></slot>
        </h1>
        <AngleDownArrow
          class="transition-all duration-500 ease-out"
          :class="openCollapse ? 'rotate-90' : 'rotate-270'"
        />
      </div>
    </summary>
    <div class="collapse-content transition-all duration-500 ease-out">
      <slot name="listStyle"></slot>
    </div>
  </details>
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-200">
  <div class="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div class="collapse-content"> 
    <p>tabindex="0" attribute is necessary to make the div focusable</p>
  </div>
</div>
</template>

<style scoped></style>
