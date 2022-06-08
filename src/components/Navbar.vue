<template>
  <v-toolbar flat color="rgba(1, 1, 1, 0.4)" class="nav">
    <v-row class="linka">
      <v-col class="dupa text-left">
        <router-link to="home" class="links"
          ><v-icon color="white" large>mdi-glass-mug</v-icon> Local
          kegs</router-link
        ></v-col
      >
      <!-- <v-spacer></v-spacer> -->
      <v-col class="text-right">
        <router-link to="/map" class="links">Map</router-link>
        <router-link to="/search" class="links">Search</router-link>
        <span class="links">Log in</span>
      </v-col></v-row
    >
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.nav {
  color: $primary-color !important;
  max-height: 80px;
  // padding-top: 40px;
}

.linka {
  margin-top: auto;
}
.links {
  padding: 50px;
  color: $primary-color !important;
  text-decoration: none;
  font-size: 1.5rem;
}
</style>