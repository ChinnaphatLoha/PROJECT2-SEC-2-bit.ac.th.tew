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
    default: 'Placeholder'
  }
})
const emit = defineEmits(['update:textValue'])
</script>

<template>
  <div>
    <label :for="labelId" class="block text-sm font-medium mb-2"
      ><slot name="text-header">Text Header</slot></label
    >
    <input
      :id="labelId"
      required
      type="text"
      :placeholder="placeholderText"
      minlength="4"
      maxlength="20"
      class="shadow-sm rounded-md w-full px-3 py-2 border input-style-primary"
      @input="emit('update:textValue', $event.target)"
    />
  </div>
</template>

<!-- https://dev.to/ajscommunications/sending-a-vue-3-v-model-through-a-slot-2g43 -->
