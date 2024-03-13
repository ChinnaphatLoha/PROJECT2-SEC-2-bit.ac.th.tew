<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import { ACCOUNT_ENDPOINTS } from '../constants/uri-endpoints.js'
import Provider from '@/api/provider'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import { useUserStore, useProjectStore } from '@/stores/store'

// const userStore = useUserStore;

const userFormUtils = getFormUtils()
const userStore = useUserStore()
const projectStore = useProjectStore()

const authenticationUser = async () => {
  const user = userFormUtils.getObject()
  const res = await Provider.request(ACCOUNT_ENDPOINTS.login, {
    body: JSON.stringify(user)
  })
  const data = res.ok ? await res.json() : null
  if (data) {
    const { id, username, projects } = data
    userStore.setUser(id, username)
    projectStore.initializeProjects(projects)
  } else {
    alert('Data is null!')
  }
  console.log(data)
  console.log(userStore.$state)
  console.log(projectStore.$state)
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
