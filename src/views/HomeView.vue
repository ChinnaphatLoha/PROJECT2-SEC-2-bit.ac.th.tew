<script setup>
import ListWrap from '@/common/components/ListWrap.vue';
import CardRetro from '@/common/components/CardRetro.vue';
</script>

<template>
  <div class="m-4 mt-8">
    <button class="btn">Create or join Project</button>
  </div>
  <div class="m-4 mt-8">
    <ListWrap :items="items">
      <template #title>
        <h1>My Project</h1>
      </template>
      <template #default="props">
        <CardRetro :key="props.index" :id-card="props.item.id">
          <template #title>
            {{ props.item.title }}
          </template>
          <template #owner-name>
            {{ props.item.owner }}
          </template>
        </CardRetro>
      </template>
    </ListWrap>
  </div>
  <div class="m-4 mt-8">
    <ListWrap :items="items">
      <template #title>
        <h1>Share With Me</h1>
      </template>
      <template #default="props">
        <CardRetro :key="props.index" :id-card="props.item.id">
          <template #title>
            {{ props.item.title }}
          </template>
          <template #owner-name>
            {{ props.item.owner }}
          </template>
        </CardRetro>
      </template>
    </ListWrap>
  </div>
</template>
