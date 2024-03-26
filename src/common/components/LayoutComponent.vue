<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import BarSolid from './icons/BarSolid.vue'
// import { Meeting } from '@/backend/app/schema/schema';

const router = useRouter()
const userStore = useUserStore()
function signout() {
  userStore.logout()
  router.push({ name: 'login' })
}

function moveToIncomingMeeting() {
  const allProject = userStore.$state.ownedProjects.concat(userStore.$state.membershipProjects)
  const allMeeting = allProject.map((project) => project.meetings)
  const now = new Date()
  const meetingFormNow = allMeeting.filter((meeting) => meeting.start_date > now)
  const incomingMeeting = meetingFormNow.sort((a, b) => a.start_date - b.start_date)[0]
  router.push({ name: 'meeting-feedback', params: { id: incomingMeeting.id } })
}
</script>

<template>
  <div class="w-full font-semibold bg-gray-800">
    <header class="text-white text-lg py-4 px-6 flex justify-between">
      <div class="flex items-center justify-between w-[20%] pl-10">
        <RouterLink :to="{ name: 'home' }">
          <BarSolid />
        </RouterLink>
        <button class="btn" @click="moveToIncomingMeeting">Incoming Meeting</button>
      </div>
      <div class="flex items-center justify-between w-[20%]">
        <h1 class="text-xl tracking-wider">Hello, {{ userStore.username }}</h1>
        <p class="btn btn-sign-out" @click="signout">Sign-out</p>
      </div>
    </header>
  </div>
  <slot></slot>
</template>

<style scoped></style>
