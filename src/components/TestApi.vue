<script setup>
import { ref, onMounted } from 'vue'
const fecthUsers = async () => {
    return fetch('http://localhost:3000/users')
        .then(reponse => reponse.json())
};

const users = ref([]);

onMounted(() => {
    fecthUsers().then(user => {
        users.value = user;
    })
});
</script>

<template>
    <div>
        <h2 v-for="user in users" :key="user.id"> {{ user }} </h2>
    </div>
</template>


<style scoped></style>