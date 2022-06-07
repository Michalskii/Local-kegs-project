<template>
  <div class="map">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :key="index"
        v-for="(brew, index) in brews"
        :lat-lng="latLng(brew.latitude, brew.longitude)"
      ></l-marker>
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
  methods: {
    latLng(lat, lng) {
      return L.latLng(lat, lng);
    },
  },
  data: function () {
    return {
      zoom: 3,
      center: L.latLng(50.816778429079655, -0.10655821605111768),
      url: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1a6a86ca467f482da6e3432b72eb7bcc",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(50.816778429079655, -0.10655821605111768),
      marker2: L.latLng(52.816778429079655, -0.10655821605111768),
    };
  },
  computed: {
    ...mapState("brewsStore", ["brews"]),
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
