<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-toolbar class="elevation-0 transparent media-toolbar">
          <v-btn :round="true" flat :to="{ name: 'Dokumen'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="uploadButtonClicked">
            <v-icon color="primary">cloud_upload</v-icon>
            &nbsp;Upload
          </v-btn>
        </v-toolbar>
        <v-flex sm4>
          <v-widget title="Detail Dokumen">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm4 md4>
                    <p class="font-weight-bold">Nama Dokumen</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular" v-html="document.title"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm4 md4>
                    <p class="font-weight-bold">Tanggal</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular">{{ document.date ? document.date : new Date() | moment().format('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm4 md4>
                    <p class="font-weight-bold">Keterangan</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular">{{ document.description }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
        <v-flex sm8>
            <FilesDokumen ref="filesDokumen"></FilesDokumen>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>
import DocumentAPI from '@/api/document';
import VWidget from '@/components/VWidget';
import FilesDokumen from './FilesDokumen';

export default {
  components: {
    VWidget,
    FilesDokumen
  },
  data () {
    return {
      document: {
        id: '',
        title: '',
        date: '',
        description: '',
      },
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchDokumen(id);
  },
  methods: {
    fetchDokumen (id) {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      DocumentAPI.get(id).then(response => {
        this.document = response.data.data;
        loader.hide();
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
        loader.hide();
      });
    },
    uploadButtonClicked () {
      let files = this.$refs.filesDokumen;
      files.uploadButtonClicked();
    }
  }
};
</script>
