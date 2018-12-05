<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/keluar'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
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
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      OutcomingLetterAPI.store(this.letter).then(response => {
        this.$router.push({ name: 'ShowSuratKeluar', params: { id: response.data.data.letter_id }});
        loader.hide();
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
        loader.hide();
      });
    }
  }
};
</script>
