<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'Dokumen'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Detail File">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama File</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="file.caption"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Upload</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ file.updated_at ? file.updated_at : new Date() | moment().format('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
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
import FileAPI from '@/api/file';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      file: {
        caption: '',
        path: '',
        document_id: '',
        created_at: '',
        updated_at: '',
        url: '',
      }
    };
  },
  mounted () {
    this.fetchFile();
  },
  methods: {
    fetchFile () {
      const { document, file } = this.$route.params;
      FileAPI.get(file).then(response => {
        this.file = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
  },
};
</script>
