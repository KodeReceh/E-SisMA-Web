<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-btn :round="true" flat @click="$router.go(-1)"><v-icon color="secondary">arrow_back</v-icon>&nbsp;back</v-btn>
        <v-flex sm12>
          <v-widget title="Edit Jabatan">
            <div slot="widget-content">
              <v-container>
                <FormRole :role="role" :onSubmit="submit" :permissions="permissions"></FormRole>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormRole from './FormRole';
import VWidget from '@/components/VWidget';
import RoleAPI from '@/api/role';

export default {
  components: {
    FormRole,
    VWidget,
  },
  data () {
    return {
      role: {
        id: '',
        title: '',
        description: '',
        permission_ids: []
      },
      permissions: []
    };
  },
  mounted () {
    const { id } = this.$route.params;
    this.fetchRole(id);
    this.fetchPermissions();
  },
  methods: {
    submit () {
      let loader = this.$loading.show({
        container: null,
        canCancel: false,
      });
      const { id } = this.$route.params;

      RoleAPI.update(id, this.role).then(response => {
        this.$router.push({ name: 'pengaturan/role' });
        loader.hide();
      });
    },
    fetchRole (id) {
      RoleAPI.get(id).then(response => {
        this.role = response.data.data;
      });
    },
    fetchPermissions () {
      RoleAPI.getPermissions().then(response => {
        this.permissions = response.data.data;
      });
    }
  }
};
</script>