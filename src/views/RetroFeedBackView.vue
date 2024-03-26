<script setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
import { useUserStore } from '@/stores/store';

const useStore = useUserStore();
useStore.onMeeting(useRoute().params.id)

const meeting = reactive([
  {
    id: '$TEST-M-01-01',
    start_date: '2024-02-05T18:30:00',
    end_date: '2025-02-05T19:00:00',
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
          content: "Boring",
          username: 'Tew2945'
        }
      ],
      TRY: []
    }
  }
])
</script>

<template>
  
  <BaseLayout><div class="container mx-auto py-8">
    <div class="flex justify-center gap-8">
      <RetroColumn v-for="{ feedbackRecords, end_date, index } in meeting" :key="index" :end_date="end_date" :feedbackRecords="feedbackRecords" />
    </div>
  </div></BaseLayout>
</template>

<style scoped></style>
