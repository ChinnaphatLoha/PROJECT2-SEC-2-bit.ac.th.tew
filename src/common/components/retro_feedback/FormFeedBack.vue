<script setup>
import { ref } from 'vue';

const emits = defineEmits(['addNewFeedback', 'closeModal']);
const feedbackContent = ref('');

</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
    <div class="bg-white p-4 rounded-lg shadow-md z-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Add New Feedback</h2>
        <button @click="$emit('closeModal')" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <form @submit="$emit('addNewFeedback')">
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Feedback Content:</label>
          <textarea id="content" v-model="feedbackContent"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3" required></textarea>
        </div>
        <div class="text-right">
          <button type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>