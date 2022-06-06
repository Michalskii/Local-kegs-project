<template>
  <v-container class="dupa text-center">
    <h2 class="text-center">
      Find new, exciting places near you, taste local beer and support talented
      brewers.
    </h2>
    <h3 class="text-center">
      You can search for specific brewery/town or use our map to discover what’s
      around you.
    </h3>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>
<style scoped lang='scss'>
@import "../styles/variables.scss";
.dupa {
  background-color: rgba(1, 1, 1, 0.75);
  border-radius: 20px;
  margin-top: 10%;
  padding: 100px;
}
h2 {
  color: $primary-color;
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
  color: $primary-color;
  margin-top: 5%;
}
</style>