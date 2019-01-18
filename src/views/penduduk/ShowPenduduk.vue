<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="primary"
          @click="
            $router.push({
              name: 'EditPenduduk',
              params: { id: $route.params.id }
            })
          "
        >
          <v-icon>edit</v-icon>&nbsp;edit
        </v-btn>
        <v-btn color="primary" flat @click="$router.push({ name: 'Penduduk' })">
          <v-icon>list</v-icon>&nbsp;list
        </v-btn>
        <v-flex sm12>
          <v-widget title="Detail Penduduk">
            <div slot="widget-content">
              <v-container>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">NIK</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.NIK" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.name" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tempat Lahir</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ villager.birthplace }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tanggal Lahir</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ villager.birthdate_formatted }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Jenis Kelamin</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ villager.sex_text }}</p>
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Agama</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.religion_text" />
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Suku</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.tribe_text" />
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Pekerjaan</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.job" />
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Alamat</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.address" />
                  </v-flex>
                </v-layout>
                 <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Status</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="villager.status_text" />
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
import VillagerAPI from "@/api/villager";
import VWidget from "@/components/VWidget";

export default {
  components: {
    VWidget,
  },
  data() {
    return {
      villager: {
        id: "",
        name: "",
        birthplace: "",
        birthdate: "",
        job: "",
        address: "",
        religion: "",
        sex: "",
        tribe: "",
        status: "",
        photo: "",
        NIK: "",
        religion_text: "",
        sex_text: "",
        birthdate_formatted: "",
        tribe_text: "",
        status_text: ""
      }
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchPenduduk(id);
  },
  methods: {
    fetchPenduduk(id) {
      VillagerAPI.get(id).then(response => {
        this.villager = response.data.data;
      });
    }
  }
};
</script>
