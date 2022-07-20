<template>
  <v-app class="mainBody">
    <FetchUserMetadata v-if="$auth.isAuthenticated" />

    <navbar pageTitle="Local kegs" />
    <v-main class="pl-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import FetchUserMetadata from "@/components/FetchUserMetadata.vue";

export default {
  name: "App",
  components: {
    Navbar,
    FetchUserMetadata,
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState("brewsStore", ["brews"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap");
* {
  font-family: "JetBrains Mono", monospace;
}
.mainBody {
  background-image: url("./assets/cans-kopia 2.jpg") !important;
  background-position: center !important;
  background-size: cover !important;
}
</style>
