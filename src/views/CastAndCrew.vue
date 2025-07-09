<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
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
const light = ref<any[]>([]);
const writing = ref<any[]>([]);
const longerTechnicalTeams = ref<number>(0);
const actorRoles = ref<any[]>([]);
const loadingCastCrew = ref<boolean>(false);
const longerActorRoles = ref<number>(0);
const imageLoaded = ref(false);


const handleImageLoad = () => {
  imageLoaded.value = true;
};

const groupedCostumeMakeUp = computed(() => {
  const grouped = new Map();

  costumeMakeUp.value.forEach((crew: Crew) => {
    if (!grouped.has(crew.id)) {
      grouped.set(crew.id, {
        ...crew,
        jobs: [crew.job]
      });
    } else {
      grouped.get(crew.id).jobs.push(crew.job);
    }
  });

  return Array.from(grouped.values());
});

const groupedSound = computed(() => {
  const grouped = new Map();

  sound.value.forEach((crew: Crew) => {
    if (!grouped.has(crew.id)) {
      grouped.set(crew.id, {
        ...crew,
        jobs: [crew.job]
      });
    } else {
      grouped.get(crew.id).jobs.push(crew.job);
    }
  });

  return Array.from(grouped.values());
});



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

    light.value = technicalTeams.value.filter((crew: Crew) => crew.department === 'Lighting');

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

  <div class="container-fluid cast-crew-view p-5
 bg-body-secondary">
    <div v-if="loadingCastCrew" class="loading-container">
      Chargement...
    </div>

    <div v-else>
      <div class="row p-5">
        <div class="col-md-6 d-flex ">
          <div class="section-content ">
            <div class="section-title-longerActorRoles d-flex align-items-center  ">
              <h4 class="section-title justify-content-start fw-bold text-black p-4">Distribution des rôles
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
            <h4 class="section-title fw-bold justify-content-start p-4">Equipe technique
              <span class="section-longerTechnicalTeams fs-4 fw-light text-secondary">
                {{ longerTechnicalTeams }}</span>
            </h4>
            <h6 v-if="art.length > 0" class="card-title fw-bold text-black"
                style="font-family:'MS PGothic',sans-serif">Artistique</h6>
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
            <h6 v-if="camera.length > 0" class="card-title fw-bold p-2 text-balck"
                style="font-family:'MS PGothic',sans-serif">Image</h6>
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
            <h6
                v-if="costumeMakeUp.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family:'MS PGothic',sans-serif">Costumes maquillage
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in groupedCostumeMakeUp" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder  mb-0">{{ crew.name }}</p>
                  <div class="jobs-container">
                  <span v-for="(job, index) in crew.jobs"
                        :key="index"
                        class="cart-post small mt-1 d-block">{{ job }}
                  </span>
                </div>
                </div>
              </div>
            </div>
            <h6 v-if="teamTech.length > 0" class="card-title fw-bold  p-2 text-balck"
                style="font-family: 'MS PGothic',sans-serif">Equipe technique
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in teamTech" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                  <span class="cart-post small mt-1 ">{{crew.job}}</span>
                </div>
              </div>
            </div>
            <h6 v-if="directing.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family: 'MS PGothic',sans-serif">
              Réalisation
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in directing" :key="crew.id">
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
            <h6 v-if="editing.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family: 'MS PGothic',sans-serif">
              Montage
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in editing" :key="crew.id">
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
            <h6 v-if="light.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family: 'MS PGothic',sans-serif">
              Éclairage
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in light" :key="crew.id">
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
            <h6 v-if="production.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family: 'MS PGothic',sans-serif">
              Production
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in production" :key="crew.id">
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
            <h6 v-if="sound.length > 0" class="card-title fw-bold p-2 text-black"
                style="font-family: 'MS PGothic',sans-serif">
              Son
            </h6>
            <div class="card-container ">
              <div class="card mt-2" v-for="crew in groupedSound" :key="crew.id">
                <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                     @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                     @load="handleImageLoad"
                     class="card-img-top"
                     alt="titre-image"
                >
                <div class="card-body p-2">
                  <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                  <div class="jobs-container">
                  <span v-for="(job, index) in crew.jobs"
                        :key="index"
                        class="cart-post small mt-1 d-block">{{ job }}
                  </span>
                    </div>
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
  width: 7rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 310px; /* Ajustez selon vos besoins */

}

.jobs-container {
  max-height: 80px;
  overflow-y: auto;
}

.cart-post {
  display: block;
  line-height: 1.2;
}

.card-img-top {
  width: 100%;
  height: 170px; /* Ajustez selon vos besoins */
  object-fit: cover;
}

.card-body {
  background-color: burlywood;
}

.loading-container {
  text-align: center;
  padding: 2rem;
}


.card {
  margin-bottom: 1rem;
}

</style>