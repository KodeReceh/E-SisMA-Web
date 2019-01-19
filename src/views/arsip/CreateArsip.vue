<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Buat Arsip">
            <div slot="widget-content">
              <v-container>
                <FormArsip
                  :archive="archive"
                  :onSubmit="submit"
                  :loading="loading"
                ></FormArsip>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormArsip from "./FormArsip";
import VWidget from "@/components/VWidget";
import ArchiveAPI from "@/api/archive";

export default {
  components: {
    FormArsip,
    VWidget
  },
  data() {
    return {
      archive: {
        title: "",
        description: "",
        archive_type_id: ""
      },
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      ArchiveAPI.store(this.archive).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowArsip",
          params: { id: response.data.data.id }
        });
      });
    }
  }
};
</script>
