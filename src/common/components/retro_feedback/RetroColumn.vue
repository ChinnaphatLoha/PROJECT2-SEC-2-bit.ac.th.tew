<script setup>
import { reactive } from 'vue';
import AddFeedBackBtn from './AddFeedBackBtn.vue';
import FeedBackCard from './FeedBackCard.vue';


const props = defineProps({
  feedbackRecords: {
    type: Object,
    default: () => {}
  }
});

const { feedbackRecords } = props;
const feedbackContentArr = reactive(Object.entries(feedbackRecords));

</script>

<template>
  <div class="flex flex-col gap-y-4" v-for="[title, feedbacks] in feedbackContentArr" :key="title">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <AddFeedBackBtn :feedbackRecords="feedbackRecords" :type="title" />
    <FeedBackCard v-for="{ content, username, index } in feedbacks" :key="index">
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