<script setup lang="ts">
defineProps<{
  title: string,
  poster_path: string,
  release_date: string
}>();

</script>

<template>

  <div class="container carte-film-style-1">
    <div class="card border-1 border-emphasis card-fixed-size">
      <div class="img-container">
        <img :src="poster_path || '@/assets/OIP.jpg'"
             @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
             class="card-img-top"
             alt="titre-image"
        >
      </div>
      <div class="card-body d-flex flex-column">
        <h6 class="card-title-bottom  fw-bold" style="color:#374558;">{{ title }}</h6>
        <p class="card-title-bottom release_date fw-bold m-0" style="font-family:Helvetica, sans-serif; color: #979bb5">{{ release_date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-fixed-size {
  width: 13rem;
  height: 400px; /* Hauteur fixe pour la carte */
  border-radius: 10px;
  z-index: 555;
}

.img-container {
  height: 340px; /* Hauteur fixe pour le conteneur d'image */
  overflow: hidden;
  cursor: pointer;
}


.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garde les proportions de l'image */
}
</style>