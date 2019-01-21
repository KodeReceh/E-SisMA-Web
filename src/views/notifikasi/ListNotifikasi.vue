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
          item-key="time"
        >
          <template slot="items" slot-scope="props">
            <tr @click="handleClick(props.item)" style="cursor: alias">
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.type_translated }}</td>
              <td>{{ props.item.timeLabel }}</td>
              <td>{{ props.item.status }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import NotificationAPI from "@/api/notification";

export default {
  data() {
    return {
      expand: false,
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
            text: "Tipe",
            value: "type"
          },
          {
            text: "Waktu",
            value: "timeLabel"
          },
          {
            text: "Status",
            value: "status"
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
    fetchList() {
      NotificationAPI.getAllNotifications().then(response => {
        if (response.data.success) {
          this.table.items = response.data.data;
        }
      });
    },
    handleClick(item) {
      if (item.type === "incoming-letter") {
        this.$router.push({ name: "ShowSuratMasuk", params: { id: item.id } });
      } else if (item.type === "signature") {
        this.$router.push({
          name: "ShowDraftSuratKeluar",
          params: { id: item.id }
        });
      }
    }
  }
};
</script>
