<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6> <h3>Penduduk</h3> </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'CreatePenduduk' }">Tambah</v-btn>
        <ListPenduduk></ListPenduduk>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListPenduduk from "./ListPenduduk";

export default {
  components: {
    ListPenduduk
  }
};
</script>
