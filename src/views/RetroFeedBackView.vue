<script setup>
import { reactive } from 'vue';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
// import Provider from '@/api/provider';
const meeting = reactive([
  {
    id: '$TEST-M-01-01',
    start_date: '2024-02-05T18:30:00',
    end_date: '2024-02-05T19:00:00',
    description: 'Dive into the code (Hell o World)',
    feedbackRecords: {
      GOOD: [
        {
          content: "I'm so happy to be here",
          username: 'FameNu'
        },
        {
          content: "So enjoy",
          username: 'FameNu'
        },
      ],
      BAD: [
        {
          content: "Gay",
          username: 'Tew2945'
        }
      ]
    }
  }
])
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="flex gap-8">
      <RetroColumn v-for="{feedbackRecords, id} in meeting" :key="id"
        :feedbackRecords="feedbackRecords" />
    </div>
  </div>
</template>

<style scoped></style>
