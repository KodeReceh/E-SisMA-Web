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
              name: 'EditArsip',
              params: { id: $route.params.id }
            })
          "
        >
          <v-icon>edit</v-icon>&nbsp;edit
        </v-btn>
        <v-btn
          color="info"
          flat
          @click="
            $router.push({
              name: 'CreateArsipDokumen',
              params: { id: $route.params.id }
            })
          "
        >
          <v-icon>add</v-icon>&nbsp;Dokumen
        </v-btn>
        <v-btn color="primary" flat @click="$router.push({ name: 'Arsip' })">
          <v-icon>list</v-icon>&nbsp;list
        </v-btn>
        <v-flex sm12>
          <v-widget title="Detail Arsip">
            <div slot="widget-content">
              <v-container>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Nama Arsip</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular" v-html="archive.title" />
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Tipe Arsip</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">
                      {{ archive.archive_type.type }}
                    </p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Arsip Milik</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ archive.role.title }}</p>
                  </v-flex>
                </v-layout>
                <v-layout align-center row spacer slot="header">
                  <v-flex xs4 sm2 md3>
                    <p class="font-weight-bold">Keterangan</p>
                  </v-flex>
                  <v-flex xs8 sm10 md9>
                    <p class="font-weight-regular">{{ archive.description }}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <list-dokumen></list-dokumen>
    </v-container>
  </div>
</template>

<script>
import ArchiveAPI from "@/api/archive";
import VWidget from "@/components/VWidget";
import ListDokumen from "./ListDokumen";

export default {
  components: {
    VWidget,
    ListDokumen
  },
  data() {
    return {
      archive: {
        id: "",
        title: "",
        archive_type_id: "",
        archive_type: {},
        description: "",
        role_id: "",
        role: {}
      }
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchArsip(id);
  },
  methods: {
    fetchArsip(id) {
      ArchiveAPI.get(id).then(response => {
        this.archive = response.data.data;
      });
    }
  }
};
</script>
