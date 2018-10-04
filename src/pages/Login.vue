<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/agam.png" alt="E-SisMA" width="120">
                  <h1 class="flex my-4 primary--text">E-SisMA Login</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="email" label="Email" type="text" v-model="form.email" autocomplete=""></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="form.password" autocomplete></v-text-field>
                </v-form>
              </v-card-text>
              <div v-if="errorMsg"><p style="color: red">{{ errorMsg }}</p></div>
              <br>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
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
    loading: false,
    form: {
      email: '',
      password: ''
    },
    errorMsg: ''
  }),

  methods: {
    login () {
      this.loading = true;
      let vm = this;
      this.axios
        .post('http://restapi.fz/login', vm.form)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('__token__', response.data.data.api_token);
            localStorage.setItem('__email__', response.data.data.user.email);
            this.$router.push('dashboard');
          } else {
            vm.errorMsg = response.data.message;
            vm.loading = false;
          }
          vm.loading = false;
        })
        .catch(function (error) {
          console.log(error);
          
          if (error.response.status === 404) {
            vm.errorMsg = 'Email dan password tidak cocok!';
            vm.loading = false;
          }
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
