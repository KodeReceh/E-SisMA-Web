<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'Dokumen'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Detail Dokumen">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Dokumen</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="document.title"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ document.date ? document.date : new Date() | moment().format('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Keterangan</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ document.description }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <FilesDokumen></FilesDokumen>
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
      }).catch((e) => {
        console.log(e);
      });
    },
  }
};
</script>
