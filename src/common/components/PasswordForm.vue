<script setup>
defineProps({
  labelId: {
    type: String,
    require: true,
    default: 'Text Header'
  },
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
    <label :for="labelId" class="block text-sm font-medium mb-2"
      ><slot name="text-header">Text Header</slot></label
    >
    <input
      :id="labelId"
      required
      type="password"
      minlength="8"
      pattern="^(?=.*[0-9])(?=.*[a-z]).{8,}$"
      title="Password must contain at least one number and one lowercase letter, and at least 8 or more characters."
      :placeholder="placeholderText"
      class="shadow-sm rounded-md w-full px-3 py-2 input-style-primary"
      @input="emit('update:passValue', $event.target)"
    />
  </div>
</template>

<!-- https://dev.to/ajscommunications/sending-a-vue-3-v-model-through-a-slot-2g43 -->
