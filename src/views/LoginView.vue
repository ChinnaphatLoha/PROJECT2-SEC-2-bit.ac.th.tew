<script setup>
import LoginForm from '../common/components/LoginForm.vue'
</script>

<template>
  <div>
    <LoginForm />
    <p>not have account? <RouterLink to="/register">Sign-up</RouterLink> here.</p>
  </div>
</template>
