<script setup>
import { reactive, inject } from 'vue'
import FormFeedBack from './FormFeedBack.vue'
import PlusIcon from '../icons/PlusIcon.vue'
import ErrorToast from '../ErrorToast.vue'
import { useUserStore } from '@/stores/store'

const useStore = useUserStore()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
  }
})

const { title, disabled } = props
const isOpenModal = inject(`opened${title}FeedbackForm`)
const openModal = () => {
  if (!disabled) {
    isOpenModal.status = true
  } else {
    showErrorToast('You can only add feedback during the meeting time.')
  }
}
const closeModal = () => {
  isOpenModal.status = false
}

const updateFeedbackRecords = (newContent) => {
  useStore.createNewFeedback({
    meetingId: useStore.$state.currentMeetingId,
    title,
    content: newContent
  })
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
  <button
    class="flex flex-col justify-center items-center p-4 bg-white rounded-lg border-2 border-dashed w-full shadow-md"
    @click="openModal"
  >
    <PlusIcon />
    <h2 class="text-lg font-semibold mb-4">Add New Feedback</h2>
  </button>
  <FormFeedBack
    v-show="isOpenModal.status"
    :title="props.title"
    @addNewFeedback="updateFeedbackRecords"
    @closeModal="closeModal"
  />
  <ErrorToast v-show="errorToast.show" :message="errorToast.message" />
</template>

<style scoped></style>
