<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat :to="{ name: 'Dokumen'}"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Dokumen">
            <div slot="widget-content">
              <v-container>
                <FormDokumen :document="document" :onSubmit="submit" ></FormDokumen>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormDokumen from './FormDokumen';
import VWidget from '@/components/VWidget';
import DocumentAPI from '@/api/document';

export default {
  components: {
    FormDokumen,
    VWidget,
  },
  data () {
    return {
      document: {
        id: '',
        title: '',
        date: '',
        description: '',
      },
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchDokumen(id);
  },
  methods: {
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      DocumentAPI.update(this.document.id, this.document).then(response => {
        this.$router.push({ name: 'ShowDokumen', params: { id: response.data.data.id }});
        loader.hide();
      });
    },
    fetchDokumen (id) {
      DocumentAPI.get(id).then(response => {
        this.document = response.data.data;
      });
    }
  }
};
</script>