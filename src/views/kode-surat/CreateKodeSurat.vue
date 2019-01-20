<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Kode Surat">
            <div slot="widget-content">
              <v-container>
                <FormKodeSurat
                  :letterCode="letterCode"
                  :onSubmit="submit"
                  :loading="loading"
                  :takenCodes="takenCodes"
                ></FormKodeSurat>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormKodeSurat from "./FormKodeSurat";
import VWidget from "@/components/VWidget";
import LetterCodeAPI from "@/api/letter-code";

export default {
  components: {
    FormKodeSurat,
    VWidget
  },
  data() {
    return {
      letterCode: {
        code: "",
        title: ""
      },
      loading: false,
      takenCodes: []
    };
  },
  mounted() {
    this.getTakenCodes();
  },
  methods: {
    submit() {
      this.loading = true;
      LetterCodeAPI.store(this.letterCode).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowKodeSurat",
          params: { id: response.data.data.id }
        });
      });
    },
    getTakenCodes() {
      LetterCodeAPI.getTakenCodes().then(response => {
        this.takenCodes = response.data.data;
      });
    }
  }
};
</script>
