<template>
  <v-container class="">
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
        dark
        hide-details
      />

      <v-data-table
        :headers="headers"
        :items="brews"
        :search="search"
        dark
        @click:row="showInfo"
        :items-per-page="5"
        class="my-data-table"
      ></v-data-table>
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
export default {
  name: "Search",
  components: { InfoDialog },
  data() {
    return {
      search: "",
      dialog: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "City", value: "city" },

        { text: "Street", value: "street" },
        { text: "Type", value: "brewery_type" },
        { text: "Website", value: "website_url" },
      ],
    };
  },

  computed: {
    ...mapState("brewsStore", ["brews"]),
  },
  methods: {
    showInfo(item) {
      this.dialog = true;
      this.item = item;
      console.log(item);
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