<script setup>
import { ref, reactive, computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue'
import DeleteDialog from '@/common/components/DeleteDialog.vue'
import { useUserStore } from '@/stores/store'
import { formatDateTime, isBetweenTimes } from '@/common/utils/moment'
import PenIcon from '@/common/components/icons/PenIcon.vue'
import TrashIcon from '@/common/components/icons/TrashIcon.vue'
import InfoIcon from '@/common/components/icons/InfoIcon.vue'
import AngleDownArrow from '@/common/components/icons/AngleDownArrow.vue'

const clock = ref(new Date().getSeconds())

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
const meeting = reactive({ info: useStore.meeting })

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

const titles = Object.keys(meeting.info?.feedbackRecords || {})
const openedFeedbackForm = reactive({})
titles.forEach((title) => {
  openedFeedbackForm[title] = { status: false }
  provide(`opened${title}FeedbackForm`, openedFeedbackForm[title])
})

const start_datetime = computed(() =>
  formatDateTime(new Date(meeting.info?.start_date), '[date, time]')
)
const end_datetime = computed(() =>
  formatDateTime(new Date(meeting.info?.end_date), '[date, time]')
)

const getMeeting = computed(() => (clock.value ? useStore.meeting : meeting.info))

const polling = setInterval(async () => {
  if (!isBetweenTimes(meeting.info?.start_date, meeting.info?.end_date)) {
    clearInterval(polling)
  } else if (Object.values(openedFeedbackForm).every((open) => !open.status)) {
    clock.value = new Date().getSeconds()
    await useStore.getFeedbacksByMeetingId(meetingId)
  }
}, 3000)

if (!meeting.info) router.push({ name: 'not-found' })
</script>

<template>
  <BaseLayout>
    <div v-if="meeting.info" class="m-10">
      <div class="grid grid-rows-2 grid-cols-5 gap-4">
        <div class="col-span-3 nav-for-warp-page">
          <div>
            <RouterLink :to="{ name: 'project-view', params: { id: projectId } }">
              <h2 :title="`${project.id} - ${project.name}`" class="heading-warp-page">Project</h2>
            </RouterLink>
          </div>
          <div class="flex gap-3">
            <AngleDownArrow size="w-3" class="-rotate-90" />
            <h1 class="text-2xl">{{ getMeeting.topic }}</h1>
          </div>
          <div class="flex gap-4">
            <button v-if="isOwner" @click="goToMeetingEdit" class="button-action-meeting">
              <PenIcon size="w-5" color="#feebd6" />
            </button>
            <button @click="openedDeleteDialog = true" v-if="isOwner" class="button-action-meeting">
              <TrashIcon size="w-5" color="#feebd6" />
            </button>
          </div>
        </div>
        <div class="col-span-3">
          <div class="flex items-center">
            <InfoIcon size="w-10" color="#411209" />
            <p class="text-lg font-semibold ml-6 leading-8">
              {{ getMeeting.description }}
            </p>
          </div>
        </div>
        <div class="col-start-4 row-start-1 timing-box items-center">
          <div class="heading-time-box">Meeting Time</div>
          <div>
            {{
              start_datetime[0] !== end_datetime[0]
                ? `${start_datetime[0].slice(0, 2)} - ${end_datetime[0].slice(0, 2)} ${start_datetime[0].slice(2)}`
                : `${start_datetime[0]}`
            }}
          </div>
          <div class="flex items-start justify-end gap-3">
            <span class="font-semibold">{{ start_datetime[1] }}</span>
            <span>to</span>
            <span class="font-semibold">{{ end_datetime[1] }}</span>
          </div>
        </div>
        <div class="col-start-5 row-start-1 timing-box gap-6 items-center">
          <div class="text-center">
            <div class="heading-time-box">Duration</div>
            <div class="text-3xl font-extrabold">
              {{ getMeetingDuration(getMeeting.start_date, getMeeting.end_date) }} min
            </div>
          </div>
        </div>
      </div>
      <hr class="divide-tan-hide-900 mt-10" />
      <div class="flex gap-8 justify-center items-start my-16">
        <RetroColumn
          :key="clock"
          :period="[getMeeting.start_date, getMeeting.end_date]"
          :feedbackRecords="getMeeting.feedbackRecords"
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
