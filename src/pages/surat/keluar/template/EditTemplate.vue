<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.push({ name: 'pages/surat/keluar/template' })"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Template">
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
        fileName: ''
      }
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchTemplate(id);
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
      const { id } = this.$route.params;
      TemplateAPI.update(id, formData).then(response => {
        this.$router.push({ name: 'ShowTemplate', params: { id: response.data.data.id }});
        loader.hide();
      });
    },
    fetchTemplate (id) {
      TemplateAPI.get(id).then(response => {
        this.template.title = response.data.data.title;
        this.template.needs_villager_data = response.data.data.needs_villager_data;
        this.template.fileName = response.data.data.template_file;
      });
    }
  }
};
</script>
