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
    <button type="submit" class="w-full mt-3 button-retro-primary ">
      {{ buttonText }}
    </button>
</template>
