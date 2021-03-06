export default [
  {
    name: "APP_LOGIN_SUCCESS",
    callback: function() {
      this.snackbar = {
        show: true,
        color: "info",
        text: "Berhasil login."
      };
    }
  },
  {
    name: "APP_LOGOUT",
    callback: function() {
      this.$store
        .dispatch("destroyToken")
        .then(() => {
          this.$router.replace({ path: "/login" });
          this.$store.commit("showSnackbar", {
            text: "Sampai jumpa kembali :)",
            color: "info"
          });
        })
        .catch(e => {
          this.$router.replace({ path: "/login" });
          this.snackbar = {
            show: true,
            color: "info",
            text: e.response.statusText
          };
        });
    }
  },
  {
    name: "SHOW_PROFILE",
    callback: function() {
      this.profile = {
        state: true,
        title: "Profil User"
      };
    }
  },
  {
    name: "APP_PAGE_LOADED",
    callback: function() {}
  },
  {
    name: "APP_AUTH_FAILED",
    callback: function() {
      this.snackbar = {
        show: true,
        color: "error",
        text: "Anda perlu login dulu untuk melanjutkan!"
      };
      this.$router.replace({ path: "/login" });
      // this.$message.error('Token has expired');
    }
  },
  {
    name: "APP_BAD_REQUEST",
    // @error api response data
    callback: function(msg) {
      this.$message.error(msg);
    }
  },
  {
    name: "APP_ACCESS_DENIED",
    // @error api response data
    callback: function(msg) {
      this.$message.error(msg);
      this.$router.push("/forbidden");
    }
  },
  {
    name: "APP_RESOURCE_DELETED",
    // @error api response data
    callback: function(msg) {
      this.$message.success(msg);
    }
  },
  {
    name: "APP_RESOURCE_UPDATED",
    // @error api response data
    callback: function(msg) {
      this.$message.success(msg);
    }
  }
];
