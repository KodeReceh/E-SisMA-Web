<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          outline
          icon
          fab
          dark
          color="primary"
          small
          @click="
            $router.push({ name: 'EditUser', params: { id: $route.params.id } })
          "
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="$router.push({ name: 'pengaturan/user' })"
        >
          <v-icon>list</v-icon>&nbsp;list
        </v-btn>
        <v-flex sm12>
          <v-widget title="Detail User">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="user.name" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">NIP</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ user.employee_id_number }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Email</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ user.email }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Jabatan</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ user.role.title }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tempat, Tgl Lahir</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ user.birthplace }}, {{ user.birthdate_formatted }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Jenis Kelamin</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ user.sex === 1 ? "Laki-laki" : "Perempuan" }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nomor HP</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ user.handphone }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Alamat</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ user.address }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanda Tangan</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ user.signature }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserAPI from "@/api/user";
import VWidget from "@/components/VWidget";

export default {
  components: {
    VWidget
  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        employee_id_number: "",
        birthplace: "",
        birthdate: "",
        email: "",
        password: "",
        sex: "",
        address: "",
        handphone: "",
        role_id: "",
        signature: "",
        role: {}
      }
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser(id) {
      UserAPI.get(id).then(response => {
        this.user = response.data.data;
      });
    }
  }
};
</script>
