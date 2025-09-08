<script setup lang="ts">
import {ref, computed} from "vue";
import {KnownFor} from "@/entities/knownFor";
import router from "@/router";

const props = defineProps<{ perform: KnownFor }>();
const isExpanded = ref(false);

const safePerform = computed(() => props.perform.castMember || []);

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
  <table class="table border border-2 table-striped table-hover">
    <thead>
    <tr class="table-light">
      <th scope="col" colspan="2" style="background-color: burlywood; ">
        <div
            class="fw-semibold d-flex justify-content-between align-items-center"
            style="cursor:pointer; padding: 0 10px 0 20px; "
            @click="toggle"

        >
          <span>Interpretation</span>
          <span class="arrow" :class="{ rotated: isExpanded }">▶</span>
        </div>
      </th>
    </tr>
    </thead>

    <tbody :class="{ collapse: true, show: isExpanded }">
    <tr v-for="filmItem in safePerform" :key="filmItem.id"
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
            <span>Perform : </span>
            <span class="fw-light">{{ filmItem.character }}</span>
          </p>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(90deg);
}
</style>
