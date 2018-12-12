<template>
  <div>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn color="info" :to="{ name: 'CreateTemplate'}">Tambah</v-btn>
          <ListTemplate></ListTemplate>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import ListTemplate from './ListTemplate';

export default {
  components: {
    ListTemplate,
  },
};
</script>
