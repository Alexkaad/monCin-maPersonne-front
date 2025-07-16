<script setup lang="ts">

import {Trailer} from "@/entities/Trailer";
import {computed, ref, watch} from "vue";

const props = defineProps<{
  trailer: Trailer | undefined;
  filmId: string | number;

}>();

const selected = ref<Trailer | null>(null);
const isModalOpen = ref(false);
const selectedVideoKey = ref<string>('');
const origin = computed(() => window.location.origin);


const openModal = (videoKey: string): void => {
  selectedVideoKey.value = videoKey;
  isModalOpen.value = true;
};

const closeModal = (): void => {
  selectedVideoKey.value = '';
  isModalOpen.value = false;
};

// Exposer la méthode openModal pour le composant parent
defineExpose({
  openModal
});


// Watch avec typage
watch(() => props.trailer, (newTrailer: Trailer | undefined) => {
  if (newTrailer) {
    selected.value = newTrailer;
  } else {
    selected.value = null;
  }
}, {immediate: true});


</script>

<template>
  <div class="container trailers-section ">
    <!-- ... votre code existant ... -->

    <!-- Modal -->
    <div v-if="isModalOpen" class="video-modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <button class="close-button p-5" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="modal-video-container p-3">
          <iframe
              :src="`https://www.youtube.com/embed/${selectedVideoKey}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&playsinline=1&autoplay=1&mute=1&loop=1&playlist=${selectedVideoKey}&origin=${origin}&enablejsapi=1`"
              width="100%"
              height="100%"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin-top: 70px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  aspect-ratio: 16/9;
  z-index: 1001;
}

.modal-video-container {
  width: 100%;
  height: 100%;
  background-color: black;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -40px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  z-index: 9999; /* Augmentation du z-index */
  transition: color 0.3s ease;

}

.close-button:hover {
  color: #dc3545;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }

  .close-button {
    top: -35px;
    right: 10px;
  }
}



</style>