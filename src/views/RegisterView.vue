<script setup>
import RegisterForm from '@/common/components/RegisterForm.vue'
</script>

<template>
  <div>
    <RegisterForm />
    <p>Already have an account? <RouterLink to="/login">Sign-in</RouterLink> here.</p>
  </div>
</template>
