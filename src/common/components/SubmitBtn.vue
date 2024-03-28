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
    <button type="submit" class="w-full flex justify-center p-4 border border-transparent rounded-md shadow-sm text-sm font-medium button-retro-primary ">
      {{ buttonText }}
    </button>
</template>
