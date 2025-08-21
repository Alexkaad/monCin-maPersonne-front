<script setup lang="ts">

import {Person} from "@/entities/Person";


const props = defineProps<{
  person: Person
}>();






</script>

<template>


    <div class="container" v-if="person">
      <div class="row">
        <div class="col-6">
          <div class="card">
            <img :src=" 'https://image.tmdb.org/t/p/w500'+ person.profile_path || require('@/assets/OIP.jpg')" class="card-img-top" alt="titre-image">
          </div>
          <h6>{{ person.name }}</h6>
          <p>{{ person.known_for_department }}</p>
          <p>{{ person.place_of_birth }}</p>
          <p>{{ person.birthday }}</p>
          <p>{{ person.gender }}</p>
          <a :href="person.homepage" target="_blank" rel="noopener noreferrer">{{ person.homepage }}</a>
          <p>{{ person.deathday }}</p>
        </div>
        <div class="col-6">
          <p>{{ person.biography }}</p>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>