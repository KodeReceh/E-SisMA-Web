<template>
  <div>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    ...mapMutations(["closeSnackbar"])
  }
};
</script>
