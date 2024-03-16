<script setup>
const props = defineProps({
    labelInput: {
        type: String,
        default: 'Dropdown Menu'
    },
    labelDropdown: {
        type: String,
        default: 'Select an option'
    },
    listMenu: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: ['empty list']
    }
})
</script>

<template>
    <label class="form-control">
        <div class="label">
            <span class="label-text">{{ props.labelInput }}</span>
        </div>
        <select class="select select-bordered">
            <option disabled selected>{{ props.labelDropdown }}</option>
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <option v-for="item of listMenu" :value="item">{{ item }}</option>
        </select>
    </label>
</template>

<style scoped></style>