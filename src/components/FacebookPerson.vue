<script setup lang="ts">

const props = defineProps<{

  facebook_id : string,
}>();
</script>

<template>

  <div class="container" style="width: 4rem">

    <a :href="`https://facebook.com/${props.facebook_id}`" target="_blank" rel="noopener"></a>
      <img style="object-fit: cover; width:100%" src="@/assets/facebook-logo-94.png" alt="logo facebook">
  </div>
  
</template>

<style scoped>

</style>