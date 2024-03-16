<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterLink class="btn" to="/login">Login page</RouterLink>
    <RouterLink class="btn" to="/register">Register page</RouterLink>
    <RouterLink class="btn" to="/test">Test Components</RouterLink>
    <RouterView></RouterView>
  </div>
</template>
