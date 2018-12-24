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
                <td>{{ props.item.date }}</td>
                <td>{{ props.item.number }}</td>
                <td>{{ props.item.recipient }}</td>
                <td>{{ props.item.subject }}</td>
                <td>{{ props.item.tendency }}</td>
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
                                name: 'ShowSuratKeluar',
                                params: {
                                  id: props.item.id
                                }
                            }">
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
                                name: 'EditSuratKeluar',
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
                        small @click="deleteButtonClicked(props.item.id)">
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
          :loading="deleteLoading"
        ></DeleteConfirmation>
    </v-flex> 
</template>

<script>
import OutcomingLetterAPI from '@/api/outcoming-letter';
import DeleteConfirmation from '@/components/DeleteConfirmation';

export default {
  components: {
    DeleteConfirmation,
  },
  data () {
    return {
      deleteLoading: false,
      deleteDialog: {
        state: false,
        title: '',
        detail: {},
      },
      table: {
        selected: [],
        headers: [
          {
            text: 'Tanggal',
            value: 'date'
          },
          {
            text: 'No. Surat',
            value: 'number'
          },
          {
            text: 'Kepada',
            value: 'recipient'
          },
          {
            text: 'Subjek',
            value: 'subject'
          },
          {
            text: 'Perihal',
            value: 'tendency'
          },
          {
            text: 'Action',
            value: ''
          }
        ],
        items: []
      },
      search: ''
    };
  },
  mounted () {
    this.fetchList();
  },
  methods: {
    deleteButtonClicked (id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm () {
      this.deleteLoading = true;
      OutcomingLetterAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.deleteLoading = false;
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
        this.fetchList();
      });
    },
    deleteCancel () {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
      this.fetchList();
    },
    fetchList () {
      let vm = this;
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      OutcomingLetterAPI.getList().then(response => {
        if (response.data.success) {
          vm.table.items = response.data.data;
          loader.hide();
        }
      }).catch(e => {
        loader.hide();
      });
    }
  }
};
</script>
