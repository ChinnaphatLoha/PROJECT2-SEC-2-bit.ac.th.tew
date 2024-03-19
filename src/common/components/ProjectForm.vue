<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Provider from '@/api/provider'
import { getCookie } from '../utils/cookie-util'

import ErrorToast from './ErrorToast.vue'

const router = useRouter()

const form = reactive({
  onCreateProject: true,
  onJoinProject: false
})
const projectCreationForm = {
  projectName: '',
  retrospectiveType: '',
  passkey: '',
  description: ''
}
const projectJoinForm = {
  projectId: '',
  joinPasskey: ''
}
const errorToast = reactive({
  show: false,
  message: ''
})

const showErrorToast = (message) => {
  errorToast.show = true
  errorToast.message = message
  setTimeout(() => {
    errorToast.show = false
    errorToast.message = ''
  }, 3000)
}
const toggleForm = (formType) => {
  form.onCreateProject = formType === 'create'
  form.onJoinProject = formType === 'join'
}
const clearSpaces = (event) => {
  event.target.value = event.target.value.replace(/\s/g, '')
}

const createProject = async () => {
  console.log('Create project')
  const projectData = {
    name: projectCreationForm.projectName,
    retrospective_type: projectCreationForm.retrospectiveType,
    passkey: projectCreationForm.passkey,
    description: projectCreationForm.description
  }
  const res = await Provider.request('/api/project-composition/projects', {
    method: 'POST',
    headers: {
      Cookie: getCookie('bit_tkn')
    },
    body: JSON.stringify(projectData)
  })
  const data = res.ok ? await res.json() : null
  console.log(data)
  if (res.ok) {
    router.push({ name: 'home', params: { id: data.pid } })
  }
}

const joinProject = async () => {
  console.log('Join project')
  const res = await Provider.request('/api/project-composition/projects/join', {
    headers: {
      Cookie: getCookie('bit_tkn')
    },
    body: JSON.stringify({
      pid: projectJoinForm.projectId,
      passkey: projectJoinForm.joinPasskey
    })
  })
  const data = res.ok ? await res.json() : null
  console.log(data ?? res.statusText)
  if (res.ok) {
    router.push({ name: 'home', params: { id: data.pid } })
  } else if (res.status === 409) {
    showErrorToast('You have already joined this project')
  }
}
</script>

<template>
  <div class="w-3/4 mt-16 mx-auto">
    <!-- Toggle to change form -->
    <div class="flex gap-16">
      <h2
        class="text-base font-semibold leading-7 cursor-pointer"
        :class="form.onCreateProject ? 'text-indigo-600' : ''"
        @click="toggleForm('create')"
      >
        Create Project
      </h2>
      <h2
        class="text-base font-semibold leading-7 cursor-pointer"
        :class="form.onJoinProject ? 'text-indigo-600' : ''"
        @click="toggleForm('join')"
      >
        Join Project
      </h2>
    </div>

    <!-- Create Project -->
    <form @submit.prevent="createProject" v-if="form.onCreateProject">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <label for="project-name" class="block text-sm font-medium leading-6">Project name</label>
          <div class="mt-2">
            <input
              v-model.trim="projectCreationForm.projectName"
              required
              type="text"
              maxlength="50"
              name="project-name"
              id="project-name"
              placeholder="What's the project name?"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="retrospective-type" class="block text-sm font-medium leading-6"
            >Retrospective type</label
          >
          <div class="mt-2">
            <select
              v-model="projectCreationForm.retrospectiveType"
              required
              id="retrospective-type"
              name="retrospective-type"
              class="block w-full rounded-md border py-1.5 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Good-Bad-Try</option>
              <option>KLAM</option>
            </select>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="passkey" class="block text-sm font-medium leading-6">Passkey</label>
          <div class="mt-2">
            <input
              v-model="projectCreationForm.passkey"
              required
              type="password"
              pattern=".{6,12}"
              title="Passkey must be 6 to 12 characters long"
              maxlength="12"
              @input="clearSpaces($event)"
              id="passkey"
              name="passkey"
              placeholder="Passkey to join the project"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="col-span-full">
          <label for="description" class="block text-sm font-medium leading-6">Description</label>
          <div class="mt-2">
            <textarea
              v-model="projectCreationForm.description"
              type="text"
              maxlength="200"
              id="description"
              name="description"
              rows="3"
              placeholder="Describe the project or information about the project"
              class="resize-none block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-16 flex items-center gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Project
        </button>
        <button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
      </div>
    </form>

    <!-- Join Project -->
    <form @submit.prevent="joinProject" v-else>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <label for="project-id" class="block text-sm font-medium leading-6">Project ID</label>
          <div class="mt-2">
            <input
              v-model.trim="projectJoinForm.projectId"
              type="text"
              required
              name="project-id"
              id="project-id"
              placeholder="Ask the owner for the project ID"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="join-passkey" class="block text-sm font-medium leading-6">Passkey</label>
          <div class="mt-2">
            <input
              v-model="projectJoinForm.joinPasskey"
              type="password"
              required
              pattern=".{6,12}"
              title="Passkey must be 6 to 12 characters long"
              maxlength="12"
              @input="clearSpaces($event)"
              id="join-passkey"
              name="join-passkey"
              placeholder="Passkey to join the project"
              class="block w-full rounded-md border py-1.5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-16 flex items-center gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Join Project
        </button>
        <button type="button" class="text-sm font-semibold leading-6 text-white">Cancel</button>
      </div>
    </form>
    <ErrorToast v-if="errorToast.show" :message="errorToast.message" />
  </div>
</template>

<style scoped>
input,
select,
textarea {
  padding-inline: 0.75rem;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
</style>
