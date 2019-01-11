<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>Surat Keluar</h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'views/surat/keluar/template'}">Template</v-btn>
        <v-btn color="info" :to="{ name: 'CreateSuratKeluar'}">Tambah</v-btn>
        <ListSuratKeluar></ListSuratKeluar>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListSuratKeluar from "./ListSuratKeluar";

export default {
  components: {
    ListSuratKeluar
  }
};
</script>
