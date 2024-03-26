<script setup>
import { reactive } from 'vue';
import AddFeedBackBtn from './AddFeedBackBtn.vue';
import FeedBackCard from './FeedBackCard.vue';
import TITLE_TYPE from '@/common/constants/style-config';

const props = defineProps({
  feedbackRecords: {
    type: Object,
    default: () => { }
  },
  end_date: {
    type: String,
    required: true
  }
});


const { feedbackRecords, end_date } = props;
const feedbackRecordsArr = reactive(Object.entries(feedbackRecords));
const currentDate = new Date().toISOString();
const setStyleTitle = (title) => {
  const style = TITLE_TYPE[title];
  return style
}

const reversedFeedbacks = (feedbacks) => {
  return feedbacks.slice().reverse();
}

const isDisabled = currentDate > end_date;
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg w-72 " v-for="[title, feedbacks] in feedbackRecordsArr"
    :key="title">
    <h2 class="text-xl font-bold px-4 py-2" :class="setStyleTitle(title)">{{ title }}</h2>
    <div class="px-4 py-2">
      <AddFeedBackBtn :disabled="isDisabled" :feedbackRecords="feedbackRecords" :type="title" />
    </div>
    <div class="flex flex-col gap-3 p-4">
      <FeedBackCard v-for="{ content, username, index } in reversedFeedbacks(feedbacks)" :key="index">
        <template #content>
          <div class="break-words  max-w-96">{{ content }}</div>
        </template>
        <template #user>
          {{ username }}
        </template>
      </FeedbackCard>
    </div>
  </div>
</template>

<style scoped></style>