<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm6>
          <h3>Pengguna</h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="info" :to="{ name: 'CreateUser'}">Tambah</v-btn>
        <ListUser></ListUser>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListUser from "./ListUser";

export default {
  components: {
    ListUser
  }
};
</script>
