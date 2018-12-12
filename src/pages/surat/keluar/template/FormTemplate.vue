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
      accept="image/*"
      @change.passive="onFilePicked"
    >
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
export default {
  props: ['template', 'onSubmit'],
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
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear () {
      this.$refs.form.reset();
    },
    onFilePicked (e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (this.getFileExtension(files[0].name) === 'doc' || 
        this.getFileExtension(files[0].name) === 'docx') {
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
    }
  }
};
</script>