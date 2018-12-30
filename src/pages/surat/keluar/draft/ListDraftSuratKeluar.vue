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
                <td>{{ props.item.letter_name }}</td>
                <td>{{ props.item.template_name }}</td>
                <td>{{ props.item.status }}</td>
                <td>
                    <v-btn 
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark 
                        color="primary" 
                        small 
                        @click="downloadDraft(props.item.id, props.item.letter_name)"
                       >
                    <v-icon>cloud</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark 
                        color="warning" 
                        small>
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
import LetterTemplateAPI from '@/api/letter-template';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import mime from 'mime-types';

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
            text: 'Nama Surat',
            value: 'letter_name'
          },
          {
            text: 'Nama Template',
            value: 'template_name'
          },
          {
            text: 'Status',
            value: 'status'
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
      LetterTemplateAPI.delete(this.deleteDialog.detail.id).then(response => {
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
      LetterTemplateAPI.getList().then(response => {
        if (response.data.success) {
          vm.table.items = response.data.data;
          loader.hide();
        }
      }).catch(e => {
        loader.hide();
      });
    },
    downloadDraft (id, name) {
      LetterTemplateAPI.download(id).then(response => {
        const type = response.headers['content-type'];
        const fileName = name + '.' + mime.extension(type);
        this.downloadFile(response.data, fileName, type);
      });
    },
    downloadFile (blob, fileName, type) {
      const theFile = new Blob([blob], { type: type });
      
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(theFile);
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>
