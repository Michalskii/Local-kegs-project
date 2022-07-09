<template>
  <div class="header text-center pt-7">
    <h2>{{ this.$auth.user.name }}</h2>
    <p>{{ this.$auth.user.sub }}</p>

    <h2>Your favourite breweries</h2>
    <v-data-table
      :headers="headers"
      :items="this.userFavs"
      dark
      :items-per-page="5"
      class="my-data-table"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click.stop="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState("brewsStore", ["brews", "userFavs"]),

    userId() {
      return this.$auth.user.sub.slice(6);
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "City", value: "city" },

        { text: "Type", value: "brewery_type" },
        { text: "Remove", value: "actions" },
      ],
    };
  },
  methods: {
    ...mapActions("brewsStore", ["deleteFavItem", "patchFavList"]),

    deleteItem(item) {
      this.deleteFavItem(item.id);
      this.patchFavList(this.userId);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  color: white;
}
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
