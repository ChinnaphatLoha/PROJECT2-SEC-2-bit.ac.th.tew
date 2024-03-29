<script setup>
import { onMounted } from 'vue'
import { RICK_ROLL } from '@/common/constants/urls'

onMounted(() => {
  window.open(RICK_ROLL, '_blank')
})
</script>

<template>
  <div>Not Found</div>
</template>
