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
</template>

<style scoped></style>
