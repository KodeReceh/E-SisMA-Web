<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="document.title"
      :rules="nonEmptyRules"
      label="Nama Dokumen"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-menu
      :close-on-content-click="false"
      v-model="menu"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
      >
      <v-text-field
        slot="activator"
        v-model="document.date"
        :rules="nonEmptyRules"
        label="Tanggal Dokumen"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="document.date" @input="menu = false"></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="document.description"
      :rules="nonEmptyRules"
      label="Keterangan"
      prepend-icon="info"
      required
    ></v-text-field>
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
export default {
  props: ['document', 'onSubmit'],
  data () {
    return {
      valid: false,
      menu: false,
      nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
    };
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
  }
};
</script>