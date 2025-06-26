<script setup lang="ts">




</script>

<template>

  <div class="navbar g-3 m-0 d-flex  align-content-center " >
    <div class="container d-flex p-1">
      <div class="d-flex align-items-center ">
        <h1 class="mb-0 fs-1 fw-bold titre-style me-3">MyCP</h1>
        <i class="bi bi-camera-reels  fw-bold text-black ms-0"></i>
      </div>

      <div class="d-flex justify-content-between align-items-center p-3" style="width: 75%">
        <div class="d-flex justify-content-between">
          <ul class="d-flex justify-content-between list-lien mb-0 me-5 fw-bold fs-5 text-black">
            <li>À venir</li>
            <li>Direct</li>
            <li>AiringToday</li>
          </ul>
        </div>
        <div class="icon-person ">
          <i class="bi bi-person text-black fs-4 fw-bolder"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.navbar {
  height: 70px;
  width: 100%;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(240, 242, 245, 0.98);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);





}

.titre-style {

  color: black;
  font-family: "Leelawadee UI", sans-serif;

}

.list-lien {
  list-style: none;
  text-decoration: none;
  color: white;

}

li {
  padding: 20px;
}

/* Nouvelle règle pour coller le titre et l'icône */
h1 + i {
  margin-left: -5px !important; /* Force l'icône à se rapprocher du titre */
}
</style>