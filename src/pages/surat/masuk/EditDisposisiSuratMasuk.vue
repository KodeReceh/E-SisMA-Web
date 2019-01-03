<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'ShowSuratMasuk', id: letter.id }"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget :title="'Edit Disposisi Surat Masuk ' + letter.number">
            <div slot="widget-content">
              <v-container>
                <FormDisposisiSuratMasuk :disposition="disposition" :onSubmit="submit" ></FormDisposisiSuratMasuk>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormDisposisiSuratMasuk from './FormDisposisiSuratMasuk';
import IncomingLetterAPI from '@/api/incoming-letter';
import UserAPI from '@/api/user';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormDisposisiSuratMasuk,
    VWidget,
  },
  data () {
    return {
      letter: {
        id: '',
        number: '',
      },
      disposition: {
        processing_date: '',
        information: '',
        summary: '',
      },
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchSuratMasuk(id);
    this.fetchDisposisiSuratMasuk(id);
  },
  methods: {
    fetchSuratMasuk (id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      });
    },
    fetchDisposisiSuratMasuk (id) {
      IncomingLetterAPI.getDisposition(id).then(response => {
        this.disposition = response.data.data;
      });
    },
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      IncomingLetterAPI.updateDisposition(this.letter.id, this.disposition).then(response => {
        loader.hide();
        this.$router.push(
          { 
            name: 'ShowDisposisiSuratMasuk',
            params: {
              id: response.data.data.incoming_letter_id
            } 
          });
      });
    }
  }
};
</script>
