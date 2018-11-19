<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'pages/surat/masuk'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Detail Surat Masuk">
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
                    <p class="font-weight-bold">Tanggal</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.date ? letter.date : new Date() | moment('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Terima</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.receipt_date ? letter.receipt_date : new Date() | moment('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Subjek</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.subject }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Perihal</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.tendency }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Pengirim</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.sender }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Ditujukan Kepada</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.to }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm10 md3>
                    <p class="font-weight-bold">Lampiran</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ parseInt(letter.attachments) ? letter.attachments + ' buah' : '-' }}</p>
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
import LetterCodeAPI from '@/api/letter-code';
import SubLetterCodeAPI from '@/api/sub-letter-code';
import VWidget from '@/components/VWidget';

export default {
  components: {
    VWidget
  },
  data () {
    return {
      letter: {
        id: '',
        number: '',
        date: '',
        receipt_date: '',
        subject: '',
        tendency: '',
        sender: '',
        to: '',
        attachments: 0,
        letter_code_id: null,
        sub_letter_code_id: null
      },
      letterCode: '',
    };
  },
  watch: {
    'letter.letter_code_id': {
      handler: function (val, oldVal) {
        if (val) {
          LetterCodeAPI.get(val).then(code => {        
            if (this.letter.sub_letter_code_id) {
              SubLetterCodeAPI.get(val, this.letter.sub_letter_code_id).then(subCode => {
                this.letterCode = code.data.data.code + '.' + subCode.data.data.code + ' - ' + subCode.data.data.title;
              }).catch((e) => {
                console.log(e);
              });
            } else {
              this.letterCode = code.data.data.code + ' - ' + code.data.data.title;
            }
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
    this.fetchSuratMasuk(id);
  },
  methods: {
    fetchSuratMasuk (id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      }).catch((e) => {
        console.log(e);
      });
    },
  }
};
</script>
