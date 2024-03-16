<script setup>
import { ref } from 'vue'
defineProps({
  items: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: []
  }
})
const scrollPosition = ref(0)
const scrollStep = 100
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold tracking-wide mb-4">
      <slot name="title">"List name"</slot>
    </h1>
    <div
      class="flex w-full h-fit gap-8 overflow-auto"
      :style="{ transform: `translateX(${scrollPosition}px)` }"
    >
      <slot v-for="(item, index) in items" :item="item" :index="index" :key="index"></slot>
    </div>
    <div>
      <button @click="scrollPosition -= scrollStep" :disabled="scrollPosition <= 0">Prev</button>
      <button @click="scrollPosition += scrollStep" :disabled="scrollPosition >= 1000">Next</button>
    </div>
  </div>
</template>

<style scoped></style>
