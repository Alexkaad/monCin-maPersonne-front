<template>
  <nav>
    <header-film></header-film>

  </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
import HeaderFilm from './components/HeaderFilm.vue';




// Utilisation de la Composition API au lieu de Class Component
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F8F9FA;
}


nav a {
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
}

nav a.router-link-active {
  color: #42b983;
}
</style>