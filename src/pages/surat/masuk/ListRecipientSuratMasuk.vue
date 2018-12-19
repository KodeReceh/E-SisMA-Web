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
    <v-btn icon>
        <v-icon>filter_list</v-icon>
    </v-btn>         
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
    <v-data-table
        :headers="table.headers"
        :search="search"
        :items="table.items"
        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
        class="elevation-1"
        item-key="name"
        >
        <template slot="items" slot-scope="props">            
        <td>{{ props.index + 1 }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.role }}</td>
        <td>
            <v-btn 
                depressed 
                outline 
                icon 
                fab 
                dark 
                color="primary" 
                small
                @click="editFileClicked(props.item.id)"
                v-tooltip.auto="`Edit`"
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
                small @click="deleteButtonClicked(props.item.id)"
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
    search: '',
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
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    deleteButtonClicked (id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm () {
      this.deleteLoading = true;
      RecipientAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteLoading = false;
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.$router.push({ name: 'pages/surat/masuk' });
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    },
    deleteCancel () {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
  }
};
</script>