<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-toolbar class="elevation-0 transparent media-toolbar">
          <v-spacer></v-spacer>
          <v-btn color="info" flat :to="{ name: 'EditProfil' }">
            <v-icon>edit</v-icon>&nbsp;edit
          </v-btn>
        </v-toolbar>
        <v-flex sm12>
          <v-widget title="Profil Anda">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="profile.name" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">NIP</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ profile.employee_id_number }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Email</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ profile.email }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Jabatan</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ profile.role.title }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tempat, Tgl Lahir</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ profile.birthplcae }},
                      {{ profile.birthdate_formatted }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Jenis Kelamin</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ profile.sex === 1 ? "Laki-laki" : "Perempuan" }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nomor HP</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ profile.handphone }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Alamat</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ profile.address }}</p>
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  row
                  spacer
                  slot="header"
                  v-if="signature"
                >
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanda Tangan</p>
                  </v-flex>
                </v-layout>
                <v-layout
                  align-center
                  row
                  spacer
                  slot="header"
                  v-if="signature"
                >
                  <v-flex xs4 sm2 md3>
                    <v-avatar :size="200"> <img :src="signature" /> </v-avatar>
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
import ProfileAPI from "@/api/profile";
import VWidget from "@/components/VWidget";

export default {
  components: {
    VWidget
  },
  data() {
    return {
      profile: {
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
      },
      signature: ""
    };
  },
  mounted() {
    this.fetchProfil();
  },
  methods: {
    fetchProfil() {
      this.profile = this.$store.getters.user;
      this.getSign();
    },
    getSign() {
      if (this.profile.signature) {
        ProfileAPI.getSign(this.profile.signature).then(response => {
          const theFile = new Blob([response.data]);
          this.signature = window.URL.createObjectURL(theFile);
        });
      }
    }
  }
};
</script>
