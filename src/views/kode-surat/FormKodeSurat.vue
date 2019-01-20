<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="letterCode.code"
      :rules="getCodeRules()"
      label="Kode"
      prepend-icon="format_list_numbered"
      required
    ></v-text-field>
    <v-text-field
      v-model="letterCode.title"
      :rules="nonEmptyRules"
      label="Nama Kode"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit" color="info" :loading="loading"
      >submit</v-btn
    >
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    letterCode: {
      type: Object,
      default() {
        return {
          code: "",
          title: ""
        };
      }
    },
    onSubmit: Function,
    loading: {
      type: Boolean,
      default: false
    },
    takenCodes: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    },
    getCodeRules() {
      return [
        v => !!v || "Kode tidak boleh kosong.",
        v =>
          !this.takenCodes.includes(parseInt(v)) || "Kode ini sudah terdaftar.",
        v =>
          (v ? v.match(/^[0-9]{0,}$/) !== null : false) ||
          "Hanya mengizinkan angka pada kode"
      ];
    }
  }
};
</script>
