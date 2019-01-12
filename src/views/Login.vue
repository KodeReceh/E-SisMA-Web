<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img :src="logoPath" alt="E-SisMA Nagari" width="120" />
                  <h1 class="flex my-4 primary--text">E-SisMA Login</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="form.email"
                    autocomplete
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    @keyup.enter="login"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="form.password"
                    autocomplete
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <div v-if="errorMsg">
                <p style="color: red">{{ errorMsg }}</p>
              </div>
              <br />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
              <div>
                <router-link :to="{ name: 'VerifyLetter' }"
                  >Verifikasi Surat?</router-link
                >
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    logoPath: (process.env.ASSET_PATH || "/static") + "/agam.png",
    loading: false,
    form: {
      email: "",
      password: ""
    },
    errorMsg: ""
  }),

  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("retrieveToken", {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.$router.push("dashboard");
          this.$store.dispatch("getProfile");
          this.loading = false;
        })
        .catch(e => {
          this.errorMsg = e.response.statusText;
          this.loading = false;
        });
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
