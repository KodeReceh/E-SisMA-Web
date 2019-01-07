import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { store } from '../store/store';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths,
});
// router gards
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.loggedIn) {
      NProgress.start();
      console.log(to.meta);
      
      if (to.meta.permission) {
        const user = store.getters.user;
        if (user.permissions.include(to.meta.permission)) {
          next();
        } else {
          next({ name: 'AccessDenied' });
        }
      } else {
        next();
      }
      
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
