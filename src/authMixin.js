export default {
    mounted() {
      var token = localStorage.getItem("token");
      console.log(token);
      if (token === null) {
        this.$router.push("/login");
      }
      // Parse the token to get the payload
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format");
      }
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log("############234234542352345345", payload);
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp <= currentTime) {
        // Token has expired
        console.log("Token expire");
        localStorage.clear();
        this.$router.push("/login");
      }
    },
  };
  