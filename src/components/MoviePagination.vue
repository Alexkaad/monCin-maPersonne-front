<script setup lang="ts">
const props = defineProps<{
  total_pages: number,
  current_page: number,
}>();

const emit = defineEmits(['pageChange']);

const onChangePage = (newPage: number, event: Event): void => {
  if (event) {
    event.preventDefault();
  }

  if (newPage >= 1 && newPage <= props.total_pages) {
    emit('pageChange', newPage);
  }
};
</script>

<template>
  <div class="pagination d-flex align-content-center justify-content-center">
    <div class="pagination align-items-center">
      <button class="btn btn-outline-warning"
              :disabled="current_page === 1"
              @click="(e: Event) => onChangePage(current_page - 1, e)">
        Précédent
      </button>
      <span class="p-1">Page {{ current_page }} sur {{ total_pages }}</span>
      <button class="btn btn-outline-success"
              :disabled="current_page === total_pages"
              @click="(e: Event) => onChangePage(current_page + 1, e)">
        Suivant
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>