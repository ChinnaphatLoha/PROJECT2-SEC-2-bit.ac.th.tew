<script setup>
import { ref,reactive } from 'vue';
import FormFeedBack from './FormFeedBack.vue';
import PlusIcon from '../icons/PlusIcon.vue';
import ErrorToast from '../ErrorToast.vue';
import feedbackManagement from '@/common/utils/feedback-management';
import { useUserStore } from '@/stores/store';

const useStore = useUserStore()
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

const { feedbackRecords, type, disabled } = props
const isOpenModal = ref(false);

const openModal = () => {
  if (!disabled) {
    isOpenModal.value = true;
  }else{
    showErrorToast('This Meeting is Time out!!!')
  }
  
}
const closeModal = () => {
  isOpenModal.value = false;
}

const updateFeedbackRecords = (newContent) => {
  const { action } = feedbackManagement(feedbackRecords);
  action.addFeedback(type,newContent,useStore.username);
}

const errorToast = reactive({
  show: false,
  message: ''
})

const showErrorToast = (message) => {
  errorToast.show = true
  errorToast.message = message
  setTimeout(() => {
    errorToast.show = false
    errorToast.message = ''
  }, 3000)
}
</script>

<template>
  <button class="flex flex-col justify-center items-center p-4 bg-white rounded-lg border-2 border-dashed w-full shadow-md"
    @click="openModal"
    >
    <PlusIcon />
    <h2 class="text-lg font-semibold mb-4">
      Add New Card
    </h2>
  </button>
  <FormFeedBack v-show="isOpenModal" @addNewFeedback="updateFeedbackRecords" @closeModal="closeModal" />
  <ErrorToast v-show="errorToast.show" :message="errorToast.message" />
</template>


<style scoped></style>