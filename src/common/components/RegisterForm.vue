<script setup>
import TextForm from './TextForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import Provider from '@/api/provider'
import { ACCOUNT_ENDPOINTS } from '../constants/uri-endpoints'
import { ref, onMounted } from 'vue'
import uuid from '../utils/uuid'

const registerFormUtils = getFormUtils()
const isAvailableUsername = ref(true)
const newUser = {
  username: '',
  password: ''
}

onMounted(()=> {
  console.log('Mounted Register')
})

const checkUniqueUsername = async () => {
  const { username } = registerFormUtils.getObject()
  newUser.username = username
  const res = await Provider.request(ACCOUNT_ENDPOINTS.availability + `?username=${username}`)
  const data = await res.json()
  isAvailableUsername.value = data.available
  if (isAvailableUsername.value) {
    generatePassword()
    registerNewUser()
  } else {
    alert('Duplicate username.')
  }
}

const generatePassword = () => {
  const generatedPassword = uuid()
  newUser.password = generatedPassword
}

const registerNewUser = async () => {
  const res = await Provider.request(ACCOUNT_ENDPOINTS.register, {
    body: JSON.stringify(newUser)
  })
  const data = res.ok ? res.json() : null
  if (data === null) {
    console.error('Data is null ' + data)
  }
  //? keep data to pinia store
  console.log('store data to pinia state manager')
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="checkUniqueUsername">
      <TextForm
        @update:textValue="registerFormUtils.setTextValue(USER_ATTRIBUTE.username, $event)"
        placeholderText="Enter your username"
      >
        <template #text-header>Username</template>
      </TextForm>
      <SubmitBtn buttonText="Sign-up / Register" />
    </form>
  </div>
</template>
