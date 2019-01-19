<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="profile.name"
      :rules="nonEmptyRules"
      label="Nama"
      prepend-icon="title"
      required
    ></v-text-field>
    <v-text-field
      v-model="profile.employee_id_number"
      label="NIP"
      :rules="getNIPRules()"
      prepend-icon="credit_card"
    ></v-text-field>
    <v-text-field
      v-model="profile.birthplace"
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
        v-model="profile.birthdate"
        :rules="nonEmptyRules"
        label="Tanggal Lahir"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker
        v-model="profile.birthdate"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="profile.email"
      :rules="getEmailRules()"
      label="Email"
      autocomplete="off"
      prepend-icon="alternate_email"
      required
    ></v-text-field>
    <v-text-field
      v-model="profile.password"
      :rules="!isUpdate ? nonEmptyRules : []"
      label="Password"
      autocomplete="off"
      type="password"
      prepend-icon="keyboard_hide"
      :required="!isUpdate"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :rules="profile.password ? getConfirmPasswordRules() : []"
      label="Konfirmasi Password"
      autocomplete="off"
      type="password"
      prepend-icon="keyboard_hide"
      :required="profile.password ? true : false"
    ></v-text-field>
    <v-autocomplete
      v-model="profile.sex"
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
      v-model="profile.handphone"
      :rules="nonEmptyRules"
      label="Nomor HP"
      prepend-icon="contact_phone"
    ></v-text-field>
    <v-text-field
      v-model="profile.address"
      :rules="nonEmptyRules"
      label="Alamat"
      prepend-icon="place"
      required
    ></v-text-field>
    <v-text-field
      label="Pilih File Tanda Tangan"
      @click="pickFile"
      v-model="profile.fileName"
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
export default {
  props: {
    profile: {
      type: Object,
      default() {
        return {
          id: "",
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
    },
    takenEmails: {
      type: Array,
      default() {
        return [];
      }
    },
    takenNIPs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    confirmPassword: "",
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
    pickFile() {
      this.$refs.file.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (this.getExtFile(files[0].name) === "png") {
          this.profile.signature = files[0];
          this.profile.fileName = files[0].name;
        } else {
          this.profile.signature = null;
          this.profile.fileName = "";
          alert("File tanda tangan harus dalam format PNG!");
        }
      } else {
        this.profile.signature = null;
        this.profile.fileName = "";
      }
      this.$forceUpdate();
    },
    getExtFile(fileName) {
      return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName)[0] : undefined;
    },
    getEmailRules() {
      return [
        v => !!v || "Email tidak boleh kosong.",
        v =>
          v.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) !== null || "Format email tidak benar",
        v => !this.takenEmails.includes(v) || "Email ini sudah terdaftar"
      ];
    },
    getNIPRules() {
      return [
        v =>
          !this.takenNIPs.includes(v) || "User dengan NIP ini sudah terdaftar",
        v => !/\s/.test(v) || "Tidak boleh mengandung spasi"
      ];
    },
    getConfirmPasswordRules() {
      return [
        v => !!v || "Konfirmasi password tidak boleh kosong.",
        v => this.profile.password === v || "Konfirmasi password tidak cocok!"
      ];
    }
  }
};
</script>
