<template>
  <div id="suratMasuk">
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <app-list-surat-masuk></app-list-surat-masuk>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import ListSuratMasuk from './ListSuratMasuk';

export default {
  components: {
    'app-list-surat-masuk': ListSuratMasuk
  },
};
</script>
