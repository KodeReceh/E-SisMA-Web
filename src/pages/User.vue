<template>
    <div class="pageUser">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
              <v-flex sm12 v-for="(alert, index) in alerts" v-bind:key="index">
                <v-alert :type="alert.type" dismissible v-model="alert.show" transition="scale-transition">
                  {{ alert.message }}
                </v-alert>
              </v-flex>
              <v-flex sm6>
                <h3>Data User</h3>
              </v-flex> 
              <v-layout sm6 align-end justify-end>
                <v-btn color="primary" :right="true" @click="addButtonClicked">Tambah</v-btn>
              </v-layout> 
              <v-dialog v-model="dialog.state" scrollable max-width="500px">
                <v-card>
                  <v-card-title class="justify-center" :style="{ backgroundColor: this.$vuetify.theme.primary}">
                    <span class="headline" :style="{ color: 'white', fontWeight: 'bold'}">{{ dialog.title }}</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Nama Lengkap" required v-model="user.name"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Email" required v-model="user.email"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Password" type="password" required v-model="user.password"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Tempat Lahir" required v-model="user.birthplace"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            class="mr-2"
                            label="Tanggal Lahir"       
                            append-icon="today"
                            type="date"
                            v-model="user.birthdate"
                            required
                          ></v-text-field> 
                        </v-flex>
                        <v-flex xs12>
                          <v-select
                            label="Jenis Kelamin"
                            required
                            :items="sex"
                            v-model="user.sex"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Alamat" v-model="user.address"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Handphone" v-model="user.handphone"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-autocomplete
                            label="Jabatan"
                            multiple
                            chips
                            :items="departments"
                          ></v-autocomplete>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog.state = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog.state = false" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
      alerts: [],
      user: {
        name: '',
        email: '',
        password: '',
        birthplace: '',
        birthdate: '',
        sex: '',
        address: '',
        handphone: '',
        departments: []
      },
      departments: [],
      sex: [
        {
          value: 1,
          text: 'Laki-Laki'
        },
        {
          value: 2,
          text: 'Perempuan'
        }
      ],
      dialog: {
        type: '',
        state: false,
        title: ''
      },
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
  updated () {
    this.fetchUsers();
  },
  methods: {
    fetchUsers () {
      let vm = this;
      let token = localStorage.getItem('__token__');
      this.axios.get('/api/users', {
        headers: {
          'Authorization': 'bearer ' + token
        }
      }).then(response => {
        vm.complex.items = response.data.data;
      }).catch(function (e) {
        console.log(e.message);
      });
    },
    addButtonClicked () {
      this.dialog.title = 'Tambah User';
      this.dialog.type = 'register';
      this.dialog.state = true;
    },
    save () {
      let token = localStorage.getItem('__token__');
      let vm = this;
      this.axios.post('/api/users/' + this.dialog.type, this.user, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      }).then(response => {
        vm.pushAlert('success', 'Data user ' + response.data.data.name + ' berhasil ditambahkan!');
        vm.clearForm();
      }).catch(function (e) {
        vm.pushAlert('error', 'Data user gagal disimpan, periksa kembali data yang diinput!');
        console.log(e.message);
      });
      
    },
    clearForm () {
      this.user = {
        name: '',
        email: '',
        password: '',
        birthplace: '',
        birthdate: '',
        sex: '',
        address: '',
        handphone: '',
        departments: []
      };
      this.dialog.type = '';
    },
    pushAlert (type, message, show = true) {
      this.alerts.push({
        type: type,
        show: show,
        message: message
      });
    }
  },
};
</script>