<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>Arsip</h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'CreateArsip'}">Tambah</v-btn>
        <ListArsip></ListArsip>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListArsip from "./ListArsip";

export default {
  components: {
    ListArsip
  }
};
</script>
