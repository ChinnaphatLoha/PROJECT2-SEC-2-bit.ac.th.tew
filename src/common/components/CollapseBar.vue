<script setup>
import { ref } from 'vue'
import AngleDownArrow from './icons/AngleDownArrow.vue'
const openCollapse = ref(false)
const handleOpenCollapse = () => {
  openCollapse.value = !openCollapse.value
}
</script>

<template>
  <div class="collapse">
    <input type="checkbox" @click="handleOpenCollapse" />
    <div class="collapse-title">
      <div class="flex gap-12 items-start">
        <h1 class="heading-title tracking-wide">
          <slot name="title"></slot>
        </h1>
        <AngleDownArrow
          class="transition-all duration-500 ease-out"
          :class="openCollapse ? 'rotate-90' : 'rotate-270'"
        />
      </div>
    </div>
    <div class="collapse-content transition-all duration-500 ease-out">
      <slot name="listStyle"></slot>
    </div>
  </div>
</template>

<style scoped></style>
