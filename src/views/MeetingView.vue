<script setup>
// import { ref } from 'vue'
import CollapseBar from '@/common/components/CollapseBar.vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import PlusIcon from '@/common/components/icons/PlusIcon.vue'
import Provider from '@/api/provider'
// import { computed, ref } from 'vue'
const items = [
  { id: '1', description: 'Hello world'},
  { id: '2', description: 'Hello world'},
  { id: '3', description: 'Hello world'},
  { id: '4', description: 'Hello world'},
  { id: '5', description: 'Hello world'},
  { id: '6', description: 'Hello world'},
  { id: '7', description: 'Hello world'},
  { id: '8', description: 'Hello world'}
]
const response = await Provider.request('/api/project-composition/meetings?pid=c03a')
const data = response.ok ? await response.json() : null
console.log(data)
</script>

<template>
  <div class="m-8 card-retro border-dashed flex flex-col gap-4 items-center justify-center">
      <PlusIcon :size="'w-12'" />
      <p class="create-title">Create Meeting</p>
  </div>
  <hr />
  <div class="m-4 mt-8">
    <CollapseBar>
      <template #title>
        <h1>Our Meeting</h1>
      </template>
      <template #listStyle>
        <ListWrap :items="items">
          <template #default="props">
            <CardRetro :key="props.index" :id-card="props.item.id">
              <template #title>
                {{ props.item.description }}
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
