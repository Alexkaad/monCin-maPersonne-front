<script setup lang="ts">


import {computed, ref} from "vue";
import router from "@/router";
import {CrewMember} from "@/entities/CrewMember";




const props = defineProps<{ perform: CrewMember[] }>();
const isExpanded = ref(false);

const safeEquipTech = computed(() => props.perform.filter(item =>
    item.department
    ===
    'Crew').sort((a, b) => {
    // Si une des deux dates est absente → on les met après
    if (!a.release_date) return 1;
    if (!b.release_date) return -1;

    // Normaliser en timestamp (nombre)
    const dateA =
        a.release_date instanceof Date
            ? a.release_date.getTime()
            : new Date(a.release_date).getTime();

    const dateB =
        b.release_date instanceof Date
            ? b.release_date.getTime()
            : new Date(b.release_date).getTime();

    return dateB - dateA; // tri croissant
  }));



function toggle() {
  isExpanded.value = !isExpanded.value;
}

const formatDating = (date: Date | string) => {
  return new Date(date).toLocaleDateString('fr-FR').replace(/\//g, '-')
      .split('-')[2];
}

const formatTitle = (title: string | undefined, limit = 20) => {

  if (!title) {

    return '';
  }
  return title.length > limit ? title.substring(0, limit) + '...' : title;

}




const navigateToDetail = (id: number, event?: Event) => {
  if (event?.preventDefault) {
    event.preventDefault();
  }

  if (id) {
    router.push({
      name: 'FilmSingle',
      params: {id: id.toString()},
    });
  }
};

</script>

<template>
  <table v-if=" safeEquipTech && safeEquipTech.length
   > 0"
         class="table border border-2  table-hover">
    <thead>
    <tr class="table-light">
      <th scope="col" colspan="2" style="background-color: #6c757d">
        <div
            class="fw-semibold d-flex justify-content-between align-items-center"
            style=" padding: 0 10px 0 20px; "
            @click="toggle"

        >
          <span  class="text-black">
          Equipe Technique</span>
          <div
              class="custom-arrow d-flex  p-1 border border-2 border-black rounded-circle"
              style="width: 1.9rem; ">
          <span class="arrow align-items-center bi-arrows-collapse fw-bold"
                style="width: 1.9rem"
                :class="{
            rotated:
          isExpanded }">
          </span>
          </div>
        </div>
      </th>
    </tr>
    </thead>

    <tbody :class="{ collapse: true, show: isExpanded }">
    <tr v-for="filmItem in  safeEquipTech"
        :key="filmItem.id"
        @click="navigateToDetail(filmItem.id, $event)"
        style="cursor:pointer">
      <td style="width:10rem" v-if="filmItem.release_date">
        {{ formatDating(filmItem.release_date) }}
      </td>
      <td v-else>----</td>
      <td>
        <div class="d-flex flex-column align-items-start">
          <span style="width:13rem"
                class="fw-bold">{{ formatTitle(filmItem.title) }}</span>
          <p style="width:15rem">
            <span style="color: #6c757d">Job : </span>
            <span class="fw-light">{{ filmItem.job }}</span>
          </p>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

.arrow {

  transition: transform 0.3s ease;
  cursor: pointer;

}

.rotated {
  transform: rotate(90deg);

}

.custom-arrow:hover{

  transition: 0.3s ease;
  transform: scale(1.1);

}

</style>