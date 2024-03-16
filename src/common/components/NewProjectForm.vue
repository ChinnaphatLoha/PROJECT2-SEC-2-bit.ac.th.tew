<script setup>
import TextInput from '@/common/components/input/TextInput.vue'
import DropDownInput from '@/common/components/input/DropDownInput.vue'
import { ref } from 'vue'
const listRetroType = ['Retro 1', 'Retro 2', 'Retro 3', 'Retro 4']
const modeCreate = ref(true)
</script>
 
<template>
    <div class="w-8/12">
        <div class="tabs tabs-lifted ">
            <input class="tab bg-white [--tab-bg:yellow] [--tab-border-color:cyan]" type="radio" name="select-mode"
                aria-label="Create" :checked="modeCreate">
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
                aria-label="Join" :checked="!modeCreate">
            <div class="tab-content bg-cyan-100 border-base-300 rounded-box p-6">
                <h1 class="heading-title">Join Project</h1>
                <div class="short-info-input-list">
                    <TextInput class="col-span-3" labelInput="Owner Name" />
                    <TextInput class="col-span-2" labelInput="Project Key" />
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>