<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Edit Template">
            <div slot="widget-content">
              <v-container>
                <FormTemplate
                  :template="template"
                  :onSubmit="submit"
                  :loading="loading"
                ></FormTemplate>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormTemplate from "./FormTemplate";
import VWidget from "@/components/VWidget";
import TemplateAPI from "@/api/template";

export default {
  components: {
    FormTemplate,
    VWidget
  },
  data() {
    return {
      template: {
        title: "",
        needs_villager_data: "",
        template_file: "",
        fileName: "",
        letter_code_id: "",
        sub_letter_code_id: ""
      },
      loading: false
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchTemplate(id);
  },
  methods: {
    submit() {
      this.laoding = true;
      let formData = new FormData();
      formData.append("title", this.template.title);
      formData.append("needs_villager_data", this.template.needs_villager_data);
      formData.append("template_file", this.template.template_file);
      formData.append("letter_code_id", this.template.letter_code_id);
      formData.append("sub_letter_code_id", this.template.sub_letter_code_id);
      const { id } = this.$route.params;
      TemplateAPI.update(id, formData).then(response => {
        this.laoding = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowTemplate",
          params: { id: response.data.data.id }
        });
      });
    },
    fetchTemplate(id) {
      TemplateAPI.get(id).then(response => {
        this.template.title = response.data.data.title;
        this.template.needs_villager_data =
          response.data.data.needs_villager_data;
        this.template.fileName = response.data.data.template_file;
        this.template.letter_code_id = response.data.data.letter_code_id;
        this.template.sub_letter_code_id =
          response.data.data.sub_letter_code_id;
      });
    }
  }
};
</script>
