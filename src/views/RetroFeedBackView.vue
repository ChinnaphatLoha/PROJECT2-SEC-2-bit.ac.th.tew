<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue'
import DeleteDialog from '@/common/components/DeleteDialog.vue'
import { useUserStore } from '@/stores/store'
import { formatDateTime } from '@/common/utils/moment'

defineEmits(['closeDeleteDialog', 'delete'])
const openedDeleteDialog = ref(false)

const useStore = useUserStore()
const router = useRouter()
const projectId = useRoute().params.pid
const meetingId = useRoute().params.mid
useStore.onProject(projectId)
useStore.onMeeting(meetingId)
const AUTHORITY = useStore.authority
const isOwner = AUTHORITY === 'OWNER'
const project = isOwner ? useStore.ownedProject : useStore.membershipProject

const deleteMeeting = () => {
  useStore.removeMeeting(projectId, meetingId)
  router.push({ name: 'project-view', params: { pid: projectId } })
}

const getMeetingDuration = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diff = endDate.getTime() - startDate.getTime()
  const minutes = Math.floor(diff / 60000)
  return minutes
}

const goToMeetingEdit = () => {
  router.push({ name: 'meeting-edit', params: { pid: projectId, mid: meetingId } })
}

const meeting = reactive({ items: useStore.meeting })
const isMeetingEnd = ref(false)
const endMeetingTime = new Date(meeting.items.end_date).getTime()
const start_datetime = computed(() =>
  formatDateTime(new Date(meeting.items.start_date), '[date, time]')
)
const end_datetime = computed(() =>
  formatDateTime(new Date(meeting.items.end_date), '[date, time]')
)

const displayMeetingData = computed(() => {
  return meeting
})

const checkMeetingEndAndEditStatus = async (end_datetime) => {
  const currentDateTime = new Date().getTime()
  console.log(currentDateTime)
  console.log(end_datetime)
  if (currentDateTime > end_datetime && op) {
    isMeetingEnd.value = true
    console.log('Meeting is end')
  } else {
    isMeetingEnd.value = false
    console.log('Meeting is not end')
  }
}

const pollingData = (fetchDataCallback, intervalTime = 5000, endMeetingTime) => {
  let i = 0
  checkMeetingEndAndEditStatus(endMeetingTime)
  let polling = setInterval(async () => {
    if (isMeetingEnd.value) {
      // clear interval loop
      await new Promise((resolve) => {
        clearInterval(polling)
        resolve()
      })
    } else {
      console.log(i)
      await fetchDataCallback()
    }
    i++
  }, intervalTime)
}

const fetchMeetingData = async () => {
  await useStore.getFeedbacksByMeetingId(meetingId, showErrorMsg)
  meeting.items = useStore.meeting
  console.log('------- PATCH --------')
}

const showErrorMsg = (msg) => {
  console.log(msg)
}

onMounted(() => {
  console.log('START POLLING')
  if (!isMeetingEnd.value) {
    pollingData(fetchMeetingData, 5000, endMeetingTime)
  } else {
    console.log('Meeting is end. STOP POLLING')
  }
})

onUnmounted(() => {
  console.log('STOP POLLING')
  isMeetingEnd.value = true
})

// watch(
//   () => useStore.$state.ownedProjects,
//   (newValue) => {
//     meeting.items = newValue
//       .flatMap((project) => project.meetings)
//       .flat()
//       .find((m) => m.id === meetingId)
//     console.log(meeting.items)
//   }
// )
watch(
  meeting,
  (newValue) => {
    console.log('Meeting data changed')
    console.log(newValue)
  },
  { deep: true }
)
</script>

<template>
  <BaseLayout>
    <div class="container m-8 py-8">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center breadcrumbs tracking-wide">
          <ul>
            <li>
              <RouterLink :to="{ name: 'project-view', params: { id: projectId } }"
                ><h2 :title="`${project.id} - ${project.name}`" class="text-2xl font-semibold">
                  Project
                </h2></RouterLink
              >
            </li>
            <li>
              <div class="flex items-center gap-4 w-[65%]">
                <h1 class="text-2xl">{{ meeting.items.topic }}</h1>
                <button v-if="isOwner" @click="goToMeetingEdit" class="btn btn-square btn-custom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  @click="openedDeleteDialog = true"
                  v-if="isOwner"
                  class="btn btn-square btn-custom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex w-[45%] my-8">
          <div
            class="grid flex-grow bg-base-300 rounded-box place-items-center text-sm font-semibold tracking-wide px-4"
          >
            {{
              start_datetime[0] !== end_datetime[0]
                ? `${start_datetime[0]} - ${end_datetime[0]}`
                : `${start_datetime[0]}`
            }}
          </div>
          <div class="divider divider-horizontal text-2xl">:</div>
          <div
            class="grid flex-grow bg-base-300 rounded-box place-items-center text-sm font-semibold tracking-wide px-4"
          >
            {{ start_datetime[1] }} - {{ end_datetime[1] }}
          </div>
          <div class="divider divider-horizontal text-2xl">:</div>
          <div
            class="grid flex-grow bg-base-300 rounded-box place-items-center text-sm font-semibold tracking-wide px-4"
          >
            {{ getMeetingDuration(meeting.items.start_date, meeting.items.end_date) }} min
          </div>
        </div>
      </div>
      <p class="text-lg ml-4">{{ meeting.items.description }}</p>
      <div class="flex gap-8 justify-center items-start my-16">
        <RetroColumn
          v-for="{ feedbackRecords, end_date, index } in displayMeetingData"
          :key="new Date().getTime() + index"
          :endDate="end_date"
          :feedbackRecords="feedbackRecords"
        />
      </div>
    </div>
  </BaseLayout>

  <div
    v-if="openedDeleteDialog"
    @click.self="openedDeleteDialog = false"
    class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <DeleteDialog
      :item_type="'meeting'"
      :item_name="useStore.meeting.topic"
      @closeDeleteDialog="openedDeleteDialog = false"
      @delete="deleteMeeting"
    />
  </div>
</template>

<style scoped></style>
