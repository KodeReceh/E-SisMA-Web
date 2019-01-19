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
                <FormPenduduk
                  :villager="villager"
                  :onSubmit="submit"
                  :loading="loading"
                  :takenNIKs="takenNIKs"
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
import VWidget from "@/components/VWidget";
import VillagerAPI from "@/api/villager";

export default {
  components: {
    FormPenduduk,
    VWidget
  },
  data() {
    return {
      villager: {
        name: "",
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
      loading: false,
      takenNIKs: []
    };
  },
  mounted() {
    this.getNIKs();
  },
  methods: {
    submit() {
      this.loading = true;
      let formData = new FormData();

      for (const key in this.villager) {
        if (this.villager.hasOwnProperty(key)) {
          formData.append(key, this.villager[key]);
        }
      }

      VillagerAPI.store(formData).then(response => {
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
    },
    getNIKs() {
      VillagerAPI.getNIKs().then(response => {
        this.takenNIKs = response.data.data;
      });
    }
  }
};
</script>
