<script setup lang="ts">

import {computed, ref} from "vue";
import router from "@/router";
import fallBack from "@/assets/OIP.jpg";
import {KnownFor} from "@/entities/knownFor";

const props = defineProps<{

  filmsConnus ?: KnownFor;

}>();


const imageLoaded = ref<{ [key: number]: boolean }>({});

// Assurer que castMember est toujours un tableau
const safeCastMember = computed(() => props.filmsConnus?.castMember || []);

const handleImageLoad = (filmId: number) => {
  imageLoaded.value[filmId] = true;
};

const navigateToDetail = ( id : number, event?: Event) => {
  if (event?.preventDefault) {
    event.preventDefault();
  }

  if (id) {
    router.push({
      name: 'FilmSingle',
     params: { id: id.toString() },
    });
  }
};
</script>

<template>
  <div class="container recommendation-list">
    <h5
        class="recommendation-title d-flex fw-bold"
        style="align-items: flex-start; font-family: 'Bahnschrift' , sans-serif;">Célèbre pour
    </h5>
    <div class="recommendations-scroll">
      <div  class="recommendations-row">
        <div v-for="filmItem in safeCastMember"
             :key="filmItem.id"
             class="recommendation-card">

          <div class="card border-1 border-emphasis card-fixed-size">

            <div
                class="img-container position-relative"
                @click="navigateToDetail(filmItem.id, $event)"
            >
              <div v-if="!imageLoaded[filmItem.id]" class="skeleton-loader"></div>
              <img
                  :src=" filmItem.backdrop_path ? 'https://image.tmdb.org/t/p/w500' + filmItem.backdrop_path : fallBack "
                   @error="($event.target as HTMLImageElement).src = fallBack"
                   @load="handleImageLoad(filmItem.id)"
                   class="card-img-top"
                   :alt="filmItem.title"
              >
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title-bottom fw-bold" style="color:#374558;font-size: 0.85rem">{{ filmItem.title }}</h6>
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
  padding: 1rem ;
  margin: 0 -1rem;
  width: 100%;
  white-space: nowrap;
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
  width: 14rem;
  height: 140px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.card-fixed-size:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.img-container {
  height: 300px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px 10px 10px 10px;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  height: 30px;
  padding: 0.5rem 0.75rem;

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