<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import BaseBtn from './BaseBtn.vue'
import { reactive } from 'vue'

const userLogin = reactive({
  username: '',
  password: ''
})

const isUsernameExists = () => {
  return false
}

const getUsername = (value) => {
  if (isUsernameExists(value)) {
    alert('username already exists.')
  } else {
    userLogin.username = value.trim()
    console.log(value)
  }
}
const getPassword = (value) => {
  userLogin.password = value
  console.log(value)
}

//? require function
// const isFormSubmit = () => {}
</script>

<template>
  <div>
    <h1>Login</h1>
    <TextForm @update:textValue="getUsername" placeholderText="Enter your username" >
      <template #text-header>Username</template>
    </TextForm>
    <PasswordForm @update:passValue="getPassword">
      <template #text-header>Password</template>
    </PasswordForm>
    <BaseBtn buttonText="Sign-in / Login" />
  </div>
</template>
