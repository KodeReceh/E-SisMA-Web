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
            <td>{{ props.item.name }}</td>
            <td>{{ getType(props.item.type) }}</td>
            <td>{{ getRole(props.item.role_id) }}</td>
            <td>
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
        <InputFieldDialog :dialog="dialog" :fetchFiles="fetchFiles" :file="file"></InputFieldDialog> 
        <DeleteConfirmation
          :confirmDeleteDialog="deleteDialog"
          :onDeleteCancel="deleteCancel"
          :onDeleteConfirm="deleteConfirm"
        ></DeleteConfirmation>
    </v-card>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import InputFieldDialog from './InputFieldDialog';
import LetterTemplateAPI from '@/api/letter-template';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { getTypes } from '@/api/file_type';
import RoleAPI from '@/api/role';

export default {
  components: {
    VuePerfectScrollbar,
    InputFieldDialog,
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
      title: 'Input Field',
      data: null,
      isUpdate: false,
    },
    search: '',
    file: {
      id: '',
      name: '',
      template_id: '',
      type: '',
      role_id: '',
    },
    table: {
      selected: [],
      headers: [
        {
          text: 'Nama Field',
          value: 'name'
        },
        {
          text: 'Tipe',
          value: ''
        },
        {
          text: 'Penanda Tangan',
          value: 'role'
        },
        {
          text: 'Action',
          value: ''
        }
      ],
      items: [],
    },
    roles: [],
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
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
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
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
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
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
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
    },
    getType (value) {
      return getTypes().map(t => {
        return t.value === value;
      });
    },
    fetchRoles () {
      RoleAPI.getList().then(response => {
        this.roles = response.response.data;
      }).catch(e => {
        if (e.response) {
          alert(e.response.status + ': ' + e.response.statusText);
        }
      });
    },
    getRoleName (roleId) {
      let role = this.roles.map(r => {
        return r.id === roleId;
      });

      return role ? role : 'Tidak ada';
    }
  },
};
</script>
