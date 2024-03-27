<script setup>
import { RouterView } from 'vue-router'

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const expiredCookie = mutation.oldValue
    if (expiredCookie) {
      localStorage.clear()
    }
  })
})

observer.observe(document, { attributes: true })
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
