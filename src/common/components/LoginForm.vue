<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import BaseBtn from './BaseBtn.vue'
import { ACCOUNT_ENDPOINTS } from '../constants/uri-endpoints.js'
import Provider from '@/api/provider'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
// import { useUserStore } from '@/stores/UserStore.js';

// const userStore = useUserStore;

const userFormUtils = getFormUtils()

const authenticationUser = async () => {
  const user = userFormUtils.getObject()
  console.log(user)
  console.log(ACCOUNT_ENDPOINTS.availability)
  const res = await Provider.request(ACCOUNT_ENDPOINTS.login, {
    body: JSON.stringify(user)
  })
  console.log(res)
  const data = res.ok ? await res.json() : null
  console.log(data)
  console.log(res.ok)
  return data
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <TextForm
      @update:textValue="userFormUtils.getTextValue(USER_ATTRIBUTE.username, $event)"
      placeholderText="Enter your username"
    >
      <template #text-header>Username</template>
    </TextForm>
    <PasswordForm @update:passValue="userFormUtils.getTextValue(USER_ATTRIBUTE.password, $event)">
      <template #text-header>Password</template>
    </PasswordForm>
    <BaseBtn buttonText="Sign-in / Login" @click="authenticationUser" />
  </div>
</template>
../constants/uri-endpoints.js
