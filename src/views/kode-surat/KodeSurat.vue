<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6> <h3>Kode Surat</h3> </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'CreateKodeSurat' }">Tambah</v-btn>
        <ListKodeSurat></ListKodeSurat>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListKodeSurat from "./ListKodeSurat";

export default {
  components: {
    ListKodeSurat
  }
};
</script>
