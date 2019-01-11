<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="template.title"
      :rules="nonEmptyRules"
      label="Nama Template"
      prepend-icon="format_list_numbered"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="template.needs_villager_data"
      :items="needs"
      :rules="[v => !!v || v === 0 || 'Item is required']"
      prepend-icon="details"
      label="Butuh Data Penduduk"
      required
      item-text="text"
      item-value="value"
      :chips="true"
    ></v-autocomplete>
    <v-text-field label="Pilih File" @click.passive="pickFile" :rules="nonEmptyRules" v-model="template.fileName" prepend-icon="attach_file" readonly required></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      @change.passive="onFilePicked"
    >
    <v-autocomplete
      v-model="template.letter_code_id"
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
      v-model="template.sub_letter_code_id"
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
      :loading="loading"
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
  props: ['template', 'onSubmit', 'loading'],
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
    needs: [
      {
        value: 0,
        text: 'Tidak'
      },
      {
        value: 1,
        text: 'Ya'
      }
    ],
    letterCodes: [],
    subLetterCodes: []
  }),
  watch: {
    'template.letter_code_id': {
      handler: function (val, oldVal) {
        if (oldVal) this.template.sub_letter_code_id = '';
        this.fetchLetterCodeItems();
        if (val) this.fetchNewSubLetterCodeItems();
      },
      immediate: true
    },
  },
  mounted () {
    this.fetchLetterCodeItems();
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear () {
      this.loading = false;
      this.$refs.form.reset();
    },
    onFilePicked (e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (this.getFileExtension(files[0].name) === 'docx') {
          this.template.template_file = files[0];
          this.template.fileName = files[0].name;
        } else {
          this.template.template_file = '';
          this.template.fileName = '';
          alert('Dokumen harus dalam ekstensi doc atau docx');
        }
        
      } else {
        this.template.template_file = '';
        this.template.fileName = '';
      }
    },
    pickFile () {
      this.$refs.file.click();
    },
    getFileExtension (fileName) {
      return /[^.]+$/.exec(fileName)[0];
    },
    fetchLetterCodeItems () {
      LetterCodeAPI.getList()
        .then(response => {
          if (response.data.success) {
            this.letterCodes = response.data.data;
          }
        })
        .catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
    },
    fetchNewSubLetterCodeItems () {
      SubLetterCodeAPI.getList(this.template.letter_code_id)
        .then(response => {
          if (response.data.success) {
            this.subLetterCodes = response.data.data;
            this.subLetterCodes.unshift({
              'id': '',
              'code_title': '--Tidak Menggunakan Sub Kode Surat--',
            });
          }
        })
        .catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
    }
  }
};
</script>