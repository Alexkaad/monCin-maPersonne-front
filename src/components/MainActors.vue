<script setup lang="ts">

import {computed, ref} from "vue";


const props = defineProps<{
  cast: Array<{
    id: number,
    name: string,
    role: string,
    poster_path: string,
    order: number,
  }>
}>();



const imageLoaded = ref(false)

const handleImageLoad = () => {
  imageLoaded.value = true
}


const mainCast= computed (() => {

   return props.cast.slice(0, 8);
 })


</script>

<template>
  <div class="carrousel-main-actors">
    <div class="container title-of-mainActor d-flex align-content-start">
      <h5 class=" fw-bolder d-flex text-align-start ">Têtes d'affiche</h5>
    </div>


      <div class="container main-actors-style-1">
        <!-- Utilisez mainCast au lieu de cast -->
        <div v-for="actor in mainCast" :key="actor.id" class="card border-1 border-emphasis card-fixed-size">
          <div class="img-container position-relative">
            <div v-if="!imageLoaded" class="skeleton-loader"></div>
            <img :src="actor.poster_path || '@/assets/OIP.jpg'"
                 @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                 @load="handleImageLoad"
                 class="card-img-top"
                 alt="titre-image"
            >
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title-bottom fw-bold" style="color:#374558;">
              {{ actor.name }}
            </h6>
            <span class="card-title-bottom release_date fw-bold m-0"
                  style="font-family:Helvetica, sans-serif; color: #979bb5">
            {{ actor.role }}
          </span>
          </div>
        </div>
      </div>

    <div class="container show-list p-5">
      <div class="lien-wrapper d-flex justify-content-start" style="width: 100%; margin-right: 200px;">
      <span class="fw-bold lien-cliclable mb-3">
        Voir la liste complete des distributions des rôles et equipe technique
      </span>

      </div>
      <hr>
    </div>

  </div>


</template>

<style scoped>

.card-fixed-size {
  width: 8rem;  /* Réduit de 12rem à 8rem */
  height: 280px; /* Réduit de 400px à 280px */
  border-radius: 10px;
  margin: 10px;
  transition: transform 0.3s ease;
}

.card-fixed-size:hover {
  transform: scale(1.05);
}

.img-container {
  height: 200px; /* Réduit de 340px à 200px */
  overflow: hidden;
}

.lien-cliclable {
  display: inline-block;
  cursor: pointer;
  transition: color 0.1s ease;
}

.lien-cliclable:hover {
  color: #007bff;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 0.5rem;
}

.card-title-bottom {
  font-size: 0.8rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.carrousel-main-actors {
  padding: 20px 0;
}

.main-actors-style-1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.title-of-mainActor {
  display: flex;
  justify-content: start;
  margin-left: 125px;

}

.skeleton-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}


</style>