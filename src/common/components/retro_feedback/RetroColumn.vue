<script setup>
import { reactive } from 'vue';
import AddFeedBackBtn from './AddFeedBackBtn.vue';
import FeedBackCard from './FeedBackCard.vue';
import TITLE_TYPE from '@/common/constants/style-config';

const props = defineProps({
  feedbackRecords: {
    type: Object,
    default: () => {}
  }
});

const { feedbackRecords } = props; 
const feedbackRecordsArr = reactive(Object.entries(feedbackRecords));
const setStyleTitle = (title) => {
  const style = TITLE_TYPE[title];
  return style
}

const reversedFeedbacks = (feedbacks) => {
  return feedbacks.slice().reverse();
}
</script>

<template>
  <div class="flex flex-col gap-y-4" v-for="[title, feedbacks] in feedbackRecordsArr" :key="title">
    <h2 class="text-xl font-bold mb-4" :class="setStyleTitle(title)">{{ title }}</h2>
    <AddFeedBackBtn :feedbackRecords="feedbackRecords" :type="title" />
    <FeedBackCard v-for="{ content, username, index } in reversedFeedbacks(feedbacks)" :key="index">
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