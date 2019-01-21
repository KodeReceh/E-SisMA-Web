<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div class="page-wrapper"><router-view></router-view></div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer" inset app>
            <v-spacer></v-spacer>
            <span class="caption"
              >efzet &copy; {{ new Date().getFullYear() }} e-SISMA</span
            >
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn
          small
          fab
          dark
          falt
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
        <profile-dialog :profile="profile"></profile-dialog>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
    <snackbar></snackbar>
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import ThemeSettings from "@/components/ThemeSettings";
import AppEvents from "./event";
import ProfileDialog from "./components/ProfileDialog";
import Snackbar from "./components/Snackbar";

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    ProfileDialog,
    Snackbar
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    profile: {
      state: false,
      title: "Profil User"
    }
  }),
  computed: {},
  beforeUpdate() {
    if (this.$store.getters.loggedIn) this.$store.dispatch("getProfile");
  },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    if (this.$store.getters.loggedIn) {
      this.$store.dispatch("getProfile");
    }
    window.getApp = this;
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}

.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
