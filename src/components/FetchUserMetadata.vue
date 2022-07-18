<template></template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FetchUserMetadata",
  data() {
    return {
      // userId: "",
    };
  },

  watch: {
    userId() {
      console.log("userid changed");
      console.log(this.userId);
    },
  },
  methods: {
    ...mapActions("brewsStore", ["fetchUserFavs"]),
  },
  computed: {
    userId() {
      if (!this.$auth.loading) {
        console.log("loaded");
        console.log(this.$auth.user.sub.slice(6));
        this.fetchUserFavs(this.$auth.user.sub.slice(6));
      } else {
        console.log("loading");
      }
      return this.$auth.loading;
    },
  },
};
</script>
<style lang="scss" scoped>
.jajko {
  color: white;
  z-index: 3;
}
</style>