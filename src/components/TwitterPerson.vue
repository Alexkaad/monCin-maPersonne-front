<script setup lang="ts">

const props = defineProps<{

  twitter_id : string,

}>();

</script>

<template>

  <div class="container" style="width: 4rem">
    <a :href="`https://twitter.com/${props.twitter_id}`" target="_blank" rel="noopener">
      <img style="object-fit: cover; width:100%" src="@/assets/icons8-twitter-96.png" alt="logo wikipedia">
    </a>
  </div>

</template>

<style scoped>

</style>