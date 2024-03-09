<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import BaseBtn from './BaseBtn.vue'
import { reactive } from 'vue'

const userLogin = reactive({
  username: '',
  password: ''
})
console.log(userLogin.username)
console.log(userLogin.password)

const isUsernameExists = (username) => {}

const isFormSubmit = () => {}
</script>

<template>
  <div>
    <h1>Login</h1>
    <TextForm :placeholderText="'Enter your username'">
      <template #text-header>Username</template>
    </TextForm>
    <PasswordForm>
      <template #text-header>Password</template>
    </PasswordForm>
    <BaseBtn :buttonText="'Sign-in / Login'" />
  </div>
</template>
