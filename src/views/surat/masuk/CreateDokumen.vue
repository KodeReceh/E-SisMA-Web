<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Buat Dokumen">
            <div slot="widget-content">
              <v-container>
                <FormDokumen
                  :document="document"
                  :onSubmit="submit"
                  :isUpdate="isUpdate"
                  :loading="loading"
                ></FormDokumen>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormDokumen from "../../dokumen/FormDokumen";
import VWidget from "@/components/VWidget";
import DocumentAPI from "@/api/document";
import LetterAPI from "@/api/letter";

export default {
  components: {
    FormDokumen,
    VWidget
  },
  data() {
    return {
      document: {
        title: "",
        date: "",
        description: "",
        fileName: "",
        file: null,
        file_type: "",
        public: "",
        letter_id: "",
        archive_id: ""
      },
      isUpdate: false,
      loading: false
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchLetter(id);
  },
  methods: {
    submit() {
      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.document.file);
      formData.append("title", this.document.title);
      formData.append("date", this.document.date);
      formData.append("description", this.document.description);
      formData.append("file_type", this.document.file_type);
      formData.append("public", this.document.public);
      formData.append("letter_id", this.document.letter_id);
      formData.append("archive_id", this.document.archive_id);
      DocumentAPI.store(formData).then(response => {
        this.loading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.$router.push({
          name: "ShowDokumen",
          params: { id: response.data.data.id }
        });
      });
    },
    fetchLetter(id) {
      LetterAPI.get(id).then(response => {
        this.document.title =
          "Surat Masuk " +
          response.data.data.incoming_letter.sender +
          " (" +
          response.data.data.number +
          ")";
        this.document.date = response.data.data.date;
        this.document.letter_id = response.data.data.id;
      });
    }
  }
};
</script>
