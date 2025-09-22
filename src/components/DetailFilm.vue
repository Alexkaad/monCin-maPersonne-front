<script lang="ts" setup>

import {ref} from "vue";
import OfficielTrailer from "@/components/officielTrailer.vue";
import {SortedTrailers, Trailer} from "@/entities/Trailer";
import {useRoute} from "vue-router";
import {useColorStore} from "@/store/ColorStore";
import {Film} from "@/entities/Film";
import {CreatedBy} from "@/entities/CreatedBy";
import {flatrate, ProviderTv} from "@/entities/ProviderTv";


const props = defineProps<{


  sortedTrailers?: SortedTrailers,
  media: Film | undefined;
  provider?: ProviderTv;


}>();

const posterLoad = ref(false)
const officielTrailerRef = ref<InstanceType<typeof OfficielTrailer> | null>(null);
const route = useRoute();
const colorStore = useColorStore();

const handlePosterLoad = () => {
  posterLoad.value = true;
  const imageUrl = `https://image.tmdb.org/t/p/w500${props.media?.poster_path}`;
  colorStore.extractDominantColor(imageUrl);
};

const formatDate = (date: Date | string | undefined) => {
  return new Date(date || '').toLocaleDateString('fr-FR')
}

const formatDateYear = (date: Date | string) => {
  return formatDate(date).split('/')[2]
}

const nameCreatedBy = (createdBy: CreatedBy []) => {

  return createdBy.map(createdBy => createdBy.name).join(', ')
}


const formatRuntime = (runtime: string | number) => {
  const minutes = typeof runtime === 'string' ? parseInt(runtime) : runtime;
  if (!minutes) return '0h 0min';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}min`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
};

const filerLogo_path = (flatrates: flatrate []): flatrate | undefined => {
  return flatrates[0]

}

import { computed } from "vue";

const hasCreators = computed(() => {
  return props.media?.created_by && props.media.created_by.length > 0;
});

const creators = computed(() => props.media?.created_by || []);


const openTrailerModal = (trailer: Trailer) => {
  if (officielTrailerRef.value) {
    officielTrailerRef.value.openModal(trailer.key);
  }
};


</script>

<template>

  <div v-if="props.media" :style="props.media.backdrop_path? {
         backgroundImage:
         `url(https://image.tmdb.org/t/p/original${props.media.backdrop_path})`
       } : {}"
       class="background-wrapper " style="margin-top: 60px;">
    <div class="overlay"></div>
    <div class="content-wrapper d-flex  ">
      <div class="container mt-5 ">
        <div class="row align-items-start ">
          <div class="col-md-4  w-auto poster-film-provider ">
            <div class="poster-container ">
              <img
                  :src="'https://image.tmdb.org/t/p/w500'+props.media.poster_path || '@/assets/OIP.jpg'"
                  alt="image-film"
                  class="film-poster"
                  @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                  @load="handlePosterLoad">
            </div>
            <div v-if="props.provider && filerLogo_path(props.provider.flatrate)"
                class="providers d-flex justify-content-start align-items-center"
                style=" padding: 2px 0 0 40px; background-color: #032541; "
            >
              <div v-if="props.provider &&
            filerLogo_path(props.provider?.flatrate)" class="poster-provider"
                   style="padding:
            0.2rem">
                <img
                    :alt="filerLogo_path(props.provider.flatrate)?.logo_path"
                    :src="'https://image.tmdb.org/t/p/w500' +
                    filerLogo_path(props.provider.flatrate)?.logo_path"
                    style="width: 2.3rem; "
                    @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                    @load="handlePosterLoad"
                />

              </div>
              <div v-if="props.provider && filerLogo_path(props.provider.flatrate)"
                  class="box-close d-flex flex-column align-items-start p-1 " >
              <span style="color: #6c757d; font-style: oblique; font-size:
              0.9rem">
                Disponible en streaming
              </span>
                <span style="color: white ; font-style: oblique; font-size: 0.9rem">
                Regarder Maintenant
              </span>
              </div>
            </div>
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-start">
            <div
                class="film-info">
              <h6 class="film-title text-start">
                {{ props.media.title || props.media.original_name }}
                ({{
                  formatDateYear(props.media.release_date ||
                      props.media.first_air_date)
                }})
              </h6>
              <div class="tagline text-start">{{ props.media.tagline }}</div>
              <div class="meta-info">
                <div class="info-item">
                  <i class="bi bi-calendar"></i>
                  <span v-if="props.media">
  {{ formatDate(props.media.release_date || props.media.first_air_date) }}
                   </span>

                </div>
                <div v-if="media && media.runtime" class="info-item">
                  <i class="bi bi-clock"></i>
                  <span>{{
                      formatRuntime(props.media?.runtime)
                    }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-globe"></i>
                  <span v-if="props.media">{{
                      props.media.original_language
                    }}</span>
                </div>
              </div>
              <div
                  class="genre-bande d-flex justify-content-start align-items-center ">
                <div class="genres">
                <span v-for="genre in props.media.genres"
                      :key="genre.id"
                      class="genre-tag bg-primary text-white">
                  {{ genre.name }}
                </span>
                </div>
                <div class="bande-annonce" style="padding: 0 0 15px 15px">
                  <button v-if="sortedTrailers?.mainTrailer"
                          class="official-trailer btn btn-warning text-black"
                          style=" border-radius: 20px;
                          font-weight: bold;
                          padding: 0.1rem 0.35rem;
                          font-size: 0.70rem;"
                          @click="openTrailerModal(sortedTrailers.mainTrailer)"

                  >
                    Voir la bande-annonce
                  </button>
                  <OfficielTrailer
                      ref="officielTrailerRef"
                      :film-id="Number(route.params.id)"
                      :trailer="sortedTrailers?.mainTrailer"
                  />
                </div>
              </div>

              <div class="synopsis text-start">
                <h3>Synopsis</h3>
                <p style="text-align: justify">{{ props.media.overview }}</p>
              </div>
              <div
                  v-if="hasCreators "
                  class="created-by text-start">
                <div
                     class="info-created ">
                  <p class="d-flex">
                    <span class="fw-semibold me-2">Créateurs(ices) : </span>
                    <span class="text-primary">{{
                        nameCreatedBy(creators)
                      }}</span>

                  </p>
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

.background-wrapper {
  position: relative;
  width: 100%;
  height: 600px !important;
  background-size: cover;
  background-position: top center;
  background-attachment: scroll;
  background-repeat: no-repeat;
  margin-top: 70px; /* Espace pour la navbar */

}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
}

