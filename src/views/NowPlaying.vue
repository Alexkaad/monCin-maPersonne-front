<script setup lang="ts">

import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import CardFilm from "@/components/CardFilm.vue";
import MoviePagination from "@/components/MoviePagination.vue";




const films = ref<any[]>([]);
const loading = ref<boolean>(false);
const total_pages = ref<number>(0);
const current_pages = ref<number>(1);


const loadMoviesNowPlaying = async (page = 1) => {

  try {

    loading.value = true;
    const response = await movieService.getNowPlayingMovie(page);

    films.value = response.results.map((film : {
      title: string;
      poster_path: string;
      release_date: string;
      id: number;
    })=> {
      return {
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
        release_date: new Date(film.release_date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),

      }
    });

    total_pages.value = response.total_pages;
    current_pages.value = page;
    loading.value = false;

  }catch (error) {

    console.log(error);
    throw error;

  } finally {
    loading.value = false;
  }
}

onMounted(() => {

  loadMoviesNowPlaying();
})

</script>

<template>

  <div class="container-fluid nowPlaying-movies-princ overflow-scrollable p-5">

    <div class="pagination">
      <div class="container-fluid nowPlaying-movies overflow-scrollable">
        <div class="d-flex justify-content-center  p-3  ">
          <h4 class="titre-princ ">Films à venir</h4>
        </div>
        <div v-if="loading" class="loading">
          Chargement...
        </div>

        <div v-else class="container-fluid d-flex px-4">
          <div class="vide" style="width:100%; height: auto"></div>
          <div class="row row-cols-6 " style="gap: 30px 35px">
            <div class="col" v-for="film in films" :key="film.id">
              <CardFilm
                  :title="film.title"
                  :poster_path="'https://image.tmdb.org/t/p/w500' +film.poster_path"
                  :release_date="film.release_date"
                  :id="film.id"
              />
            </div>
          </div>
        </div>

        <MoviePagination
            :total_pages="total_pages"
            :current_pages="current_pages"
            @pageChange="loadMoviesNowPlaying"
        />
      </div>
    </div>
  </div>


</template>

<style scoped>

.nowPlaying-movies {
  min-height: 100vh;
  background-color: #F8F9FA;
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