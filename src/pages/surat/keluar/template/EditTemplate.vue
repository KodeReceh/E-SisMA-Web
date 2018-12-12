<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'pages/surat/keluar'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <FormTemplate :letter="letter" :onSubmit="submit" ></FormTemplate>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormTemplate from './FormTemplate';
import OutcomingLetterAPI from '@/api/outcoming-letter';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormTemplate,
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
    this.fetchTemplate(id);
  },
  methods: {
    fetchTemplate (id) {
      OutcomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      OutcomingLetterAPI.update(this.letter.id, this.letter).then(response => {
        this.$router.push({ name: 'ShowTemplate', params: { id: response.data.data.letter_id }});
        loader.hide();
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
        loader.hide();
      });
    }
  }
};
</script>
