<script setup lang="ts">

import {Person} from "@/entities/Person";
import {useBannerStyle} from "@/utils/ColorStyle";
import {ref} from "vue";
import {useBiogra} from "@/utils/UtilFunctionaly";



const props = defineProps<{
  person: Person
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

    case 'Director':
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
    <div class="container-fluid p-0 " >
      <div class="wrapper d-flex mt-5" :style="bannerStyle" >
        <div class="z-0" style="margin-top:50px"  >
          <div class="card mb-3 z-3" style="width:15rem; border-radius:4%; overflow:hidden">
            <img :src="person.profile_path ?'https://image.tmdb.org/t/p/w500'
            + person.profile_path :require('@/assets/OIP.jpg')"
                 class="object-fit-cover" alt="titre-image"
                 @load="imageLoaded = true"
                 @error="imageLoaded = false">
          </div>
          <div class="all-info p-2">
          <div class="title-actor d-flex flex-column align-items-start mb-2">
            <span class="fw-bold">Nom</span>
            <span>{{ person.name }}</span>
          </div>
          <div class="title-département d-flex flex-column align-items-start mb-2">
            <span class="fw-bold">Célebre pour</span>
          <span>{{extracTitle(person.known_for_department )}}</span>
          </div>
          <div class="title-birth d-flex flex-column align-items-start mb-2">
            <span class="fw-bold">Lieu de Naissance</span>
             <span v-if="person.place_of_birth && person.place_of_birth.length > 0">
               {{ person.place_of_birth }}
             </span>
            <p v-else>---</p>
          </div>
          <div class="title-place-of-birth d-flex flex-column align-items-start mb-2">
            <span class="fw-bold" >Date de Naissance</span>
             <span v-if="person.birthday && person.birthday.length > 0">{{formatDate(person.birthday)}}</span>
             <p v-else>---</p>
          </div>
            <div  class="title-place-of-birth d-flex flex-column align-items-start mb-2">
              <span class="fw-bold">Genre</span>
              <p v-if = "person.gender">{{ person.gender }}</p>
              <p v-else>---</p>
            </div>
            <div  class="title-place-of-birth d-flex flex-column align-items-start ">
              <span class="fw-bold">Site Web</span>
              <a :href="person.homepage" target="_blank" rel="noopener noreferrer" v-if="person.homepage && person.homepage.length >0">{{ person.homepage }}</a>
              <p v-else>---</p>
            </div>
            <p>{{ person.deathday }}</p>
          </div>
        </div>
        <div class=" z-0 align-items-center p-5" style="margin-top:50px" >
          <span class="fw-bold fs-5 ">Biographie</span>
          <p v-if="person.biography.length > 0">{{truncateBio }}</p>
          <button v-if=" person.biography && person.biography.length > 300" @click="toggleExpanded" class="btn btn-outline-warning mt-2">
            {{ isExpanded ? 'Lire moins' : 'Lire la suite' }}
          </button>
          <p v-else>Aucune biographie disponible</p>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>