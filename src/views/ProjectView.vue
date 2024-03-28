<script setup>
import { ref, watch } from 'vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import DeleteDialog from '@/common/components/DeleteDialog.vue'
import PlusIcon from '@/common/components/icons/PlusIcon.vue'
import TrashIcon from '@/common/components/icons/TrashIcon.vue'
import PenIcon from '@/common/components/icons/PenIcon.vue'
import InfoIcon from '@/common/components/icons/InfoIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/store'
import { formatDateTime } from '@/common/utils/moment'

defineEmits(['closeDeleteDialog', 'delete'])

const router = useRouter()
const store = useUserStore()

const projectId = useRoute().params.pid
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
  router.push({ name: 'project-edit', params: { pid: store.$state.currentProjectId } })
}
</script>

<template>
  <BaseLayout>
    <div class="m-16">
      <div class="my-8">
        <div class="flex items-center breadcrumbs tracking-wide">
          <ul>
            <li>
              <RouterLink :to="{ name: 'home' }">
                <h2 class="create-title">Home</h2>
              </RouterLink>
            </li>
            <li>
              <div class="flex items-center gap-4 w-[65%]">
                <h1 class="create-title">[{{ project.id }}] {{ project.name }}</h1>
                <button 
                  @click="goToProjectEdit" 
                  v-if="isOwner" 
                  class="button-action-meeting"
                >
                  <PenIcon size="w-5" color="#feebd6"/>
                </button>
                <button
                  @click="openedDeleteDialog = true"
                  v-if="isOwner"
                  class="button-action-meeting"
                >
                  <TrashIcon size="w-5" color="#feebd6"/>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex justify-center">
          <InfoIcon size="w-10" color="#411209" />
          <p class="text-lg font-semibold my-8 ml-6 leading-8">
            {{ project.description }}
          </p>
        </div>
        <hr class=" divide-tan-hide-900">
      </div>
      <RouterLink
        v-if="isOwner"
        :to="{ name: 'meeting-create', params: { pid: store.$state.currentProjectId } }"
        class="w-fit"
      >
        <div class="card-retro border-dashed flex flex-col gap-4 items-center justify-center">
          <PlusIcon size="w-12" color="#411209" />
          <p class="create-title">Create Meeting</p>
        </div>
      </RouterLink>
      <div>
        <h2 class="heading-title tracking-wide my-8">Meetings</h2>
        <ListWrap :items="items">
          <template #default="props">
            <CardRetro
              :key="props.index"
              :route_name="'meeting-feedback'"
              :pid="projectId"
              :mid="props.item.id"
            >
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
    </div>
  </BaseLayout>

  <div
    v-if="openedDeleteDialog"
    @click.self="openedDeleteDialog = false"
    class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <DeleteDialog
      :item_type="'project'"
      :item_name="project.name"
      @closeDeleteDialog="openedDeleteDialog = false"
      @delete="deleteProject"
    />
  </div>
</template>

<style scoped>
.btn-custom {
  min-height: 2.75rem !important;
  height: 2.75rem !important;
  aspect-ratio: 1/1;
}
</style>
