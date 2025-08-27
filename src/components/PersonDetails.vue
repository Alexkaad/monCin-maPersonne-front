<script setup lang="ts">

import {Person} from "@/entities/Person";
import {useBannerStyle} from "@/utils/ColorStyle";
import {ref} from "vue";
import {useBiogra} from "@/utils/UtilFunctionaly";
import NetworkPerson from "@/components/NetworkPerson.vue";



const props = defineProps<{
  person: Person
  network: {
    facebook_id: string,
    instagram_id: string,
    twitter_id: string,

  }
}>();

const imageLoaded = ref(false);



const {truncateBio,isExpanded,toggleExpanded} = useBiogra(ref(props.person.biography), 300);

const bannerStyle = useBannerStyle(imageLoaded);

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

function  extracTitle (role:string) : string {

  switch (role) {
    case 'Acting':
       return 'Interpretation';

    case 'Writing':
      return'Ecriture';

    case 'Directing':
      return'Réalisation';

    case 'Production':
      return 'Production';

    case 'Sound':
      return'Son';

    case 'Costume & Make-up':
      return 'Costume & Maquillage';
    case 'Art':
      return 'Artistique';

    case 'Crew':
      return 'Technicien';

    case 'Costume Design':
      return'Costume Design';

    case 'Visual Effects':
      return'Visual Effects';

    case 'Lighting Design':
      return 'Eclairage';

    case 'Camera':
      return 'Image'

    case 'stunts':
      return 'Doublure & Cascade';

      case 'Editor':
      return 'Monttage';

      default:

        return 'Inconnnu';

  }
}

</script>

<template>
    <div class="container-fluid" >
      <div class="wrapper d-flex mt-2 "  :style="bannerStyle" >
        <div class="info z-0 " style="margin-top:90px">
          <div
              class="img-container mt-3 z-3 p-2"
              style="width:18rem;height: 420px;overflow: hidden;"
          >
            <img :src="person.profile_path ?'https://image.tmdb.org/t/p/w500'
            + person.profile_path :require('@/assets/OIP.jpg')"
                 class="img-person  " alt="titre-image m-0 p-0"
                 @load="imageLoaded = true"
                 @error="imageLoaded = false"
                 style="object-fit: cover; width: 100%; height: 100%; border-radius: 10px 10px 10px 10px;"

            >
          </div>
        <div class=" d-flex justify-content-between wrapper-network ">
          <div class="social-network row">
            <NetworkPerson class="p-0 col-md-6 "
                           :facebook_id="props.network.facebook_id"
                           :twitter_id="props.network.twitter_id"
                           :instagram_id="props.network.instagram_id"/>

            <div v-if="person.homepage && person.homepage.length >0"
                 class=" home-page d-flex align-items-start col-md-6 title-place-of-homepage  "
                 style="width: 4rem"
            >
              <a :href="person.homepage" target="_blank" rel="noopener">
                <img
                    style="width: 100%;
                     object-fit: cover;
                     transform: rotate(44.5deg)"
                     src="@/assets/icons8-link-96.png" alt="logo instagram"
                >
              </a>
            </div>
          </div>
        </div>
          <div class="all-info p-2">
            <div class="title-département d-flex flex-column align-items-start mb-2">
              <span class="fw-bold">Célebre pour</span>
              <span>{{ extracTitle(person.known_for_department) }}</span>
            </div>
            <div class="title-birth d-flex flex-column align-items-start mb-2">
              <span class="fw-bold">Lieu de Naissance</span>
              <span class=" text-start" v-if="person.place_of_birth && person.place_of_birth.length >0">
                {{ person.place_of_birth }}
             </span>
              <p v-else>---</p>
            </div>
            <div class="title-place-of-birth d-flex flex-column align-items-start mb-2">
              <span class="fw-bold">Date de Naissance</span>
              <span v-if="person.birthday && person.birthday.length > 0">{{ formatDate(person.birthday) }}</span>
              <p v-else>---</p>
            </div>
            <div class="title-place-of-genre d-flex flex-column align-items-start">
              <span class="fw-bold">Genre</span>
              <p v-if="person.gender">{{ person.gender }}</p>
              <p v-else>---</p>
            </div>

            <p>{{ person.deathday }}</p>
          </div>
        </div>
        <div class="bio-name p-5" style="margin-top:78px">
          <div class="name-actor d-flex align-items-start mb-2">
            <h2 class="fw-bold"
                :style="bannerStyle"
                STYLE="font-family: 'Bahnschrift', sans-serif; color: #374558;"
            >
              {{ person.name }}</h2>
          </div>

          <div v-if="person.biography && person.biography.length > 0"
               class="bio-only d-flex flex-column align-items-start"
          >
            <span class="fw-bold fs-5 mb-2 ">Biographie</span>
            <p class="text-start">{{ truncateBio }}</p>
          </div>

          <div v-else class="bio-only d-flex flex-column align-items-start">
            <span class="fw-bold fs-5 ">Biographie</span>
            <p >Aucune biographie disponible</p>
          </div>

          <button v-if=" person.biography && person.biography.length > 300" @click="toggleExpanded"
                  class="btn btn-outline-warning mt-2"
                  style="width: 7rem"
          >
            {{ isExpanded ? 'Lire moins' : 'Lire la suite' }}
          </button>
        </div>

        </div>
      </div>


</template>

<style scoped>

</style>