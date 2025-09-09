<script setup lang="ts">

import {Person} from "@/entities/Person";
import {useBannerStyle} from "@/utils/ColorStyle";
import {ref} from "vue";
import {useBiogra} from "@/utils/UtilFunctionaly";
import NetworkPerson from "@/components/NetworkPerson.vue";
import KnownForPerson from "@/components/KnownForPerson.vue";
import {useColorStore} from "@/store/ColorStore";
import {KnownFor} from "@/entities/knownFor";
import ListCastAndCrew from "@/components/ListCastAndCrew.vue";



const props = defineProps<{
  person: Person
  network: {
    facebook_id: string,
    instagram_id: string,
    twitter_id: string,
  }
  filmsConnus: KnownFor
  homepage: string,

}>();

const imageLoaded = ref(false);
const posterLoad = ref(false);


const {truncateBio,isExpanded,toggleExpanded} = useBiogra(ref(props.person.biography), 300);

const bannerStyle = useBannerStyle(imageLoaded);
const colorStore = useColorStore();

const handlePosterLoad = () => {
  posterLoad.value = true;
  const imageUrl = `https://image.tmdb.org/t/p/w500${props.person.profile_path}`;
  colorStore.extractDominantColor(imageUrl);
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('fr-FR').replace(/\//g, '-');
}

const formatTitle = (title: string | undefined, limit = 24) => {

  if (!title) {

    return '';
  }
  return title.length > limit ? title.substring(0, limit) + '...' : title;

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
  <div class="container all" >
    <div class="wrapper row " :style="bannerStyle">
      <div class="info z-0 col-3" style="margin-top:90px">
        <div
            class="img-container mt-3 z-3 p-1"
            style="width:18rem;height: 420px;overflow: hidden;"
        >
          <img :src="person.profile_path ?'https://image.tmdb.org/t/p/w500'
            + person.profile_path :require('@/assets/OIP.jpg')"
               class="img-person  " alt="titre-image m-0 p-0"
               @load="handlePosterLoad"
               @error="imageLoaded = false"
               style="object-fit: cover; width: 100%; height: 100%; border-radius: 10px 10px 10px 10px;"

          >
        </div>
        <div class="social-network">
          <NetworkPerson class="p-0 "
                         :facebook_id="props.network.facebook_id"
                         :twitter_id="props.network.twitter_id"
                         :instagram_id="props.network.instagram_id"
                         :homepage="props.person.homepage"
          />
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
          <div v-if="person.deathday && person.deathday.length >0" class="title-place-of-death d-flex flex-column align-items-start">
            <span class="fw-bold">Déceder le</span>
          <p >{{ person.deathday }}</p>

          </div>
        </div>
      </div>
      <div class="bio-name p-4 col-9" style="margin-top:87px">
        <div class="name-actor d-flex align-items-start mb-2">
          <h2 class="fw-bold"
              :style="bannerStyle"
              STYLE="font-family: 'Bahnschrift', sans-serif; color: #374558;"
          >
            {{ person.name }}</h2>
        </div>

        <div v-if="person.biography && person.biography.length > 0"
             class="bio-only d-flex flex-column align-items-start">
          <span class="fw-bold fs-5 mb-2 ">Biographie</span>
          <p class="text-start">
            {{ truncateBio }}
            <span v-if=" person.biography && person.biography.length > 300" @click="toggleExpanded"

                  style="width: 7rem; color: #007bff; cursor: pointer;"
            >
          {{ isExpanded ? 'Lire moins' : 'Lire la suite' }}
        </span>
          </p>

        </div>

        <div v-else class="bio-only d-flex flex-column align-items-start">
          <span class="fw-bold fs-5 ">Biographie</span>
          <p>Aucune biographie disponible</p>
        </div>

        <hr v-if="person.biography && person.biography.length >0">

        <knownForPerson :filmsConnus="filmsConnus"/>

        <ListCastAndCrew :perform="filmsConnus"/>
      </div>

    </div>
  </div>

</template>

<style scoped>



.bio-only p {
  max-width: 900px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.bio-only p.expanded {
  max-height: none; /* retire la limite */
}

@media (max-width: 768px) {

  .wrapper {
    flex-direction: column;
    margin-top: 70px!important;
  }

  .info {
    margin-top: 0!important;
  }
  .bio-name {

    margin-top: 0px!important;
    padding-top: 0  ! important;
  }

  .all-info span{

    width: 7rem;
    padding: 0 ! important;
    margin-left: 0 ! important;

  }

  .all-info{

   padding: 0 4px 0 0 ! important;
  }



}
</style>