<script setup>
import { ref } from 'vue';
import CardRetro from '@/common/components/CardRetro.vue'
import ListHorizontal from '@/common/components/ListHorizontal.vue'
import ListWrap from '@/common/components/ListWrap.vue';
import NewProjectForm from '@/common/components/NewProjectForm.vue'
const items = [
  { name: 'Item 1', ownerName: 'John Doe' },
  { name: 'Item 2', ownerName: 'Jane Doe' },
  { name: 'Item 3', ownerName: 'John Smith' },
  { name: 'Item 4', ownerName: 'Jane Smith' },
  { name: 'Item 5', ownerName: 'John Waree' },
  { name: 'Item 6', ownerName: 'Jane Waree' },
  { name: 'Item 7', ownerName: 'John Doe' },
  { name: 'Item 8', ownerName: 'Jane Doe' }
]
const popupPageProject = ref(false)
</script>

<template>
  <div class="p-4">
    <ListHorizontal :items="items">
      <template #title>
        <h1>Horizontal List</h1>
      </template>
      <template #default="props">
        <CardRetro :key="props.index">
          <template #title>
            {{ props.item.name }}
          </template>
          <template #owner-name>
            {{ props.item.ownerName }}
          </template>
        </CardRetro>
      </template>
    </ListHorizontal>
  </div>
  <hr class="mb-10">
  <div class="p-4">
    <ListWrap :items="items">
      <template #title>
        <h1>Wrap List</h1>
      </template>
      <template #default="props">
        <CardRetro :key="props.index">
          <template #title>
            {{ props.item.name }}
          </template>
          <template #owner-name>
            {{ props.item.ownerName }}
          </template>
        </CardRetro>
      </template>
    </ListWrap>
  </div>
  <hr class="mb-10">
  <input class="checkbox" type="checkbox" v-model="popupPageProject">
  <div :class="popupPageProject ? 'absolute' : 'hidden'" class="top-1/3 left-1/4 ">
    <div class="">
      <NewProjectForm />
    </div>
  </div>
</template>

<style scoped></style>
