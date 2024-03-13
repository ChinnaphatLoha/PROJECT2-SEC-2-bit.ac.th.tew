<script setup>
import { ref } from 'vue';
import AddFeedBackBtn from './AddFeedBackBtn.vue';
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
  <div class="flex flex-col gap-y-4">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <AddFeedBackBtn />
    <FeedBackCard v-for="(feedback, index) in feedbacks" :key="index" :feedbacks="feedbacks">
      <template #content>
        {{ feedback.content }}
      </template>
      <template #user>
        {{ feedback.user }}
      </template>
    </FeedbackCard>
  </div>
</template>

<style scoped></style>