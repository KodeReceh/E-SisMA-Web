<template>
  <v-layout row justify-center>
      <v-dialog
      v-model="confirmDialog.state"
      max-width="290">
      <v-card>
          <v-card-title class="headline">{{ confirmDialog.title }}</v-card-title>

          <v-card-text>
              {{ confirmDialog.question }}
          </v-card-text>

          <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="warning"
              flat="flat"
              @click="onCancel">
              {{ confirmDialog.cancelTitle }}
          </v-btn>

          <v-btn
              color="error"
              :loading="loading"
              flat="flat"
              @click="onConfirm">
              {{ confirmDialog.confirmTitle }}
          </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: [
    'onCancel',
    'onConfirm',
    'confirmDialog',
    'loading'
  ],
};
</script>