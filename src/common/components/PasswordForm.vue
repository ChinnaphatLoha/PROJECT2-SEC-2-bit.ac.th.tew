<script setup>
defineProps({
  placeholderText: {
    type: String,
    require: false,
    default: 'Enter your password'
  }
})
const emit = defineEmits(['update:passValue'])
</script>

<template>
  <div>
    <slot name="text-header">Text Header</slot>
    <input
      type="password"
      minlength="8"
      required
      :placeholder="placeholderText"
      class="border border-black m-2" 
      @input="emit('update:passValue', $event.target.value)"
     />
  </div>
</template>

<!-- https://dev.to/ajscommunications/sending-a-vue-3-v-model-through-a-slot-2g43 -->
