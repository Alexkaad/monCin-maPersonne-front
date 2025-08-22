<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Person} from "@/entities/Person";
import {movieService} from "@/service/TmbdService";
import PersonDetails from "@/components/PersonDetails.vue";

const route = useRoute();
const person = ref<Person>();




const LoadPerson = async () => {

  const id = Number(route.params.id)

  try {

    const results = await  movieService.getPersonById(id);
    console.log('voici le response de l"api:',results);
    person.value = results;

  }catch (error) {

    console.log(error);
    throw error;
  }
}

onMounted(() => {
  LoadPerson();
})
</script>

<template>


  <div class="container">
    <PersonDetails
        class="m-0 p-0"
      v-if="person" :person = 'person'
      />
  </div>

</template>

<style scoped>

</style>