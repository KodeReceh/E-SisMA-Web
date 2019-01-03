<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/keluar'}"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
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
        recipient: '',
        attachments: 0,
        letter_code_id: '',
        sub_letter_code_id: ''
      }
    };
  },
  methods: {
    submit () {
      OutcomingLetterAPI.store(this.letter).then(response => {
        this.$router.push({ name: 'ShowSuratKeluar', params: { id: response.data.data.letter_id }});
      });
    }
  }
};
</script>
