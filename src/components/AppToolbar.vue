<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon
        @click.stop="handleDrawerToggle"
      ></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$forceUpdate()"> <v-icon>refresh</v-icon> </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
    >
      <v-btn icon flat slot="activator">
        <v-badge color="secondary" overlap>
          <span slot="badge">{{ notifs.length }}</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <notification-list :items="notifs"></notification-list>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px"> <v-icon>person</v-icon> </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item, index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from "@/components/widgets/list/NotificationList";
import Util from "@/util";
import NotificationAPI from "@/api/notification";

export default {
  name: "app-toolbar",
  components: {
    NotificationList
  },
  data: () => ({
    avatar: (process.env.ASSET_PATH || "/static") + "/avatar/man_4.jpg",
    notifs: [],
    items: [
      {
        icon: "account_circle",
        href: "#",
        title: "Profile",
        click: () => {
          window.getApp.$emit("SHOW_PROFILE");
        }
      },
      {
        icon: "exit_to_app",
        href: "#",
        title: "Logout",
        click: () => {
          window.getApp.$emit("APP_LOGOUT");
        }
      }
    ],
    interval: null
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  mounted() {
    this.fetchNotifications();
    this.interval = setInterval(
      function() {
        if (navigator.onLine) this.fetchNotifications();
      }.bind(this),
      3600
    );
  },
  beforeDestroy: function() {
    clearInterval(this.interval);
  },
  methods: {
    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    fetchNotifications() {
      if (this.$store.getters.loggedIn) {
        NotificationAPI.getNotifications().then(response => {
          this.notifs = response.data.data;
        });
      }
    }
  }
};
</script>
