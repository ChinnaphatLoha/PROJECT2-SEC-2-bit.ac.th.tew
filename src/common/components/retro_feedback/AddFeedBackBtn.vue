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
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
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
  <button class="flex flex-col justify-center items-center p-4 bg-white rounded-lg border-2 border-dashed w-full shadow-md"
    :disabled="disabled"
    @click="openModal"
    >
    <PlusIcon />
    <h2 class="text-lg font-semibold mb-4">
      Add New Card
    </h2>
  </button>
  <FormFeedBack v-show="isOpen" @addNewFeedback="updateFeedbackRecords" @closeModal="closeModal" />
</template>


<style scoped></style>