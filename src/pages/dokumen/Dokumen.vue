<template>
  <div>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn color="info" :to="{ name: 'CreateDokumen'}">Tambah</v-btn>
          <ListDokumen></ListDokumen>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import ListDokumen from './ListDokumen';

export default {
  components: {
    ListDokumen,
  },
};
</script>
