<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.name"
      :rules="nonEmptyRules"
      label="Nama"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.employee_id_number"
      label="NIP"
      prepend-icon="credit_card"
    ></v-text-field>
    <v-text-field
      v-model="user.birthplace"
      :rules="nonEmptyRules"
      label="Tempat Lahir"
      prepend-icon="place"
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
        v-model="user.birthdate"
        :rules="nonEmptyRules"
        label="Tanggal Lahir"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker
        v-model="user.birthdate"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="user.email"
      :rules="nonEmptyRules"
      label="Email"
      prepend-icon="alternate_email"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      :rules="!isUpdate ? nonEmptyRules : []"
      label="Password"
      type="password"
      prepend-icon="keyboard_hide"
      :required="!isUpdate"
    ></v-text-field>
    <v-autocomplete
      v-model="user.sex"
      :items="sexes"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="chevron_right"
      label="Jenis Kelamin"
      required
      item-text="sex"
      item-value="value"
      :chips="true"
    ></v-autocomplete>
    <v-text-field
      v-model="user.handphone"
      :rules="nonEmptyRules"
      label="Nomor HP"
      prepend-icon="contact_phone"
    ></v-text-field>
    <v-text-field
      v-model="user.address"
      :rules="nonEmptyRules"
      label="Alamat"
      prepend-icon="place"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="user.role_id"
      :items="roles"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="accessibility"
      label="Jabatan"
      required
      item-text="title"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-text-field
      label="Pilih File Tanda Tangan"
      @click="pickFile"
      v-model="user.fileName"
      prepend-icon="attach_file"
      readonly
    ></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="image/png"
      @change="onFilePicked"
    />
    <v-btn :disabled="!valid" @click="submit" color="info" :loading="loading"
      >submit</v-btn
    >
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import RoleAPI from "@/api/role";

export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          name: "",
          employee_id_number: "",
          birthplace: "",
          birthdate: "",
          email: "",
          password: "",
          sex: "",
          address: "",
          handphone: "",
          role_id: "",
          signature: "",
          fileName: ""
        };
      }
    },
    onSubmit: Function,
    loading: Boolean,
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
    roles: [],
    sexes: [
      {
        sex: "Laki-Laki",
        value: 1
      },
      {
        sex: "Perempuan",
        value: 2
      }
    ]
  }),
  created() {
    this.fetchRoles();
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
      this.$refs.file.reset();
    },
    fetchRoles() {
      RoleAPI.getList()
        .then(response => {
          if (response.data.success) {
            this.roles = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    pickFile() {
      this.$refs.file.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (this.getExtFile(files[0].name) === "png") {
          this.user.signature = files[0];
          this.user.fileName = files[0].name;
        } else {
          this.user.signature = null;
          this.user.fileName = "";
          alert("File tanda tangan harus dalam format PNG!");
        }
      } else {
        this.user.signature = null;
        this.user.fileName = "";
      }
    },
    getExtFile(fileName) {
      return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName)[0] : undefined;
    }
  }
};
</script>
