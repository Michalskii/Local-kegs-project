<template>
  <v-toolbar flat color="rgba(1, 1, 1, 0.4)" class="nav">
    <v-row class="navItems">
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
        <router-link to="/profile" class="links">Profile</router-link>
        <router-link to="/api" class="links">Api</router-link>
      </v-col>
      <v-col v-if="!$auth.loading" class="">
        <a v-if="!$auth.isAuthenticated" @click="login" class="links"
          ><strong>Sign in</strong></a
        >
        <a v-if="$auth.isAuthenticated" @click="logout" class="links"
          ><strong>Log out</strong></a
        >
      </v-col>
    </v-row>

    <!-- <div v-if="!$auth.loading" class="pt-10">
      <a v-if="!$auth.isAuthenticated" @click="login" class="links"
        ><strong>Sign in</strong></a
      >
      <a v-if="$auth.isAuthenticated" @click="logout" class="links"
        ><strong>Log out</strong></a
      >
    </div> -->
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",

  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.nav {
  color: $primary-color !important;
  max-height: 100px;
  // padding-top: 40px;
}

.navItems {
  margin-top: auto;
}
.links {
  padding: 50px;
  color: $primary-color !important;
  text-decoration: none;
  font-size: 1.5rem;
}
</style>