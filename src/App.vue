<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterLink to="/login">Login page</RouterLink>
    <RouterLink to="/register">Register page</RouterLink>
    <RouterLink to="/test">Test Components</RouterLink>
    <RouterView></RouterView>
  </div>
</template>
