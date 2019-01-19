<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Edit Profil">
            <div slot="widget-content">
              <v-container>
                <FormProfil
                  :profile="profile"
                  :onSubmit="submit"
                  :loading="loading"
                  :takenNIPs="takenNIPs"
                  :takenEmails="takenEmails"
                  :isUpdate="true"
                ></FormProfil>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormProfil from "./FormProfil";
import ProfileAPI from "@/api/profile";
import VWidget from "@/components/VWidget";
import UserAPI from "@/api/user";

export default {
  components: {
    FormProfil,
    VWidget
  },
  data() {
    return {
      profile: {
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
      takenNIPs: [],
      takenEmails: []
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.profile = this.$store.getters.user;
      this.profile.fileName = this.$store.getters.user.signature;
      UserAPI.getUniques().then(r => {
        this.takenEmails = [];
        for (const key in r.data.email) {
          if (r.data.email.hasOwnProperty(key)) {
            if (r.data.email[key] !== this.profile.email) {
              this.takenEmails.push(r.data.email[key]);
            }
          }
        }

        let nips = r.data.NIP.map(String);
        this.takenNIPs = [];

        for (const key in nips) {
          if (nips.hasOwnProperty(key)) {
            if (this.profile.employee_id_number != nips[key]) {
              this.takenNIPs.push(nips[key]);
            }
          }
        }
      });
    },
    submit() {
      this.loading = true;
      let formData = new FormData();

      for (const key in this.profile) {
        if (this.profile.hasOwnProperty(key)) {
          formData.append(key, this.profile[key]);
        }
      }

      ProfileAPI.update(formData).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$store.dispatch("getProfile").then(() => {
          this.$router.push({
            name: "ShowProfil"
          });
        });
      });
    }
  }
};
</script>
