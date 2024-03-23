<script setup>
import { ref } from 'vue'
import AngleDownArrow from './icons/AngleDownArrow.vue'

const props = defineProps({
  openColl: {
    type: Boolean,
    default: false
  }
})
const openCollapse = ref(props.openColl)
const handleOpenCollapse = () => {
  openCollapse.value = !openCollapse.value
}
</script>

<template>
  <div class="collapse">
    <input type="checkbox" @click="handleOpenCollapse" v-model="openCollapse" />
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
    <div class="collapse-content">
      <slot name="listStyle"></slot>
    </div>
  </div>
</template>

<style scoped></style>
