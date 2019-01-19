<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Edit Arsip">
            <div slot="widget-content">
              <v-container>
                <FormPenduduk
                  :villager="villager"
                  :onSubmit="submit"
                  :loading="loading"
                ></FormPenduduk>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormPenduduk from "./FormPenduduk";
import VillagerAPI from "@/api/villager";
import VWidget from "@/components/VWidget";

export default {
  components: {
    FormPenduduk,
    VWidget
  },
  data() {
    return {
      villager: {
        birthplace: "",
        birthdate: "",
        job: "",
        sex: "",
        address: "",
        NIK: "",
        religion: "",
        tribe: "",
        status: "",
        fileName: "",
        photo: null
      },
      loading: false
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchArsip(id);
  },
  methods: {
    fetchArsip(id) {
      VillagerAPI.get(id).then(response => {
        this.villager = response.data.data;
        this.villager.fileName = response.data.data.photo;
      });
    },
    submit() {
      this.loading = true;
      let formData = new FormData();

      for (const key in this.villager) {
        if (this.villager.hasOwnProperty(key)) {
          formData.append(key, this.villager[key]);
        }
      }

      VillagerAPI.update(this.villager.id, formData).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowPenduduk",
          params: { id: response.data.data.id }
        });
      });
    }
  }
};
</script>
