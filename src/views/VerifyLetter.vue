<template>
  <v-app id="verify" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3" v-if="!result">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Verifikasi Surat</h1>
                </div>
                <v-form ref="form">
                  <v-text-field
                    required
                    :rules="nonEmptyRules"
                    prepend-icon="filter_1"
                    label="Nomor Surat"
                    type="text"
                    v-model="letter.number"
                    autocomplete
                  ></v-text-field>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="menu"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="letter.date"
                      :rules="nonEmptyRules"
                      label="Tanggal Surat"
                      prepend-icon="event"
                      required
                    ></v-text-field>
                    <v-date-picker v-model="letter.date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-form>
              </v-card-text>
              <div v-if="errorMsg">
                <p style="color: red">{{ errorMsg }}</p>
              </div>
              <br>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="submit" :loading="loading">Cek</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="elevation-1 pa-3" v-if="result">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">Surat Terverifikasi!</h1>
                </div>
                <v-flex sm12>
                  <v-container>
                    <v-layout align-center row spacer slot="header">
                      <v-flex xs5 sm5 md5>
                        <p class="font-weight-bold">Nomor</p>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs7 sm7 md7>
                        <p class="font-weight-regular" v-html="found.number"/>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center row spacer slot="header">
                      <v-flex xs5 sm5 md5>
                        <p class="font-weight-bold">Tanggal</p>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs7 sm7 md7>
                        <p class="font-weight-regular">{{ found.date }}</p>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center row spacer slot="header">
                      <v-flex xs5 sm5 md5>
                        <p class="font-weight-bold">Kepada</p>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs7 sm7 md7>
                        <p class="font-weight-regular">{{ found.recipient }}</p>
                      </v-flex>
                    </v-layout>
                    <v-layout align-center row spacer slot="header">
                      <v-flex xs5 sm5 md5>
                        <p class="font-weight-bold">Keterangan</p>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs7 sm7 md7>
                        <p class="font-weight-regular">{{ found.subject }}</p>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="again()">Cek Lagi</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import VerifyLetterAPI from "@/api/incoming-letter";
import VWidget from "@/components/VWidget";

export default {
  components: {
    VWidget
  },
  data() {
    return {
      valid: false,
      menu: false,
      result: false,
      nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
      letter: {
        number: "",
        date: ""
      },
      loading: false,
      errorMsg: "",
      found: {
        number: "",
        date: "",
        recipient: "",
        subject: ""
      }
    };
  },
  watch: {
    "letter.number": function() {
      this.errorMsg = "";
    },
    "letter.date": function() {
      this.errorMsg = "";
    }
  },
  created() {
    if (this.$route.query.date && this.$route.query.number) {
      this.letter.number = this.$route.query.number;
      this.letter.date = this.$route.query.date;
      this.check();
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.check();
      }
      return;
    },
    check() {
      let formData = new FormData();
      this.loading = true;
      this.errorMsg = "";

      for (const key in this.letter) {
        if (this.letter.hasOwnProperty(key)) {
          formData.append(key, this.letter[key]);
        }
      }

      VerifyLetterAPI.verifyLetter(formData).then(response => {
        if (response.data.data) {
          this.$refs.form.reset();
          this.result = true;
          this.found = response.data.data;
        } else {
          this.errorMsg = "Data surat tidak ditemukan!";
        }
        this.loading = false;
      });
    },
    again() {
      this.result = false;
      this.found = {
        number: "",
        date: "",
        recipient: "",
        subject: ""
      };
    }
  }
};
</script>
<style scoped lang="css">
#verify {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
