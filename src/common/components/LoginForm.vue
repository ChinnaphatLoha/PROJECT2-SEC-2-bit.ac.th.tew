<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import { ACCOUNT_ENDPOINTS } from '../constants/uri-endpoints.js'
import Provider from '@/api/provider'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import { useUserStore } from '@/stores/store'
import { useRouter } from 'vue-router'

const userFormUtils = getFormUtils()
const userStore = useUserStore()
const router = useRouter()

const authenticationUser = async () => {
  const user = userFormUtils.getObject()
  const res = await Provider.request(ACCOUNT_ENDPOINTS.login, {
    body: JSON.stringify(user)
  })
  const data = res.ok ? await res.json() : null
  if (res.ok && data) {
    const { id, username, projects } = data
    userStore.initializeStore({ id, username }, projects)
    router.push({ name: 'home', params: { id: data.pid } })
  } else {
    alert('Data is null!')
  }
  console.log(userStore.$state)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Login</h1>
    <form @submit.prevent="authenticationUser">
      <TextForm
        class="mb-4"
        @update:textValue="userFormUtils.setTextValue(USER_ATTRIBUTE.username, $event)"
        placeholderText="Enter your username"
        label-id="username"
      >
        <template #text-header>Username</template>
      </TextForm>
      <PasswordForm
        class="mb-4"
        @update:passValue="userFormUtils.setTextValue(USER_ATTRIBUTE.password, $event)"
        placeholderText="Enter your password"
        label-id="password"
      >
        <template #text-header>Password</template>
      </PasswordForm>
      <SubmitBtn buttonText="Sign-in / Login" />
    </form>
    <div class="mt-4">
      <p>
        not have account?
        <RouterLink to="register" class="font-bold underline">Sign-up</RouterLink> here.
      </p>
    </div>
  </div>
</template>
