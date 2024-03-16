<script setup>
import CardRetro from '@/common/components/CardRetro.vue'
import ListHorizontal from '@/common/components/ListHorizontal.vue'
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
</script>

<template>
  <CardRetro>
    <template #title>
      <h1>Info</h1>
    </template>
    <template #owner-name>
      <p>John Waree</p>
    </template>
  </CardRetro>
  <hr />
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
  <hr />
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
</template>

<style scoped></style>
