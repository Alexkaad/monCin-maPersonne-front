<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {movieService} from "@/service/TmbdService";
import BaniereComponent from "@/components/BaniereComponent.vue";
import {CastMember} from "@/entities/CastMember";
import {CrewMember} from "@/entities/CrewMember";
import router from "@/router";
import {Person} from "@/entities/Person";




const route = useRoute();

const crewByDepartment = ref<Record<string, CrewMember[]>>({});
const longerCrewMember = ref<number>(0);
const cast = ref<CastMember[]>([]);
const loadingCredit = ref<boolean>(false);
const longerCastMember = ref<number>(0);
const imageLoaded = ref(false);
const film = ref<any>({});
const writing = computed(() => crewByDepartment.value['Writing'] || []);
const makeUp = computed(() => crewByDepartment.value['Costume & Make-Up'] || []);
const sound = computed(() => crewByDepartment.value['Sound'] || []);
const visualEffects = computed(() => crewByDepartment.value['Visual Effects'] || []);



const handleImageLoad = () => {
  imageLoaded.value = true
}

const loadMovieDetails = async () => {
  const movieId = Number(route.params.id);

  if (!movieId) {
    console.error("ID du film non trouvé");
    return;
  }

  try {
    const response = await movieService.getMovieById(movieId);

    film.value = {
      release_date: new Date(response.release_date).toLocaleDateString('fr-FR', {
        year: 'numeric'
      }),
      title: response.title,
      poster_path: response.poster_path,
    };
  } catch (error) {
    console.error("Erreur lors du chargement des détails du film:", error);
  }
};



