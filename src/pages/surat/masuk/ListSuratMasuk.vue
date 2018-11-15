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
                <td>{{ props.item.sender }}</td>
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
                        @click="showButtonClicked(props.item.id)">
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
                                name: 'pages/surat/masuk/edit',
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
    </v-flex> 
</template>

<script>
import IncomingLetterAPI from '@/api/incoming-letter';

export default {
  data () {
    return {
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
            text: 'Pengirim',
            value: 'sender'
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
  created () {
    this.fetchList();
  },
  methods: {
    showButtonClicked (id) {
      return 0;
    },
    editButtonClicked (id) {
      this.$props.go({
        name: 'pages/surat/masuk/edit',
        params: {
          id: id,
        },
      });
    },
    deleteButtonClicked (id) {
      return 0;
    },
    fetchList () {
      let vm = this;
      IncomingLetterAPI.getList().then(response => {
        if (response.data.success) {
          vm.table.items = response.data.data;
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  }
};
</script>
