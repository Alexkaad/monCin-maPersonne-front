<script setup lang="ts">

const props = defineProps<{

  facebook_id : string,
}>();
</script>

<template>

  <div class="logo-facebook" style="width: 2.5rem ; ">

    <a :href="`https://facebook.com/${props.facebook_id}`" target="_blank" rel="noopener">
      <img style="object-fit: cover; width:100%" src="@/assets/facebook-logo-94.png" alt="logo facebook">
    </a>
  </div>
  
</template>

<style scoped>

</style>