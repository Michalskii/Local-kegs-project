<template>
  <div class="map">
    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title="Genre details"
    />

    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <v-marker-cluster>
        <l-marker
          @click="showBrewery(brew)"
          :key="index"
          v-for="(brew, index) in this.filteredBrews"
          :lat-lng="latLng(brew.latitude, brew.longitude)"
        ></l-marker
      ></v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapState } from "vuex";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import InfoDialog from "../components/InfoDialog.vue";

export default {
  name: "Mapka",

  components: {
    LMap,
    LTileLayer,
    LMarker,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    InfoDialog,
  },

  data: function () {
    return {
      zoom: 4,
      dialog: false,
      center: L.latLng(40, -90),
      newCenter: [],
      url: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1a6a86ca467f482da6e3432b72eb7bcc",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },

  methods: {
    latLng(lat, lng) {
      return L.latLng(lat, lng);
    },
    showBrewery(item) {
      console.log(item);
      let ltd = item.latitude;
      let lng = item.longitude;
      this.newCenter.push(ltd, lng);
      this.center = this.newCenter;
      this.newCenter = [];
      this.showInfo(item);
    },
    testclick() {},
    showInfo(item) {
      this.dialog = true;
      this.item = item;
      console.log(item);
    },

    closeDialog() {
      this.dialog = false;
    },
  },
  computed: {
    ...mapState("brewsStore", ["brews"]),

    filteredBrews() {
      const result = this.brews.filter((brew) => brew.latitude !== "");
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.map {
  margin: auto;
  margin-top: 15%;
  width: 80%;
  height: 60%;
}
</style>
