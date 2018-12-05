<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" color="warning" :to="{ name: 'ShowSuratMasuk', id: letter.id }">back</v-btn>
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
import UserVue from '../../user/User.vue';

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
        incoming_letter_id: '',
        processing_date: '',
        information: '',
        summary: '',
        user_id: '',
      },
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchUser();
    this.fetchSuratMasuk(id);
    this.fetchDisposisiSuratMasuk(id);
  },
  methods: {
    fetchSuratMasuk (id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    fetchDisposisiSuratMasuk (id) {
      IncomingLetterAPI.getDisposition(id).then(response => {
        this.disposition = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    fetchUser () {
      UserAPI.get(localStorage.getItem('__id__')).then(response => {
        this.disposition.user_id = response.data.data.id;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
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
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
        loader.hide();
      });
    }
  }
};
</script>
