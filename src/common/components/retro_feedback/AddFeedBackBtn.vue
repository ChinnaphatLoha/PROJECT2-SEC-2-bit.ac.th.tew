<script setup>
import { ref } from 'vue';
import FormFeedBack from './FormFeedBack.vue';
import PlusIcon from '../icons/PlusIcon.vue';
import feedbackManagement from '@/common/utils/feedback-management';

const props = defineProps({
  feedbackRecords: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    required: true
  }
}
)

const { feedbackRecords, type } = props
const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
}
const closeModal = () => {
  isOpen.value = false;
}

const updateFeedbackRecords = (newContent) => {
  const { action } = feedbackManagement(feedbackRecords);
  action.addFeedback(type,newContent,'Tonnam');
}


</script>

<template>
  <div class="flex justify-center items-center p-4 bg-white rounded-lg border-2 border-dashed shadow-md"
    @click="openModal">
    <h2 class="text-lg font-semibold mb-4">
      <PlusIcon />
      Add New Card
    </h2>
  </div>
  <FormFeedBack v-show="isOpen" @addNewFeedback="updateFeedbackRecords" @closeModal="closeModal" />
</template>


<style scoped></style>