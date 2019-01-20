<template>
  <v-dialog v-model="dialog.state" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title
        class="justify-center"
        :style="{ backgroundColor: this.$vuetify.theme.primary }"
      >
        <span
          class="headline"
          :style="{ color: 'white', fontWeight: 'bold' }"
          >{{ dialog.title }}</span
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Kode"
                  :rules="getSubCodeRules()"
                  required
                  v-model="sub.code"
                  prepend-icon="format_list_numbered"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Nama Sub Kode Surat"
                  :rules="nonEmptyRules"
                  required
                  v-model="sub.title"
                  prepend-icon="title"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="
            dialog.state = false;
            $refs.form.reset();
          "
          >Close</v-btn
        >
        <v-btn
          color="blue darken-1"
          :disabled="!valid"
          flat
          @click="save"
          :loading="loading"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LetterCodeAPI from "@/api/letter-code";
export default {
  props: {
    dialog: {
      type: Object,
      default: null
    },
    fetchList: {
      type: Function,
      default: null
    },
    sub: {
      type: Object,
      default() {
        return {
          code: "",
          title: ""
        };
      }
    }
  },
  data() {
    return {
      loading: false,
      valid: false,
      nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
      takenSubCodes: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchTakenSubCodes(id);
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id } = this.$route.params;
        LetterCodeAPI.storeSub(id, this.sub)
          .then(response => {
            this.$store.commit("showSnackbar", {
              text: response.data.description,
              color: "info"
            });
            this.onClosedDialog();
          })
          .catch(e => {
            alert(e.response.status + ": " + e.response.statusText);
            this.onClosedDialog();
          });
      }
    },
    onClosedDialog() {
      const { id } = this.$route.params;
      this.$refs.form.reset();
      this.dialog.state = false;
      this.loading = false;
      this.fetchList(id);
      this.fetchTakenSubCodes(id);
    },
    fetchTakenSubCodes(id) {
      LetterCodeAPI.getTakenSubCodes(id).then(response => {
        this.takenSubCodes = response.data.data;
      });
    },
    getSubCodeRules() {
      return [
        v => !!v || "Kode tidak boleh kosong.",
        v =>
          !this.takenSubCodes.includes(parseInt(v)) ||
          "Sub Kode ini sudah terdaftar.",
        v =>
          (v ? v.match(/^[0-9]{0,}$/) !== null : false) ||
          "Hanya mengizinkan angka pada sub kode"
      ];
    }
  }
};
</script>
