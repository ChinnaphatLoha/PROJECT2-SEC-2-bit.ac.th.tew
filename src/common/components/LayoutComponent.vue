<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'

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
  getIncomingMeeting.value ? 'button-retro-primary font-medium' : 'btn btn-disabled'
)

watch(
  () => [store.$state.ownedProjects, store.$state.membershipProjects],
  () => {
    allMeetings.value = store.$state.ownedProjects
      .concat(store.$state.membershipProjects)
      .map((project) => project.meetings)
      .flat()
  },
  { deep: true, immediate: true }
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
  <header
    class="w-full font-semibold bg-tan-hide-300 py-4 px-10 flex justify-between"
  >
    <div class="element-in-navbar">
      <RouterLink :to="{ name: 'home' }" class="flex gap-4 items-center">
        <img src="/bit-retro-logo.png" class="h-20" alt="">
        <h1 class="heading-title">Bit Retro</h1>
      </RouterLink>
      <button :class="indicator" @click="moveToIncomingMeeting">
        Incoming Meeting
      </button>
    </div>
    <div class="element-in-navbar">
      <h1 class="text-2xl tracking-wider truncate">Hello, {{ store.username }}</h1>
      <button class="button-retro-primary" @click="signout">Sign out</button>
    </div>
  </header>
  <slot></slot>
</template>
