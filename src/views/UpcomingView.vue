<script setup lang="ts">

import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import CardFilm from "@/components/CardFilm.vue";
import MoviePagination from "@/components/MoviePagination.vue";


const films = ref<any[]>([]);
const loading = ref<boolean>(false);
const total_pages = ref<number>(0);
const current_pages = ref<number>(1);


const loadMovies = async (page = 1) => {

  try {

    loading.value = true;
    const response = await movieService.getUpcomingMovies(page);
    films.value = response.results.map((film: {
      id: number;
      title: string;
      poster_path: string;
      release_date: string;
      Spoken_languages: string;
    }) => {
      return {
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
        release_date: new Date(film.release_date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),

        Spoken_languages: film.Spoken_languages,

      }
    });
    total_pages.value = response.total_pages;
    current_pages.value = page;
    loading.value = false;

  } catch (error) {

    console.log(error);
    throw error;

  } finally {
    loading.value = false;
  }
}



onMounted(() => {

  loadMovies();

})


</script>

<template>

  <div class="container-fluid upcoming-movies overflow-scrollable p-5">

    <div class="pagination">
      <div class="container-fluid upcoming-movies overflow-scrollable">
        <div class="d-flex justify-content-start  p-5  ">
          <h3 class="titre-princ ">Films à venir</h3>
        </div>
        <div v-if="loading" class="loading">
          Chargement...
        </div>

        <div v-else class="container-fluid px-4">
          <div class="row row-cols-5 g-4">
            <div class="col" v-for="film in films" :key="film.id">
              <CardFilm
                  :title="film.title"
                  :poster_path="'https://image.tmdb.org/t/p/w500' +film.poster_path"
                  :release_date="film.release_date"
                  :id="film.id"/>
            </div>
          </div>
        </div>
      <MoviePagination
          :total_pages="total_pages"
          :current_pages="current_pages"
          @pageChange="loadMovies">

      </MoviePagination>
      </div>
    </div>
  </div>

</template>

<style scoped>

.upcoming-movies {
  min-height: 100vh;
}

.pagination {
  margin-top: 2rem;
  text-align: center;
}

/* Media queries pour le responsive */
@media (max-width: 1200px) {
  .row-cols-5 > * {
    flex: 0 0 auto;
    width: 25%; /* 4 cartes par ligne */
  }
}

@media (max-width: 992px) {
  .row-cols-5 > * {
    width: 33.333333%; /* 3 cartes par ligne */
  }
}

@media (max-width: 768px) {
  .row-cols-5 > * {
    width: 50%; /* 2 cartes par ligne */
  }
}

@media (max-width: 576px) {
  .row-cols-5 > * {
    width: 100%; /* 1 carte par ligne */
  }
}
</style>