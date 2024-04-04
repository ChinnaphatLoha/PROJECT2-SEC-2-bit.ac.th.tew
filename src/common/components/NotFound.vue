<script setup>
import { onMounted } from 'vue'
import { RICK_ROLL } from '@/common/constants/urls'
import RandomMeme from '@/common/components/RandomMeme.vue'

onMounted(() => {
  setTimeout(() => {
    window.open(RICK_ROLL, '_blank')
  }, 5000)
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex m-4 text-5xl font-bold justify-center">Not Found</div>
    <RandomMeme />
  </div>
</template>
