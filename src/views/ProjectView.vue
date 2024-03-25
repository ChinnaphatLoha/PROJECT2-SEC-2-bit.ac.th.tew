<script setup>
import { ref, watch } from 'vue'
import CollapseBar from '@/common/components/CollapseBar.vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import PlusIcon from '@/common/components/icons/PlusIcon.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/store'

const useStore = useUserStore()
useStore.onProject(useRoute().params.id)
const AUTHORITY = useStore.authority

const items = ref([])

watch(
  () => [useStore.ownedProject?.meetings, useStore.membershipProject?.meetings],
  (newMeetings) => {
    items.value = newMeetings.flatMap((meeting) => meeting || [])
  },
  { immediate: true }
)

useStore.initializeMeetings(AUTHORITY)
</script>

<template>
  <RouterLink :to="{ name: 'meeting-create', params: { id: useStore.$state.currentProjectId } }">
    <div class="m-8 card-retro border-dashed flex flex-col gap-4 items-center justify-center">
      <PlusIcon :size="'w-12'" />
      <p class="create-title">Create Meeting</p>
    </div>
  </RouterLink>
  <hr />
  <div class="m-4 mt-8">
    <CollapseBar>
      <template #title>
        <h1>Our Meeting</h1>
      </template>
      <template #listStyle>
        <ListWrap :items="items">
          <template #default="props">
            <CardRetro :key="props.index" :route_name="'meeting-feedback'" :id-card="props.item.id">
              <template #title>
                {{ props.item.topic }}
              </template>
              <template #owner-name>
                {{ props.item.id }}
              </template>
            </CardRetro>
          </template>
        </ListWrap>
      </template>
    </CollapseBar>
  </div>
</template>

<style scoped></style>
