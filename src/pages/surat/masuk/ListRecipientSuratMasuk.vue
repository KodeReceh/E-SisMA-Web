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
        <td>
            <v-btn color="secondary" outline>disposisi</v-btn>
            <v-btn 
                depressed 
                outline 
                icon 
                fab 
                dark 
                color="warning" 
                small @click="deleteButtonClicked(props.item.letter_id)"
                v-tooltip.auto="`Hapus`">
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
    </v-card>
</template>

<script>
import RecipientAPI from '@/api/recipient';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

export default {
  components: {
    DeleteConfirmation, 
  },
  data: () => ({
    receipient: {
      user_id: '',
    },
    table: {
      selected: [],
      headers: [
        {
          text: '#',
          value: ''
        },
        {
          text: 'Nama Penerima',
          value: 'name'
        },
        {
          text: 'Jabatan',
          value: 'role'
        },
        {
          text: 'Action',
          value: ''
        }
      ],
      items: [],
    },
    deleteDialog: {
      state: false,
      title: '',
      detail: {},
    },
  }),
  mounted () {
    this.fetchRecipients();
  },
  methods: {
    fetchRecipients () {
      let letter_id = this.$route.params.id;
      RecipientAPI.getRecipients(letter_id).then(response => {
        this.table.items = response.data.data;
      });
    },
    deleteButtonClicked (id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm () {
      this.deleteLoading = true;
      let letter_id = this.$route.params.id;
      RecipientAPI.delete(letter_id, this.deleteDialog.detail.id).then(response => {
        this.deleteLoading = false;
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.$router.push({ name: 'pages/surat/masuk' });
      });
    },
    deleteCancel () {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
  }
};
</script>