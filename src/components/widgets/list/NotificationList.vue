<template>
  <v-card class="elevation-0">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Notification</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in items">
          <v-divider :key="index"></v-divider>
          <v-list-tile avatar :key="item.title" @click="handleClick(item)">
            <v-list-tile-avatar :color="item.color">
              <v-icon dark>{{item.icon}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="caption">
            <v-spacer></v-spacer>
              {{item.timeLabel}}
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleClick (item) {
      if (item.type === 'incoming-letter') {
        this.$router.push({ name: 'ShowSuratMasuk', params: { id: item.id }});
      } else if (item.type === 'signature') {
        this.$router.push({ name: 'ShowDraftSuratKeluar', params: { id: item.id }});
      }
    }
  },

};
</script>
