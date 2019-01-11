<template>
  <v-card>
    <v-toolbar card color="white">
      <v-text-field
        flat
        solo
        prepend-icon="search"
        placeholder="Type something"
        v-model="search"
        hide-details
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-btn icon>
        <v-icon>filter_list</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-data-table
        :headers="table.headers"
        :search="search"
        :items="table.items"
        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
        class="elevation-1"
        item-key="name"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.type_name }}</td>
          <td>
            <v-btn
              depressed
              outline
              icon
              fab
              dark
              color="warning"
              small
              @click="deleteButtonClicked(props.item.id)"
              v-tooltip.auto="`Hapus`"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
    <DeleteConfirmation
      :confirmDeleteDialog="deleteDialog"
      :onDeleteCancel="deleteCancel"
      :onDeleteConfirm="deleteConfirm"
    ></DeleteConfirmation>
    <InputFieldDialog
      :dialog="dialog"
      :fetchFields="fetchFields"
      :field="field"
      :uniqueData="uniqueData"
    ></InputFieldDialog>
  </v-card>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import InputFieldDialog from "./InputFieldDialog";
import TemplateFieldAPI from "@/api/template-field";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { getTypes } from "@/api/field_type";
import RoleAPI from "@/api/role";

export default {
  components: {
    VuePerfectScrollbar,
    InputFieldDialog,
    DeleteConfirmation
  },
  props: {
    type: {
      type: String,
      default: "image"
    }
  },
  data: () => ({
    dialog: {
      state: false,
      title: "Input Field",
      data: null,
      isUpdate: false
    },
    search: "",
    field: {
      id: "",
      name: "",
      template_id: "",
      field_type: "",
      role_id: ""
    },
    table: {
      selected: [],
      headers: [
        {
          text: "Nama Field",
          value: "name"
        },
        {
          text: "Tipe",
          value: ""
        },
        {
          text: "Action",
          value: ""
        }
      ],
      items: []
    },
    roles: [],
    deleteDialog: {
      state: false,
      title: "",
      detail: {}
    },
    uniqueData: {
      fields: [],
      signs: []
    }
  }),
  mounted() {
    this.fetchFields();
  },
  methods: {
    uploadButtonClicked() {
      this.dialog.state = true;
    },
    editFileClicked(id) {
      TemplateFieldAPI.get(id).then(response => {
        this.file.id = response.data.data.id;
        this.file.name = response.data.data.name;
        this.file.type = response.data.data.type;
        this.file.role_id = response.data.data.role_id;
        this.dialog.isUpdate = true;
        this.dialog.state = true;
      });
    },
    fetchFields() {
      const { id } = this.$route.params;
      TemplateFieldAPI.getList(id).then(response => {
        this.table.items = response.data.data;
        let fields = [];
        let signs = [];
        response.data.data.forEach(field => {
          fields.push(field.name);
          if (field.user_id) signs.push(field.user_id);
        });
        this.uniqueData = {
          fields: fields,
          signs: signs
        };
      });
    },
    deleteButtonClicked(id) {
      this.deleteDialog.state = true;
      this.deleteDialog.detail = { id: id };
    },
    deleteConfirm() {
      const templateId = this.$route.params.id;
      TemplateFieldAPI.delete(templateId, this.deleteDialog.detail.id).then(
        response => {
          this.fetchFields();
          this.deleteDialog.state = false;
          this.deleteDialog.detail = {};
        }
      );
    },
    deleteCancel() {
      this.deleteDialog.state = false;
      this.deleteDialog.detail = {};
    },
    getType(value) {
      let type = getTypes().find(t => {
        return t.value === value;
      });

      return type.value;
    }
  }
};
</script>
