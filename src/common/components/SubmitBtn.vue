<script setup>
defineProps({
  buttonText: {
    type: String,
    require: true,
    default: 'Button Text'
  }
})
</script>

<template>
  <div>
    <button type="submit">
      {{ buttonText }}
    </button>
  </div>
</template>
