<script setup></script>

<template>
  <div class="card-retro">
    <div class="h-fit flex flex-col gap-16">
      <h1 class="text-4xl"><slot name="title"></slot></h1>
      <p class="text-slate-300 text-right"><slot name="owner-name"></slot></p>
    </div>
  </div>
</template>

<style scoped></style>
