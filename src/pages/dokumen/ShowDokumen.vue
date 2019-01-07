<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-toolbar class="elevation-0 transparent media-toolbar">
          <v-btn flat @click="back()"><v-icon color="primary">arrow_back</v-icon>&nbsp;back</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="downloadFile(document)">
            <v-icon color="primary">cloud_download</v-icon>
            &nbsp;Download
          </v-btn>
        </v-toolbar>
        <v-flex sm12>
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
                    <p class="font-weight-bold">Arsip</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular">{{ document.archive ? document.archive.title : 'Belum diarsipkan.' }}</p>
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm4 md4>
                    <p class="font-weight-bold">Ekstensi File</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular">{{ document.file_extension }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm4 md4>
                    <p class="font-weight-bold">Pengupload</p>                        
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs8 sm8 md8>
                    <p class="font-weight-regular">{{ document.uploader ? document.uploader.name : 'Tidak diketahui' }}</p>
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
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>
import DocumentAPI from '@/api/document';
import VWidget from '@/components/VWidget';

export default {
  components: {
    VWidget,
  },
  data () {
    return {
      document: {
        id: '',
        title: '',
        date: '',
        description: '',
        path: '',
        uploader: {},
        file_extension: '',
      },
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchDokumen(id);
  },
  methods: {
    fetchDokumen (id) {
     
      DocumentAPI.get(id).then(response => {
        this.document = response.data.data;
        
      }).catch(e => {
        
      });
    },
    uploadButtonClicked () {
      let files = this.$refs.filesDokumen;
      files.uploadButtonClicked();
    },
    downloadFile (file) {
     
      
      DocumentAPI.download(file.path).then(response => {
        const fileName = file.title + '.' + file.file_extension;
        this.showFile(response.data, fileName, file.file_type, file.file_extension);
        
      }).catch(e => {
        
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    showFile (blob, fileName, fileType, ext) {
      const theFile = new Blob([blob], { type: fileType });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(theFile);
        return;
      }
      const url = window.URL.createObjectURL(theFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      if (ext === 'mp3' ||
        ext === 'mp4' ||
        ext === 'pdf' ||
        ext === 'jpg' ||
        ext === 'png' ||
        ext === 'webm') {
        window.open(url, '_blank');
      }
      setTimeout(function () {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    },
    back () {
      this.$router.go(-1);
    }
  }
};
</script>
