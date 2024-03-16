<script setup>
import TextInput from '@/common/components/input/TextInput.vue'
import DropDownInput from '@/common/components/input/DropDownInput.vue'
import { computed, ref } from 'vue'

defineEmits(['closePopup'])
const listRetroType = ['Retro 1', 'Retro 2', 'Retro 3', 'Retro 4']
const modeCreate = ref(true)

const handleModeChange = (status) => {
    modeCreate.value = status
}
const displayBtnMode = computed(() => {
    return modeCreate.value ? 'Create' : 'Join'
})
</script>

<template>
    <div class="w-full">
        <div class="tabs tabs-lifted w-full">
            <input class="tab bg-white [--tab-bg:yellow] [--tab-border-color:cyan]" type="radio" name="select-mode"
                aria-label="Create" checked @click="handleModeChange(true)">
            <div class="tab-content bg-cyan-100 border-base-300 rounded-box p-6">
                <h1 class="heading-title">Create Project</h1>
                <div class="info-input-list">
                    <TextInput class="col-span-3" labelInput="Project Name" />
                    <DropDownInput class=" col-span-3" :list-menu="listRetroType" />
                    <TextInput class="col-span-2" labelInput="Project Key" />
                </div>
                <div class="info-input-list">
                    <TextInput class="col-span-8" labelInput="Description" />
                </div>
            </div>
            <input class="tab bg-white [--tab-bg:yellow] [--tab-border-color:cyan]" type="radio" name="select-mode"
                aria-label="Join" @click="handleModeChange(false)">
            <div class="tab-content bg-cyan-100 border-base-300 rounded-box p-6">
                <h1 class="heading-title">Join Project</h1>
                <div class="info-input-list">
                    <TextInput class="col-span-4" labelInput="Owner Name" />
                    <TextInput class="col-span-3" labelInput="Project Key" />
                </div>
            </div>
            <div class="absolute right-0 bottom-0">
                <div>
                    <button class="btn">{{ displayBtnMode }}</button>
                    <button class="btn" @click="$emit('closePopup', false)">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>