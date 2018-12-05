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
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
        loader.hide();
      }).catch((e) => {
        console.log(e);
      });
    },
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      IncomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        loader.hide();
        this.$router.push(
          { 
            name: 'ShowSuratMasuk',
            params: {
              id: response.data.data.letter_id
            } 
          });
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
