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
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.index + 1 }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.role ? props.item.role.title : "-" }}</td>
            <td>
              <v-switch
                :readonly="checkIsUserIdIsCurrentLogin(props.item.id)"
                v-model="props.item.status"
                color="success"
                @change="changeUserStatus(props.item.id)"
              ></v-switch>
            </td>
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
                  name: 'ShowUser',
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
                  name: 'EditUser',
                  params: {
                    id: props.item.id
                  }
                }"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                v-if="!checkIsUserIdIsCurrentLogin(props.item.id)"
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
import UserAPI from "@/api/user";
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
            text: "Nama",
            value: "title"
          },
          {
            text: "Email",
            value: "user_type"
          },
          {
            text: "Jabatan",
            value: "role"
          },
          {
            text: "Status",
            value: "status"
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
      UserAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
        this.fetchList();
      });
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
      this.fetchList();
    },
    fetchList() {
      UserAPI.getList().then(response => {
        this.table.items = response.data.data;
      });
    },
    changeUserStatus(id) {
      let data = new FormData();
      data.append("user_id", id);
      UserAPI.changeStatus(data).then(response => {
        this.$store.commit("showSnackbar", {
          text: response.data.description,
          color: "info"
        });
      });
    },
    checkIsUserIdIsCurrentLogin(id) {
      if (this.$store.getters.user.id === id) return true;

      return false;
    }
  }
};
</script>
