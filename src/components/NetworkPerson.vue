<script setup lang="ts">

import FacebookPerson from "@/components/FacebookPerson.vue";
import InstagramPerson from "@/components/InstagramPerson.vue";
import TwitterPerson from "@/components/TwitterPerson.vue";
import HomepagePerson from "@/components/HomepagePerson.vue";


const props = defineProps<{

  facebook_id : string,
  twitter_id : string,
  instagram_id : string,
  homepage : string,

}>();



</script>

<template>

  <div class="container "  >
    <div class="wrapper" >
      <div class="d-flex justify-content-start  align-items-center gap-2" >
        <div class="facebook-person" v-if="props.facebook_id">
          <facebook-person :facebook_id="props.facebook_id"/>
        </div>

        <div class="twitter-person" v-if="props.twitter_id">
          <twitter-person :twitter_id="props.twitter_id"/>
        </div>

        <div class="instagram-person" v-if="props.instagram_id">
          <instagram-person :instagram_id="props.instagram_id"/>
        </div>

        <div class="homepage-person" v-if="props.homepage">
          <homepage-person :homepage="props.homepage"/>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>