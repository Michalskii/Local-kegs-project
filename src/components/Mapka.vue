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
      @update:center="centerUpdatedd"
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
      markers: [],
      page: 1,

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

    getLatLngOfMarkers(array) {
      return array.map((item) => this.latLng(item.latitude, item.longitude));
    },

    // async pobierz() {
    //   let payload = {
    //     a: this.center.lat,
    //     b: this.center.lng,
    //     c: this.page,
    //   };
    //   await this.fetchMapItems(payload);
    //   let markers = this.getLatLngOfMarkers(this.fetchedMapItems);
    //   if (markers.length > 0) {
    //     if (markers.every((marker) => this.bounds.contains(marker))) {
    //       this.page++;
    //       this.pobierz();
    //     }
    //   }
    // },

    updateBounds(bounds) {
      this.bounds = bounds;

      let markers = this.getLatLngOfMarkers(this.fetchedMapItems);

      let payload = {
        a: this.center.lat,
        b: this.center.lng,
        c: this.page,
      };
      this.fetchMapItems(payload);

      // this.pobierz();

      if (markers.length > 0) {
        if (markers.every((marker) => bounds.contains(marker))) {
          this.fetchMapItems(payload);
          console.log("all markers within bounds, loading next page");
          if (!markers.every((marker) => bounds.contains(marker))) {
            this.page = 1;
            console.log(this.page);
          } else {
            this.page++;
            this.fetchMapItems(payload);
            console.log(`loading page ${this.page}`);
          }
          console.log(this.page);
        } else {
          this.page = 1;
          console.log("markers outside bounds");
          console.log(this.page);
        }
      }
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
    centerUpdatedd(center) {
      this.center = center;
      return center;
    },
    centerUpdated(center) {
      // let payload = {
      //   a: center.lat,
      //   b: center.lng,
      //   c: this.page,
      // };
      console.log(payload);
      // this.fetchMapItems(payload);
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
