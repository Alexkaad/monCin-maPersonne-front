<script setup lang="ts">

import {KnownFor} from "@/entities/knownFor";
import {computed} from "vue";


const props = defineProps<{

perform: KnownFor
}>();

const safePerform = computed(() => props.perform.castMember || []);


</script>

<template>
  <table class="table border border-2 ">
    <thead>
    <tr class="table-light">
      <th scope="col" colspan="2">
        <div
            class="fw-semibold"
            style="cursor:pointer; "
            data-bs-toggle="collapse"
            data-bs-target="#collapse-safePerform"
            aria-expanded="false"
            aria-controls="collapse-safePerform"
        >
          Interpretation
        </div>
      </th>
    </tr>
    </thead>

    <!-- zone collapsable -->
    <tbody id="collapse-safePerform" class="collapse">
    <tr v-for="filmItem in safePerform" :key="filmItem.id">
      <td style="width:10rem" v-if="filmItem.release_date">{{ filmItem.release_date }}</td>
      <td v-else>----</td>
      <td>
        <div class="d-flex flex-column align-items-start">
          <span style="width:13rem" class="fw-bold">{{ filmItem.title }}</span>
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
h5:hover {
  transform: scale(1.19);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>