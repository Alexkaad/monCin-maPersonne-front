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
  <div class="carrousel-main-actors mt-1 d-flex flex-column align-items-center ">
    <div class="container title-of-mainActor">
      <h5 class=" title-actor fw-bolder ">Têtes d'affiche</h5>
    </div>


      <div class="container main-actors-style-1 " >
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

    <div class="container show-list mt-5 ">
      <div class="lien-wrapper d-flex justify-content-start p-2" style="width: 100%;">
      <span class="fw-bold lien-cliclable " @click="$router.push({name: 'Cast&Crew'})">
        Voir la liste complete des distributions des rôles et equipe technique
      </span>

      </div>
      <hr>
    </div>

  </div>


</template>

<style scoped>



.card-fixed-size:hover {
  transform: scale(1.05);
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
.main-actors-style-1 {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 5px !important;        /* Réduit l'espace entre les cards */
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

.card-fixed-size {
  width: 120px !important;    /* Largeur fixe plus petite */
  height: 250px !important;   /* Hauteur réduite */
  margin: 0 !important;       /* Supprime toutes les marges */
  padding: 0 !important;
  border: none !important;    /* Supprime les bordures si nécessaire */
  box-sizing: border-box !important;
}

.img-container {
  height: 180px !important;   /* Réduit la hauteur de l'image */
  width: 100% !important;
}

.card-body {
  padding: 0.25rem !important; /* Réduit le padding du corps de la card */
  background-color: #deb887 !important;
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



.title-of-mainActor {
  display: flex;
  justify-content: start;
  padding:0;
  margin-bottom: 15px;


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
@media (min-width: 768px) and (max-width: 992px){
  .main-actors-style-1 {
    display: grid;
    margin: 0 !important;
    padding: 15px ! important;
    grid-template-columns: repeat(3, minmax(auto, 1fr)) !important;
    gap: 3px !important;
  }

  .card-fixed-size {
    width: 110px !important;
    height: 240px !important;
  }

  .img-container {
    height: 150px !important;
  }

  .show-list{

  padding:0 !important;
  margin: 0 !important;
}


  .lien-wrapper {
    margin: 0 !important;
  }

  .lien-cliclable {
    display: block;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.2;
    margin-top: 20px;
    font-size: 1.5rem;

  }


  .title-actor{

   font-weight: bold;
   margin:0;

   .title-of-mainActor{

     margin: 0;
     padding-right: 160px;
     justify-content: space-around;
   }


  }


  }

@media screen and (min-width: 320px) and (max-width: 475px){

  .main-actors-style-1 {
    display: grid;
    margin: 0 !important;
    padding: 10px ! important;
    grid-template-columns: repeat(2, minmax(auto, 1fr)) !important;
    gap: 3px !important;
  }


  .skeleton-loader{

    padding-top: 5px;
  }
  .card-fixed-size {
    width: 72px !important;
    height: 160px !important;
  }

  .img-container {
    height: 120px !important;
  }

  .show-list{

    padding:0 !important;
    margin: 0 !important;
  }


  .lien-wrapper {
    margin: 0 !important;
    padding: 1px !important;
  }

  .lien-cliclable {
    display: block !important;
    white-space: normal!important;
    word-wrap: break-word !important;
    line-height: 1;
    font-size: 0.63rem !important;

  }


  .title-actor {

    font-weight: bold;
    margin: 0;
    font-size: 0.8rem;

    .title-of-mainActor {

      margin: 0;
      padding-right: 100px;
      justify-content: space-around;
    }

  }
}



</style>