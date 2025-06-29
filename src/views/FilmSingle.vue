<script setup lang="ts">

import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import {useRoute} from "vue-router";
import DetailFilm from "@/components/DetailFilm.vue";

const film = ref<any>({});

const loading = ref<boolean>(false);
const route = useRoute();

const LoadFilmSingle = async () => {

  const movieId = Number(route.params.id);
  console.log("ID reçu:", movieId, "Type:", typeof movieId);


  if (!movieId) {
    console.error("ID du film non trouvé");
    return;
  }


  try {

    loading.value = true;

    const response =  await movieService.getMovieById(movieId);
    film.value =  {

        title : response.title,
        poster_path : response.poster_path,
        release_date : response.release_date,
        overview : response.overview,
        genres : response.genres,
        runtime : response.runtime,
        backdrop_path : response.backdrop_path,
        tagline : response.tagline,
      languages: response.spoken_languages?.map((lang: any) => lang.name).join(', ') || ''

    }
    console.log("Film mappé:", film.value); // Ajoutez ce log


  }catch (error) {

    console.log(error);
    throw error;
  }finally {

    loading.value = false;
  }
}

onMounted(() => {

  LoadFilmSingle();
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
          :movie-poster="'https://image.tmdb.org/t/p/w500'+film.poster_path"
          :movie-title="film.title || '' "
          :movie-release-date="film.release_date || ''"
          :movie-overview="film.overview || ''"
          :movie-runtime="film.runtime || 0"
          :movie-genres="film.genres || []"
          :movie-backdrop="film.backdrop_path || ''"
          :movie-tagline="film.tagline || ''"
          :movie-spoken-languages="film.languages || ''"
      />
    </div>
  </div>



</template>

<style scoped>

.film-single-view {
  height: 30% ! important;
  max-width: 100%;
  padding:0  !important;
  background: linear-gradient(to bottom, #ECF0F1, #F8F9FA);
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




@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .film-single-view {
    padding: 1rem;
  }
}


</style>