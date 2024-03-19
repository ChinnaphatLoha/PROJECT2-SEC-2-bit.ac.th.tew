<script setup>
import ListWrap from '@/common/components/ListWrap.vue'
import CardRetro from '@/common/components/CardRetro.vue'
const items = [
    { id: 1, title: 'Item 1', description: 'Description 1', owner: 'Owner 1' },
    { id: 2, title: 'Item 2', description: 'Description 2', owner: 'Owner 2' },
    { id: 3, title: 'Item 3', description: 'Description 3', owner: 'Owner 3' },
    { id: 4, title: 'Item 4', description: 'Description 4', owner: 'Owner 4' },
    { id: 5, title: 'Item 5', description: 'Description 5', owner: 'Owner 5' },
    { id: 6, title: 'Item 6', description: 'Description 6', owner: 'Owner 6' },
    { id: 7, title: 'Item 7', description: 'Description 7', owner: 'Owner 7' },
    { id: 8, title: 'Item 8', description: 'Description 8', owner: 'Owner 8' },
    { id: 9, title: 'Item 9', description: 'Description 9', owner: 'Owner 9' },
    { id: 10, title: 'Item 10', description: 'Description 10', owner: 'Owner 10' },
    { id: 11, title: 'Item 11', description: 'Description 11', owner: 'Owner 11' },
    { id: 12, title: 'Item 12', description: 'Description 12', owner: 'Owner 12' },
    { id: 13, title: 'Item 13', description: 'Description 13', owner: 'Owner 13' },
    { id: 14, title: 'Item 14', description: 'Description 14', owner: 'Owner 14' },
    { id: 15, title: 'Item 15', description: 'Description 15', owner: 'Owner 15' },
    { id: 16, title: 'Item 16', description: 'Description 16', owner: 'Owner 16' },
    { id: 17, title: 'Item 17', description: 'Description 17', owner: 'Owner 17' },
]
</script>

<template>
    <div>
        <ListWrap :items="items">
            <template #title>
                <h1>Wrap List</h1>
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

<style scoped></style>