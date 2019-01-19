<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <FormSuratMasuk
                  :letter="letter"
                  :onSubmit="submit"
                  :availableUsers="availableUsers"
                  :loading="loading"
                  :takenNumbers="takenNumbers"
                ></FormSuratMasuk>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormSuratMasuk from "./FormSuratMasuk";
import IncomingLetterAPI from "@/api/incoming-letter";
import VWidget from "@/components/VWidget";
import RecipientAPI from "@/api/recipient";
import LetterAPI from "@/api/letter";

export default {
  components: {
    FormSuratMasuk,
    VWidget
  },
  data() {
    return {
      letter: {
        id: "",
        number: "",
        date: "",
        receipt_date: "",
        subject: "",
        tendency: "",
        sender: "",
        user_id: [],
        attachments: 0,
        letter_code_id: "",
        sub_letter_code_id: ""
      },
      availableUsers: [],
      loading: false,
      takenNumbers: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchSuratMasuk(id);
    this.fetchAvailableUsers();
  },
  methods: {
    fetchSuratMasuk(id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
        LetterAPI.getNumbers().then(r => {
          this.takenNumbers = [];
          for (const key in r.data.data) {
            if (r.data.data.hasOwnProperty(key)) {
              if (r.data.data[key] !== response.data.data.number) {
                this.takenNumbers.push(r.data.data[key]);
              }
            }
          }
        });
      });
    },
    submit() {
      this.loading = true;
      IncomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowSuratMasuk",
          params: {
            id: response.data.data.letter_id
          }
        });
      });
    },
    fetchAvailableUsers() {
      RecipientAPI.getAllRecipients()
        .then(response => {
          this.availableUsers = response.data.data;
        })
        .catch(e => {
          alert(e.status + ": " + e.statusText);
        });
    }
  }
};
</script>
