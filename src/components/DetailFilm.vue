<script setup lang="ts">

import {ref} from "vue";

defineProps<{

  movieTitle: string,
  moviePoster: string,
  movieReleaseDate: string,
  movieOverview: string,
  movieRuntime: number | string,
  movieGenres:  Array<{ id: number, name: string }>,
  movieBackdrop: string,
  movieTagline: string,
  movieSpokenLanguages: string,

}>();

const posterLoad = ref(false)


const handlePosterLoad = () => {
  posterLoad.value = true;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
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

</script>

<template>

  <div class="background-wrapper"
       :style="movieBackdrop ? {
         backgroundImage: `url(https://image.tmdb.org/t/p/original${movieBackdrop})`
       } : {}">
    <div class="overlay"></div>
    <div class="content-wrapper">
      <div class="container mt-5">
        <div class="row align-items-start">
          <div class="col-md-4">
            <div class="poster-container">
              <img :src="moviePoster || '@/assets/OIP.jpg'"
                   class="film-poster"
                   @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                   @load="handlePosterLoad"
                   alt="image-film">
            </div>
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-start">
            <div class="film-info">
              <h1 class="film-title text-start">{{ movieTitle }}</h1>
              <div class="tagline text-start">{{ movieTagline }}</div>

              <div class="meta-info">
                <div class="info-item">
                  <i class="bi bi-calendar"></i>
                  <span>{{ formatDate(movieReleaseDate) }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-clock"></i>
                  <span>{{ formatRuntime(movieRuntime) }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-globe"></i>
                  <span>{{ movieSpokenLanguages }}</span>
                </div>
              </div>

              <div class="genres">
                <span v-for="genre in movieGenres"
                      :key="genre.id"
                      class="genre-tag bg-primary text-white">
                  {{ genre.name }}
                </span>
              </div>

              <div class="synopsis text-start">
                <h3>Synopsis</h3>
                <p>{{ movieOverview }}</p>
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
  height: 600px;
  background-size: cover;
  background-position: top center;
  background-attachment: scroll;
  background-repeat: no-repeat;
  margin-top: 60px; /* Espace pour la navbar */
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
  padding-top: 30px;
  z-index: 2;
}

.poster-container {
  margin-bottom: 1rem;
}

.film-poster {
  width: 300px;
  border-radius: 10px;

}

.film-info {
  padding-left: 0;
  color: white;
}

.film-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
}

.tagline {
  font-size: 1.2rem;
  font-style: italic;
  color: #3498db;
  margin-bottom: 1.5rem;
  text-align: left;
}

.meta-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  justify-content: flex-start;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  color: #3498db;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
}

.genre-tag {
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
}

.synopsis {
  margin-top: 2rem;
  text-align: left;
}

.synopsis h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.synopsis p {
  line-height: 1.6;
  font-size: 1.1rem;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .film-info {
    margin-top: 2rem;
  }

  .background-wrapper {
    margin-top: 40px;
  }
}

</style>