<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import BaseBtn from './BaseBtn.vue'
// import { useUserStore } from '@/stores/UserStore.js';

// const userStore = useUserStore;

const user = {
  username: '',
  password: '',
}

const getUsername = (user, value) => {
  user.username = value.trim()
  console.log(user.username)
}
const getPassword = (user, value) => {
  user.password = value
  console.log(user.password)
}

const authenticationUser = () => {
  console.log('send data....')
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <TextForm @update:textValue="getUsername" placeholderText="Enter your username">
      <template #text-header>Username</template>
    </TextForm>
    <PasswordForm @update:passValue="getPassword">
      <template #text-header>Password</template>
    </PasswordForm>
    <BaseBtn buttonText="Sign-in / Login" @click="authenticationUser"/>
  </div>
</template>
