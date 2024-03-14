<script setup>
import { ref } from 'vue';
import AddFeedBackBtn from './AddFeedBackBtn.vue';
import FeedBackCard from './FeedBackCard.vue';

const props = defineProps({
  feedbackRecords: {
    type: Object,
    default: () => []
  }
});

</script>

<template>
  <div class="flex flex-col gap-y-4" v-for="[title, feedback] in Object.entries(feedbackRecords)" :key="title">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <AddFeedBackBtn />
    <FeedBackCard v-for="{ content, username, index } in feedback" :key="index">
      <template #content>
        {{ content }}
      </template>
      <template #user>
        {{ username }}
      </template>
    </FeedbackCard>
  </div>
</template>

<style scoped></style>