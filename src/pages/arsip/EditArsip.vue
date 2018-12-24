<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/keluar'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <FormArsip :letter="letter" :onSubmit="submit" ></FormArsip>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormArsip from './FormArsip';
import OutcomingLetterAPI from '@/api/outcoming-letter';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormArsip,
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
    this.fetchArsip(id);
  },
  methods: {
    fetchArsip (id) {
      OutcomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      });
    },
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      OutcomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.$router.push({ name: 'ShowArsip', params: { id: response.data.data.letter_id }});
        loader.hide();
      });
    }
  }
};
</script>
