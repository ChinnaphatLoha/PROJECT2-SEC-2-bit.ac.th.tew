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
  if (data) {
    console.log(data)
    const { id, username, projects } = data
    userStore.initializeStore({ id, username }, projects)
    router.push({ name: 'home', params: { id: data.pid } })
  } else {
    alert('Data is null!')
  }
  console.log(userStore.user)
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="authenticationUser">
      <TextForm
        @update:textValue="userFormUtils.setTextValue(USER_ATTRIBUTE.username, $event)"
        placeholderText="Enter your username"
      >
        <template #text-header>Username</template>
      </TextForm>
      <PasswordForm @update:passValue="userFormUtils.setTextValue(USER_ATTRIBUTE.password, $event)">
        <template #text-header>Password</template>
      </PasswordForm>
      <SubmitBtn buttonText="Sign-in / Login" />
    </form>
  </div>
</template>
