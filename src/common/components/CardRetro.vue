<script setup>
defineProps({
  pid: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: ''
  },
  mid: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: ''
  },
  route_name: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: ''
  }
})
</script>

<template>
  <RouterLink :to="{ name: route_name, params: { pid, mid } }">
    <div class="card-retro relative flex flex-col gap-16" :id="mid">
      <h1 class="text-2xl font-bold"><slot name="title"></slot></h1>
      <p class="text-tan-hide-600 font-semibold text-right absolute right-6 bottom-6">
        <slot name="tag"></slot>
      </p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
