<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Person} from "@/entities/Person";
import {movieService} from "@/service/TmbdService";
import PersonDetails from "@/components/PersonDetails.vue";


const route = useRoute();
const person = ref<Person>();

const network = ref<{
  facebook_id: string,
  instagram_id: string,
  twitter_id: string
}>({
  facebook_id: "",
  instagram_id: "",
  twitter_id: ""
});



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

const fetchNetwork = async () => {

  const personId = Number(route.params.id);
  console.log('voici le resultat de personId:',personId);

  /*if(!personId)
  {
    console.error('id de la personne non trouvé afin d\'afficher les liens exterieur' );
    return;
  }*/

  try {

    const response = await movieService.getNetWorkPerson(personId);
    network.value = response;
    console.log('voici le response de l"api:',response);
  }catch (error) {

    console.log(error);
    throw error;
  }
}


onMounted(() => {
  LoadPerson();
  fetchNetwork();
})
</script>

<template>


  <div class="container">
    <PersonDetails
        class="m-0 p-0"
      v-if="person && network"
        :person = 'person'
        :network='network'
        :homepage='person.homepage'
      />
  </div>

</template>

<style scoped>

</style>