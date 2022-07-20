



<template>
  <div>
    <v-app-bar app clipped-left color="rgba(1, 1, 1, 0.75)">
      <router-link to="/" class="links ml-16"
        ><v-icon color="white" large>mdi-glass-mug</v-icon>
        {{ pageTitle }}</router-link
      >
      <v-spacer></v-spacer>

      <a v-if="!$auth.isAuthenticated" @click="login" class="links"
        ><strong>Sign in</strong></a
      >
      <a v-if="$auth.isAuthenticated" @click="logout" class="links"
        ><strong>Log out</strong></a
      >
    </v-app-bar>

    <v-navigation-drawer
      permanent
      expand-on-hover
      color="rgba(1, 1, 1, 0.75)"
      app
      light
      clipped
      height="30%"
    >
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      drawer: false,
      tab: null,
      items: ["web", "shopping", "videos", "images", "news"],
      links: [
        { icon: "mdi-map", text: "Map", route: "/map" },
        { icon: "mdi-table-search", text: "Search", route: "/search" },
        { icon: "mdi-account-box", text: "Profile", route: "/profile" },
      ],
    };
  },

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
  max-height: 100px;
}
.jajko.v-navigation-drawer__content {
  background-color: red !important;
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
</style> -->
