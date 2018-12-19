<template>
  <v-card>
      <v-layout wrap>
        <v-form ref="formFile" v-model="valid" lazy-validation>
          <v-flex xs8>
            <v-autocomplete
              v-model="recipient.user_id"
              :items="users"
              prepend-icon="user"
              label="Penerima Surat"
              item-text="name"
              item-value="id"
              :chips="true"
              required
              :rules="[v => !!v || 'Item is required']"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs4>
            <v-btn color="blue darken-1" :disabled="!valid" flat @click="save" :loading="loading">Save</v-btn>
          </v-flex>
        </v-form>
      </v-layout>
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
        <InputRecipientDialog :dialog="dialog" :fetchRecipient="fetchRecipient" :recipient="recipient"></InputRecipientDialog> 
        <DeleteConfirmation
          :confirmDeleteDialog="deleteDialog"
          :onDeleteCancel="deleteCancel"
          :onDeleteConfirm="deleteConfirm"
        ></DeleteConfirmation>
    </v-card>
</template>

<script>
import RecipientAPI from '@/api/recipient';

export default {
  data: () => ({
    search: '',
    receipient: {
      user_id: '',
    },
    users: [],
    loading: false,
    valid: false,
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
  methods: {
    save () {
      if (this.$refs.form.valid()) {
        let letter_id = this.$router.params.id;
        RecipientAPI.addRecipient(letter_id).then(response => {
          console.log(response.data.data);
          this.fetchRecipients()
        }).catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
      }
    },
    fetchRecipients () {
      let letter_id = this.$router.params.id;
      RecipientAPI.getRecipients(letter_id).then(response => {
        this.table.items = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      })
    }
  }
}
</script>