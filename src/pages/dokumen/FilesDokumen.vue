<template>
  <v-flex lg12>
    <v-toolbar class="elevation-0 transparent media-toolbar">
      <v-btn-toggle>
        <v-btn flat @click="uploadButtonClicked">
          <v-icon color="primary">cloud_upload</v-icon>
          &nbsp;Upload
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
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
            <td>{{ props.item.caption }}</td>
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
                            name: 'ShowDokumen',
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
                            name: 'EditDokumen',
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
  <InputFileDialog :dialog="dialog"></InputFileDialog> 
</v-flex>
</template>

<script>
import Bytes from 'bytes';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import InputFileDialog from './InputFileDialog';
import FileAPI from '@/api/file';

export default {
  components: {
    VuePerfectScrollbar,
    InputFileDialog
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
      title: 'Input File'
    },
    lastOrdinal: 0,
    search: '',
    table: {
      selected: [],
      headers: [
        {
          text: 'Tanggal',
          value: 'updated_at'
        },
        {
          text: 'Nama File',
          value: 'caption'
        },
        {
          text: 'Action',
          value: ''
        }
      ],
      items: []
    },
  }),
  mounted () {
    const { id } = this.$route.params;
    this.getLastOrdinal(id);
  },
  methods: {
    uploadButtonClicked () {
      this.dialog.state = true;
    },
    getLastOrdinal (document) {
      return FileAPI.getLastOrdinal(document).then(response => {
        this.lastOrdinal = response.data.data;
      }).catch((e) => {
        console.log(e);
      });
    }
  },  
};
</script>