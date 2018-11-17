<template>
  <v-layout row justify-center>
      <v-dialog
      v-model="confirmDeleteDialog.state"
      max-width="290">
      <v-card>
          <v-card-title class="headline">Konfirmasi Hapus</v-card-title>

          <v-card-text>
          Anda yakin ingin menghapus ini? 
          </v-card-text>

          <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="warning"
              flat="flat"
              @click="onDeleteCancel">
              Batal
          </v-btn>

          <v-btn
              color="error"
              flat="flat"
              @click="onDeleteConfirm">
              Hapus
          </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: [
    'onDeleteCancel',
    'onDeleteConfirm',
    'confirmDeleteDialog'
  ]
};
</script>