<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Surat Keluar">
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
import VWidget from "@/components/VWidget";
import OutcomingLetterAPI from "@/api/outcoming-letter";
import LetterAPI from "@/api/letter";

export default {
  components: {
    FormSuratKeluar,
    VWidget
  },
  data() {
    return {
      letter: {
        number: "",
        date: "",
        subject: "",
        tendency: "",
        recipient: "",
        attachments: 0,
        ordinal: "",
        letter_code_id: "",
        sub_letter_code_id: ""
      },
      loading: false,
      takenNumbers: []
    };
  },
  mounted() {
    const year = new Date().getFullYear();
    this.setDefaultOrdinal(year);
    this.getNumbers();
  },
  methods: {
    submit() {
      this.loading = true;
      OutcomingLetterAPI.store(this.letter).then(response => {
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.loading = false;
        this.$router.push({
          name: "ShowSuratKeluar",
          params: { id: response.data.data.letter_id }
        });
      });
    },
    setDefaultOrdinal(year) {
      OutcomingLetterAPI.getOrdinal(year).then(response => {
        this.letter.ordinal = response.data.data;
      });
    },
    getNumbers() {
      LetterAPI.getNumbers().then(response => {
        this.takenNumbers = response.data.data;
      });
    }
  }
};
</script>
