<script setup lang="ts">

import {onMounted, ref} from "vue";
import {movieService} from "@/service/TmbdService";
import CardFilm from "@/components/CardFilm.vue";

const films = ref<any[]>([]);
const loading = ref<boolean>(false);
const total_pages = ref<number>(0);
const current_pages = ref<number>(1);


const loadMovies = async (page: number = 1) => {

  try {

    loading.value = true;
    const response = await movieService.getUpcomingMovies(page);
    films.value = response.results.map((film: {
      title: string;
      poster_path: string;
      release_date: string;
    }) => {
      return {
        title: film.title,
        poster_path: film.poster_path,
        release_date: film.release_date
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

const changePage = async (newPage: number, event?: Event) => {

  if (event) {
    event.preventDefault();
  }

  if (newPage >= 1 && newPage <= total_pages.value) {
    await loadMovies(newPage);
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
              />
            </div>
          </div>
        </div>
        <div class="pagination  d-flex align-content-center justify-content-center ">
          <div class="pagination align-items-center ">
            <button class="btn btn btn-outline-warning "
                    :disabled="current_pages === 1"
                    @click="(event)=>changePage(current_pages - 1,event)"
            >
              Précédent
            </button>
            <span class="p-1">Page {{ current_pages }} sur {{ total_pages }}</span>
            <button class="btn btn-outline-success "
                    :disabled="current_pages === total_pages"
                    @click="(event)=>changePage(current_pages + 1,event)"
            >
              Suivant
            </button>
          </div>
        </div>

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