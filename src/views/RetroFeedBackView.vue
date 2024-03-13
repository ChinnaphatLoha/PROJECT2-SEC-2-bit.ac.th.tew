<script setup>
import { reactive } from 'vue';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
const columns = reactive([
  { title: 'Good', feedbacks: [{ content: 'EAE', user: 'Tew' }, { content: 'Bit', user: 'xxxxx' }] },
  { title: 'Bad', feedbacks: [{ content: 'Yed', user: 'Hod' }] },
  { feedbacks: [] }
]);
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4">
      {{ title }}
    </h1>

    <div class="flex gap-8">
      <RetroColumn v-for="(column, index) in columns" :key="index" :title="column.title"
        :feedbacks="column.feedbacks" />
    </div>
  </div>
</template>

<style scoped></style>
