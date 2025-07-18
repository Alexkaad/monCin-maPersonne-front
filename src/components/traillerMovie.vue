<script setup lang="ts">
import { ref, watch } from 'vue'
import { Trailer} from "@/entities/Trailer";


// Définition des props
const props = defineProps<{
  trailers: Trailer[];
  filmId: string | number;
}>();

// Typage correct des refs
const selected = ref<Trailer | null>(null);
const iframeRef = ref<HTMLIFrameElement | null>(null);


// Méthode pour sélectionner un trailer
const selectTrailer = (selectedTrailer: Trailer): void => {
  selected.value = selectedTrailer;
};

// Méthode pour formater la date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Watch avec typage
watch(() => props.trailers, (newTrailers: Trailer[]) => {
  if (newTrailers?.length > 0) {
    // Sélectionner la première vidéo de la liste sans filtrage supplémentaire
    selected.value = newTrailers[0];
    console.log('selected.value', selected.value);
  } else {
    selected.value = null;
  }
}, {immediate: true});




</script>

<template>
  <div class="container trailers-section">
    <hr>
    <h5  class="title-trailer text-center fw-bold text-warning">
      Teasers et Making-of
    </h5>
    <!-- Lecteur vidéo principal -->
    <div v-if="selected" class="main-video mb-4 align-items-start">
      <div class="video-container">
        <iframe
            ref="iframeRef"
            :src="`https://www.youtube.com/embed/${selected.key}`"
            :title="selected.name"
            width="65%"
            height="440"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen

        ></iframe>
    <!-- Liste des trailers disponibles -->
    <div class="trailers-list container">
      <h5 class="d-flex align-items-start fw-bold">Vidéos disponibles</h5>
      <div class="trailers-scroll">
        <div class=" wrapper-list row flex-nowrap">
          <div v-for="trailer in props.trailers"
               :key="trailer.id"
               class="col-auto trailer-item"
               :class="{ active: selected?.id === trailer.id }"
               @click="selectTrailer(trailer)">
            <div class="trailer-content">
              <div class="trailer-thumbnail">
                <img
                    :src="`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`"
                    :alt="trailer.name"
                />
              </div>
              <div class="trailer-info">
                <p class="trailer-title">{{ trailer.name }}</p>
                <span class="trailer-date">
                  {{ formatDate(trailer.published_at) }}
                </span>
                <span v-if="trailer.official" class="official-badge">Officiel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>

</template>

<style scoped>
.trailers-scroll {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0;
}

/* Styles pour la barre de défilement */
.trailers-scroll::-webkit-scrollbar {
  display: block;
  height: 8px;
}



.trailers-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

.trailers-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.row.flex-nowrap {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 10px; /* Espace pour la barre de défilement */
}

.trailer-item {
  width: 250px;
  padding: 0 10px;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}

.trailer-content {
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.trailer-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.trailer-thumbnail img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.trailer-info {
  padding: 1rem;
}

.trailer-title {
  font-size: 0.70rem;
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
}

.trailer-date {
  display: block;
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.official-badge {
  background-color: #007bff;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  display: inline-block;
  margin-top: 0.5rem;
}

.trailer-item.active .trailer-content {
  border: 2px solid #007bff;
}




</style>