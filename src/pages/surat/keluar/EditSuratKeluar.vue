<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'pages/surat/keluar'}">back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Keluar">
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
import OutcomingLetterAPI from '@/api/outcoming-letter';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormSuratKeluar,
    VWidget,
  },
  data () {
    return {
      letter: {
        id: '',
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
  mounted () {
    const { id } = this.$route.params;
    this.fetchSuratKeluar(id);
  },
  methods: {
    fetchSuratKeluar (id) {
      OutcomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    submit () {
      OutcomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.$router.push({ name: 'ShowSuratKeluar', params: { id: response.data.data.letter_id }});
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
