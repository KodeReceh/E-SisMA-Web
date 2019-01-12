<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="documentButtonClicked()">
          <v-icon>file_copy</v-icon>&nbsp;file
        </v-btn>
        <v-btn
          v-if="letter.is_client_recipient"
          color="secondary"
          outline
          @click="disposisiButtonClicked"
          >disposisi</v-btn
        >
        <v-btn
          small
          fab
          dark
          color="info"
          :to="{
            name: 'EditSuratMasuk',
            params: { id: this.$route.params.id }
          }"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          small
          fab
          dark
          color="error"
          @click="deleteButtonClicked(letter.id)"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        <v-flex sm12>
          <v-divider></v-divider>
          <h3>
            <strong>{{ letter.number }}</strong> &nbsp;
            <small>{{ letter.subject }}</small>
          </h3>
        </v-flex>
        <v-flex sm12>
          <list-recipient-surat-masuk
            ref="listRecipient"
          ></list-recipient-surat-masuk>
        </v-flex>
        <v-flex sm12>
          <v-widget title="Detail Surat Masuk">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nomor</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="letter.number" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ letter.date_formatted }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Terima</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ letter.receipt_date_formatted }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Subjek</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ letter.subject }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Perihal</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ letter.tendency }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Pengirim</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ letter.sender }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm10 md3>
                    <p class="font-weight-bold">Lampiran</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{
                        parseInt(letter.attachments)
                          ? letter.attachments + " buah"
                          : "-"
                      }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Kode Surat</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ letter.letter_code_name }}
                    </p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <DeleteConfirmation
        :confirmDeleteDialog="deleteDialog"
        :onDeleteCancel="deleteCancel"
        :onDeleteConfirm="deleteConfirm"
        :loading="deleteLoading"
      ></DeleteConfirmation>
    </v-container>
  </div>
</template>

<script>
import IncomingLetterAPI from "@/api/incoming-letter";
import VWidget from "@/components/VWidget";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ListRecipientSuratMasuk from "./ListRecipientSuratMasuk";

export default {
  components: {
    VWidget,
    DeleteConfirmation,
    ListRecipientSuratMasuk
  },
  data() {
    return {
      deleteLoading: false,
      deleteDialog: {
        state: false,
        title: "",
        detail: {}
      },
      letter: {
        id: "",
        number: "",
        date: "",
        receipt_date: "",
        subject: "",
        tendency: "",
        sender: "",
        attachments: 0,
        letter_code_id: null,
        sub_letter_code_id: null,
        letter_code_name: "",
        document_id: "",
        receipt_date_formatted: "",
        date_formatted: ""
      },
      is_client_recipient: ""
    };
  },
  beforeMount() {
    const { id } = this.$route.params;
    this.fetchSuratMasuk(id);
  },
  methods: {
    fetchRecipients() {
      this.$refs.listRecipient.fetchRecipients();
    },
    fetchSuratMasuk(id) {
      IncomingLetterAPI.get(id).then(response => {
        this.letter = response.data.data;
        this.is_client_recipient = response.data.is_client_recipient;
      });
    },
    disposisiButtonClicked() {
      IncomingLetterAPI.getDisposition(this.letter.id).then(response => {
        if (response.data.data.status)
          this.$router.push({
            name: "ShowDisposisiSuratMasuk",
            params: { id: this.letter.id }
          });
        else
          this.$router.push({
            name: "CreateDisposisiSuratMasuk",
            params: { id: this.letter.id }
          });
      });
    },
    deleteButtonClicked(id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm() {
      this.deleteLoading = true;
      IncomingLetterAPI.delete(this.deleteDialog.detail.id).then(() => {
        this.deleteLoading = false;
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.$router.push({ name: "views/surat/masuk" });
      });
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
    documentButtonClicked() {
      if (this.letter.document_id) {
        this.$router.push({
          name: "ShowDokumen",
          params: {
            id: this.letter.document_id
          }
        });
      } else {
        this.$router.push({
          name: "CreateDokumenSuratMasuk",
          params: {
            letter_id: this.letter.id
          }
        });
      }
      return;
    }
  }
};
</script>
