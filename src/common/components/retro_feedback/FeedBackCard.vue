<script setup>
const props = defineProps({
  user: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
    <div id="content" class="text-gray-700">
      <slot name="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor diam id vestibulum sagittis.</slot>
    </div>
    <div id="user" class="text-gray-500">
      <slot name="user">Default User</slot>
    </div>
  </div>
</template>


<style scoped></style>