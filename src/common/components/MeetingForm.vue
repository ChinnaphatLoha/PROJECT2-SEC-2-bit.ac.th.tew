<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import { getShortISOStringInUserTimezone } from '@/common/utils/moment'
import ErrorToast from './ErrorToast.vue'

const router = useRouter()
const store = useUserStore()
const projectId = useRoute().params.pid
const meetingId = useRoute().params.mid
store.onProject(projectId)
store.onMeeting(meetingId)
if (!store.ownedProject) {
  router.push({ name: 'project-view', params: { pid: projectId } })
}
const meeting = store.meeting
const now = ref(getShortISOStringInUserTimezone(new Date()))

const meetingCreationForm = reactive({
  projectId,
  topic: meeting?.topic || '',
  startDate: meeting?.start_date || now.value,
  endDate:
    meeting?.end_date ||
    getShortISOStringInUserTimezone(
      new Date(new Date(now.value).setMinutes(new Date(now.value).getMinutes() + 15))
    ),
  description: meeting?.description || ''
})

const minAllowedStartDate = computed(() => {
  const newDate = new Date(now.value)
  newDate.setMinutes(newDate.getMinutes() - 15)
  return getShortISOStringInUserTimezone(newDate)
})

const minAllowedEndDate = computed(() => {
  const newDate = new Date(meetingCreationForm.startDate)
  if (!newDate) return null
  newDate.setMinutes(newDate.getMinutes() + 15)
  return getShortISOStringInUserTimezone(newDate)
})

const maxAllowedEndDate = computed(() => {
  const newDate = new Date(meetingCreationForm.startDate)
  if (!newDate) return null
  newDate.setMinutes(newDate.getMinutes() + 60)
  return getShortISOStringInUserTimezone(newDate)
})

const handleDateChange = () => {
  if (
    new Date(meetingCreationForm.startDate).getTime() <
    new Date(minAllowedStartDate.value).getTime()
  ) {
    meetingCreationForm.startDate = minAllowedStartDate.value
  }
  if (
    new Date(meetingCreationForm.endDate).getTime() < new Date(minAllowedEndDate.value).getTime()
  ) {
    meetingCreationForm.endDate = minAllowedEndDate.value
  } else if (
    new Date(meetingCreationForm.endDate).getTime() > new Date(maxAllowedEndDate.value).getTime()
  ) {
    meetingCreationForm.endDate = maxAllowedEndDate.value
  }
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

const goBackToPreviousPage = () => {
  router.go(-1)
}

const createNewMeeting = async () => {
  if (meetingId) {
    updateMeeting()
  } else {
    const { id } = await store.createNewMeeting(meetingCreationForm, showErrorToast)
    router.push({ name: 'meeting-feedback', params: { mid: id } })
  }
}

const updateMeeting = async () => {
  const { id } = await store.updateMeetingInfo(meetingId, meetingCreationForm)
  router.push({ name: 'meeting-feedback', params: { pid: projectId, mid: id } })
}
</script>

<template>
  <div class="w-3/4 mt-16 mx-auto">
    <div class="breadcrumbs mb-6">
      <ul>
        <li>
          <RouterLink :to="{ name: 'project-view', params: { pid: store.ownedProject?.id } }"
            ><h2 class="text-xl">{{ store.ownedProject?.name }}</h2></RouterLink
          >
        </li>
        <li><h2 class="text-lg">Meeting Creation Form</h2></li>
      </ul>
    </div>
    <h1 class="text-base font-semibold leading-7">Create Meeting</h1>

    <!-- Create Meeting -->
    <form @submit.prevent="createNewMeeting">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <label for="meeting-topic" class="block text-sm font-medium leading-6"
            >Meeting topic</label
          >
          <div class="mt-2">
            <input
              v-model.trim="meetingCreationForm.topic"
              required
              type="text"
              maxlength="50"
              name="meeting-topic"
              id="meeting-topic"
              placeholder="What is the meeting about?"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="start-date" class="block text-sm font-medium leading-6"
            >Start Date & Time</label
          >
          <div class="mt-2">
            <input
              v-model="meetingCreationForm.startDate"
              :min="minAllowedStartDate"
              @change="handleDateChange"
              required
              type="datetime-local"
              id="start-date"
              name="start-date"
              class="block w-full rounded-md border py-1.5 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="end-date" class="block text-sm font-medium leading-6">End Date & Time</label>
          <div class="mt-2">
            <input
              v-model="meetingCreationForm.endDate"
              :min="minAllowedEndDate"
              @change="handleDateChange"
              required
              type="datetime-local"
              id="end-date"
              name="end-date"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full">
          <label for="description" class="block text-sm font-medium leading-6">Description</label>
          <div class="mt-2">
            <textarea
              v-model="meetingCreationForm.description"
              type="text"
              maxlength="300"
              id="description"
              name="description"
              rows="3"
              placeholder="Describe the project or information about the project"
              class="resize-none block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-16 flex items-center gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ meeting ? 'Update Meeting' : 'Create Meeting' }}
        </button>

        <button
          @click="goBackToPreviousPage"
          type="button"
          class="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
      </div>
    </form>
    <ErrorToast v-if="errorToast.show" :message="errorToast.message" />
  </div>
</template>

<style scoped>
input,
select,
textarea {
  padding-inline: 0.75rem;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
</style>
