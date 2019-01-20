<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-toolbar class="elevation-0 transparent media-toolbar">
          <v-btn :round="true" flat @click="$router.go(-1)">
            <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
          </v-btn>
        </v-toolbar>
        <v-flex sm12>
          <v-widget title="Detail Kode Surat">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Kode</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letterCode.code" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Kode</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letterCode.title" />
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="addButtonClicked">Tambah</v-btn>
        <v-flex sm12>
          <sub-kode-surat ref="kodeSurat"></sub-kode-surat>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import LetterCodeAPI from "@/api/letter-code";
import SubKodeSurat from "./SubKodeSurat";

export default {
  components: {
    VWidget,
    SubKodeSurat
  },
  data() {
    return {
      letterCode: {
        code: "",
        title: ""
      }
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchLetterCode(id);
  },
  methods: {
    fetchLetterCode(id) {
      LetterCodeAPI.get(id).then(response => {
        this.letterCode = response.data.data;
      });
    },
    addButtonClicked() {
      this.$refs.kodeSurat.dialog.state = true;
    }
  }
};
</script>
