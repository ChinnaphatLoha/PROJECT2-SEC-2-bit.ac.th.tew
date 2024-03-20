<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import { useUserStore } from '@/stores/store'

const registerFormUtils = getFormUtils()
const userStore = useUserStore()

const registerNewUser = async () => {
  const { username, password } = registerFormUtils.getObject()
  userStore.registerNewUser(username, password, testingError)
}

const testingError = (msg) => {
  console.log(msg)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Register</h1>
    <form class="md-4" @submit.prevent="registerNewUser">
      <TextForm
        class="mb-4"
        @update:textValue="registerFormUtils.setTextValue(USER_ATTRIBUTE.username, $event)"
        placeholderText="Enter your username"
        label-id="username"
      >
        <template #text-header>Username</template>
      </TextForm>
      <PasswordForm
        class="mb-4"
        @update:passValue="registerFormUtils.setTextValue(USER_ATTRIBUTE.password, $event)"
        placeholderText="Enter your password"
        label-id="password"
      >
        <template #text-header>Password</template>
      </PasswordForm>
      <SubmitBtn buttonText="Sign-up / Register" />
    </form>
    <div class="mt-4">
      <p>Already have an account? <RouterLink to="login">Sign-in</RouterLink> here.</p>
    </div>
  </div>
</template>
