<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";



const router = useRouter();

const goToUpcoming = async (event : Event) => {

  if(event?.preventDefault)
  {
    event.preventDefault();
  }
  try {

    await router.push({ name: 'UpcomingMovies' })
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }
}

const goToPopular = async (event : Event) => {
  if(event?.preventDefault)
  {
    event.preventDefault();
  }

  try {

    await router.push({name: 'PopularMovies'})
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }

}

const goToNowPlaying = async (event : Event) => {

  if(event?.preventDefault)
  {
    event.preventDefault();
  }

  try {

    await router.push({ name: 'NowPlayingMovies' })
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }
}

const showHeader = ref(true);
let lastScroll = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    // on descend → cacher
    showHeader.value = false;
  } else {
    // on remonte → afficher
    showHeader.value = true;
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll; // éviter scroll négatif
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

</script>

<template>

  <nav
      :style="{ transform: showHeader ? 'translateY(0)' : 'translateY(-100%)' }"
      class="m-0 navbar fixed-top navbar-expand-lg bg-white shadow transition-header "
  >
    <div class="container d-flex align-items-center p-1 ">
      <!-- Logo group -->
      <div class ="logo-group d-flex justify-content-between" style="width: 28%">
      <div class="logo-group">
        <h1 class="mb-0 fs-1 fw-bold titre-style" style="font-weight:900">MyCP</h1>
        <i class="bi bi-camera-reels fw-bold text-black"></i>
      </div>

      <!-- Navigation links -->
      <div class="dropdown ">
        <a
            class=" dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="font-size: 18px;font-weight: bold;"

        >
          Film
        </a>
        <ul class="dropdown-menu list-unstyled fw-bold ">
          <li
              @click="goToUpcoming"
              class="dropdown-item"
              style="font-size: 15px"
          >À venir
          </li>
          <li
              @click="goToPopular"
              class="dropdown-item fs-6"
              style="font-size: 15px">
            Populaire
          </li>
          <li
              @click="goToNowPlaying"
              class="dropdown-item fs-6"
              style="font-size: 15px"
          >
            En salle
          </li>
        </ul>
      </div>
      </div>
      <!-- User icon -->
      <div class="icon-person">
        <i class="bi bi-person text-black fs-4 fw-bolder"></i>
      </div>
    </div>
  </nav>


</template>

<style scoped>

.navbar {
  height: 70px;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: visible !important;
}

.dropdown-toggle::after {
  display: none !important;
}
.dropdown-toggle:hover{
  cursor: pointer;
  color: #42b983;

}
.logo-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar:hover {

  overflow-y: scroll;
}

.dropdown-item {
  cursor: pointer;
  transition: color 0.3s ease;
}

.dropdown-item:hover {
  color: #42b983; /* ou la couleur de votre choix */
}


.titre-style {

  color: black;
  font-family: "Leelawadee UI", sans-serif;

}
</style>