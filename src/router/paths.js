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
      checkLogin: true,
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
    meta: { 
      requiresAuth: true,
    },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/user',
    meta: { 
      requiresAuth: true,
    },
    name: 'User',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/user/User.vue`
    )
  },
  {
    path: '/surat/masuk',
    meta: { 
      requiresAuth: true,
    },
    name: 'pages/surat/masuk',
    component: () => import(
      `@/pages/surat/masuk/SuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/create',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/CreateSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/edit',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'EditSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/EditSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/disposisi',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'ShowDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/ShowDisposisiSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/disposisi/create',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/CreateDisposisiSuratMasuk.vue`
    )
  },
  {
    path: '/surat/masuk/:id/disposisi/edit',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'EditDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/EditDisposisiSuratMasuk.vue`
    )
  },
  {
    path: '/surat/masuk/:id',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'ShowSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/ShowSuratMasuk.vue`
    )
  },
  {
    path: '/surat/keluar/template',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'pages/surat/keluar/template',
    component: () => import(
      `@/pages/surat/keluar/template/Template.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/create',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateTemplate',
    component: () => import(
      `@/pages/surat/keluar/template/CreateTemplate.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/:id/create-letter',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateLetter',
    component: () => import(
      `@/pages/surat/keluar/template/CreateLetter.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/:id/edit',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'EditTemplate',
    component: () => import(
      `@/pages/surat/keluar/template/EditTemplate.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/:id',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'ShowTemplate',
    component: () => import(
      `@/pages/surat/keluar/template/ShowTemplate.vue`
    )
  }, 
  {
    path: '/surat/keluar',
    meta: { 
      requiresAuth: true,
    },
    name: 'pages/surat/keluar',
    component: () => import(
      `@/pages/surat/keluar/SuratKeluar.vue`
    )
  },
  {
    path: '/surat/keluar/create',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/CreateSuratKeluar.vue`
    )
  }, 
  {
    path: '/surat/keluar/:id/edit',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'EditSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/EditSuratKeluar.vue`
    )
  }, 
  {
    path: '/surat/keluar/:id',
    meta: { 
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'ShowSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/ShowSuratKeluar.vue`
    )
  }, 
  {
    path: '/dashboard',
    meta: { 
      requiresAuth: true,
    },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Dashboard.vue`
    )
  },
  {
    path: '/dokumen',
    meta: {
      requiresAuth: true,
    },
    name: 'Dokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/Dokumen.vue`
    )
  },
  {
    path: '/dokumen/create',
    meta: {
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'CreateDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/CreateDokumen.vue`
    )
  },
  {
    path: '/dokumen/:id/edit',
    meta: {
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'EditDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/EditDokumen.vue`
    )
  },
  {
    path: '/dokumen/:id',
    meta: {
      breadcrumb: false,
      requiresAuth: true,
    },
    name: 'ShowDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/ShowDokumen.vue`
    )
  },
  {
    path: '/arsip',
    meta: {
      requiresAuth: true,
    },
    name: 'Arsip',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/arsip/Arsip.vue`
    )
  },
];
