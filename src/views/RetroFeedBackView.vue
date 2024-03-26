<script setup>
import { onBeforeUnmount, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
import { useUserStore } from '@/stores/store';

const useStore = useUserStore();
useStore.onMeeting(useRoute().params.id);

let meeting = reactive({ items: useStore.meeting})
watch(
  () => useStore.meeting,
  (newValue) => {
    meeting = reactive(newValue);
  });

onBeforeUnmount(() => {
  useStore.onMeeting(null);
});
</script>

<template>
  <BaseLayout>
    <div class="container mx-auto py-8">
      <div class="flex justify-center gap-8">
        <RetroColumn v-for="{feedbackRecords, end_date, id} in meeting" :key="id" :endDate="end_date"
          :feedbackRecords="feedbackRecords" />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped></style>
