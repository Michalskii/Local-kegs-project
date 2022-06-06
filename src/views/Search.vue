<template>
  <v-container class="">
    <div class="header">
      <h2 class="text-center">
        Search for a specific brewery by it's name or location
      </h2>
      <v-text-field
        append-icon="mdi-magnify"
        label="Search"
        class="searchBar"
        single-line
        outlined
        dark
        hide-details
      />
    </div>
    <v-data-table dark class="my-data-table"></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Search",

  components: {},
};
</script>

<style scoped lang='scss'>
@import "../styles/variables.scss";
.header {
  background-color: rgba(1, 1, 1, 0.75);
  border-radius: 20px;
  padding: 20px;
  margin-top: 5%;
  margin-left: 20%;
  margin-right: 20%;
}
h2 {
  color: $primary-color;
  font-size: 1.5rem;
}

.searchBar.v-text-field {
  max-width: 280px;
  margin: auto;
  margin-top: 3%;
}
.my-data-table.v-data-table {
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 1rem;
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