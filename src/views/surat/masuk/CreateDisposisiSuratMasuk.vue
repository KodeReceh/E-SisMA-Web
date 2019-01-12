<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget :title="'Create Disposisi Surat Masuk ' + letter.number">
            <div slot="widget-content">
              <v-container>
                <FormDisposisiSuratMasuk
                  :disposition="disposition"
                  :onSubmit="submit"
                  :loading="loading"
                ></FormDisposisiSuratMasuk>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormDisposisiSuratMasuk from "./FormDisposisiSuratMasuk";
import IncomingLetterAPI from "@/api/incoming-letter";
import VWidget from "@/components/VWidget";

export default {
  components: {
    FormDisposisiSuratMasuk,
    VWidget
  },
  data() {
    return {
      letter: {
        id: "",
        number: ""
      },
      disposition: {
        processing_date: "",
        information: "",
        summary: ""
      },
      loading: false
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchSuratMasuk(id);
    this.disposition.incoming_letter_id = id;
  },
  methods: {
    fetchSuratMasuk(id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      });
    },
    submit() {
      this.loading = true;
      IncomingLetterAPI.storeDisposition(
        this.disposition.incoming_letter_id,
        this.disposition
      ).then(response => {
        this.loading = false;
        this.$router.push({
          name: "ShowDisposisiSuratMasuk",
          params: {
            id: response.data.data.incoming_letter_id
          }
        });
      });
    }
  }
};
</script>
