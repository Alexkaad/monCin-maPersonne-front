<script setup lang="ts">

import MoviePagination from "@/components/MoviePagination.vue";

import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import CardSerie from "@/components/CardSerie.vue";



const series = ref<any[]>([]);
const loading = ref<boolean>(false);
const total_pages = ref<number>(0);
const current_pages = ref<number>(1);


const loadTvAirToday = async (page = 1) => {

  try {

    loading.value = true;
    const response = await movieService.getSerieTvOnAir(page);

    series.value = response.results.map((serie : {
      original_name: string;
      poster_path: string;
      first_air_date: string;
      id: number;
    })=> {
      return {
        id: serie.id,
        original_name: serie.original_name,
        poster_path: serie.poster_path,
        first_air_date:
            new Date(serie.first_air_date).toLocaleDateString('fr-FR', {
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

  loadTvAirToday();
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
            <div class="col" v-for="serie in series" :key="serie.id">
              <CardSerie
                  :original_name="serie.original_name"
                  :poster_path="
                  'https://image.tmdb.org/t/p/w500'+ serie.poster_path"
                  :id="serie.id"
                  :first_air_date="serie.first_air_date"
              />
            </div>
          </div>
        </div>

        <MoviePagination
            :total_pages="total_pages"
            :current_pages="current_pages"
            @pageChange="loadTvAirToday"
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