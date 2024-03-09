<script setup>
defineProps({
  textValue: {
    type: String,
    require: true
  },
  placeholderText: {
    type: String,
    require: false,
    default: 'Placeholder'
  }
})
const emit = defineEmits('updateText')
</script>

<template>
  <div>
    <slot name="text-header">Text Header</slot>
    <input type="text" :placeholder="placeholderText" required class="border border-black m-2"/>
    <!-- <input type="text" @input="emit(updateText, this.target.value)" /> -->
  </div>
</template>

<!-- https://dev.to/ajscommunications/sending-a-vue-3-v-model-through-a-slot-2g43 -->
