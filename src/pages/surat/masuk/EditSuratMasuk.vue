<template>
  <div>
      <v-container grid-list-xl fluid>
          <h4 class="display-1 text-md-center">Edit Surat Masuk</h4>
          <v-layout row wrap>
              <v-flex xs12>
                  <FormSuratMasuk :letter="letter" :onSubmit="submit" ></FormSuratMasuk>
              </v-flex>
          </v-layout>
      </v-container>
  </div>
</template>

<script>
import FormSuratMasuk from './FormSuratMasuk';
import IncomingLetterAPI from '@/api/incoming-letter';

export default {
  components: {
    FormSuratMasuk
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
        console.log(localStorage.getItem('__token__'));
      });
    }
  }
};
</script>
