<script setup>
import CollapseBar from '@/common/components/CollapseBar.vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
const items = [
  { id: '1', title: 'My Project', owner: 'John Doe' },
  { id: '2', title: 'My Project', owner: 'Jane Doe' },
  { id: '3', title: 'My Project', owner: 'John Smith' },
  { id: '4', title: 'My Project', owner: 'Jane Smith' },
  { id: '5', title: 'My Project', owner: 'John Waree' },
  { id: '6', title: 'My Project', owner: 'Jane Waree' },
  { id: '7', title: 'My Project', owner: 'John Doe' },
  { id: '8', title: 'My Project', owner: 'Jane Doe' }
]
</script>

<template>
  <div class="m-4 mt-8">
    <div>
      <button class="btn">Create Meeting</button>
    </div>
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
                {{ props.item.title }}
              </template>
              <template #owner-name>
                {{ props.item.owner }}
              </template>
            </CardRetro>
          </template>
        </ListWrap>
      </template>
    </CollapseBar>
  </div>
</template>

<style scoped></style>
