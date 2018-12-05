<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="letter.number"
      :rules="nonEmptyRules"
      label="Nomor Surat"
      prepend-icon="format_list_numbered"
      required
    ></v-text-field>
    <v-menu
      :close-on-content-click="false"
      v-model="menu1"
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
      <v-date-picker v-model="letter.date" @input="menu1 = false"></v-date-picker>
    </v-menu>
    <v-menu
      :close-on-content-click="false"
      v-model="menu2"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
      >
      <v-text-field
        slot="activator"
        v-model="letter.receipt_date"
        :rules="nonEmptyRules"
        label="Tanggal Terima Surat"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="letter.receipt_date" @input="menu2 = false"></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="letter.subject"
      :rules="nonEmptyRules"
      label="Subjek Surat"
      prepend-icon="title"
      required
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
      v-model="letter.sender"
      :rules="nonEmptyRules"
      label="Pengirim Surat"
      prepend-icon="person"
      required
    ></v-text-field>
    <v-text-field
      v-model="letter.to"
      :rules="nonEmptyRules"
      label="Ditujukan Kepada"
      prepend-icon="person_outline"
      required
    ></v-text-field>
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
    <v-btn
      :disabled="!valid"
      @click="submit"
      color="info"
    >
    submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import LetterCodeAPI from '@/api/letter-code';
import SubLetterCodeAPI from '@/api/sub-letter-code';

export default {
  props: ['letter', 'onSubmit'],
  data: () => ({
    valid: false,
    menu1: false,
    menu2: false,
    nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
    letterCodes: [],
    subLetterCodes: []
  }),
  watch: {
    'letter.letter_code_id': {
      handler: function (val, oldVal) {
        if (oldVal) this.letter.sub_letter_code_id = null;
        this.fetchLetterCodeItems();
        this.fetchNewSubLetterCodeItems();
      },
      immediate: true
    },
  },
  created () {
    this.fetchLetterCodeItems();
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear () {
      this.$refs.form.reset();
    },
    fetchLetterCodeItems () {
      LetterCodeAPI.getList()
        .then(response => {
          if (response.data.success) {
            this.letterCodes = response.data.data;
          }
        }).catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
    },
    fetchNewSubLetterCodeItems () {
      SubLetterCodeAPI.getList(this.letter.letter_code_id)
        .then(response => {
          if (response.data.success) {
            this.subLetterCodes = response.data.data;
            this.subLetterCodes.unshift({
              'id': null,
              'code_title': '--Tidak Menggunakan Sub Kode Surat--',
            });
          }
        }).catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
    }
  }
};
</script>