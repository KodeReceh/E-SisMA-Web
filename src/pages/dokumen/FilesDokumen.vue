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
            <td>{{ timeAgo.format(new Date(props.item.updated_at)) }}</td>
            <td>{{ props.item.caption }}</td>
            <td>{{ props.item.file_extension }}</td>
            <td>
                <v-btn 
                    depressed 
                    outline 
                    icon 
                    fab 
                    dark 
                    color="primary" 
                    small
                    @click="downloadFile(props.item)"
                    v-tooltip.auto="`Download`">
                <v-icon>cloud_download</v-icon>
                </v-btn>
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
        <InputFileDialog :dialog="dialog" :fetchFiles="fetchFiles" :file="file"></InputFileDialog> 
        <DeleteConfirmation
          :confirmDeleteDialog="deleteDialog"
          :onDeleteCancel="deleteCancel"
          :onDeleteConfirm="deleteConfirm"
        ></DeleteConfirmation>
    </v-card>
</template>

<script>
import Bytes from 'bytes';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import InputFileDialog from './InputFileDialog';
import FileAPI from '@/api/file';
import DeleteConfirmation from '@/components/DeleteConfirmation';

export default {
  components: {
    VuePerfectScrollbar,
    InputFileDialog,
    DeleteConfirmation
  },  
  props: {
    type: {
      type: String,
      default: 'image'
    },
  },
  data: () => ({
    dialog: {
      state: false,
      title: 'Input File',
      data: null,
      isUpdate: false,
    },
    search: '',
    file: {
      id: '',
      document_id: '',
      ordinal: '',
      caption: '',
      file: '',
      fileName: '',
    },
    table: {
      selected: [],
      headers: [
        {
          text: 'Diupload',
          value: 'updated_at'
        },
        {
          text: 'Keterangan',
          value: 'caption'
        },
        {
          text: 'Extensi File',
          value: 'file_extension'
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
    this.fetchFiles();
  },
  methods: {
    uploadButtonClicked () {
      this.dialog.state = true;
    },
    editFileClicked (id) {
      FileAPI.get(id).then(response => {
        this.file.document_id = response.data.data.document_id;
        this.file.ordinal = response.data.data.ordinal;
        this.file.caption = response.data.data.caption;
        this.file.fileName = response.data.data.path;
        this.file.id = response.data.data.id;
        this.dialog.isUpdate = true;
        this.dialog.state = true;
      });
    },
    fetchFiles () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      const { id } = this.$route.params;
      FileAPI.getByDocument(id).then(response => {
        this.table.items = response.data.data;
        loader.hide();
      });
    },
    deleteButtonClicked (id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm () {
      FileAPI.delete(this.deleteDialog.detail.id).then(response => {
        this.fetchFiles();
        this.deleteDialog.state = false;
        this.deleteDialog.detail = {};
      });
    },
    deleteCancel () {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
    downloadFile (file) {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      FileAPI.download(file.path).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const uName = file.path.substr(0, file.path.indexOf('.')) ? 
          file.path.substr(0, file.path.indexOf('.')) : file.path;
        link.setAttribute('download', uName + '-' + file.caption + '.' + file.file_extension);
        document.body.appendChild(link);
        link.click();
        loader.hide();
      }).catch(e => {
        loader.hide();
        alert(e.response.status + ': ' + e.response.statusText);
      });
    }
  },
};
</script>
