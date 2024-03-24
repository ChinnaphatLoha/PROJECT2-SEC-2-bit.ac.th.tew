<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import BarSolid from './icons/BarSolid.vue'

const router = useRouter()
const userStore = useUserStore()
function signout() {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="w-full font-semibold bg-gray-800">
    <header class="text-white text-lg py-4 px-6 flex justify-between">
      <div class="flex items-center justify-between w-[18%] pl-10">
        <RouterLink :to="{ name: 'home' }">
          <BarSolid />
        </RouterLink>
        <h1 class="text-xl">Hello {{ userStore.username }}</h1>
      </div>
      <div class="flex items-center justify-between w-[30%]">
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#000000"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <p class="btn btn-sign-out" @click="signout">Sign-out</p>
      </div>
    </header>
  </div>
  <slot></slot>
</template>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: white;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-sign-out {
  background-color: #2d3748; /* Gray background */
  color: white; /* White text color */
  border-color: transparent; /* No border */
}

.btn-sign-out:hover {
  background-color: #1a202c; /* Darker gray background on hover */
}

.link {
  color: white; /* White text color for non-button links */
}
</style>
