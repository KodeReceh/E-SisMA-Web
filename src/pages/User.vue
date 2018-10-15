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
                          <v-select
                            label="Jabatan"
                            :items="roles"
                            v-model="user.role_id"
                          ></v-select>
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
                        <td>{{ ((props.item.role) ? props.item.role.title : '-') }}</td>
                        <td>
                          <v-switch v-model="props.item.status" color="success" @change="changeUserStatus(props.item.id)"></v-switch>
                        </td>
                        <td>
                            <v-btn 
                              depressed 
                              outline 
                              icon 
                              fab 
                              dark 
                              color="primary" 
                              small 
                              @click="editButtonClicked(props.item.id)">
                            <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn 
                              depressed 
                              outline 
                              icon 
                              fab 
                              dark 
                              color="pink" 
                              small @click="deleteButtonClicked(props.item.id)">
                            <v-icon>delete</v-icon>
                            </v-btn>
                        </td>
                        </template>
                    </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>  
            </v-layout>

            <!-- dialog delete confirm -->
             <v-layout row justify-center>
              <v-dialog
                v-model="confirmDialog.state"
                max-width="290">
                <v-card>
                  <v-card-title class="headline">Hapus user?</v-card-title>

                  <v-card-text>
                    Anda yakin ingin menghapus  {{ user.name }}? 
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="warning"
                      flat="flat"
                      @click="onDeleteCancel">
                      Batal
                    </v-btn>

                    <v-btn
                      color="error"
                      flat="flat"
                      @click="onDeleteConfirm">
                      Hapus
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      confirmDialog: {
        state: false
      },
      userExists: false,
      alerts: [],
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        birthplace: '',
        birthdate: '',
        sex: '',
        address: '',
        handphone: '',
        status: '',
        role_id: '',
        role: {
          id: '',
          title: ''
        }
      },
      roles: [],
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
            text: 'Jabatan',
            value: 'role.title'
          },
          {
            text: 'Status',
            value: 'status'
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
    this.fetchRoles();  
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
      
      this.axios.post('/api/users/' + (this.dialog.type === 'update' ? this.dialog.type + '/' + this.user.id : this.dialog.type), vm.user, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      }).then(response => {
        vm.pushAlert('success', 'Data user ' + response.data.data.name + ' berhasil disimpan!');
        vm.clearForm();
      }).catch(function (e) {
        vm.pushAlert('error', 'Data user gagal disimpan, periksa kembali data yang diinput!');
        console.log(e.message);
      });
      
    },
    clearForm () {
      this.user = {
        id: '',
        name: '',
        email: '',
        password: '',
        birthplace: '',
        birthdate: '',
        sex: '',
        address: '',
        handphone: '',
        status: '',
        role_id: '',
        role: {
          id: '',
          title: ''
        }
      };
      this.dialog.type = '';
    },
    pushAlert (type, message, show = true) {
      this.alerts.push({
        type: type,
        show: show,
        message: message
      });
    },
    editButtonClicked (userId) {
      if (this.getUserById(userId)) {
        this.dialog.state = true;
        this.dialog.type = 'update';
        this.dialog.state = true;
      }
      
    },
    getUserById (userId) {
      let vm = this;
      let token = localStorage.getItem('__token__');
      let success = false;
      return this.axios.get('api/users/' + userId, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      }).then(response => {
        if (response.data.success) {
          vm.user = {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            password: '',
            birthplace: response.data.data.birthplace,
            birthdate: response.data.data.birthdate,
            sex: response.data.data.sex,
            address: response.data.data.address,
            handphone: response.data.data.handphone,
            status: response.data.data.status,
            role_id: response.data.data.role_id,
            role: response.data.data.role
          };
          vm.userExists = true;
          return true;
        }
      }).catch((e) => {
        console.log(e);
        vm.userExists = false;
        return false;
      });
    },
    deleteButtonClicked (userId) {
      if (this.getUserById(userId)) this.confirmDialog.state = true;
    },
    onDeleteConfirm () {
      this.confirmDialog.state = false;
      let vm = this;
      this.axios.delete('api/users/delete/' + this.user.id, {
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('__token__')
        }
      }).then(response => {
        if (response.data.success) {
          vm.pushAlert('success', 'Data user ' + vm.user.name + ' berhasil dihapus!');
          vm.clearForm();
        }
      }).catch((e) => {
        vm.pushAlert('error', 'Data user gagal dihapus!');
      });
    },
    onDeleteCancel () {
      this.confirmDialog.state = false;
      this.clearForm();
    },
    fetchRoles () {
      let vm = this;
      this.axios.get('api/roles', {
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('__token__')
        }
      }).then(response => {
        if (response.data.success) {
          response.data.data.forEach(role => {
            vm.roles.push({
              value: role.id,
              text: role.title
            });
          });
        }
      }).catch((e) => {
        console.log(e.message);
      });
    },
    changeUserStatus (id) {
      let data = new FormData();
      data.append('user_id', id);
      this.axios.post('api/users/change_status', data, {
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('__token__'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        console.log('berhasil rubah status user');
      }).catch((e) => {
        console.log('gagal rubah status');
      });
    }
  },
};
</script>