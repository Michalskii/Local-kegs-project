<template>
  <div class="map">
    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title="Genre details"
    />
    <span class="test"> {{ bounds }}</span>
    <span class="test"> Zoom is: {{ zoom }} </span>

    <l-map
      class="mapka"
      :zoom="zoom"
      :bounds="bounds"
      :center="center"
      @update:zoom="updateZoom"
      @update:bounds="updateBounds"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- <v-marker-cluster>
        <l-marker
          @click="showBrewery(brew)"
          :key="index"
          v-for="(brew, index) in fetchedMapItems"
          :lat-lng="latLng(brew.latitude, brew.longitude)"
        ></l-marker
      ></v-marker-cluster> -->
      <l-marker :lat-lng="markerLatLng"></l-marker>
      <l-marker :lat-lng="markerLatLng2"></l-marker>
      <l-marker :lat-lng="latLng(browar.latitude, browar.longitude)"></l-marker>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { latLngBounds } from "leaflet";

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
      zoom: 11,
      markerLatLng: [51.504, -0.159],
      markerLatLng2: [-51.504, -0.159],
      markers: [this.markerLatLng, this.markerLatLng2],
      browar: {
        id: "madtree-brewing-cincinnati",
        name: "MadTree Brewing",
        brewery_type: "regional",
        street: "3301 Madison Rd",
        address_2: null,
        address_3: null,
        city: "Cincinnati",
        state: "Ohio",
        county_province: null,
        postal_code: "45209-1132",
        country: "United States",
        longitude: "-84.4239715",
        latitude: "39.1563725",
        phone: "5138368733",
        website_url: "http://www.madtreebrewing.com",
        updated_at: "2021-10-23T02:24:55.243Z",
        created_at: "2021-10-23T02:24:55.243Z",
      },

      bounds: latLngBounds([
        [
          [40.70081290280357, -74.26963806152345],
          [40.82991732677597, -74.08716201782228],
        ],
      ]),
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

    updateBounds(bounds) {
      this.bounds = bounds;
      // this.markers.forEach((marker) => bounds.contains(marker));
      let jajko = this.latLng(this.browar.latitude, this.browar.longitude);
      console.log(this.latLng(this.browar.latitude, this.browar.longitude));
      bounds.contains(jajko);

      // if (bounds.contains(jajko)) {
      //   console.log("contains");
      // } else {
      //   console.log("nooot");
      // }
    },
    updateZoom(zoom) {
      this.zoom = zoom;
    },

    showBrewery(item) {
      let ltd = item.latitude;
      let lng = item.longitude;
      this.newCenter.push(ltd, lng);
      this.center = this.newCenter;
      this.newCenter = [];
      this.showInfo(item);
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    },

    geoSuccess(pos) {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      this.center = [lat, lng];
      this.zoom = 8;
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
      if (this.zoom < 3) {
        this.fetchMapItems(center);
      }
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
