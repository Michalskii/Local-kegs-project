<template>
  <v-dialog
    :value="active"
    @click:outside="closeDialog"
    max-width="700px"
    style="z-index: 20001"
    min-heigth="500px"
    persistent
    light
  >
    <v-card
      ><v-icon class="ml-1 mt-1" @click="closeDialog" color="black"
        >mdi-close</v-icon
      >
      <h1 class="text-center text-h4">{{ brewery.name }}</h1>

      <v-row class="mt-8">
        <v-col
          ><span class="ml-16">City: {{ brewery.city }}</span></v-col
        >
        <v-col
          ><span class="ml-16"
            >Street: {{ brewery.street }}
            <v-icon @click="openGoogleMaps" color="black"
              >mdi-google-maps</v-icon
            ></span
          ></v-col
        >
      </v-row>

      <v-row class="mt-2">
        <v-col
          ><span class="ml-16">Country: {{ brewery.country }}</span></v-col
        >
        <v-col
          ><span class="ml-16">Type: {{ brewery.brewery_type }} </span></v-col
        >
      </v-row>

      <v-row class="mt-2">
        <v-col
          ><span class="ml-16">Phone: {{ brewery.phone }}</span></v-col
        >
        <v-col
          ><span class="ml-16"
            >Website:
            <v-icon @click="openBrewSite" color="black"
              >mdi-cross-celtic</v-icon
            >
          </span></v-col
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
h1 {
  color: rgb(0, 0, 0);
}
</style>
