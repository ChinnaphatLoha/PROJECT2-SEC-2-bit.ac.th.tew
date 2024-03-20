<script setup>
</script>

<template>
  <div class="flex flex-col justify-center p-4 bg-white rounded-lg shadow-md">
    <div id="content" class="text-lg text-gray-700 mb-2 overflow-hidden">
      <slot name="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor diam id vestibulum sagittis.</slot>
    </div>
    <div id="user" class="text-sm text-gray-500">
      <slot name="user">Default User</slot>
    </div>
  </div>
</template>



<style scoped></style>