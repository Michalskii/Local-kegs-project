<template>
  <div>
    <div>
      <!-- <img :src="$auth.user.picture" /> -->
      <h2>{{ this.$auth.user.name }}</h2>
      <p>{{ this.$auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>
