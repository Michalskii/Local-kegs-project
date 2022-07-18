<template>
  <div class="map">
    <v-progress-circular
      class="loader"
      v-show="loading"
      indeterminate
      color="white"
    ></v-progress-circular>
    <info-dialog
      v-if="dialog"
      @close="closeDialog"
      :active="dialog"
      :brewery="item"
      title=""
    />
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
import { latLngBounds } from "leaflet";

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapState } from "vuex";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import InfoDialog from "../components/InfoDialog.vue";
import { mapActions } from "vuex";

export default {
  mounted() {
    this.loading = false;
    console.log("loading finised");
  },
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
      zoom: 1,
      markers: [],
      loading: true,
      page: 1,
      lastFetchedMarkers: [],
      bounds: latLngBounds([
        [
          [51.70081290280357, 0.26963806152345],
          [51.82991732677597, 0.08716201782228],
        ],
      ]),
      dialog: false,
      center: [51, 0],
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

    getLatLngOfMarkers(array) {
      return array.map((item) => this.latLng(item.latitude, item.longitude));
    },

    async fetchNewMarkers() {
      // this.bounds = bounds;
      let payload = {
        a: this.center.lat,
        b: this.center.lng,
        c: this.page,
      };
      console.log(this.lastFetchedMarkers);
      this.fetchMapItems(payload);
      this.lastFetchedMarkers = await this.fetchMapItems(payload);

      if (
        this.checkMarkersWithinBounds() == true &&
        this.lastFetchedMarkers.length > 0
      ) {
        this.page++;
        setTimeout(() => {
          this.fetchNewMarkers();
        }, 10);
      } else {
        this.page = 1;
      }
    },

    checkMarkersWithinBounds() {
      let markers = this.getLatLngOfMarkers(this.lastFetchedMarkers);
      if (this.lastFetchedMarkers.length > 0) {
        return markers.every((marker) => this.bounds.contains(marker));
      }
    },

    updateBounds(bounds) {
      this.bounds = bounds;
      this.fetchNewMarkers();
      return bounds;
    },

    updateZoom(zoom) {
      this.zoom = zoom;
    },

    showBrewery(item) {
      let lat = item.latitude;
      let lng = item.longitude;

      this.center = [lat, lng];
      this.showInfo(item);
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    },

    geoSuccess(pos) {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      this.center = [lat, lng];
      this.zoom = 1;
      let payload = {
        a: lat,
        b: lng,
        c: this.page,
      };
      this.fetchMapItems(payload);
    },
    geoError() {
      alert("Could not get geolocation!");
      console.log("err");
      let payload = {
        a: 51,
        b: 0,
        c: 1,
      };
      this.fetchMapItems(payload);
    },

    showInfo(item) {
      this.dialog = true;
      this.item = item;
    },
    centerUpdated(center) {
      this.center = center;
    },

    closeDialog() {
      this.dialog = false;
    },

    // reCenter() {
    //   this.newCenter.push(this.selectedBreweryLat, this.selectedBreweryLng);
    //   this.center = this.newCenter;
    //   this.newCenter = [];
    //   this.zoom = 1;
    // },
  },
  computed: {
    ...mapState("brewsStore", ["fetchedMapItems", "lastFetched"]),

    selectedBreweryLat() {
      let selectedBrewery = this.fetchedMapItems.filter(
        (brew) => brew.obdb_id == this.selectedItem
      );
      let coords = selectedBrewery[0];
      return coords.latitude;
    },

    selectedBreweryLng() {
      let selectedBrewery = this.fetchedMapItems.filter(
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
.loader {
  position: absolute;
  top: 40%;
  left: 46%;
}
</style>
