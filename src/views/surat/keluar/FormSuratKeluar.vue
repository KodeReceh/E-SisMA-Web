<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-autocomplete
      v-model="letter.letter_code_id"
      :items="letterCodes"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="details"
      label="Kategori Surat"
      required
      item-text="code_title"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-autocomplete
      v-model="letter.sub_letter_code_id"
      :items="subLetterCodes"
      prepend-icon="details"
      label="Sub Kategori Surat"
      item-text="code_title"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
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
        readonly
      ></v-text-field>
      <v-date-picker
        v-model="letter.date"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="letter.ordinal"
      :rules="nonEmptyRules"
      label="Urutan Surat"
      prepend-icon="sort"
      required
    ></v-text-field>
    <v-text-field
      v-model="letter.subject"
      :rules="nonEmptyRules"
      label="Subjek Surat"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-text-field
      v-model="letter.number"
      :rules="getNumberRules()"
      label="Nomor Surat"
      prepend-icon="format_list_numbered"
      required
      readonly
    ></v-text-field>
    <v-text-field
      v-model="letter.tendency"
      label="Perihal Surat"
      prepend-icon="error"
    ></v-text-field>
    <v-text-field
      v-model="letter.attachments"
      label="Lampiran Surat"
      prepend-icon="description"
      required
    ></v-text-field>
    <v-text-field
      v-model="letter.recipient"
      :rules="nonEmptyRules"
      label="Ditujukan Kepada"
      prepend-icon="person_outline"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit" color="info" :loading="loading"
      >submit</v-btn
    >
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import LetterCodeAPI from "@/api/letter-code";
import SubLetterCodeAPI from "@/api/sub-letter-code";
import OutcomingLetterAPI from "@/api/outcoming-letter";

export default {
  props: ["letter", "onSubmit", "loading", "takenNumbers"],
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
    letterCodes: [],
    subLetterCodes: []
  }),
  watch: {
    "letter.letter_code_id": {
      handler: function(val, oldVal) {
        if (oldVal) this.letter.sub_letter_code_id = null;
        this.fetchLetterCodeItems();
        this.setNumber();
        if (val) this.fetchNewSubLetterCodeItems();
      },
      immediate: true
    },
    "letter.sub_letter_code_id": {
      handler: function() {
        this.setNumber();
      },
      immediate: true
    },
    "letter.subject": {
      handler: function() {
        this.setNumber();
      },
      immediate: true
    },
    "letter.date": {
      handler: function(val, oldVal) {
        if (oldVal) {
          if (new Date(oldVal).getFullYear() !== new Date(val).getFullYear()) {
            let date = this.letter.date
              ? new Date(this.letter.date)
              : new Date();
            let year = date.getFullYear();
            this.setDefaultOrdinal(year);
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.fetchLetterCodeItems();
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    },
    fetchLetterCodeItems() {
      LetterCodeAPI.getList()
        .then(response => {
          if (response.data.success) {
            this.letterCodes = response.data.data;
          }
        })
        .catch(e => {
          alert(e.response.status + ": " + e.response.statusText);
        });
    },
    fetchNewSubLetterCodeItems() {
      SubLetterCodeAPI.getList(this.letter.letter_code_id)
        .then(response => {
          if (response.data.success) {
            this.subLetterCodes = response.data.data;
            this.subLetterCodes.unshift({
              id: null,
              code_title: "--Tidak Menggunakan Sub Kode Surat--"
            });
          }
        })
        .catch(e => {
          alert(e.response.status + ": " + e.response.statusText);
        });
    },
    setDefaultOrdinal(year) {
      OutcomingLetterAPI.getOrdinal(year).then(response => {
        this.letter.ordinal = response.data.data;
      });
    },
    setNumber() {
      const code = this.letterCodes.find(c => {
        return c.id === this.letter.letter_code_id;
      });
      const subCode = this.subLetterCodes.find(c => {
        return c.id === this.letter.sub_letter_code_id;
      });
      const theCode = code ? code.code : "";
      const theSubCode = subCode ? subCode.code : "";
      const matches = this.letter.subject.match(/\b(\w)/g);
      const acronym = matches ? matches.join("") : "";
      const date = this.letter.date ? new Date(this.letter.date) : new Date();
      const year = date.getFullYear();
      this.letter.number =
        theCode +
        (theSubCode ? "." + theSubCode : "") +
        "/" +
        (this.letter.ordinal || "") +
        "/" +
        acronym +
        "/" +
        year;
    },
    getNumberRules() {
      return [
        v => !!v || "Nomor surat tidak boleh kosong.",
        v =>
          !this.takenNumbers.includes(v) || "Nomor surat ini sudah terdaftar."
      ];
    }
  }
};
</script>
