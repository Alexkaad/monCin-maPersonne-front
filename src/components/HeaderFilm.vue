<script setup lang="ts">

import {useRouter} from "vue-router";



const router = useRouter();

const goToUpcoming = async () => {
  try {

    await router.push({ name: 'UpcomingMovies' })
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }
}

const goToPopular = async () => {
  try {

    await router.push({name: 'PopularMovies'})
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }

}

const goToNowPlaying = async () => {
  try {

    await router.push({ name: 'NowPlayingMovies' })
    // ou si vous préférez utiliser le chemin
    // await router.push('/popular')
  } catch (error) {
    console.error('Erreur de navigation:', error)
  }
}



</script>

<template>

  <nav class="navbar g-3 m-0 ">
    <div class="container d-flex justify-content-between align-items-center p-1">
      <!-- Logo group -->
      <div class="logo-group">
        <h1 class="mb-0 fs-1 fw-bold titre-style" style="font-weight:900">MyCP</h1>
        <i class="bi bi-camera-reels fw-bold text-black"></i>
      </div>

      <!-- Navigation links -->
      <ul class="nav-links list-unstyled d-flex mb-0 fw-bold fs-5">
        <li @click="goToUpcoming" class="nav-link">À venir</li>
        <li @click="goToPopular" class="nav-link">Populaire</li>
        <li @click="goToNowPlaying" class="nav-link">En salle</li>
      </ul>

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
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin: 0 2rem;
}

.nav-link {
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983; /* ou la couleur de votre choix */
}


.titre-style {

  color: black;
  font-family: "Leelawadee UI", sans-serif;

}
</style>