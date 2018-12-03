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
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <v-text-field label="Select File" @click="pickFile" v-model="file.fileName" prepend-icon="attach_file"></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="file"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Nama File" required v-model="file.caption" prepend-icon="title"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*wajib diisi</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog.state = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog.state = false" @click="save">Save</v-btn>
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
    lastOrdinal: {
      type: Promise,
      default: 0,
    },
  },
  data () {
    return {
      file: {
        document_id: '',
        caption: '',
        ordinal: 0,
        file: '',
        fileName: '',
      }
    };
  },
  computed: {
    'file.ordinal': function () {
      return this.lastOrdinal + 1;
    }
  },
  mounted () {
    const { id } = this.$route.params;
    this.file.document_id = id;
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
      let formData = new FormData();
      formData.append('file', this.file.file);
      formData.append('caption', this.file.caption);
      formData.append('document_id', this.file.document_id);
      formData.append('ordinal', this.file.ordinal);
      FileAPI.store(formData).then(response => {
        console.log(response);
      });
    },
  }
};
</script>