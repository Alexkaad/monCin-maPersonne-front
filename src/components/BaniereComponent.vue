<script setup>
import {ref, computed, watch, onMounted} from 'vue';
import {useColorStore} from "@/store/ColorStore";


const props = defineProps({

  posterUrl: String,
  title: String,
  releaseDate: String,
})
const isImageLoaded = ref(false);
const colorStore = useColorStore();

const bannerStyle = computed(() => ({
  background: `linear-gradient(to right, ${colorStore.dominantColorRGB}, rgba(0, 0, 0, 0.4))`,
  borderBottom: `1px solid ${colorStore.dominantColorRGB}`,
  opacity: isImageLoaded.value ? 1 : 0.6,
  transition: 'all 0.5s ease-in'
}));

// Fonction pour extraire la couleur
const extractColor = async () => {
  isImageLoaded.value = false;

  const fullImageUrl = `https://image.tmdb.org/t/p/w500${props.posterUrl}`;

  try {
    await colorStore.extractDominantColor(fullImageUrl);
  } catch (error) {
    console.error("Erreur lors de l'extraction de la couleur:", error);
  } finally {
    isImageLoaded.value = true;
  }
};

onMounted(() => {
  // On ne bloque pas l’affichage
  extractColor();
});


// Watcher pour détecter les changements d'URL
watch(() => props.posterUrl, async (newUrl) => {
  if (newUrl) {
    await extractColor();
  }
}, { immediate: true });

// Pas besoin de onMounted car le watch avec immediate fait le travail
</script>

<template>
  <div class="banner" :style="bannerStyle">
    <div class="banner-content">
      <div class="poster-container">
        <img
            :src="'https://image.tmdb.org/t/p/w500' + posterUrl"
            :alt="title"
            class="poster-image"
            crossorigin="anonymous"
            @load="extractColor"
        />
      </div>
      <div class="title-container d-flex justify-content-center p-2">
        <h2 class="p-1">{{ title }}</h2>
        <h2 class="p-1">({{ releaseDate }})</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  min-height: 100px;
}

.banner {
  width: 100%;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  transition: all 0.3s ease;
  opacity: 0;
}

.banner-content {
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
  z-index: 1;
}

.poster-container {
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
}

.poster-image {
  width: 60px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-container {
  flex-grow: 1;
}
</style>