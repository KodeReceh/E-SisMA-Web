<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <FormSuratMasuk :letter="letter" :onSubmit="submit" :availableUsers="availableUsers" :loading="loading"></FormSuratMasuk>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormSuratMasuk from './FormSuratMasuk';
import VWidget from '@/components/VWidget';
import IncomingLetterAPI from '@/api/incoming-letter';
import RecipientAPI from '@/api/recipient';

export default {
  components: {
    FormSuratMasuk,
    VWidget,
  },
  data () {
    return {
      letter: {
        number: '',
        date: '',
        receipt_date: '',
        subject: '',
        tendency: '',
        sender: '',
        user_id: [],
        attachments: 0,
        letter_code_id: '',
        sub_letter_code_id: ''
      },
      availableUsers: [],
      loading: false
    };
  },
  mounted () {
    this.fetchAvailableUsers();
  },
  methods: {
    submit () {
      this.loading = true;
      IncomingLetterAPI.store(this.letter).then(response => {
        this.loading = false;
        this.$router.push(
          { 
            name: 'ShowSuratMasuk',
            params: {
              id: response.data.data.letter_id
            } 
          });
      });
    },
    fetchAvailableUsers () {
      RecipientAPI.getAllRecipients().then(response => {
        this.availableUsers = response.data.data;
      }).catch(e => {
        alert(e.status + ': ' + e.statusText);
      });
    }
  }
};
</script>
