<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full font-semibold bg-gray-800">
    <header class="text-white text-lg py-4 px-6 flex justify-between">
      <div class="flex items-center justify-between w-[18%] pl-10">
        <RouterLink to="" class="link text-2xl">Project</RouterLink>
        <RouterLink to="" class="link text-2xl">Retro</RouterLink>
      </div>
      <div class="flex items-center justify-between w-[18%]">
        <RouterLink to="" class="link text-xl">Hello, TEW</RouterLink>
        <RouterLink to="" class="btn btn-sign-out">Sign-out</RouterLink>
      </div>
    </header>
  </div>
  <slot></slot>
</template>

<style>
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
