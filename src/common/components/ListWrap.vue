<script setup>
defineProps({
  items: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [{ id: 'empty', title: 'empty list' }]
  }
})
</script>

<template>
<div class="w-full h-fit">
    <div
      class="flex flex-wrap w-full h-fit gap-8"
    >
      <slot v-for="(item, index) in items" :item="item" :index="index" :key="index"></slot>
    </div>
  </div>
</template>

<style scoped></style>
