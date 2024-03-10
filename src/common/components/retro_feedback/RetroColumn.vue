<script setup>
import FeedBackCard from './FeedBackCard.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Column Retro Title'
  },
  feedbacks: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
    <div>
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeedBackCard v-for="(feedback, index) in feedbacks" :key="index">
          <template #content>
            {{ feedback.content }}
          </template>
          <template #user>
            {{ feedback.user }}
          </template>
        </FeedbackCard>
      </div>
    </div>
  </template>

<style scoped></style>