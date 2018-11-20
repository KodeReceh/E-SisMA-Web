<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-textarea
      v-model="disposition.summary"
      :rules="nonEmptyRules"
      label="Ringkasan"
      prepend-icon="message"
      auto-grow
      box
      required
    ></v-textarea>
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
        v-model="disposition.processing_date"
        :rules="nonEmptyRules"
        label="Tanggal Proses"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="disposition.processing_date" @input="menu = false"></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="disposition.information"
      label="Informasi"
      prepend-icon="info"
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
import IncomingLetterAPI from '@/api/incoming-letter';

export default {
  props: ['disposition', 'onSubmit'],
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || 'Isian ini tidak boleh kosong.'],
  }),
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