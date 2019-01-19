<template>
  <div>
    <v-dialog v-model="profile.state" scrollable max-width="500px" persistent>
      <v-card>
        <v-card-title
          class="justify-center"
          :style="{ backgroundColor: this.$vuetify.theme.primary }"
        >
          <span
            class="headline"
            :style="{ color: 'white', fontWeight: 'bold' }"
            >{{ profile.title }}</span
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-flex sm12>
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4> <b>Nama</b> </v-flex>
                  <v-flex xs8>
                    <p>{{ $store.getters.user.name }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>NIP</b> </v-flex>
                  <v-flex xs8>
                    <p>{{ $store.getters.user.employee_id_number }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Email</b> </v-flex>
                  <v-flex xs8>
                    <p>{{ $store.getters.user.email }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Tempat, Tgl Lahir</b> </v-flex>
                  <v-flex xs8>
                    <p>
                      {{ $store.getters.user.birthplace }},
                      {{ $store.getters.user.birthdate_formatted }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Jenis Kelamin</b> </v-flex>
                  <v-flex xs8>
                    <p>
                      {{
                        $store.getters.user.sex === 1
                          ? "Laki-Laki"
                          : $store.getters.user.sex === 2
                          ? "Perempuan"
                          : ""
                      }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Alamat</b> </v-flex>
                  <v-flex xs8>
                    <p>{{ $store.getters.user.address }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Handphone</b> </v-flex>
                  <v-flex xs8>
                    <p>{{ $store.getters.user.handphone }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4> <b>Jabatan</b> </v-flex>
                  <v-flex xs8>
                    <p>
                      {{
                        $store.getters.user.role
                          ? $store.getters.user.role.title
                          : "-"
                      }}
                    </p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            flat
            @click="
              $router.push({ name: 'EditProfil' });
              onDialogClosed();
            "
            >Edit</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="onDialogClosed()"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default() {
        return {
          state: false,
          title: "Profil User"
        };
      }
    }
  },
  methods: {
    onDialogClosed() {
      this.profile.state = false;
    }
  }
};
</script>
