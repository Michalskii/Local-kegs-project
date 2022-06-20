<template>
  <div>
    <button @click="callApi">Call</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "external-api",
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      const { data } = await axios.get("https://dev-cl8pjk73.eu.auth0.com/", {
        headers: {
          Authorization: `Bearer <%= "${token}" %>`, // send the access token through the 'Authorization' header
        },
      });
    },
  },
};
</script>