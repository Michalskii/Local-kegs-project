<template>
  <div class="map">
    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title="Genre details"
    />

    <l-map class="mapka" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <v-marker-cluster>
        <l-marker
          @click="showBrewery(brew)"
          :key="index"
          v-for="(brew, index) in brews"
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
  props: {
    selectedItem: {
      type: String,
    },
  },

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
      center: L.latLng(30, -80),

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
      let ltd = item.latitude;
      let lng = item.longitude;
      this.newCenter.push(ltd, lng);
      this.center = this.newCenter;
      this.newCenter = [];
      this.showInfo(item);
    },

    showInfo(item) {
      this.dialog = true;
      this.item = item;
    },

    closeDialog() {
      this.dialog = false;
    },
    reCenter() {
      this.newCenter.push(this.selectedBreweryLat, this.selectedBreweryLng);
      this.center = this.newCenter;
      this.newCenter = [];
      this.zoom = 13;
    },
  },
  computed: {
    ...mapState("brewsStore", ["brews"]),

    selectedBreweryLat() {
      let selectedBrewery = this.brews.filter(
        (brew) => brew.obdb_id == this.selectedItem
      );
      let coords = selectedBrewery[0];
      return coords.latitude;
    },
    selectedBreweryLng() {
      let selectedBrewery = this.brews.filter(
        (brew) => brew.obdb_id == this.selectedItem
      );
      let coords = selectedBrewery[0];
      return coords.longitude;
    },
  },
  watch: {
    selectedItem() {
      this.reCenter();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.map {
  margin: auto;
  margin-top: 5%;
  width: 80%;
  height: 60%;
}
.mapka {
  z-index: 2;
}
</style>
