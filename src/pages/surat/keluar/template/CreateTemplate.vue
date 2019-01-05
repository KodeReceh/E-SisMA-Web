<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.push({ name: 'pages/surat/keluar/template' })"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Template">
            <div slot="widget-content">
              <v-container>
                <FormTemplate :template="template" :onSubmit="submit" ></FormTemplate>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormTemplate from './FormTemplate';
import VWidget from '@/components/VWidget';
import TemplateAPI from '@/api/template';

export default {
  components: {
    FormTemplate,
    VWidget,
  },
  data () {
    return {
      template: {
        title: '',
        needs_villager_data: '',
        template_file: '',
        fileName: '',
        letter_code_id: '',
        sub_letter_code_id: ''
      }
    };
  },
  methods: {
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });

      let formData = new FormData();
      formData.append('title', this.template.title);
      formData.append('needs_villager_data', this.template.needs_villager_data);
      formData.append('template_file', this.template.template_file);
      formData.append('letter_code_id', this.template.letter_code_id);
      formData.append('sub_letter_code_id', this.template.letter_code_id);

      TemplateAPI.store(formData).then(response => {
        this.$router.push({ name: 'ShowTemplate', params: { id: response.data.data.id }});
        loader.hide();
      });
    }
  }
};
</script>
