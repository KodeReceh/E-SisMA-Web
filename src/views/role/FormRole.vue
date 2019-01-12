<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="role.title"
      :rules="nonEmptyRules"
      label="Nama Role"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-text-field
      v-model="role.description"
      :rules="nonEmptyRules"
      label="Keterangan"
      prepend-icon="info"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="role.permission_ids"
      :items="permissions"
      prepend-icon="group"
      label="Hak Akses"
      item-text="can"
      item-value="id"
      :chips="true"
      multiple
    ></v-autocomplete>
    <v-btn :disabled="!valid" @click="submit" color="info" :loading="loading"
      >submit</v-btn
    >
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    role: {
      type: Object,
      default() {
        return {
          title: "",
          description: "",
          permission_ids: []
        };
      }
    },
    permissions: {
      type: Array,
      default() {
        return [];
      }
    },
    onSubmit: Function,
    loading: Boolean
  },
  data() {
    return {
      valid: false,
      menu: false,
      nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    }
  }
};
</script>
