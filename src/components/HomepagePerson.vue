<script setup lang="ts">


const props = defineProps<{

  homepage : string,
}>();
</script>

<template>

  <div class="logo-homepage" style="width: 2.5rem">
    <a :href="props.homepage" target="_blank" rel="noopener">
    <img style="object-fit: cover; width:100%; transform: rotate(45deg)"
         src="@/assets/icons8-link-96.png" alt="logo homepage">
    </a>
  </div>

</template>

<style scoped>

</style>