<script setup>
import { reactive, watch } from 'vue'
import CollapseBar from '@/common/components/CollapseBar.vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import { useUserStore } from '@/stores/store'

const useStore = useUserStore()

const ownedProjects = reactive({ items: useStore.$state.ownedProjects })
const membershipProjects = reactive({ items: useStore.$state.membershipProjects })

watch(
  () => [useStore.$state.ownedProjects, useStore.$state.membershipProjects],
  (newValue) => {
    ownedProjects.items = newValue[0]
    membershipProjects.items = newValue[1]
  }
)
</script>

<template>
  <BaseLayout>
    <div class="ml-10 mb-6 mt-10">
      <RouterLink :to="{ name: 'project-create' }">
        <button class="button-retro-primary">Create or join Project</button>
      </RouterLink>
    </div>
    <div class="m-6">
      <CollapseBar>
        <template #title>
          <h1>My Project</h1>
        </template>
        <template #listStyle>
          <ListWrap :items="ownedProjects.items">
            <template #default="props">
              <CardRetro
                :key="props.index"
                :route_name="'project-view'"
                :pid="props.item.id"
                @click="useStore.onProject(props.item.id)"
              >
                <template #title>
                  {{ props.item.name }}
                </template>
                <template #tag>
                  {{ props.item.owner }}
                </template>
              </CardRetro>
            </template>
          </ListWrap>
        </template>
      </CollapseBar>
    </div>
    <div class="m-6">
      <CollapseBar>
        <template #title>
          <h1>Share with Me</h1>
        </template>
        <template #listStyle>
          <ListWrap :items="membershipProjects.items">
            <template #default="props">
              <CardRetro :key="props.index" :route_name="'project-view'" :pid="props.item.id">
                <template #title>
                  {{ props.item.name }}
                </template>
                <template #tag>
                  {{ props.item.owner }}
                </template>
              </CardRetro>
            </template>
          </ListWrap>
        </template>
      </CollapseBar>
    </div>
  </BaseLayout>
</template>
