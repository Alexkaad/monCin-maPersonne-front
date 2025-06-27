<script setup lang="ts">
const props = defineProps<{
  total_pages: number,
  current_pages: number,
}>();

const emit = defineEmits(['pageChange']);

const onChangePage = (newPage: number, event: Event | undefined = undefined
): void => {
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
              :disabled="current_pages === 1"
              @click="(e: Event) => onChangePage(current_pages - 1, e)">
        Précédent
      </button>
      <span class="p-1">Page {{ current_pages }} sur {{ total_pages }}</span>
      <button class="btn btn-outline-success"
              :disabled="current_pages === total_pages"
              @click="(e: Event) => onChangePage(current_pages + 1, e)">
        Suivant
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>