<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'pages/surat/masuk'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Masuk">
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
import IncomingLetterAPI from '@/api/incoming-letter';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormSuratMasuk,
    VWidget,
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
      }
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
    submit () {
      IncomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.$router.push({ name: 'pages/surat/masuk' });
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
