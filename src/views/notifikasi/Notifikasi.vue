<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6> <h3>Notifikasi</h3> </v-flex>
        <ListNotifikasi></ListNotifikasi>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListNotifikasi from "./ListNotifikasi";

export default {
  components: {
    ListNotifikasi
  }
};
</script>
