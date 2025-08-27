<script setup lang="ts">



const props = defineProps<{

  instagram_id : string,
}>();



</script>

<template>
  <div class="container" style="width: 4rem">
    <a :href="`https://instagram.com/${props.instagram_id}`" target="_blank" rel="noopener">
      <img style="width: 100%; object-fit: cover" src="@/assets/icons8-instagram-logo-96.png" alt="logo instagram">
    </a>
  </div>
</template>

<style scoped>

</style>