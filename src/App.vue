<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <RouterLink to="/login">Login page</RouterLink>
    <RouterLink to="/register">Register page</RouterLink>
    <RouterLink to="/retro_feeback">Retro FeedBack</RouterLink>
    <RouterView></RouterView>
  </div>
</template>
