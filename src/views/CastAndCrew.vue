<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {movieService} from "@/service/TmbdService";
import {Crew} from "@/entities/Crew";
import {Cast} from "@/entities/Cast";



const route = useRoute();

const technicalTeams = ref<any[]>([]);
const art = ref<any[]>([]);
const camera = ref<any[]>([]);
const costumeMakeUp = ref<any[]>([]);
const teamTech = ref<any[]>([]);
const directing = ref<any[]>([]);
const editing = ref<any[]>([]);
const production = ref<any[]>([]);
const sound = ref<any[]>([]);
const effectVisuels = ref<any[]>([]);
const writing = ref<any[]>([]);
const longerTechnicalTeams = ref<number>(0);
const actorRoles = ref<any[]>([]);
const loadingCastCrew = ref<boolean>(false);

const longerActorRoles = ref<number>(0);


const loadCastCrew = async () => {

  const movieId = Number(route.params.id);

  if(!movieId){

    console.error('Id du film non trouver afin d\'afficher les crews');
    return;
  }

  try{

    loadingCastCrew.value = true;
    const response = await movieService.getCreditMovie(movieId);
    actorRoles.value = response.cast.filter((cast: Cast) => cast);
    longerActorRoles.value = actorRoles.value.length;
    technicalTeams.value = response.crew.filter((crew: Crew) => crew);
    longerTechnicalTeams.value = technicalTeams.value.length;
    art.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Art');
    camera.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Camera');

    costumeMakeUp.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Costume & Make-Up');

    teamTech.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Crew');

    directing.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Directing');

    editing.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Editing');

    production.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Production');

    sound.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Sound');

    effectVisuels.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Visual Effects');

    writing.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Writing');


  } catch (error) {

    console.log(error);
    throw error;
  }finally{

    loadingCastCrew.value = false;
  }
}

onMounted(()=>{

  loadCastCrew();
});

</script>

<template>

  <div class="container-fluid cast-crew-view p-5">
    <div v-if="loadingCastCrew" class="loading-container">
      Chargement...
    </div>

    <div v-else>
      <div class="row p-5">
        <div class="col-md-6 d-flex ">
          <div class="section-content ">
            <div class="section-title-longerActorRoles d-flex align-items-center  ">
              <h4 class="section-title  justify-content-start fw-bold text-black p-4">Distribution des rôles
                <span class="section-longerActorRoles fs-4 fw-light text-secondary">{{ longerActorRoles }}</span>
              </h4>

            </div>
            <div class="card-container ">
              <div class="card mt-2" v-for="cast in actorRoles" :key="cast.id">
                <img :src="`https://image.tmdb.org/t/p/w500${ cast.profile_path}`|| '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ cast.name }}</p>
                  <span class="cart-post small mt-1">{{cast.character}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 d-flex ">
          <div class="section-content">
            <h5 class="section-title fw-bold text-black justify-content-start p-2">Equipe technique
              <span class="section-longerTechnicalTeams fs-4 fw-light text-secondary">{{ longerTechnicalTeams }}</span>
            </h5>
            <h6 class="card-title fw-bold small p-2 text-black">Artistique</h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in art" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                  <span class="cart-post small mt-1">{{crew.job}}</span>
                </div>
              </div>
            </div>
            <h6 class="card-title fw-bold small p-2 text-black">Image</h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in camera" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                  <span class="cart-post small mt-1">{{crew.job}}</span>
                </div>
              </div>
            </div>
            <h6 class="card-title fw-bold small p-2 text-black">Costumes maquillage</h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in costumeMakeUp" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                  <span class="cart-post small mt-1">{{crew.job}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

.section-content {
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
}

.card-container {

  gap: 1rem;
  grid-template-columns: repeat(2, 1fr); /* 2 colonnes */
display: grid;
}

.card {
  width: 6rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 260px; /* Ajustez selon vos besoins */

}

.card-img-top {
  width: 100%;
  height: 130px; /* Ajustez selon vos besoins */
  object-fit: cover;
}

.card-body {
  background-color: white;
}

.loading-container {
  text-align: center;
  padding: 2rem;
}


.card {
  margin-bottom: 1rem;
}

</style>