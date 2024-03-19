<script setup>
defineProps({
  message: String
})
</script>

<template>
  <div class="toast toast-bottom toast-start z-50">
    <div class="alert alert-error">
      <span v-text="message"></span>
    </div>
  </div>
</template>
