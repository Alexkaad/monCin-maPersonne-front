<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {Person} from "@/entities/Person";
import {movieService} from "@/service/TmbdService";
import PersonDetails from "@/components/PersonDetails.vue";
import {Biography} from "@/entities/Biography";

import {KnownFor} from "@/entities/knownFor";
import {CastMember} from "@/entities/CastMember";
import {CrewMember} from "@/entities/CrewMember";


const route = useRoute();
const person = ref<Person>();
const biography = ref<Biography>();
const cast = ref<CastMember[]>();
const crewByDepartment = ref<Record<string, CrewMember[]>>({});
const filmsConnus = ref<KnownFor>({

  castMember :  [] as CastMember[],
  crewMember: [] as CrewMember[]
});
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

  if(!personId)
  {
    console.error('id de la personne non trouvé afin d\'afficher les liens exterieur' );
    return;
  }

  try {

    const response = await movieService.getNetWorkPerson(personId);
    network.value = response;
    console.log('voici le response de l"api:',response);
  }catch (error) {

    console.log(error);
    throw error;
  }
}


 const fetchPersonKnownFor = async () => {
   const personId = Number(route.params.id);

  console.log('voici le resultat de name:',name);

  try {

    const response = await movieService.getPersonMovieCredit(personId);
    console.log('voici le response de l"api:',response);

    cast.value = (response.cast ?? []) as CastMember[];
    crewByDepartment.value = response.crew ?? {};
    filmsConnus.value = {
      castMember : cast.value,
      crewMember: Object.values(crewByDepartment.value).flat()
    }
    console.log('voici la liste des films celebre de la personne:',
        cast.value, crewByDepartment.value);

  }catch (error) {
    console.log(error);
    throw error;
  }
 }



onMounted(() => {
  LoadPerson();
  fetchNetwork();
  fetchPersonKnownFor();

})
</script>

<template>


  <div class="container" style="min-height: 100vh"
  >
    <PersonDetails
        class=" container m-0 p-0"
      v-if="person && network"
        :person = 'person'
        :network='network'
        :homepage='person.homepage'
        :biography ="biography"
        :filmsConnus="filmsConnus"
        :person-name="person.name"
        :perfomm = "filmsConnus.castMember"
        :crewProducer = "filmsConnus.crewMember"
        :crewWriting = "filmsConnus.crewMember"
        :crewArt = "filmsConnus.crewMember"
        :crewDirecting = "filmsConnus.crewMember"
        :crewEditor = "filmsConnus.crewMember"
        :crewImage = "filmsConnus.crewMember"
        :crewEquiTech="filmsConnus.crewMember"
        :crewSound="filmsConnus.crewMember"
      />

  </div>


</template>

<style scoped>



</style>