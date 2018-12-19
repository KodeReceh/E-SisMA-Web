<template>
  <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout row wrap>
          <v-flex xs10>
            <v-autocomplete
              v-model="recipient.user_id"
              :items="users"
              prepend-icon="user"
              label="Penerima Surat"
              item-text="name"
              item-value="id"
              :chips="true"
              required
              :rules="[v => !!v || 'Item is required']"
              multiple
            ></v-autocomplete>
          </v-flex>
          <v-flex xs2>
          <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="save" :loading="loading">Tambah</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
</template>

<script>
import RecipientAPI from '@/api/recipient';

export default {
  props: {
    fetchRecipients: Function
  },
  data () {
    return {
      valid: false,
      loading: false,
      users: [],
      recipient: {
        user_id: []
      },
    };
  },
  mounted () {
    this.fetchAvailableRecipients();
  },
  updated () {
    this.fetchAvailableRecipients();
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let letter_id = this.$route.params.id;
        RecipientAPI.addRecipient(letter_id, this.recipient).then(response => {
          console.log(response.data.data);
          this.fetchRecipients();
          this.loading = false;
          this.recipient.user_id = [];
        }).catch(e => {
          alert(e.response.status + ': ' + e.response.statusText);
        });
      }
    },
    fetchAvailableRecipients () {
      let letter_id = this.$route.params.id;

      RecipientAPI.getAvailableRecipients(letter_id).then(response => {
        this.users = response.data.data;
      }).catch(e => {
        alert(e.response.status + ': ' + e.response.statusText);
      });
    }
  }
};
</script>
