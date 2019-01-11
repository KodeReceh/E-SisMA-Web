<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>Jabatan</h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'CreateRole' }">Tambah</v-btn>
        <ListRole></ListRole>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListRole from "./ListRole";

export default {
  components: {
    ListRole
  }
};
</script>
