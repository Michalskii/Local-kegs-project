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

        <!-- Check that the SDK client is not currently loading before accessing is methods -->
        <div v-if="!$auth.loading">
          <!-- show login when not authenticated -->
          <a v-if="!$auth.isAuthenticated" @click="login" class="links"
            ><strong>Sign in</strong></a
          >
          <!-- show logout when authenticated -->
          <a v-if="$auth.isAuthenticated" @click="logout" class="links"
            ><strong>Log out</strong></a
          >
        </div>
      </v-col></v-row
    >
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",

  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
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