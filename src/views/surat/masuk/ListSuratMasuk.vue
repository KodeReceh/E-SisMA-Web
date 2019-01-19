<template>
  <v-flex lg12>
    <v-card>
      <v-toolbar card color="white">
        <v-text-field
          flat
          solo
          prepend-icon="search"
          placeholder="Type something"
          v-model="search"
          hide-details
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-btn icon> <v-icon>filter_list</v-icon> </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :headers="table.headers"
          :search="search"
          :items="table.items"
          :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
          class="elevation-1"
          item-key="id"
          :expand="expand"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.number }}</td>
              <td>{{ props.item.sender }}</td>
              <td>{{ props.item.subject }}</td>
              <td>{{ props.item.tendency }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-container>
                <v-layout align-center justify-center>
                  <v-btn
                    depressed
                    outline
                    icon
                    fab
                    dark
                    color="primary"
                    small
                    :to="{
                      name: 'ShowSuratMasuk',
                      params: {
                        id: props.item.id
                      }
                    }"
                  >
                    <v-icon>visibility</v-icon>
                  </v-btn>
                  <v-btn
                    depressed
                    outline
                    icon
                    fab
                    dark
                    color="primary"
                    small
                    :to="{
                      name: 'EditSuratMasuk',
                      params: {
                        id: props.item.id
                      }
                    }"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    depressed
                    outline
                    icon
                    fab
                    dark
                    color="warning"
                    small
                    @click="deleteButtonClicked(props.item.id)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DeleteConfirmation
      :confirmDeleteDialog="deleteDialog"
      :onDeleteCancel="deleteCancel"
      :onDeleteConfirm="deleteConfirm"
      :loading="deleteLoading"
    ></DeleteConfirmation>
  </v-flex>
</template>

<script>
import IncomingLetterAPI from "@/api/incoming-letter";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default {
  components: {
    DeleteConfirmation
  },
  data() {
    return {
      expand: false,
      deleteLoading: false,
      deleteDialog: {
        state: false,
        title: "",
        detail: {}
      },
      table: {
        selected: [],
        headers: [
          {
            text: "Tanggal",
            value: "date"
          },
          {
            text: "No. Surat",
            value: "number"
          },
          {
            text: "Pengirim",
            value: "sender"
          },
          {
            text: "Subjek",
            value: "subject"
          },
          {
            text: "Perihal",
            value: "tendency"
          }
        ],
        items: []
      },
      search: ""
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    deleteButtonClicked(id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm() {
      this.deleteLoading = true;
      IncomingLetterAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteLoading = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.fetchList();
      });
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
    fetchList() {
      IncomingLetterAPI.getList().then(response => {
        if (response.data.success) {
          this.table.items = response.data.data;
        }
      });
    }
  }
};
</script>
