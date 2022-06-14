<template>
  <div class="map">
    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title="Genre details"
    />
    <l-map
      class="mapka"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <v-marker-cluster>
        <l-marker
          @click="showBrewery(brew)"
          :key="index"
          v-for="(brew, index) in fetchedMapItems"
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
import { mapActions } from "vuex";

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
      center: [20, -80],
      newCenter: [],
      url: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1a6a86ca467f482da6e3432b72eb7bcc",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  created() {
    this.getCurrentLocation();
  },

  methods: {
    ...mapActions("brewsStore", ["fetchMapItems"]),

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

      console.log(jajko);
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    },

    geoSuccess(pos) {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      this.center = [lat, lng];
      this.zoom = 12;
    },
    geoError() {
      alert("Could not get geolocation!");
      console.log("err");
    },

    showInfo(item) {
      this.dialog = true;
      this.item = item;
    },
    centerUpdated(center) {
      this.center = center;
      console.log(center);
      console.log(this.center.lat);
      console.log(this.center.lng);
      this.fetchMapItems(center);
      // fetch(
      //   `https://api.openbrewerydb.org/breweries?by_dist=${this.center.lat},${this.center.lng}&per_page=50`
      // )
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
    },
    closeDialog() {
      this.dialog = false;
    },

    reCenter() {
      this.newCenter.push(this.selectedBreweryLat, this.selectedBreweryLng);
      this.center = this.newCenter;
      this.newCenter = [];
      this.zoom = 14;
    },
  },
  computed: {
    ...mapState("brewsStore", ["fetchedMapItems"]),

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
.test {
  color: white;
}
.mapka {
  z-index: 2;
}
</style>
