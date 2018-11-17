<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'pages/surat/masuk'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <FormSuratMasuk :letter="letter" :onSubmit="submit" ></FormSuratMasuk>
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
        to: '',
        attachments: 0,
        letter_code_id: null,
        sub_letter_code_id: null
      }
    };
  },
  methods: {
    submit () {
      console.log(this.letter);
      IncomingLetterAPI.store(this.letter).then(response => {
        this.$router.push({ name: 'pages/surat/masuk' });
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
