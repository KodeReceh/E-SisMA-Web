<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Edit User">
            <div slot="widget-content">
              <v-container>
                <FormUser
                  :user="user"
                  :onSubmit="submit"
                  :loading="loading"
                  :isUpdate="isUpdate"
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
import UserAPI from "@/api/user";
import VWidget from "@/components/VWidget";

export default {
  components: {
    FormUser,
    VWidget
  },
  data() {
    return {
      user: {
        id: "",
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
      isUpdate: true,
      takenEmails: [],
      takenNIP: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(id) {
      UserAPI.get(id).then(response => {
        this.user = response.data.data;
        this.user.fileName = response.data.data.signature;

        UserAPI.getUniques().then(r => {
          for (const key in r.data.email) {
            if (r.data.email.hasOwnProperty(key)) {
              if (r.data.email[key] !== response.data.data.email) {
                this.takenEmails = [];
                this.takenEmails.push(r.data.email[key]);
              }
            }
          }

          let nips = r.data.NIP.map(String);

          for (const key in nips) {
            if (nips.hasOwnProperty(key)) {
              if (response.data.data.employee_id_number !== nips[key]) {
                this.takenNIP = [];
                this.takenNIP.push(nips[key]);
              }
            }
          }
        });
      });
    },
    submit() {
      this.loading = true;
      let formData = new FormData();

      for (let key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          formData.append(key, this.user[key]);
        }
      }

      UserAPI.update(this.user.id, formData).then(response => {
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
    }
  }
};
</script>
