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
      const { data } = await axios.get(
        "https://dev-cl8pjk73.auth0.com/api/v2/users",
        {
          headers: {
            Authorization: `Bearer <%= "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZISGloZElZR2x5Ql8yWWd0Ui15RCJ9" %>`, // send the access token through the 'Authorization' header
          },
        }
      );
    },
  },
};
</script>

<!-- dev-cl8pjk73

https://dev-cl8pjk73.auth0.com/api/v2/users -->