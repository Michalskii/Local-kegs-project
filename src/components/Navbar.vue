<template>
  <v-toolbar flat color="rgba(1, 1, 1, 0.4)" class="nav"
    ><router-link to="home" class="links"
      ><v-icon color="white" large>mdi-glass-mug</v-icon> Local
      kegs</router-link
    >
    <v-spacer></v-spacer>
    <div>
      <router-link to="/map" class="links">Map</router-link>
      <router-link to="/search" class="links">Search</router-link>
      <span class="links">Log in</span>
    </div></v-toolbar
  >
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
  max-height: 100px;
  padding-top: 40px;
}
.links {
  padding: 50px;
  color: $primary-color !important;
  text-decoration: none;
  font-size: 2rem;
}
</style>