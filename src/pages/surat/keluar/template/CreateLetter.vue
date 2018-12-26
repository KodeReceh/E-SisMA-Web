<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/keluar/template'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Buat Draft Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-autocomplete
                    v-if="template.needs_villager_data"
                    v-model="field.villager_id"
                    :items="villagers"
                    :rules="[v => !!v || v === 0 || 'Item is required']"
                    prepend-icon="details"
                    label="Pilih Penduduk"
                    required
                    item-text="nama"
                    item-value="id"
                    :chips="true"
                  ></v-autocomplete>
                  <v-text-field
                  v-for="field in fields.text" v-bind:key="field.id"
                  v-model="field.name"
                  :rules="nonEmptyRules"
                  :label="field.label"
                  prepend-icon="fiber_manual_record"
                  required
                ></v-text-field>
                  
                  <v-btn
                    :disabled="!valid"
                    color="info"
                  >
                  submit
                  </v-btn>
                  <v-btn >clear</v-btn>
                </v-form>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import TemplateAPI from '@/api/template';
import TemplateFieldAPI from '@/api/template-field';
import VillagerAPI from '@/api/villager';

export default {
  components: {
    VWidget,
  },
  data () {
    return {
      valid: false,
      fields: {
        text: [],
        gambar: [],
        data_penduduk: [],
        tanda_tangan: [],
      },
      villagers: [],
    };
  },
  mounted () {
    this.fetchTemplate();
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

      TemplateAPI.store(formData).then(response => {
        this.$router.push({ name: 'ShowTemplate', params: { id: response.data.data.id }});
        loader.hide();
      });
    },
    getFields () {
      const { id } = this.$route.params;
      TemplateFieldAPI.getList(id).then(response => {
        console.log(response.data.data);
      });
    },
    fetchTemplate () {
      const { id } = this.$route.params;
      TemplateAPI.get(id).then(response => {
        if (response.data.data.needs_villager_data) {
          VillagerAPI.all().then(response => {
            this.villagers = response.data.data;
          });
        }
        this.template = response.data.data;
      });
    }

  }
};
</script>
