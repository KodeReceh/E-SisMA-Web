import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { store } from "../store/store";

Vue.use(Router);
const router = new Router({
  base: "/",
  mode: "hash",
  linkActiveClass: "active",
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.loggedIn) {
      NProgress.start();
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.path === "/login") {
    if (store.getters.loggedIn) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
