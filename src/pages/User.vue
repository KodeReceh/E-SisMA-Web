<template>
    <div class="pageUser">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex sm12>
                    <h3>Data User</h3>
                </v-flex> 
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
                        :headers="complex.headers"
                        :search="search"
                        :items="complex.items"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                        class="elevation-1"
                        item-key="name"
                        >
                        <template slot="items" slot-scope="props">            
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.address }}</td>
                        <td>
                            <v-btn depressed outline icon fab dark color="primary" small>
                            <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn depressed outline icon fab dark color="pink" small>
                            <v-icon>delete</v-icon>
                            </v-btn>
                        </td>
                        </template>
                    </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>  
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      complex: {
        selected: [],
        headers: [
          {
            text: 'Nama',
            value: 'name'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Alamat',
            value: 'address'
          },
          {
            text: 'Action',
            value: ''
          },
        ],
        items: []
      }
    };
  },
  created () {
    this.fetchUsers();    
  },
  methods: {
    fetchUsers () {
      let vm = this;
      let token = localStorage.getItem('__token__');
      this.axios.get('api/users', {
        headers: {
          'Authorization': 'bearer ' + token
        }
      }).then(response => {
        vm.complex.items = response.data.data;
      }).catch(function (e) {
        console.log(e.message);
      });
    }
  },
};
</script>