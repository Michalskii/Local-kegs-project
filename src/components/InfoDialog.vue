<template>
  <v-dialog
    :value="active"
    @click:outside="closeDialog"
    max-width="700px"
    persistent
    light
  >
    <v-card
      ><v-icon class="ml-1 mt-1" @click="closeDialog" color="black"
        >mdi-close</v-icon
      >
      <h1 class="text-center text-h4">{{ brewery.name }}</h1>
      <v-row>
        <span class="dsas mt-6">Type: {{ brewery.brewery_type }}</span></v-row
      >
      <v-row class="">
        <span class="dsas mt-3">Country: {{ brewery.country }}</span></v-row
      >
      <v-row>
        <span class="dsas mt-3">City: {{ brewery.city }}</span>
      </v-row>
      <v-row class="">
        <span class="dsas mt-3"
          >Street: {{ brewery.street }}
          <v-icon @click="openGoogleMaps" color="black"
            >mdi-google-maps</v-icon
          ></span
        >
      </v-row>

      <v-row class="">
        <span class="dsas mt-3">Phone: {{ brewery.phone }}</span>
      </v-row>
      <v-row>
        <span class="dsas mt-3"
          >Website:
          <v-icon @click="openBrewSite" color="black">mdi-cross-celtic</v-icon>
        </span>
      </v-row>
      <v-row v-if="$auth.isAuthenticated">
        <span class="dsas mt-3 mb-16"
          >Add to favourites <v-icon @click="addToFavs">mdi-heart</v-icon></span
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "InfoDialog",

  data() {
    return {};
  },

  props: {
    active: {
      required: true,
      type: Boolean,
    },
    brewery: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },

    openGoogleMaps() {
      window.open(
        `https://www.google.com/maps/place/${this.brewery.latitude},${this.brewery.longitude}`
      );
    },
    openBrewSite() {
      window.open(this.brewery.website_url);
    },
  },
};
</script>

<style>
.dsas {
  margin: auto;
}
</style>
