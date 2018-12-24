<template>
   <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/masuk'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" outline @click="disposisiButtonClicked">disposisi</v-btn>
        <v-btn small fab dark color="info" :to="{ name: 'EditSuratMasuk', params: { id: this.$route.params.id }}">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn small fab dark color="error" @click="deleteButtonClicked(letter.id)">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-flex sm12>
          <list-recipient-surat-masuk ref="listRecipient"></list-recipient-surat-masuk>
        </v-flex>
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
                    <p class="font-weight-regular">{{ letter.date ? letter.date : new Date() | moment().format('DD MMMM YYYY') }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Terima</p>                        
                  </v-flex>
                  <v-flex xs8 sm10 md9 >
                    <p class="font-weight-regular">{{ letter.receipt_date ? letter.receipt_date : new Date() | moment().format('DD MMMM YYYY') }}</p>
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
                    <p class="font-weight-regular">{{ letter.letter_code_name }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <DeleteConfirmation
          :confirmDeleteDialog="deleteDialog"
          :onDeleteCancel="deleteCancel"
          :onDeleteConfirm="deleteConfirm"
          :loading="deleteLoading"
      ></DeleteConfirmation>
    </v-container>
  </div>
</template>

<script>
import IncomingLetterAPI from '@/api/incoming-letter';
import LetterCodeAPI from '@/api/letter-code';
import SubLetterCodeAPI from '@/api/sub-letter-code';
import VWidget from '@/components/VWidget';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ListRecipientSuratMasuk from './ListRecipientSuratMasuk';
import FormSelectRecipient from './FormSelectRecipient';

export default {
  components: {
    VWidget,
    DeleteConfirmation,
    ListRecipientSuratMasuk,
    FormSelectRecipient
  },
  data () {
    return {
      deleteLoading: false,
      deleteDialog: {
        state: false,
        title: '',
        detail: {},
      },
      letter: {
        id: '',
        number: '',
        date: '',
        receipt_date: '',
        subject: '',
        tendency: '',
        sender: '',
        attachments: 0,
        letter_code_id: null,
        sub_letter_code_id: null,
        letter_code_name: ''
      },
    };
  },
  beforeMount () {
    const { id } = this.$route.params;
    this.fetchSuratMasuk(id);
  },
  methods: {
    fetchRecipients () {
      this.$refs.listRecipient.fetchRecipients();
    },
    fetchSuratMasuk (id) {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
        loader.hide();
      });
    },
    disposisiButtonClicked () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      IncomingLetterAPI.getDisposition(this.letter.id).then(response => {
        loader.hide();
        this.$router.push({ name: 'ShowDisposisiSuratMasuk', params: { id: this.letter.id }});
      }).catch((e) => {
        loader.hide();
        if (e.response.status === 404) {
          this.$router.push({ name: 'CreateDisposisiSuratMasuk', params: { id: this.letter.id }});
          return;
        }
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    deleteButtonClicked (id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm () {
      this.deleteLoading = true;
      IncomingLetterAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteLoading = false;
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.$router.push({ name: 'pages/surat/masuk' });
      });
    },
    deleteCancel () {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
  }
};
</script>
