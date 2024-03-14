<script setup>
import TextForm from './TextForm.vue'
import BaseBtn from './BaseBtn.vue'
</script>

<template>
  <div>
    <h1>Register</h1>
    <TextForm @update:textValue="getFormId" placeholderText="Enter your username">
      <template #text-header>Username</template>
    </TextForm>
    <TextForm @update:textValue="getUsername" placeholderText="Enter your username">
      <template #text-header>Username</template>
    </TextForm>
    <BaseBtn buttonText="Sign-up / Register" />
  </div>
</template>
