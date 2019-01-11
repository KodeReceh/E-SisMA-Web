<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>Draft Surat Keluar</h3>
        </v-flex>
        <v-spacer></v-spacer>
        <ListDraftSuratKeluar></ListDraftSuratKeluar>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListDraftSuratKeluar from "./ListDraftSuratKeluar";

export default {
  components: {
    ListDraftSuratKeluar
  }
};
</script>
