<template>
   <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Detail Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Nomor</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular" v-html="letter.number"/>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Tanggal</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.date ? letter.date : new Date() | moment('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Tanggal Terima</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.receipt_date ? letter.receipt_date : new Date() | moment('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Subjek</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.subject }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Perihal</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.tendency }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Pengirim</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.sender }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Ditujukan Kepada</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.sender }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Lampiran</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
                    <p class="font-weight-regular">{{ letter.attachments ? letter.attachments + ' buah' : '-' }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="title">Kode Surat</p>                        
                  </v-flex>
                  <v-flex sm5 md3 hidden-xs-only>
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
  watch: {
    'letter.letter_code_id': {
      handler: (val, oldVal) => {
        if (val) {
          LetterCodeAPI.get(val).then(code => {
            if (this.sub_letter_code_id) {
              SubLetterCodeAPI.get(val, this.sub_letter_code_id).then(subCode => {
                this.letterCode = code.data.data.code + '.' + subCode.data.data.code;
              }).catch((e) => {
                console.log(e);
              });
            }
          }).catch((e) => {
            console.log(e);
          });
        };
      },
    },
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
