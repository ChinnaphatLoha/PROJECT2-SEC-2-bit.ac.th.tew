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
  <div>Not Found</div>
  <RandomMeme />
</template>
