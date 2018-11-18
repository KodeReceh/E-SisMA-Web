<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'pages/surat/keluar'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Tambah Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <FormSuratKeluar :letter="letter" :onSubmit="submit" ></FormSuratKeluar>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormSuratKeluar from './FormSuratKeluar';
import VWidget from '@/components/VWidget';
import OutcomingLetterAPI from '@/api/outcoming-letter';

export default {
  components: {
    FormSuratKeluar,
    VWidget,
  },
  data () {
    return {
      letter: {
        number: '',
        date: '',
        subject: '',
        tendency: '',
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
      OutcomingLetterAPI.store(this.letter).then(response => {
        this.$router.push({ name: 'ShowSuratMasuk', params: { id: response.data.data.letter_id } });
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
