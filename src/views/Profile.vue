<template>
  <div class="main">
    <div class="text-center pt-7">
      <!-- <img :src="$auth.user.picture" /> -->
      <h2>{{ this.$auth.user.name }}</h2>
      <p>{{ this.$auth.user.email }}</p>
    </div>

    <div class="text-center">
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>
<style lang="scss" scoped>
.main {
  color: white;
}
</style>
