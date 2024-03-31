<script setup>
defineProps({
  item_type: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-[32%] flex flex-col m-auto p-4 border rounded-lg bg-tan-hide-50">
    <div class="flex justify-between items-center border-b border-tan-hide-500 mb-4">
      <h1 class="font-semibold">Delete {{ item_name }}</h1>
      <button @click="$emit('closeDeleteDialog')" class="btn btn-ghost btn-square btn-custom">
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

    <button @click="$emit('delete')" class="button-retro-primary">I want to delete this {{ item_type }}</button>
  </div>
</template>

<style scoped>
.btn-custom {
  min-height: 2.75rem !important;
  height: 2.75rem !important;
  aspect-ratio: 1/1;
}
</style>
