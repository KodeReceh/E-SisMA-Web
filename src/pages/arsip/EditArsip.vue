<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)"><v-icon color="secondary">arrow_back</v-icon> back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Arsip">
            <div slot="widget-content">
              <v-container>
                <FormArsip :archive="archive" :onSubmit="submit" :loading="loading"></FormArsip>
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
import ArchiveAPI from '@/api/archive';
import VWidget from '@/components/VWidget';

export default {
  components: {
    FormArsip,
    VWidget,
  },
  data () {
    return {
      archive: {
        id: '',
        title: '',
        description: '',
        archive_type_id: ''
      },
      loading: false
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchArsip(id);
  },
  methods: {
    fetchArsip (id) {
      ArchiveAPI.get(id).then(response => {
        this.archive = response.data.data;
      });
    },
    submit () {
      this.loading = true;
      ArchiveAPI.update(this.archive.id, this.archive).then(response => {
        this.loading = false;
        this.$router.push({ name: 'ShowArsip', params: { id: response.data.data.id }});
      });
    }
  }
};
</script>
