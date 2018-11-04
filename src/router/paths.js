export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },  
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Login.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/user',
    meta: { breadcrumb: true },
    name: 'User',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/user/User.vue`
    )
  },
  {
    path: '/surat/masuk',
    meta: { breadcrumb: true },
    name: 'pages/surat/masuk',
    component: () => import(
      `@/pages/surat/masuk/SuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/create',
    meta: { breadcrumb: false },
    name: 'pages/surat/masuk/create',
    component: () => import(
      `@/pages/surat/masuk/CreateSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/keluar',
    meta: { breadcrumb: true },
    name: 'pages/surat/keluar',
    component: () => import(
      `@/pages/surat/keluar/SuratKeluar.vue`
    )
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Dashboard.vue`
    )
  },
  {
    path: '/dokumen',
    meta: { breadcrumb: true },
    name: 'Dokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/Dokumen.vue`
    )
  },
];
