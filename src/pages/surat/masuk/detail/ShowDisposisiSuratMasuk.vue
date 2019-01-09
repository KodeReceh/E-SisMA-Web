<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Disposisi Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nomor</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letter.number"/>
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Subjek Surat</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letter.subject"/>
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Surat</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ letter.date_formatted }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Proses</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ disposition.processing_date_formatted }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Informasi</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular" style="white-space: pre-line;">{{ disposition.information }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Ringkasan</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular" style="white-space: pre-line;">{{ disposition.summary }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Pegawai</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ user.name }}</p>
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
import IncomingLetterAPI from '@/api/incoming-letter';
import UserAPI from '@/api/user';
import VWidget from '@/components/VWidget';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      letter: {
        number: '',
        subject: '',
        date: '',
        date_formatted: ''
      },
      disposition: {
        incoming_letter_id: '',
        processing_date: '',
        information: '',
        summary: '',
        user_id: '',
        processing_date_formatted: ''
      }, 
      user: {
        id: '',
        name: '',
      }

    };
  },
  watch: {
    'disposition.user_id': {
      handler: function (val, oldVal) {
        if (val) {
          UserAPI.get(val).then(response => {        
            this.user = response.data.data;
          }).catch((e) => {
            console.log(e);
          });
        }
      },
      immediate: true,
    },
  },
  mounted () {
    const { id } = this.$route.params;
    const { user_id } = this.$route.params;
    this.fetchSuratMasuk(id);
    this.fetchDisposisiSuratMasukUser(id, user_id); 
  },
  methods: {
    fetchSuratMasuk (id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    fetchDisposisiSuratMasukUser (id, userId) {
      IncomingLetterAPI.getUserDisposition(id, userId).then(response => {
        this.disposition = response.data.data;
      }).catch((e) => {
        if (e.response.status === 404) {
          this.$router.push({ name: 'CreateDisposisiSuratMasuk', params: { id: id }});
          return;
        }
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
  }
};
</script>
