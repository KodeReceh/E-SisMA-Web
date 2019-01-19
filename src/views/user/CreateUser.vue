<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Buat User">
            <div slot="widget-content">
              <v-container>
                <FormUser
                  :user="user"
                  :onSubmit="submit"
                  :loading="loading"
                  :takenEmails="takenEmails"
                  :takenNIP="takenNIP"
                ></FormUser>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormUser from "./FormUser";
import VWidget from "@/components/VWidget";
import UserAPI from "@/api/user";

export default {
  components: {
    FormUser,
    VWidget
  },
  data() {
    return {
      user: {
        name: "",
        employee_id_number: "",
        birthplace: "",
        birthdate: "",
        email: "",
        password: "",
        sex: "",
        address: "",
        handphone: "",
        role_id: "",
        signature: "",
        fileName: ""
      },
      loading: false,
      takenEmails: [],
      takenNIP: []
    };
  },
  mounted() {
    this.getUniques();
  },
  methods: {
    submit() {
      this.loading = true;
      let formData = new FormData();

      for (let key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          formData.append(key, this.user[key]);
        }
      }

      UserAPI.store(formData).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowUser",
          params: { id: response.data.data.id }
        });
      });
    },
    getUniques() {
      UserAPI.getUniques().then(response => {
        this.takenEmails = response.data.email;
        this.takenNIP = response.data.NIP.map(String);
      });
    }
  }
};
</script>
