<script setup>
import { reactive } from 'vue';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
const columns = reactive([
  { title: 'Good', feedbacks: [{ content: 'Gay', user: 'Tew' }, { content: 'Bit', user: 'Hee' }] },
  { title: 'Bad', feedbacks: [{ content: 'Yed', user: 'Hod' }] },
  { title: 'Bom', feedbacks: [] }
]);
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">
      <slot name="title">Retro title</slot>
    </h1>

    <div class="flex gap-8">
      <RetroColumn v-for="(column, index) in columns" :key="index" :title="column.title"
        :feedbacks="column.feedbacks" />
    </div>
  </div>
</template>

<style scoped></style>
