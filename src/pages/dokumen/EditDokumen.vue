<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'Dokumen'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Dokumen">
            <div slot="widget-content">
              <v-container>
                <FormDokumen :document="document" :onSubmit="submit" :isUpdate="isUpdate"></FormDokumen>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormDokumen from './FormDokumen';
import VWidget from '@/components/VWidget';
import DocumentAPI from '@/api/document';

export default {
  components: {
    FormDokumen,
    VWidget,
  },
  data () {
    return {
      document: {
        id: '',
        title: '',
        date: '',
        file: null,
        fileName: '',
        description: '',
        file_type: ''
      },
      isUpdate: true,
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchDokumen(id);
  },
  methods: {
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      let formData = new FormData();
      formData.append('file', this.document.file);
      formData.append('title', this.document.title);
      formData.append('date', this.document.date);
      formData.append('file_type', this.document.file_type);
      formData.append('description', this.document.description);
      DocumentAPI.update(this.document.id, formData).then(response => {
        this.$router.push({ name: 'ShowDokumen', params: { id: response.data.data.id }});
        loader.hide();
      });
    },
    fetchDokumen (id) {
      DocumentAPI.get(id).then(response => {
        this.document.id = response.data.data.id;
        this.document.fileName = response.data.data.path;
        this.document.title = response.data.data.title;
        this.document.date = response.data.data.date;
        this.document.description = response.data.data.description;
      });
    }
  }
};
</script>