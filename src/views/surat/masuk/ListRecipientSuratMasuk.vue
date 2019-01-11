<template>
  <v-card>
    <v-toolbar card color="white">
      <v-toolbar-title class="font-weight-light">Penerima Surat</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-data-table
        :headers="table.headers"
        :items="table.items"
        class="elevation-1"
        item-key="name"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.index + 1 }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.role }}</td>
          <td v-if="props.item.status">
            <router-link
              :to="{ name: 'ShowDisposisiSuratMasukUser',
            params: { id: $route.params.id, user_id: props.item.user_id } }"
            >Terdisposisi</router-link>
          </td>
          <td v-else>Belum Terdisposisi</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import RecipientAPI from "@/api/recipient";

export default {
  data: () => ({
    receipient: {
      user_id: ""
    },
    table: {
      selected: [],
      headers: [
        {
          text: "#",
          value: ""
        },
        {
          text: "Nama Penerima",
          value: "name"
        },
        {
          text: "Jabatan",
          value: "role"
        },
        {
          text: "Status",
          value: "status"
        }
      ],
      items: []
    },
    deleteDialog: {
      state: false,
      title: "",
      detail: {}
    }
  }),
  mounted() {
    this.fetchRecipients();
  },
  methods: {
    fetchRecipients() {
      let letterId = this.$route.params.id;
      RecipientAPI.getRecipients(letterId).then(response => {
        this.table.items = response.data.data;
      });
    },
    disposisiButtonClicked(userId) {
      let letterId = this.$route.params.id;
      RecipientAPI.get(letterId, userId)
        .then(response => {
          this.$router.push({
            name: "ShowDisposisiSuratMasuk",
            params: { id: letterId, user_id: userId }
          });
        })
        .catch(e => {
          if (e.response.status === 404) {
            this.$router.push({
              name: "CreateDisposisiSuratMasuk",
              params: { id: letterId }
            });
            return;
          }
          alert(e.response.status + ": " + e.response.statusText);
        });
    }
  }
};
</script>