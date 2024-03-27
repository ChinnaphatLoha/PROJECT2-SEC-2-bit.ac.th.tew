<script setup>
import { ref, watch } from 'vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import DeleteDialog from '@/common/components/DeleteDialog.vue'
import PlusIcon from '@/common/components/icons/PlusIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import { formatDateTime } from '@/common/utils/moment'

defineEmits(['closeDeleteDialog', 'deleteProject'])

const router = useRouter()
const store = useUserStore()

const projectId = useRoute().params.id
store.onProject(projectId)
const AUTHORITY = store.authority
const isOwner = AUTHORITY === 'OWNER'
const project = isOwner ? store.ownedProject : store.membershipProject

const items = ref([])
const openedDeleteDialog = ref(false)

const deleteProject = () => {
  store.removeOwnedProject(projectId)
  router.push({ name: 'home' })
}

watch(
  () => [store.ownedProject?.meetings, store.membershipProject?.meetings],
  (newMeetings) => {
    items.value = newMeetings.flatMap((meeting) => meeting || [])
  },
  { immediate: true }
)

const goToProjectEdit = () => {
  router.push({ name: 'project-edit', params: { id: store.$state.currentProjectId } })
}
</script>

<template>
  <BaseLayout>
    <div class="m-8">
      <div class="flex items-center gap-4">
        <h1 class="heading-title tracking-wide my-8">({{ project.id }}) {{ project.name }}</h1>
        <button v-if="isOwner" @click="goToProjectEdit" class="btn btn-square btn-custom">
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
        <button @click="openedDeleteDialog = true" v-if="isOwner" class="btn btn-square btn-custom">
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
      <p class="text-lg ml-4">{{ project.description }}</p>
    </div>
    <RouterLink
      v-if="isOwner"
      :to="{ name: 'meeting-create', params: { id: store.$state.currentProjectId } }"
      class="w-fit"
    >
      <div class="m-8 card-retro border-dashed flex flex-col gap-4 items-center justify-center">
        <PlusIcon :size="'w-12'" />
        <p class="create-title">Create Meeting</p>
      </div>
    </RouterLink>
    <div class="m-8">
      <h2 class="heading-title tracking-wide my-8">Meetings</h2>
      <ListWrap :items="items">
        <template #default="props">
          <CardRetro :key="props.index" :route_name="'meeting-feedback'" :id-card="props.item.id">
            <template #title>
              {{ props.item.topic }}
            </template>
            <template #tag>
              {{ formatDateTime(new Date(props.item.start_date)) }}
            </template>
          </CardRetro>
        </template>
      </ListWrap>
    </div>
  </BaseLayout>

  <div
    v-if="openedDeleteDialog"
    @click.self="openedDeleteDialog = false"
    class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <DeleteDialog @closeDeleteDialog="openedDeleteDialog = false" @deleteProject="deleteProject" />
  </div>
</template>

<style scoped>
.btn-custom {
  min-height: 2.75rem !important;
  height: 2.75rem !important;
  aspect-ratio: 1/1;
}
</style>
