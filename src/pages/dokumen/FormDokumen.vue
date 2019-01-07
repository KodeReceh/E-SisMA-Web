<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="document.title"
      :rules="nonEmptyRules"
      label="Nama Dokumen"
      prepend-icon="title"
      required
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
        v-model="document.date"
        :rules="nonEmptyRules"
        label="Tanggal Dokumen"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="document.date" @input="menu = false"></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="document.description"
      :rules="nonEmptyRules"
      label="Keterangan"
      prepend-icon="info"
      required
    ></v-text-field>
    <v-text-field label="Pilih File" @click="pickFile" :rules="nonEmptyRules" v-model="document.fileName" prepend-icon="attach_file" readonly :required="!isUpdate"></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="image/*"
      @change="onFilePicked"
    >
    <v-autocomplete
      v-model="document.archive_id"
      :items="archives"
      prepend-icon="details"
      label="Arsip"
      item-text="title"
      item-value="id"
      :chips="true"
      :readonly="readOnlyArchive"
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
import ArchiveAPI from '@/api/archive';

export default {
  props: {
    document: {
      type: Object,
      default: {
        title: '',
        date: '',
        description: '',
        fileName: '',
        file: null,
        file_type: '',
        archive_id: '',
      }
    },
    onSubmit: Function,
    isUpdate: Boolean,
    loading: Boolean,
    readOnlyArchive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: false,
      menu: false,
      nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
      archives: []
    };
  },
  mounted () {
    this.fetchArchives();
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear () {
      this.$refs.form.reset();
      this.document.file = null;
      this.loading = false;
    },
    pickFile () {
      this.$refs.file.click();
    },
    onFilePicked (e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.document.file = files[0];
        this.document.fileName = files[0].name;
        this.document.file_type = files[0].type;
      } else {
        this.document.file = null;
        this.document.fileName = '';
        this.document.file_type = '';
      }
    },
    getExtFile (fileName) {
      return (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : undefined;
    },
    fetchArchives () {
      ArchiveAPI.getList().then(response => {
        this.archives = response.data.data;
        this.archives.unshift({
          'id': '',
          'title': '--Tidak Arsipkan Dulu--',
        });
      });
    }
  }
};
</script>