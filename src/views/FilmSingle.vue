<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {movieService} from "@/service/TmbdService";
import {useRoute} from "vue-router";
import DetailFilm from "@/components/DetailFilm.vue";
import MainActors from "@/components/MainActors.vue";
import TraillerMovie from "@/components/traillerMovie.vue";
import {SortedTrailers, Trailer} from "@/entities/Trailer";
import CardRecommendation from "@/components/CardRecommendation.vue";





const film = ref<any>({});
const cast = ref<any[]>([]);
const sortedTrailer = ref<SortedTrailers>({
  mainTrailer: undefined,
  otherVideos: []
});



const loading = ref<boolean>(false);
const loadingCast = ref(false)
const loadingTrailer = ref(false)
const route = useRoute();
const loadingRecommendation = ref<boolean>(false);
const recommendations = ref<any[]>([]);

watch(
    () => route.params.id,
    async (newId) => {
      if (newId) {
        // Réinitialiser les états
        loading.value = true;
        loadingCast.value = true;
        loadingTrailer.value = true;
        loadingRecommendation.value = true;

        // Recharger toutes les données
        await Promise.all([
          LoadFilmSingle(),
          fetchCreditMovie(),
          fetchTrailers(),
          fetchRecommendation()
        ]);
      }
    }
);



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

const fetchCreditMovie = async () => {



  const movieId = Number(route.params.id);

  if(!movieId)
  {
    console.error('Id du film non trouver afin d\'afficher les acteurs');
    return;
  }

   try {

    loadingCast.value = true;

    const response = await movieService.getCreditMovie(movieId);
     console.log('Réponse brute credit:', response); // Pour déboguer


     if (!response || !response.cast) {
       console.error('Données de casting invalides');
       cast.value = [];
       return;
     }

     cast.value = response.cast.map((cast : {
      id: number,
      name: string,
      character: string,
      profile_path: string | null,

    })=> {

      return {
        id: cast.id,
        name: cast.name,
        role: cast.character, // 'character' de l'API devient 'role' dans notre interface
        poster_path: cast.profile_path
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : '@/assets/OIP.jpg',
      }

   });


}catch(error) {

     console.log(error);
     throw error;

   }finally{

    loadingCast.value = false;
  }
}

const fetchTrailers = async () => {
  const movieId = Number(route.params.id);
  if (!movieId) {
    console.error('Id du film non trouvé afin d\'afficher les trailers');
    return;
  }

  try {
    loadingTrailer.value = true;
    const response = await movieService.getTrailer(movieId);

    if (!response || !response.results || response.results.length === 0) {
      console.error('Données de trailers invalides ou vides');
      sortedTrailer.value = { mainTrailer: undefined, otherVideos: [] };
      return;
    }

    // Classer les vidéos par ordre de priorité
    const videos = response.results.sort((a: Trailer, b: Trailer) => {
      // Trier par date de publication (plus récent en premier)
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });

    // Trouver la bande-annonce principale
    let mainTrailer = findMainTrailer(videos);

    // Si aucune bande-annonce principale n'est trouvée, prendre la première vidéo
    if (!mainTrailer && videos.length > 0) {
      mainTrailer = videos[0];
    }

    // Toutes les autres vidéos (exclure la bande-annonce principale si elle existe)
    const otherVideos = videos.filter((video: Trailer) => video.id !== mainTrailer?.id);

    console.log('Nombre total de vidéos:', videos.length);
    console.log('Main Trailer:', mainTrailer);
    console.log('Other Videos:', otherVideos);

    sortedTrailer.value = {
      mainTrailer,
      otherVideos
    };

  } catch (error) {
    console.error('Erreur lors de la récupération des trailers:', error);
    sortedTrailer.value = { mainTrailer: undefined, otherVideos: [] };
  } finally {
    loadingTrailer.value = false;
  }
};

// Fonction améliorée pour trouver la bande-annonce principale
function findMainTrailer(videos: Trailer[]): Trailer | undefined {
  // Essayer différentes stratégies pour trouver la bande-annonce principale
  return videos.find((video: Trailer) => {
    const name = video.name.toLowerCase();
    const isOfficial = video.official;
    const isFrench = video.iso_639_1 === 'en';
    const isTrailer = video.type === 'Trailer';

    // Vérifier différentes conditions possibles
    return (
        // Condition 1: Bande-annonce officielle en français
        (isTrailer && isOfficial && isFrench) ||
        // Condition 2: Contient "bande-annonce" dans le nom
        (isTrailer && name.includes('bande-annonce')) ||
        // Condition 3: Contient "trailer" dans le nom
        (isTrailer && name.includes('trailer')) ||
        // Condition 4: Est une vidéo officielle en français
        (isOfficial && isFrench)
    );
  });
}

const fetchRecommendation = async (): Promise<void> => {
  const movieId = Number(route.params.id);

  if (!movieId) {
    console.error("Id du film non trouvé afin d'afficher les recommandations");
    return;
  }

  try {
    loadingRecommendation.value = true;
    const response = await movieService.getRecommendationMovie(movieId);
    recommendations.value = response.results.map((film: {
      title: string;
      poster_path: string;
      id: number;
    }) => ({
      title: film.title,
      poster_path: film.poster_path,
      id: film.id,
    }));

  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    loadingRecommendation.value = false;
  }
};

onMounted(() => {

  LoadFilmSingle();
  fetchCreditMovie();
  fetchTrailers();
  fetchRecommendation()

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
          :sorted-trailer="sortedTrailer"
      />
    </div>

    <div v-if="loadingCast" class="loading-container">
      <div class="spinner"></div>
      <p>Chargement du casting...</p>
    </div>
    <MainActors
        v-else-if="cast.length > 0"
        :cast="cast"
    />
    <div v-if="loadingTrailer" class="loading-container">
      <div class="spinner"></div>
      <p>Chargement des bandes-annonces...</p>
    </div>
    <TraillerMovie
        v-else-if="sortedTrailer.otherVideos.length > 0"
        :trailers="sortedTrailer.otherVideos"
        :film-id="Number(route.params.id)"
    />
    <div v-if="loadingRecommendation" class="loading-container">
      <div class="spinner"></div>
      <p>Chargement du Recommendations..</p>
    </div>

    <CardRecommendation
        v-else-if="recommendations.length > 0"
        :recommendations="recommendations"
    />

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