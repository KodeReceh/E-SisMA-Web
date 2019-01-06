<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="archive.title"
      :rules="nonEmptyRules"
      label="Nama"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="archive.archive_type_id"
      :items="archiveTypes"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="details"
      label="Tipe Arsip"
      required
      item-text="type"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-textarea
      v-model="archive.description"
      label="Keterangan"
      prepend-icon="message"
      auto-grow
      box
    ></v-textarea>
    <v-btn
      :disabled="!valid"
      @click="submit"
      color="info"
    >
    submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import ArchiveAPI from '@/api/archive';

export default {
  props: ['archive', 'onSubmit'],
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
    archiveTypes: []
  }),
  created () {
    this.fetchArhciveTypes();
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear () {
      this.$refs.form.reset();
    },
    fetchArhciveTypes () {
      ArchiveAPI.getArchiveTypes()
        .then(response => {
          if (response.data.success) {
            this.archiveTypes = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
};
</script>