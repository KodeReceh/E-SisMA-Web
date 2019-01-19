<template>
  <v-dialog v-model="dialog.state" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title
        class="justify-center"
        :style="{ backgroundColor: this.$vuetify.theme.primary }"
      >
        <span
          class="headline"
          :style="{ color: 'white', fontWeight: 'bold' }"
          >{{ dialog.title }}</span
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="formField" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-autocomplete
                  v-model="field.field_type"
                  :items="filterTypes()"
                  :rules="[
                    v => !!v || 'Inputan tipe field tidak boleh kosong.'
                  ]"
                  prepend-icon="view_headline"
                  label="Tipe Field"
                  required
                  item-text="title"
                  item-value="id"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-if="field.field_type !== 3 || !field.field_type"
                  label="Nama Field"
                  :rules="fieldNameRules"
                  :required="field.field_type !== 3 || !field.field_type"
                  v-model="field.name"
                  prepend-icon="title"
                  @keyup.enter="save"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-if="field.field_type === 3"
                  v-model="field.name"
                  :items="villagerFields"
                  :rules="fieldNameRules"
                  prepend-icon="title"
                  label="Nama Field"
                  :required="field.field_type === 3"
                  item-text="title"
                  item-value="id"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-if="field.field_type === 4"
                  v-model="field.user_id"
                  :items="users"
                  :rules="signUserRules"
                  prepend-icon="done_all"
                  label="Penanda Tangan"
                  :required="field.field_type === 4"
                  item-text="name"
                  item-value="id"
                  :chips="true"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click.native="
            dialog.state = false;
            clearFileObject();
          "
          >Close</v-btn
        >
        <v-btn
          color="blue darken-1"
          :disabled="!valid"
          flat
          @click="save"
          :loading="loading"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TemplateFieldAPI from "@/api/template-field";

export default {
  props: {
    dialog: {
      type: Object,
      default: null
    },
    fetchFields: {
      type: Function,
      default: null
    },
    field: {
      type: Object,
      default() {
        return {
          id: "",
          name: "",
          field_type: "",
          user_id: ""
        };
      }
    },
    uniqueData: {
      type: Object,
      default() {
        return {
          fields: [],
          signs: []
        };
      }
    },
    template: {
      type: Object,
      default() {
        return {
          id: "",
          title: "",
          needs_villager_data: "",
          needs_villager_data_string: "",
          template_file: "",
          created_at: "",
          updated_at: ""
        };
      }
    }
  },
  data() {
    return {
      loading: false,
      valid: false,
      nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
      types: [
        {
          id: 1,
          title: "Text"
        },
        {
          id: 2,
          title: "Gambar"
        },
        {
          id: 3,
          title: "Data Penduduk"
        },
        {
          id: 4,
          title: "Tanda Tangan"
        }
      ],
      villagerFields: [],
      users: [],
      fieldNameRules: [
        v => !!v || "Nama field is required",
        v =>
          (v ? (v.match(/^\w+$/) ? true : false) : false) ||
          "Hanya boleh membuat nama field dengan alfabet, angka, dan underscore (_)",
        v =>
          !this.uniqueData.fields.includes(v) ||
          "Field dengan nama ini sudah ada."
      ],
      signUserRules: [
        v => !!v || "Penanda tangan tidak boleh kosong.",
        v =>
          !this.uniqueData.signs.includes(v) || "Penanda tangan ini sudah ada."
      ]
    };
  },
  mounted() {
    this.fetchResources();
  },
  methods: {
    save() {
      if (this.$refs.formField.validate()) {
        this.loading = true;
        let formData = new FormData();
        formData.append("name", this.field.name);
        formData.append("type", this.field.field_type);
        formData.append("user_id", this.field.user_id);
        const { id } = this.$route.params;
        TemplateFieldAPI.store(id, formData)
          .then(() => {
            this.onClosedDialog();
          })
          .catch(e => {
            alert(e.response.status + ": " + e.response.statusText);
            this.onClosedDialog();
          });
      }
    },
    onClosedDialog() {
      this.clearFileObject();
      this.dialog.state = false;
      this.loading = false;
      this.fetchFields();
    },
    clearFileObject() {
      this.$refs.formField.reset();
      this.valid = false;
      this.dialog.isUpdate = false;
      this.dialog.data = null;
    },
    fetchResources() {
      TemplateFieldAPI.getResources().then(response => {
        this.villagerFields = response.data.data.villager_fields;
        this.users = response.data.data.users;
      });
    },
    filterTypes() {
      if (!this.template.needs_villager_data) {
        return this.types.filter(t => {
          return t.id !== 3;
        });
      }

      return this.types;
    }
  }
};
</script>
