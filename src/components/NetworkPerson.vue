<script setup lang="ts">

import FacebookPerson from "@/components/FacebookPerson.vue";
import InstagramPerson from "@/components/InstagramPerson.vue";
import TwitterPerson from "@/components/TwitterPerson.vue";


const props = defineProps<{

  facebook_id : string,
  twitter_id : string,
  instagram_id : string,

}>();



</script>

<template>

  <div class="container m-0 d-flex ">
    <div class="row align-items-start align-items-center">
      <div class="col-3"
           v-if="props.facebook_id && props.facebook_id.length > 0">
        <facebook-person :facebook_id ="props.facebook_id"/>
      </div>

      <div class=" col-3"
           v-if="props.twitter_id && props.twitter_id.length > 0">
        <twitter-person :twitter_id="props.twitter_id" />
      </div>

      <div class="col-3"
           v-if="props.instagram_id && props.instagram_id.length > 0">
        <instagram-person :instagram_id ="props.instagram_id"/>
      </div>

    </div>
    </div>


</template>

<style scoped>

</style>