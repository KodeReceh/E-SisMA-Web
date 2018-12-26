<template>
  <v-dialog v-model="dialog.state" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title class="justify-center" :style="{ backgroundColor: this.$vuetify.theme.primary}">
        <span class="headline" :style="{ color: 'white', fontWeight: 'bold'}">{{ dialog.title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="formField" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                 <v-autocomplete
                  v-model="field.field_type"
                  :items="types"
                  :rules="[v => !!v || 'Item is required']"
                  prepend-icon="view_headline"
                  label="Tipe Field"
                  required
                  item-text="title"
                  item-value="id"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-if="field.field_type !== 3 || !field.field_type" label="Nama Field" :rules="nonEmptyRules" :required="field.field_type !== 3 || !field.field_type" v-model="field.name" prepend-icon="title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-if="field.field_type === 3"
                  v-model="field.name"
                  :items="villagerFields"
                  :rules="[v => !!v || 'Item is required']"
                  prepend-icon="title"
                  label="Nama Field"
                  :required="field.field_type === 3"
                  item-text="title"
                  item-value="id"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-if="field.field_type === 4"
                  v-model="field.role_id"
                  :items="roles"
                  :rules="[v => !!v || 'Item is required']"
                  prepend-icon="done_all"
                  label="Jabatan Penanda Tangan"
                  :required="field.field_type === 4"
                  item-text="title"
                  item-value="title"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-form>
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
        field_type: '',
        role_id: '',
      }
    }
  },
  data () {
    return {
      loading: false,
      valid: false,
      nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
      types: [
        {
          id: 1,
          title: 'Text'
        },
        {
          id: 2,
          title: 'Gambar'
        },
        {
          id: 3,
          title: 'Data Penduduk'
        },
        {
          id: 4,
          title: 'Tanda Tangan'
        }
      ],
      villagerFields: [],
      roles: [],
    };
  },
  methods: {
    save () {
      if (this.$refs.formField.validate()) {
        this.loading = true;
        let formData = new FormData();
        formData.append('name', this.field.name);
        formData.append('type', this.field.field_type);
        formData.append('role_id', this.field.role_id);

        if (this.dialog.isUpdate) {
          TemplateFieldAPI.update(this.file.id, formData).then(response => {
            this.onClosedDialog();
          }).catch(e => {
            alert(e.response.status + ': ' + e.response.statusText);
            this.onClosedDialog();
          });
        } else {
          TemplateFieldAPI.store(formData).then(response => {
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
      this.fetchFields();
    },
    clearFileObject () {
      this.$refs.formField.reset();
      this.valid = false;
      this.dialog.isUpdate = false;
      this.dialog.data = null;
    },
  }
};
</script>