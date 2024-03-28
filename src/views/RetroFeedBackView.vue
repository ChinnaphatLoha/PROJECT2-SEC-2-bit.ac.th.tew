<script setup>
import { ref, onBeforeUnmount, reactive, watch } from 'vue'
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

let meeting = reactive({ items: useStore.meeting });
const [date, start_time] = formatDateTime(new Date(meeting.items.start_date), '[date, time]');

const [_, end_time] = formatDateTime(new Date(meeting.items.end_date), '[date, time]');

onBeforeUnmount(() => {
  useStore.onMeeting(null)
})
</script>

<template>
  <BaseLayout>
    <div class="container m-8 py-8">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center breadcrumbs tracking-wide">
          <ul>
            <li>
              <RouterLink :to="{ name: 'project-view', params: { id: projectId } }"
                ><h2 :title="`${project.id} - ${project.name}`" class="text-2xl font-semibold">Project</h2></RouterLink
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
            {{ date }}
          </div>
          <div class="divider divider-horizontal text-2xl">:</div>
          <div
            class="grid flex-grow bg-base-300 rounded-box place-items-center text-sm font-semibold tracking-wide px-4"
          >
            {{ start_time }} - {{ end_time }}
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
      <div class="flex gap-8 items-start my-8">
        <RetroColumn
          v-for="{ feedbackRecords, end_date, id } in meeting"
          :key="id"
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