.content-wrapper {
  position: relative;
  padding-top: 20px;
  z-index: 2;


}

.poster-film-provider {
  height: 100%;

}

.providers {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.poster-container{
  border-top-left-radius: 5px;
  overflow: hidden;
  border-top-right-radius: 5px;
}

.film-poster {
  width: 300px ! important;



}

.film-info {
  padding-left: 0;
  color: white;
}

.film-title {
  font-size: 2rem ! important;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
}

.tagline {
  font-size: 1.2rem ! important;
  font-style: italic;
  color: #3498db;
  margin-bottom: 1.3rem;
  text-align: left;
}

.meta-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.2rem;
  justify-content: flex-start;

}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.80rem;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  color: #3498db;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
}

.genre-tag {
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.70rem;
}

.synopsis {
  margin-top: 2.5rem;
  text-align: left;

}

.synopsis h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: bold;
}

.synopsis p {
  line-height: 1.5;
  font-size: 1rem ! important;
  color: #e0e0e0;
  white-space: pre-wrap ! important;
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
  text-align: justify;
  font-family: 'Roboto', sans-serif;


}


@media screen and (max-width: 768px) {
  .background-wrapper {
    height: auto;
    min-height: 100vh;
    margin-top: 50px;
  }


  .synopsis p {
    line-height: 1.3 !important;
    font-size: 1rem !important;
    color: #e0e0e0;
    font-family: 'Roboto', sans-serif;
    overflow: hidden ! important;


  }

  .genre-bande {

    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: center !important;
    gap: 0.20rem !important;
  }

  .content-wrapper {
    padding: 25px;
    width: 100%;
    box-sizing: border-box;
  }

  .row {
    flex-direction: column;
    padding: 0;
    margin: 0; /* Supprime les marges négatives */
  }

  .col-md-4, .col-md-8 {
    width: 93%;
    padding: 10px;
    box-sizing: border-box;
  }

  .poster-container {
    text-align: start;
    margin-bottom: 20px;
    height: 100%;
  }

  .film-poster {
    width: 300px;
    margin: 0 auto;

  }

  .film-info {
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .film-title {
    font-size: 2.5rem; /* Réduit de 3rem */
    text-align: center;
  }

  .tagline {
    font-size: 1.5rem ! important; /* Réduit de 2rem */
    text-align: center;
    margin-bottom: 1rem;
  }

  .meta-info {
    font-size: 1.5rem ! important; /* Réduit de 1.5rem */
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .genres {
    justify-content: start;
    margin-bottom: 1.2rem;
    flex-wrap: wrap;
    width: 100%;


  }

  .synopsis {
    text-align: center;
    margin-top: 1rem;
    padding: 0;
    width: 100%;
  }

  .synopsis h3 {
    font-size: 1.7rem ! important; /* Réduit de 2rem */
    margin-bottom: 0.8rem;
    text-align: left;
  }

  .synopsis p {
    font-size: 1.5rem !important; /* Réduit de 1.3rem */
    line-height: 1.5;
    word-wrap: break-word ! important;
    overflow-wrap: break-word ! important;
    text-align: justify;
    white-space: normal !important;
    padding: 0 ! important;
    margin: 0 ! important;
    box-sizing: border-box;
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;


  }

  .container {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow-x: hidden !important;
    box-sizing: border-box;
  }


}


@media screen and (min-width: 320px) and (max-width: 475px) {
  .background-wrapper {
    height: auto;
    min-height: 100vh;
    margin-top: 30px;
    padding-top: 20px;
  }

  .col-md-4, .col-md-8 {
    width: 90% ! important;
    padding: 10px;
    box-sizing: border-box;
  }

  .content-wrapper {

    margin: 0;
    padding: 0;
  }

  .film-poster {
    width: 150px !important;
  }

  .film-title {
    font-size: 1rem !important;
    margin-top: 0.10rem ! important;
  }

  .tagline {
    font-size: 0.60rem !important;
  }

  .meta-info {
    flex-direction: column !important;
    gap: 0.5rem;
    margin-bottom: 0.60rem !important;
    font-size: 0.30rem !important;
  }

  .genres {
    margin-bottom: 0.40rem !important;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.60rem;
  }

  .genre-tag {
    padding: 0.20rem 0.3rem !important;
    font-size: 0.60rem !important;
  }

  .synopsis h3 {
    font-size: 0.70rem ! important;
  }

  .synopsis {
    margin-top: 0.40rem !important;
    padding: 0 5px !important;
  }

  .synopsis p {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    text-align: justify;
    line-height: 1;
    box-sizing: border-box;
    font-size: 0.65rem !important;
  }

  .row {
    flex-direction: column;
  }

  .col-md-4, .col-md-8 {
    width: 100%;
    padding: 0 10px;
  }

  .film-info {
    margin-top: 0.10rem !important;
    padding: 0;
  }

  .official-trailer {

    width: 5.5rem !important;
    font-size: 0.40rem !important;


  }
}
</style>