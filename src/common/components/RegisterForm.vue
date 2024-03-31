<script setup>
import TextForm from './TextForm.vue'
import PasswordForm from './PasswordForm.vue'
import SubmitBtn from './SubmitBtn.vue'
import getFormUtils from '../utils/form-utils'
import { USER_ATTRIBUTE } from '../constants/user-attributes'
import { useUserStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const registerFormUtils = getFormUtils()
const userStore = useUserStore()
const router = useRouter()
const isAuthenticatedFailed = ref(false)
const errorMsg = ref('')

const registerNewUser = async () => {
  const { username, password } = registerFormUtils.getObject()
  userStore.registerNewUser(username, password, showErrors)
  if (isAuthenticatedFailed.value) router.push({ name: 'register' })
  else router.push({ name: 'home' })
}

const showErrors = (msg) => {
  console.log('msg', msg)
  errorMsg.value = msg
  isAuthenticatedFailed.value = true
  setTimeout(() => {
    isAuthenticatedFailed.value = false
  }, 5000)
}
</script>

<template>
  <div class="bg-form-primary shadow-md rounded-lg px-8 py-6 w-96">
    <h1 class="sub-heading-title text-center mb-4">Welcome to Bit Retro</h1>
    <h1 class="auth-title">Sign-up</h1>
    <form class="md-4" @submit.prevent="registerNewUser">
      <div v-show="isAuthenticatedFailed" class="mb-4">
        <p class="text-red-900 text-xs italic bg-red-300 rounded-md p-2">{{ errorMsg }}</p>
      </div>
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
      <SubmitBtn buttonText="Sign-up" />
    </form>
    <div class="mt-4">
      <p>
        Already have an account?
        <RouterLink to="login" class="auth-underline-text">Sign-in</RouterLink> here.
      </p>
    </div>
  </div>
</template>
