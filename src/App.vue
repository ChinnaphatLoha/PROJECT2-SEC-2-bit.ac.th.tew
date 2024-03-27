<script setup>
import { RouterView } from 'vue-router'
import globalSetup from '@/common/config/globalSetup'

globalSetup()
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
