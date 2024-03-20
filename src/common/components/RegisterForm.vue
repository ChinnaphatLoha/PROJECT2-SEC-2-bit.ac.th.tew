<script setup>
import TextForm from './TextForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import { useUserStore } from '@/stores/store'

const registerFormUtils = getFormUtils()
const userStore = useUserStore()

const registerNewUser = async () => {
  const { username } = registerFormUtils.getObject()
  userStore.registerNewUser(username, testingError)
}

const testingError = (msg) => {
  console.log(msg)
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerNewUser">
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
