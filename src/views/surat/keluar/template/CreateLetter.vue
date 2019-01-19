<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)">
          <v-icon color="secondary">arrow_back</v-icon>&nbsp;back
        </v-btn>
        <v-flex sm12>
          <v-widget title="Buat Draft Surat Keluar">
            <div slot="widget-content">
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="fieldModel.letter_name"
                    :rules="nonEmptyRules"
                    label="Nama Surat"
                    prepend-icon="title"
                    required
                  ></v-text-field>
                  <div v-if="template.needs_villager_data">
                    <v-autocomplete
                      v-model="fieldModel.villager_id"
                      :items="villagers"
                      :rules="[v => !!v || v === 0 || 'Item is required']"
                      prepend-icon="details"
                      label="Pilih Penduduk"
                      required
                      item-text="select_name"
                      item-value="id"
                      :chips="true"
                    ></v-autocomplete>
                  </div>
                  <v-text-field
                    v-for="field in fields.text"
                    v-bind:key="field.id"
                    v-model="fieldModel[field.name]"
                    :rules="nonEmptyRules"
                    :label="field.label"
                    prepend-icon="fiber_manual_record"
                    required
                  ></v-text-field>
                  <div v-for="field in fields.gambar" v-bind:key="field.id">
                    <v-text-field
                      :label="'Pilih File ' + field.label"
                      @click.passive="pickFile('file' + field.name)"
                      :rules="nonEmptyRules"
                      v-model="fieldModel[field.name + 'Name']"
                      prepend-icon="attach_file"
                      readonly
                      required
                    ></v-text-field>
                    <input
                      type="file"
                      style="display: none"
                      :ref="'file' + field.name"
                      accept="image/*"
                      @change.passive="onFilePicked($event, field)"
                    />
                  </div>

                  <v-btn
                    :disabled="!valid"
                    color="info"
                    @click="submit"
                    :loading="loading"
                    >submit</v-btn
                  >
                  <v-btn>clear</v-btn>
                </v-form>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from "@/components/VWidget";
import TemplateAPI from "@/api/template";

export default {
  components: {
    VWidget
  },
  data() {
    return {
      valid: false,
      fields: {
        text: [],
        gambar: [],
        data_penduduk: [],
        tanda_tangan: []
      },
      villagers: [],
      template: {
        id: "",
        title: "",
        template_file: "",
        needs_villager_data: false
      },
      fieldModel: {
        villager_id: "",
        letter_name: ""
      },
      nonEmptyRules: [v => !!v || "Isian ini tidak boleh kosong."],
      loading: false
    };
  },
  mounted() {
    this.fetchTemplate();
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { id } = this.$route.params;
        let formData = new FormData();
        for (const key in this.fieldModel) {
          if (this.fieldModel.hasOwnProperty(key)) {
            formData.append(key, this.fieldModel[key]);
          }
        }
        TemplateAPI.storeFieldData(id, formData).then(response => {
          this.loading = false;
          this.$store.commit("showSnackbar", {
            text: response.data.description,
            color: "info"
          });
          this.$router.push({
            name: "ShowDraftSuratKeluar",
            params: { id: response.data.data.id }
          });
        });
      }
    },
    fetchTemplate() {
      const { id } = this.$route.params;
      TemplateAPI.getFieldResources(id).then(response => {
        this.template = response.data.data.template;
        this.villagers = response.data.data.villagers;
        this.fields.text = response.data.data.text;
        this.fields.gambar = response.data.data.image;

        response.data.data.text.forEach(t => {
          this.fieldModel[t.name] = "";
        });
        response.data.data.image.forEach(g => {
          this.fieldModel[g.name] = "";
          this.fieldModel[g.name + "Name"] = "";
        });
      });
    },
    onFilePicked(e, field) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        if (files[0].type.match("image.*")) {
          this.fieldModel[field.name] = files[0];
          this.fieldModel[field.name + "Name"] = files[0].name;
        } else {
          this.fieldModel[field.name] = "";
          this.fieldModel[field.name + "Name"] = "";
          alert("Input file harus berupa gambar.");
        }
      } else {
        this.fieldModel[field.name] = "";
        this.fieldModel[field.name + "Name"] = "";
        this.$forceUpdate();
      }
      this.$forceUpdate();
    },
    pickFile(ref) {
      this.$refs[ref][0].click();
    }
  }
};
</script>
