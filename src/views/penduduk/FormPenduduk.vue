<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="villager.NIK"
      :rules="nonEmptyRules"
      label="NIK"
      prepend-icon="credit_card"
      required
    ></v-text-field>
    <v-text-field
      v-model="villager.name"
      :rules="nonEmptyRules"
      label="Nama"
      prepend-icon="person"
      required
    ></v-text-field>
    <v-text-field
      v-model="villager.birthplace"
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
        v-model="villager.birthdate"
        :rules="nonEmptyRules"
        label="Tanggal Lahir"
        prepend-icon="event"
        required
        readonly
      ></v-text-field>
      <v-date-picker
        v-model="villager.birthdate"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-autocomplete
      v-model="villager.sex"
      :items="sexes"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="chevron_right"
      label="Jenis Kelamin"
      required
      item-text="value"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-text-field
      v-model="villager.job"
      :rules="nonEmptyRules"
      label="Pekerjaan"
      prepend-icon="work"
      required
    ></v-text-field>
    <v-autocomplete
      v-model="villager.religion"
      :items="religions"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="chevron_right"
      label="Agama"
      required
      item-text="value"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-autocomplete
      v-model="villager.tribe"
      :items="tribes"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="chevron_right"
      label="Suku"
      required
      item-text="value"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-autocomplete
      v-model="villager.status"
      :items="statuses"
      :rules="[v => !!v || 'Item is required']"
      prepend-icon="chevron_right"
      label="Status"
      required
      item-text="value"
      item-value="id"
      :chips="true"
    ></v-autocomplete>
    <v-textarea
      v-model="villager.address"
      label="Alamat"
      prepend-icon="place"
      auto-grow
      box
      required
      :rules="nonEmptyRules"
    ></v-textarea>
    <v-text-field
      label="Pilih Foto"
      @click="pickFile"
      v-model="villager.fileName"
      prepend-icon="attach_file"
      readonly
    ></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="file"
      accept="image/*"
      @change="onFilePicked"
    />
    <v-btn :disabled="!valid" @click="submit" color="info" :loading="loading"
      >submit</v-btn
    >
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import VillagerAPI from "@/api/villager";

export default {
  props: {
    villager: {
      type: Object,
      default() {
        return {
          name: "",
          birthplace: "",
          birthdate: "",
          job: "",
          sex: "",
          address: "",
          NIK: "",
          religion: "",
          tribe: "",
          status: "",
          fileName: "",
          photo: null,
        };
      }
    },
    onSubmit: Function,
    isUpdate: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: false,
    menu: false,
    nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
    religions: [
      {
        id: 1,
        value: 'Islam'
      },
      {
        id: 2,
        value: 'Protestan'
      },
      {
        id: 3,
        value: 'Katolik'
      },
      {
        id: 4,
        value: 'Hindu'
      },
      {
        id: 5,
        value: 'Budha'
      },
      {
        id: 6,
        value: 'Konghuchu'
      }
    ],
    tribes: [
      {
        id: 1,
        value: 'Koto'
      },
      {
        id: 2,
        value: 'Piliang'
      },
      {
        id: 3,
        value: 'Bodi'
      },
      {
        id: 4,
        value: 'Chaniago'
      },
      {
        id: 5,
        value: 'Sikumbang'
      },
      {
        id: 6,
        value: 'Melayu'
      },
      {
        id: 7,
        value: 'Lainnya'
      }
    ],
    statuses: [
      {
        id: 1,
        value: 'WNI'
      }, 
      {
        id: 2,
        value: 'WNA'
      }
    ],
    sexes: [
      {
        id: 1,
        value: 'Laki-laki'
      },
      {
        id: 2,
        value: 'Perempuan'
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
    },
    pickFile() {
      this.$refs.file.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          this.villager.photo = files[0];
          this.villager.fileName = files[0].name;
        } else {
          this.villager.photo = null;
          this.villager.fileName = "";
          alert('File harus berupa gambar!');
        }
      } else {
        this.villager.photo = null;
        this.villager.fileName = "";
      }
    }
  }
};
</script>
