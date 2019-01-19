<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <FormSuratKeluar
                  :letter="letter"
                  :onSubmit="submit"
                  :loading="loading"
                  :takenNumbers="takenNumbers"
                ></FormSuratKeluar>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormSuratKeluar from "./FormSuratKeluar";
import OutcomingLetterAPI from "@/api/outcoming-letter";
import VWidget from "@/components/VWidget";
import LetterAPI from "@/api/letter";

export default {
  components: {
    FormSuratKeluar,
    VWidget
  },
  data() {
    return {
      letter: {
        id: "",
        number: "",
        date: "",
        subject: "",
        tendency: "",
        recipient: "",
        attachments: 0,
        letter_code_id: "",
        sub_letter_code_id: ""
      },
      loading: false,
      takenNumbers: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchSuratKeluar(id);
  },
  methods: {
    fetchSuratKeluar(id) {
      OutcomingLetterAPI.get(id).then(response => {
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
      OutcomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowSuratKeluar",
          params: { id: response.data.data.letter_id }
        });
      });
    }
  }
};
</script>
