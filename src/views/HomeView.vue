<script setup>
import CollapseBar from '@/common/components/CollapseBar.vue'
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
import { useUserStore } from '@/stores/store'
// const items = [
//   { id: '1', title: 'My Project', owner: 'John Doe' },
//   { id: '2', title: 'My Project', owner: 'Jane Doe' },
//   { id: '3', title: 'My Project', owner: 'John Smith' },
//   { id: '4', title: 'My Project', owner: 'Jane Smith' },
//   { id: '5', title: 'My Project', owner: 'John Waree' },
//   { id: '6', title: 'My Project', owner: 'Jane Waree' },
//   { id: '7', title: 'My Project', owner: 'John Doe' },
//   { id: '8', title: 'My Project', owner: 'Jane Doe' }
// ]
const useStore = useUserStore()
console.log(useStore.$id)
console.log(useStore.$state)
console.log(useStore.$state.currentUser.username)
console.log(useStore.$state.ownedProjects[0])
const items = [...useStore.$state.ownedProjects].map((project) => {
  return {
    ...project,
    owner: useStore.$state.currentUser.username,
  }
})
// authority: "OWNER"
// name: "PROJECT2-SEC-2-bit.ac.th.tew"
// description: "How To Die In 5 Weeks"
// id: "c03a"
// meetings: Array(0)
// length: 0
// [[Prototype]]: Array(0)
// retrospectiveType: "Good-Bad-Try"
console.log(items);
const showMessageId = (id) => {
  console.log(id)
  useStore.onProject(id)
  console.log(useStore.$state)
}
</script>

<template>
  <BaseLayout>
    <div class="m-4 mt-8">
      <button class="btn">Create or join Project</button>
    </div>
    <div class="m-4 mt-8">
      <CollapseBar :open-coll="true">
        <template #title>
          <h1>My Project</h1>
        </template>
        <template #listStyle>
          <ListWrap :items="items">
            <template #default="props">
              <CardRetro 
                :key="props.index" 
                :id-card="props.item.id"
                @click="showMessageId(props.item.id)"
              >
                <template #title>
                  {{ props.item.name }}
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
    <div class="m-4 mt-8">
      <CollapseBar>
        <template #title>
          <h1>Share with Me</h1>
        </template>
        <template #listStyle>
          <ListWrap :items="items">
            <template #default="props">
              <CardRetro :key="props.index" :id-card="props.item.id">
                <template #title>
                  {{ props.item.name }}
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
  </BaseLayout>
</template>
