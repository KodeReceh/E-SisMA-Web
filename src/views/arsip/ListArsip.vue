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
          item-key="name"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.index + 1 }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.archive_type.type }}</td>
            <td>
              <v-btn
                depressed
                outline
                icon
                fab
                dark
                color="primary"
                small
                :to="{
                  name: 'ShowArsip',
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
                  name: 'EditArsip',
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
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DeleteConfirmation
      :confirmDeleteDialog="deleteDialog"
      :onDeleteCancel="deleteCancel"
      :onDeleteConfirm="deleteConfirm"
    ></DeleteConfirmation>
  </v-flex>
</template>

<script>
import ArchiveAPI from "@/api/archive";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default {
  components: {
    DeleteConfirmation
  },
  data() {
    return {
      deleteDialog: {
        state: false,
        title: "",
        detail: {}
      },
      table: {
        selected: [],
        headers: [
          {
            text: "#",
            value: ""
          },
          {
            text: "Nama Arsip",
            value: "title"
          },
          {
            text: "Tipe Arsip",
            value: "archive_type"
          },
          {
            text: "Action",
            value: ""
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
      ArchiveAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteDialog.state = false;
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.deleteDialog.detail = {};
        this.fetchList();
      });
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
      this.fetchList();
    },
    fetchList() {
      ArchiveAPI.getList().then(response => {
        if (response.data.success) {
          this.table.items = response.data.data;
        }
      });
    }
  }
};
</script>
