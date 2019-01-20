<template>
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
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.code }}</td>
          <td>{{ props.item.title }}</td>
          <td>
            <v-btn
              depressed
              outline
              icon
              fab
              dark
              color="warning"
              small
              @click="deleteButtonClicked($route.params.id, props.item.id)"
              v-tooltip.auto="`Hapus`"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <DeleteConfirmation
      :confirmDeleteDialog="deleteDialog"
      :onDeleteCancel="deleteCancel"
      :onDeleteConfirm="deleteConfirm"
    ></DeleteConfirmation>
    <InputSubKodeSurat
      :dialog="dialog"
      :fetchList="fetchList"
      :sub="sub"
      ref="inputSub"
    ></InputSubKodeSurat>
  </v-card>
</template>

<script>
import InputSubKodeSurat from "./InputSubKodeSurat";
import LetterCodeAPI from "@/api/letter-code";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default {
  components: {
    InputSubKodeSurat,
    DeleteConfirmation
  },
  data: () => ({
    dialog: {
      state: false,
      title: "Input Sub Kode",
      data: null,
      isUpdate: false
    },
    search: "",
    sub: {
      code: "",
      title: ""
    },
    table: {
      selected: [],
      headers: [
        {
          text: "Sub Kode",
          value: "name"
        },
        {
          text: "Nama Sub Kode",
          value: ""
        },
        {
          text: "Action",
          value: ""
        }
      ],
      items: []
    },
    roles: [],
    deleteDialog: {
      state: false,
      title: "",
      detail: {}
    }
  }),
  mounted() {
    const { id } = this.$route.params;
    this.fetchList(id);
  },
  methods: {
    uploadButtonClicked() {
      this.dialog.state = true;
    },
    fetchList(id) {
      LetterCodeAPI.getSubList(id).then(response => {
        this.table.items = response.data.data;
      });
    },
    deleteButtonClicked(id, subId) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id, subId: subId };
    },
    deleteConfirm() {
      LetterCodeAPI.deleteSub(
        this.deleteDialog.detail.id,
        this.deleteDialog.detail.subId
      ).then(response => {
        const { id } = this.$route.params;
        this.fetchList(id);
        this.$refs.inputSub.fetchTakenSubCodes(id);
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
      });
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    }
  }
};
</script>
