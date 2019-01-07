<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget title="Detail Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Template</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="template.title"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Butuh Data Penduduk</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ template.needs_villager_data_string }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Kode Surat</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letterCode }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">File Template</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ template.template_file }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="addButtonClicked">Tambah</v-btn>
        <v-flex sm12>
          <template-field ref="templateField"></template-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TemplateAPI from '@/api/template';
import VWidget from '@/components/VWidget';
import TemplateField from './TemplateField';
import LetterCodeAPI from '@/api/letter-code';

export default {
  components: {
    VWidget,
    TemplateField,
  },
  data () {
    return {
      template: {
        id: '',
        title: '',
        needs_villager_data: '',
        needs_villager_data_string: '',
        template_file: '',
        created_at: '',
        updated_at: '',
      },
      letterCode: '',
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchTemplate(id);
  },
  methods: {
    fetchTemplate (id) {
      TemplateAPI.get(id).then(response => {
        this.template = response.data.data;
        LetterCodeAPI.getName(this.template.letter_code_id, this.template.sub_letter_code_id).then(r => {
          this.letterCode = r.data.data;
        });
      });
    },
    addButtonClicked () {
      this.$refs.templateField.dialog.state = true;
      this.$refs.templateField.dialog.data = this.$refs.templateField.field;
    },
  }
};
</script>
