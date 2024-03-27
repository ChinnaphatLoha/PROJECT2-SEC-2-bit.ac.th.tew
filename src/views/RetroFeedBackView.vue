<script setup>
import { onBeforeUnmount, onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import RetroColumn from '@/common/components/retro_feedback/RetroColumn.vue';
import { useUserStore } from '@/stores/store';
import pollingData from '@/common/utils/polling-fetch-data';
import { PROJECT_ENDPOINTS } from '@/common/constants/uri-endpoints';

const useStore = useUserStore();
const meetingId = useRoute().params.id
useStore.onMeeting(meetingId);

const ENDPOINT = PROJECT_ENDPOINTS.project_mutate(meetingId);

onMounted(() => {
  const data = { id: meetingId };
  pollingData(fetchMeetingData, true, ENDPOINT, data);
})

const fetchMeetingData = async (data) => {
  try {
    await useStore.onMeeting(data.id);
  } catch (error) {
    console.log('Error fetching meeting data:', error);
  }
}

let meeting = reactive({ items: useStore.meeting })
watch(
  () => useStore.meeting,
  (newValue) => {
    meeting = newValue;
  });

onBeforeUnmount(() => {
  useStore.onMeeting(null);
  const signal = false
  pollingData(fetchMeetingData, signal, ENDPOINT, null)
});
</script>

<template>
  <BaseLayout>
    <div class="container mx-auto py-8">
      <div class="text-4xl font-bold mb-4">{{ meeting.items.topic }}</div>
      <div class="flex justify-center gap-8 items-start">
        <RetroColumn v-for="{ feedbackRecords, end_date, id } in meeting" :key="id" :endDate="end_date"
          :feedbackRecords="feedbackRecords" />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped></style>
