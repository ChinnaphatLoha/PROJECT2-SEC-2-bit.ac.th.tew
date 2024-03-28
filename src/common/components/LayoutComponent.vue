<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import BarSolid from './icons/BarSolid.vue'

const router = useRouter()
const store = useUserStore()

const allMeetings = ref([])

const now = ref(new Date())

const getIncomingMeeting = computed(() => {
  return allMeetings.value
    .filter(
      (meeting) =>
        new Date(meeting?.start_date).getTime() > now.value.getTime() ||
        new Date(meeting?.end_date).getTime() > now.value.getTime()
    )
    .sort((a, b) => new Date(a?.start_date) - new Date(b?.start_date))[0]
})

const indicator = computed(() =>
  getIncomingMeeting.value ? 'border-0 bg-orange-500 hover:bg-orange-700' : 'btn-disabled'
)

watch(
  () => [store.$state.ownedProjects, store.$state.membershipProjects, now.value],
  () => {
    allMeetings.value = store.$state.ownedProjects
      .concat(store.$state.membershipProjects)
      .map((project) => project.meetings)
      .flat()
  },
  { deep: true }
)

setInterval(() => {
  now.value = new Date()
}, 1000)

function signout() {
  store.logout()
  router.push({ name: 'login' })
}

function moveToIncomingMeeting() {
  if (!getIncomingMeeting.value) return
  router.push({
    name: 'meeting-feedback',
    params: { pid: getIncomingMeeting.value.projectId, mid: getIncomingMeeting.value.id }
  })
}
</script>

<template>
  <div class="w-full font-semibold bg-[#F8B379]">
    <header class="text-[#411209] text-lg py-4 px-6 flex justify-between">
      <div class="flex items-center justify-between w-[20%] pl-10">
        <RouterLink :to="{ name: 'home' }">
          <BarSolid />
        </RouterLink>
        <button :class="indicator" class="btn" @click="moveToIncomingMeeting">
          <span :class="[indicator !== 'btn-disabled' ? 'text-white' : 'text-[#411209]']"
            >Incoming Meeting</span
          >
        </button>
      </div>
      <div class="flex items-center justify-between w-[35%]">
        <h1 class="text-2xl tracking-wider truncate">Hello, {{ store.username }}</h1>
        <button class="btn px-8 border-0 bg-[#F1691E] hover:bg-orange-700" @click="signout">
          <span class="text-[#FEF6EE] text-lg">Sign out</span>
        </button>
      </div>
    </header>
  </div>
  <slot></slot>
</template>
