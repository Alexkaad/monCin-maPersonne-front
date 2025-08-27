<script setup lang="ts">

const props = defineProps<{

  twitter_id : string,

}>();

</script>

<template>

  <div class="logo-twitter" style="width: 2rem">
    <a :href="`https://twitter.com/${props.twitter_id}`" target="_blank" rel="noopener">
      <img style="object-fit: cover; width:100%" src="@/assets/icons8-twitter-96.png" alt="logo wikipedia">
    </a>
  </div>

</template>

<style scoped>

</style>