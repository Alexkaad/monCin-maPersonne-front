<script setup lang="ts">
import {computed, CSSProperties, onMounted, ref} from "vue";
import ColorThief from "colorthief";

const props = defineProps<{
  posterUrl: string;
  title: string;
  releaseDate: string;
}>();

const dominantColor = ref('rgb(0, 0, 0)');
const isImageLoaded = ref(false);
const colorCache = new Map();

const bannerStyle = computed<CSSProperties>(() => ({
  background: `linear-gradient(to right, ${dominantColor.value}, rgba(0, 0, 0, 0.4))`,
  borderBottom: `1px solid ${dominantColor.value}`,
  opacity: isImageLoaded.value ? 1 : 0,
  transition: 'opacity 0.3s ease-in'
}));

const extractDominantColor = async (imgElement: HTMLImageElement): Promise<string> => {
  try {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(imgElement);
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  } catch (error) {
    console.error('Erreur lors de l\'extraction de la couleur:', error);
    return 'rgb(0, 0, 0)';
  }
};

const preloadAndProcessImage = async () => {
  if (!props.posterUrl) return;

  const fullUrl = `https://image.tmdb.org/t/p/w500${props.posterUrl}`;

  // Vérifier si la couleur est en cache
  if (colorCache.has(fullUrl)) {
    dominantColor.value = colorCache.get(fullUrl);
    isImageLoaded.value = true;
    return;
  }

  // Créer une nouvelle image pour le préchargement
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = async () => {
    const color = await extractDominantColor(img);
    colorCache.set(fullUrl, color);
    dominantColor.value = color;
    isImageLoaded.value = true;
  };

  img.onerror = () => {
    dominantColor.value = 'rgb(0, 0, 0)';
    isImageLoaded.value = true;
  };

  img.src = fullUrl;
};

onMounted(() => {
  preloadAndProcessImage();
});

</script>

<template>

  <div class="banner" :style="bannerStyle">
    <div class="banner-content">
      <div class="poster-container">
        <img
            :src="`https://image.tmdb.org/t/p/w500${posterUrl}`"
            :alt="title"
            class="poster-image"
            crossorigin="anonymous"
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

.title-container h2 {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
  }

  .poster-image {
    width: 200px;
  }

  .title-container h2 {
    font-size: 1.8rem;
  }
}

</style>