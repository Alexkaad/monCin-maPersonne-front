<script setup lang="ts">

import {Film} from "@/entities/Film";
import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import {useRoute} from "vue-router";
import DetailFilm from "@/components/DetailFilm.vue";
import { ProviderTv} from "@/entities/ProviderTv";


const serie = ref<Film>();
const loading = ref(true);
const route = useRoute();
const provider = ref<ProviderTv>();




const LoadSerieSingle = async () => {
  const serieId = Number(route.params.id);
  if (!serieId) {
    console.error("ID du film non trouvé");
    return;
  }

  try {
    loading.value = true;

    const response = await movieService.getSerieById(serieId);

    const mappedFilm: Film = {
      id: response.id,
      title: response.title,
      poster_path: response.poster_path,
      release_date: response.release_date,
      overview: response.overview,
      genres: response.genres, // ici tu gardes tel quel ou tu transformes si besoin
      runtime: response.runtime,
      backdrop_path: response.backdrop_path,
      tagline: response.tagline,
      original_language: response.original_language,
      created_by: response.created_by,
      original_title: response.original_title,
      name: response.name,
      first_air_date: response.first_air_date,
      networks: response.networks,
      original_name:response.original_name
    };
    console.log("Serie mappé:", serie);
    return serie.value = mappedFilm;


  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    loading.value = false;
  }
};




const loadProvider = async () => {

  const serieId = Number(route.params.id);

  if(!serieId)
  {
    console.error('Id du film non trouver afin d\'afficher les acteurs');
    return;
  }

  try{

    const response = await movieService.getWatchProviderTv(serieId);
    provider.value = response;

    console.log('Provider:', provider);
  }catch(error) {

    console.log(error);
    throw error;
  }
}


onMounted(() => {
  LoadSerieSingle();
  loadProvider();
})

</script>

<template>

  <div class="container-fluid film-single-view" >
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>
    <div  v-else>
      <DetailFilm
          :media="serie"
          :provider="provider"

      />
    </div>
  </div>
</template>

<style scoped>

.film-single-view {
  max-width: 100%;
  padding:0  !important;
  background: linear-gradient(to bottom, #ECF0F1, #F8F9FA);
  height: auto !important;
  min-height: unset !important;

}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .film-single-view {
    padding: 0;
  }

}
</style>