const groupedMakeUp= computed(() => {
  const grouped =new Map<number, any>();

  makeUp.value.forEach((crew: CrewMember) => {
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

  sound.value.forEach((crew: CrewMember) => {
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

const groupedEffectVisuels = computed(() => {
  const grouped = new Map();

  visualEffects.value.forEach((crew: CrewMember) => {
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


/*
const groupedCamera = computed(() => {
  const grouped = new Map();

  camera.value.forEach((crew: CrewMember) => {
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
*/


const groupedWriting = computed(() => {
  const grouped =new Map<number, any>();

  writing.value.forEach((crew: CrewMember) => {
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

    loadingCredit.value = true;
    const response = await movieService.getCreditMovie(movieId);

    cast.value = response.cast;
    crewByDepartment.value = response.crew;

    longerCastMember.value = response.cast.length;
    longerCrewMember.value = Object.values(response.crew as Record<string, CrewMember[]>).reduce(
        (acc, dept) => acc + dept.length,
        0
    );


  } catch (error) {

    console.log(error);

    throw error;

  }finally{

    loadingCredit.value = false;
  }
}

const navigateToPerson = ( personId : number , person: Person ,event: Event) => {

  if (event?.preventDefault) {
    event.preventDefault();
  }

  if (personId) {
    router.push({name: 'PersonSingle'
      , params: { id: personId.toString(), query:person.name }});
  }
}

onMounted(()=>{
  loadMovieDetails();
  loadCastCrew();

});


</script>

<template>

  <div class="container-fluid cast-crew-view bg-body-secondary" style="margin-top: 72px">
    <div class="content-wrapper">
      <div v-if="loadingCredit|| !film.title" class="loading-container">
        <div class="banner-placeholder"></div>
        Chargement...
      </div>
      <div v-else>
        <BaniereComponent
            :poster-url="'https://image.tmdb.org/t/p/w500' + film.poster_path"
            :title="film.title"
            :release-date="film.release_date"
        />
        <div class="d-flex justify-content-center">
          <div class="section-content ">
            <div class="section-title-longerActorRoles">
              <h4 class="section-title justify-content-start fw-bold text-black p-4">Distribution des rôles
                <span
                    class="section-longerActorRoles justify-content-start align-items-start fs-4 fw-light text-secondary">{{
                    longerCastMember
                  }}</span>
              </h4>
            </div>
            <div class="section-content-actor bgf">
              <h6 v-if="cast.length > 0"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse-actors-section`"
                  aria-expanded="false"
                  :aria-controls="`collapse-actors-section`"
              >
                Acteurs
              </h6>

            </div>
            <div class="collapse collapse-vertical" id="collapse-actors-section" >
              <div class="card-container" >
                <div
                    class="card mt-2" v-for="member in cast "
                    :key="member.id" @click="navigateToPerson(member.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${ member.profile_path}`|| '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ member.name }}</p>
                    <span class="cart-post small mt-1" style="color: #032541;">{{ member.character }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="section-content">
            <h4 class="section-title fw-bold justify-content-start p-3">Equipe technique
              <span class="section-longerTechnicalTeams fs-4 fw-light text-secondary">
                {{ longerCrewMember }}</span>
            </h4>
            <div class="bgf d-flex ">
              <h6
                  v-if="crewByDepartment.Art && crewByDepartment.Art.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-art-section"
                  aria-expanded="false"
                  aria-controls="collapse-art-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Artistique
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-art-section">
              <div class="card-container " >
                <div
                    class="card " v-for="crew in crewByDepartment.Art"
                    :key="crew.id" @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex ">
              <h6
                  v-if="crewByDepartment.Camera && crewByDepartment.Camera.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-camera-section"
                  aria-expanded="false"
                  aria-controls="collapse-camera-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Image
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-camera-section">
              <div class="card-container ">
                <div
                    class="card mt-2" v-for="crew in crewByDepartment.Camera"
                    :key="crew.id" @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1" style="color:#032541">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment['Costume & Make-Up']
                  && crewByDepartment['Costume & Make-Up'].length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-costume-section"
                  aria-expanded="false"
                  aria-controls="collapse-costume-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Costume & Make-Up
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-costume-section">
              <div class="card-container ">
                <div class="card mt-2" v-for="crew in groupedMakeUp"
                     :key="crew.id"
                     @click="navigateToPerson(crew.id,$event)"
                >
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
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Crew && crewByDepartment.Crew.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-equipe-technique-section"
                  aria-expanded="false"
                  aria-controls="collapse-equipe-technique-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Equipe technique
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-equipe-technique-section">
              <div class="card-container ">
                <div
                    class="card mt-2" v-for="crew in crewByDepartment.Crew"
                    :key="crew.id"
                    @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1 ">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Directing && crewByDepartment.Directing.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-directing-section"
                  aria-expanded="false"
                  aria-controls="collapse-directing-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Réalisation
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-directing-section">
              <div class="card-container ">
                <div
                    class="card mt-2" v-for="crew in crewByDepartment.Directing"
                    :key="crew.id"
                    @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Editing && crewByDepartment.Editing.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-editing-section"
                  aria-expanded="false"
                  aria-controls="collapse-editing-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Montage
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-editing-section">
              <div class="card-container ">
                <div class="card mt-2" v-for="crew in crewByDepartment.Editing"
                     :key="crew.id"
                     @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Lighting && crewByDepartment.Lighting.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-light-section"
                  aria-expanded="false"
                  aria-controls="collapse-light-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Eclairage
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-light-section">
              <div class="card-container ">
                <div class="card mt-2" v-for="crew in crewByDepartment.Lighting"
                     :key="crew.id"
                     @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Production && crewByDepartment.Production.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-production-section"
                  aria-expanded="false"
                  aria-controls="collapse-production-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Production
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-production-section">
              <div class="card-container ">
                <div
                    class="card mt-2" v-for="crew in crewByDepartment.Production"
                    :key="crew.id"
                    @click="navigateToPerson(crew.id,$event)"
                >
                  <img :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}` || '@/assets/OIP.jpg'"
                       @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                       @load="handleImageLoad"
                       class="card-img-top"
                       alt="titre-image"
                  >
                  <div class="card-body p-2">
                    <p class="card-text fw-bolder small mb-0">{{ crew.name }}</p>
                    <span class="cart-post small mt-1">{{ crew.job }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Sound && crewByDepartment.Sound.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-sound-section"
                  aria-expanded="false"
                  aria-controls="collapse-sound-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Son
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-sound-section">
              <div class="card-container">
                <div
                    class="card mt-2" v-for="crew in groupedSound"
                    :key="crew.id"
                    @click="navigateToPerson(crew.id,$event)"
                >
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
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment['Visual Effects'] && crewByDepartment['Visual Effects'].length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-effectVisuel-section"
                  aria-expanded="false"
                  aria-controls="collapse-effectVisuel-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Effets visuels
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-effectVisuel-section">
              <div class="card-container">
                <div
                    class="card mt-2" v-for="crew in groupedEffectVisuels"
                    :key="crew.id"
                    @click="navigateToPerson(crew.id,$event)"
                >
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
            <div class="bgf d-flex align-items-start">
              <h6
                  v-if="crewByDepartment.Writing && crewByDepartment.Writing.length > 0"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-writing-section"
                  aria-expanded="false"
                  aria-controls="collapse-writing-section"
                  class="card-title fw-bold p-2 text-black"
                  style="font-family:'MS PGothic',sans-serif"
              >
                Écriture
              </h6>
            </div>
            <div class="collapse collapse-vertical" id="collapse-writing-section">
              <div class="card-container">
                <div class="card mt-2" v-for="crew in groupedWriting"
                     :key="crew.id"
                     @click="navigateToPerson(crew.id,$event)"
                >
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
                        class="cart-post small mt-1 d-block">
                    {{ job }}
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
  </div>
</template>


<style scoped>

.section-content {
  display: flex;
  flex-direction: column;
  column-gap: 3rem;
}

.card-container {
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  display: grid;
}

.card {
  width: 7rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 310px; /* Ajustez selon vos besoins */
  cursor: pointer;

}

.card:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
}


.bgf {
  width: 100% ! important;
  margin-top: 1px!important;
  padding: 0 10px!important;
  display: flex!important;
  align-items: flex-start!important;
  transform: scale(1.05) !important;
}

.bgf h6 {
  padding: 10px 0 ! important;
  font-size: 1.1rem !important;
  position: relative !important;
  cursor: pointer !important;
  width: 100% !important;
  border-bottom: 2px solid #e0e0e0 !important;
  margin: 0 0 15px !important;
  transition: all 0.3s ease!important;
}

.bgf h6:hover {
  color: #deb887  !important;
  transform: translateY(10px) !important; /* Déplace légèrement vers la droite */
  border-bottom-color: #deb887  !important; /* Change la couleur de la bordure */
}

.cart-post {
  display: block;
  line-height: 1.2;
  color: #032541;
}

.card-img-top {
  width: 100%;
  height: 170px; /* Ajustez selon vos besoins */
  object-fit: cover;
}

.card-body {
  background-color: burlywood;
}
.banner-placeholder {
  width: 100%;
  height: 100px;
  background: linear-gradient(to right, #2c3e50, #3498db);
  opacity: 0.3;
  border-radius: 8px;
  margin-bottom: 20px;
}


.loading-container {
  text-align: center;
  padding: 2rem;
}


.card {
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .card {
    width: 7rem!important;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    height: 300px!important; /* Ajustez selon vos besoins */

  }
  .card-body {
    font-size: 0.80rem!important;
    width: 100%!important;
    height: 80px!important;
    padding: 0.5rem!important;
  }

  .jobs-container {
    max-height: 70px!important;
    overflow-y: auto!important;
  }


  .bgf h6 {
    font-size: 1rem !important;
    padding: 8px 0!important;
  }

  .bgf {
    padding: 0 5px !important;

  }

  @media (max-width: 576px) {
    .card-container {
      grid-template-columns: repeat(1, 1fr);
    }

    .card {
      width: 6rem!important;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      height: 250px!important; /* Ajustez selon vos besoins */

    }

    .card-img-top {
      width: 100%;
      height: 150px!important; /* Ajustez selon vos besoins */
      object-fit: cover;
    }

    .bgf h6 {
      font-size: 0.92rem !important;
      padding: 6px 0!important;
    }

    .bgf {
      padding: 0 3px !important;

    }

    .jobs-container {
      max-height: 50px!important;
      overflow-y: auto!important;
    }

    .card-img-top {
      width: 100%;
      height: 145px!important; /* Ajustez selon vos besoins */
      object-fit: cover;
    }

    .card-body {
      font-size: 0.60rem!important;
      width: 100%!important;
      height: 70px!important;
      padding: 0.5rem!important;
    }

  }



}
</style>