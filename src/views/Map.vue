<template>
  <div class="map">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker-cluster>
        <l-marker
          @click="test(brew)"
          :key="index"
          v-for="(brew, index) in this.filteredBrews"
          :lat-lng="latLng(brew.latitude, brew.longitude)"
        ></l-marker
      ></l-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapState } from "vuex";

export default {
  name: "Map",

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  data: function () {
    return {
      zoom: 3,
      center: L.latLng(30, 40),

      url: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1a6a86ca467f482da6e3432b72eb7bcc",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  // mounted() {
  //   this.getGeoLocation();
  // },

  methods: {
    latLng(lat, lng) {
      return L.latLng(lat, lng);
    },
    test(item) {
      console.log(item);
    },

    // getGeoLocation() {
    //   navigator.geolocation.getCurrentPosition(this.setCoords);
    // },
  },
  computed: {
    ...mapState("brewsStore", ["brews"]),
    // setCoords(pos) {
    //   let CurrentCoords = pos.coords;
    //   console.log(CurrentCoords.latitude);
    //   console.log(CurrentCoords.longitude);
    //   return CurrentCoords;
    // },
    filteredBrews() {
      const result = this.brews.filter((brew) => brew.latitude !== null);
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  margin: auto;
  margin-top: 15%;
  width: 80%;
  height: 60%;
}
</style>
