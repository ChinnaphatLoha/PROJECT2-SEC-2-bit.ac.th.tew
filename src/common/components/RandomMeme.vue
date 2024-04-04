<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/store'

const useStore = useUserStore()
const username = useStore.username

const allMemes = [
  `https://api.memegen.link/images/money/TAKE_MY_MONEY/And_back_to_the_correct_url!.webp`,
  `https://api.memegen.link/images/persian/hey_${username}_!~q/This_URL_is_not_found.png`,
  `https://api.memegen.link/images/wkh/${username}/DEV/why_u_here_this_url_is_not_found~q.png`
]
const memeUrl = ref('')

const getRandomMeme = () => {
  const randomIndex = Math.floor(Math.random() * allMemes.length)
  memeUrl.value = allMemes[randomIndex]
}

onMounted(() => {
  getRandomMeme()
})
</script>

<template>
  <div>
    <img :src="memeUrl" alt="NOT FOUND MEME." class="flex mt-2 justify-center mx-auto" />
  </div>
</template>

<style scoped></style>
