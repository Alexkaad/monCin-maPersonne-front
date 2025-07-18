<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";


const props = defineProps<{
  recommendations: Array<{
    id: number;
    title: string;
    poster_path: string;
  }>;
}>();


const imageLoaded = ref<{ [key: number]: boolean }>({});



const handleImageLoad = (filmId: number) => {
  imageLoaded.value[filmId] = true;
};

const navigateToDetail = (filmId: number) => {
  if (filmId) {
    router.push({
      name: 'FilmSingle',
      params: { id: filmId.toString() }
    });
  }
}
</script>

<template>
  <div class="container recommendation-list">
    <hr>
    <h5 class="recommendation-title d-flex" style="align-items: flex-start">Récommendations</h5>
    <div class="recommendations-scroll">
      <div class="recommendations-row">
        <div v-for="film in props.recommendations"
             :key="film.id"
             class="recommendation-card">
          <div class="card border-1 border-emphasis card-fixed-size">
            <div class="img-container position-relative"
                 @click="navigateToDetail(film.id)">
              <div v-if="!imageLoaded[film.id]" class="skeleton-loader"></div>
              <img :src="'https://image.tmdb.org/t/p/w500' + film.poster_path || '@/assets/OIP.jpg'"
                   @error="($event.target as HTMLImageElement).src = require('@/assets/OIP.jpg')"
                   @load="handleImageLoad(film.id)"
                   class="card-img-top"
                   :alt="film.title"
              >
            </div>
            <div class="card-body d-flex flex-column">
              <h6 class="card-title-bottom fw-bold" style="color:#374558;">{{ film.title }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>


.recommendation-list {
  margin: 1rem auto;
  padding: 0 15px;
}

.recommendation-title {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: #374558;
}

.recommendations-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0;
  margin: 0 -1rem;
}


/* Style de la barre de défilement */
.recommendations-scroll::-webkit-scrollbar {
  height: 8px;
}

.recommendations-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.recommendations-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.recommendations-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.recommendations-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  padding: 0 1rem;
}

.recommendation-card {
  flex: 0 0 auto;
}

.card-fixed-size {
  width: 10rem;
  height: 250px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.card-fixed-size:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.img-container {
  height: 340px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.skeleton-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}


</style>