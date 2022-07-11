<template>
  <v-container class="">
    <!-- <FetchUserMetadata v-if="$auth.isAuthenticated" /> -->
    <div class="header">
      <h2 class="text-center">
        Search for a specific brewery by it's name, location or type
      </h2>
      <v-text-field
        append-icon="mdi-magnify"
        label="Search"
        v-model="search"
        class="searchBar"
        single-line
        outlined
        @input="getResults"
        dark
        hide-details
      />

      <v-data-table
        :headers="headers"
        :items="searchResults"
        dark
        @click:row="showInfo"
        :items-per-page="5"
        class="my-data-table"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click.stop="addToFavs(item)"> mdi-heart </v-icon>
        </template>
      </v-data-table>
    </div>

    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title="Genre details"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import InfoDialog from "../components/InfoDialog.vue";
import axios from "axios";
// import FetchUserMetadata from "../components/FetchUserMetadata.vue";

export default {
  name: "Search",
  components: { InfoDialog },
  data() {
    return {
      search: "",
      dialog: false,
      searchResults: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "City", value: "city" },

        { text: "Type", value: "brewery_type" },
        { text: "Add to favs", value: "actions" },
      ],
    };
  },

  computed: {
    ...mapState("brewsStore", ["brews", "userFavs"]),

    userId() {
      return this.$auth.user.sub.slice(6);
    },
  },

  methods: {
    ...mapActions("brewsStore", ["fetchUserFavs", "addNewFav", "patchFavList"]),

    getResults() {
      fetch(
        `https://api.openbrewerydb.org/breweries/search?query=${this.search}`
      )
        .then((response) => response.json())
        .then((data) => (this.searchResults = data));
    },

    showInfo(item) {
      this.dialog = true;
      this.item = item;
    },
    addToFavs(item) {
      if (this.$auth.isAuthenticated) {
        this.addNewFav(item);
        this.patchFavList(this.userId);
      } else {
        alert("Please log in");
      }
    },

    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../styles/variables.scss";
.header {
  background-color: rgba(1, 1, 1, 0.75);
  border-radius: 20px;
  padding: 20px;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}
h2 {
  color: $primary-color;
  font-size: 1.5rem;
}

.searchBar.v-text-field {
  max-width: 280px;
  margin: auto;
  margin-top: 2rem;
}
.my-data-table.v-data-table {
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 2rem;
  border-radius: 30px;

  background: rgba(1, 1, 1, 0.75);
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 0.875rem;
  height: 48px;
  color: red;
}
</style>