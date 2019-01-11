<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="letter.sign">
          <v-btn
            v-if="!letter.sign.has_signed && !letter.generated_file"
            color="primary"
            @click="sign()"
          >Tanda Tangan</v-btn>
          <v-btn
            v-if="letter.sign.has_signed && !letter.generated_file"
            color="primary"
            @click="unsign()"
          >Batal Tanda Tangan</v-btn>
        </div>
        <v-btn
          v-if="letter.generated_file"
          color="error"
          @click="deleteGeneratedFile()"
        >Hapus File Surat</v-btn>
        <v-flex sm12>
          <v-widget title="Detail Draft Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Surat</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letter.letter_name"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Template</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letter.template_name"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Status</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ letter.status ? 'Selesai' : 'Draft' }}</p>
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  row
                  spacer
                  slot="header"
                  v-for="(value, key) in letter.data"
                  v-bind:key="key"
                >
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">{{ key.replace(/_/g, " ") }}</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ value }}</p>
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  row
                  spacer
                  slot="header"
                  v-for="(value, key) in letter.villager_data"
                  v-bind:key="key"
                >
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">{{ key.replace(/_/g, " ") + ' Penduduk' }}</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ value }}</p>
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  row
                  spacer
                  slot="header"
                  v-for="(value, key) in letter.signations_status"
                  v-bind:key="key"
                >
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">{{ key.replace(/_/g, " ") }}</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ value ? 'Sudah' : 'Belum' }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LetterTemplateAPI from "@/api/letter-template";
import VWidget from "@/components/VWidget";

export default {
  components: {
    VWidget
  },
  data() {
    return {
      letter: {
        id: "",
        letter_name: "",
        status: "",
        data: {},
        signations_status: {},
        needs_villager_data: "",
        is_all_signed: "",
        template_name: "",
        template: {},
        villager: {},
        sign: ""
      }
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchDraft(id);
  },
  methods: {
    fetchDraft(id) {
      LetterTemplateAPI.getDraft(id).then(response => {
        this.letter = response.data.data;
        this.letter.data = JSON.parse(this.letter.data);
      });
    },
    deleteGeneratedFile() {
      LetterTemplateAPI.deleteGeneratedFile(this.letter.id).then(response => {
        this.letter = response.data.data;
        this.letter.data = JSON.parse(this.letter.data);
      });
    },
    sign() {
      LetterTemplateAPI.sign(this.letter.id).then(response => {
        this.letter = response.data.data;
        this.letter.data = JSON.parse(this.letter.data);
      });
    },
    unsign() {
      LetterTemplateAPI.unsign(this.letter.id).then(response => {
        this.letter = response.data.data;
        this.letter.data = JSON.parse(this.letter.data);
      });
    }
  }
};
</script>

<style scoped>
.font-weight-bold {
  text-transform: capitalize;
}
</style>
