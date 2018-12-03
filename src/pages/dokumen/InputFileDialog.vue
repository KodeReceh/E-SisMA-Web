<template>
  <v-dialog v-model="dialog.state" scrollable max-width="500px">
    <v-card>
      <v-card-title class="justify-center" :style="{ backgroundColor: this.$vuetify.theme.primary}">
        <span class="headline" :style="{ color: 'white', fontWeight: 'bold'}">{{ dialog.title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form ref="formFile" v-model="valid" lazy-validation>
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-text-field label="Select File" @click="pickFile" :rules="nonEmptyRules" v-model="file.fileName" prepend-icon="attach_file" readonly required></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="file"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Nama File" :rules="nonEmptyRules" required v-model="file.caption" prepend-icon="title"></v-text-field>
              </v-flex>
            </v-form>
          </v-layout>
        </v-container>
        <small>*wajib diisi</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog.state = false; clearFileObject();">Close</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" flat @click="save" :loading="loading">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileAPI from '@/api/file';

export default {
  props: {
    dialog: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      loading: false,
      valid: false,
      nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
      file: {
        document_id: '',
        ordinal: '',
        caption: '',
        file: '',
        fileName: '',
      }
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.file.document_id = id;
    this.setOrdinal();
    console.log(this.$refs.file);
    
  },
  updated () {
    this.setOrdinal();
  },
  methods: {
    pickFile () {
      this.$refs.file.click();
    },
    onFilePicked (e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.file.file = files[0];
        this.file.fileName = files[0].name;
      } else {
        this.file.file = '';
      }
    },
    save () {
      if (this.$refs.formFile.validate()) {
        this.loading = true;
        let formData = new FormData();
        formData.append('file', this.file.file);
        formData.append('caption', this.file.caption);
        formData.append('document_id', this.file.document_id);
        formData.append('ordinal', this.file.ordinal);
        FileAPI.store(formData).then(response => {
          console.log(response);
          this.clearFileObject();
          this.dialog.state = false;
          this.loading = false;
        });
      }
    },
    setOrdinal () {
      const { id } = this.$route.params;
      return FileAPI.getLastOrdinal(id).then(response => {
        this.file.ordinal = parseInt(response.data.data, 10) + 1;
      });
    },
    clearFileObject () {
      this.$refs.formFile.reset();
      this.file.file = '';
      this.valid = false;
    }
  }
};
</script>