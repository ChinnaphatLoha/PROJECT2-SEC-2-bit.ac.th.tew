<script setup>
defineProps({
  idCard: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: ''
  }
})
</script>

<template>
  <div class="card-retro relative flex flex-col gap-16" :id="idCard">
      <h1 class="text-2xl font-bold"><slot name="title"></slot></h1>
      <p class="text-slate-300 text-right absolute right-6 bottom-6"><slot name="owner-name"></slot></p>
  </div>
</template>

<style scoped></style>
