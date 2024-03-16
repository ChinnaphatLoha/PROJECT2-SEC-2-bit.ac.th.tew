<script setup>
// import { computed } from 'vue'

const props = defineProps({
    labelInput: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Type here'
    }
})
</script>
 
<template>
    <label class="form-control">
        <div class="label">
            <span class="label-text">{{ props.labelInput }}</span>
        </div>
        <input type="text" :placeholder="placeholder" class="input input-bordered w-full" />
    </label>
</template>
 
<style scoped>

</style>