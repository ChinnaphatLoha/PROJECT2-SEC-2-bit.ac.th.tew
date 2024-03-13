<script setup>
import { ref } from 'vue' ;
import FormFeedBack from './FormFeedBack.vue';
const isOpen = ref(false);

const openModal = () =>{
  isOpen.value = true;
}
const closeModal = () =>{
  isOpen.value = false;
}
</script>

<template>
  <div class="flex justify-center items-center p-4 bg-white rounded-lg border-2 border-dashed shadow-md" @click="openModal">
    <h2 class="text-lg font-semibold mb-4">
        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      </svg>
      Add New Card
    </h2>
  </div>
  <FormFeedBack v-show="isOpen" @closeModal="closeModal"/>
</template>


<style scoped></style>