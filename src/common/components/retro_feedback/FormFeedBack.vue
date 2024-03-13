<script setup>
import { ref } from 'vue';
import { FeedbackManagement } from '../../utils/feedback-management.js'

const feedbackContent = ref('');

const submitFeedback = () => {
  emit('add-feedback', feedbackContent.value);
  feedbackContent.value = '';
};

</script>

<template>
    <div class="p-4 bg-white rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Add New Feedback</h2>
      <form @submit.prevent="submitFeedback">
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Feedback Content:</label>
          <textarea id="content" v-model="feedbackContent" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="3" required></textarea>
        </div>
        <div class="text-right">
          <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </div>
      </form>
    </div>
</template>