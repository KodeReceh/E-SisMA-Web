<template>
  <v-dialog v-model="dialog.state" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title class="justify-center" :style="{ backgroundColor: this.$vuetify.theme.primary}">
        <span class="headline" :style="{ color: 'white', fontWeight: 'bold'}">{{ dialog.title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-form ref="formFile" v-model="valid" lazy-validation>
              <v-flex xs12>
                <v-text-field label="Nama Field" :rules="nonEmptyRules" required v-model="field.name" prepend-icon="title"></v-text-field>
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
import TemplateFieldAPI from '@/api/template-field';

export default {
  props: {
    dialog: {
      type: Object,
      default: null,
    },
    fetchFields: {
      type: Function,
      default: null
    },
    field: {
      type: Object,
      default: {
        id: '',
        name: '',
        type: '',
        role_id: '',
      }
    }
  },
  data () {
    return {
      loading: false,
      valid: false,
      nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
    };
  },
  methods: {
    save () {
      if (this.$refs.formFile.validate()) {
        this.loading = true;
        let formData = new FormData();
        formData.append('file', this.file.file);
        formData.append('caption', this.file.caption);
        formData.append('document_id', this.file.document_id);
        formData.append('ordinal', this.file.ordinal);

        if (this.dialog.isUpdate) {
          FileAPI.update(this.file.id, formData).then(response => {
            this.onClosedDialog();
          }).catch(e => {
            alert(e.response.status + ': ' + e.response.statusText);
            this.onClosedDialog();
          });
        } else {
          FileAPI.store(formData).then(response => {
            this.onClosedDialog();
          }).catch(e => {
            alert(e.response.status + ': ' + e.response.statusText);
            this.onClosedDialog();
          });
        }
      }
    },
    onClosedDialog () {
      this.clearFileObject();
      this.dialog.state = false;
      this.loading = false;
      this.fetchFiles();
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
      this.dialog.isUpdate = false;
      this.dialog.data = null;
    },
  }
};
</script>