<template>
  <div>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn color="info" :to="{ name: 'CreateSuratMasuk'}">Tambah</v-btn>
          <ListSuratMasuk></ListSuratMasuk>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import ListSuratMasuk from './ListSuratMasuk';

export default {
  components: {
    ListSuratMasuk,
  },
};
</script>
