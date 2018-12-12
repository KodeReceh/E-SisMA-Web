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
    name: 'CreateSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/CreateSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/edit',
    meta: { breadcrumb: false },
    name: 'EditSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/EditSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/disposisi',
    meta: { breadcrumb: false },
    name: 'ShowDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/ShowDisposisiSuratMasuk.vue`
    )
  }, 
  {
    path: '/surat/masuk/:id/disposisi/create',
    meta: { breadcrumb: false },
    name: 'CreateDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/CreateDisposisiSuratMasuk.vue`
    )
  },
  {
    path: '/surat/masuk/:id/disposisi/edit',
    meta: { breadcrumb: false },
    name: 'EditDisposisiSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/EditDisposisiSuratMasuk.vue`
    )
  },
  {
    path: '/surat/masuk/:id',
    meta: { breadcrumb: false },
    name: 'ShowSuratMasuk',
    component: () => import(
      `@/pages/surat/masuk/ShowSuratMasuk.vue`
    )
  },
  {
    path: '/surat/keluar/template',
    meta: { breadcrumb: false },
    name: 'Template',
    component: () => import(
      `@/pages/surat/keluar/template/Template.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/create',
    meta: { breadcrumb: false },
    name: 'CreateTemplate',
    component: () => import(
      `@/pages/surat/keluar/template/CreateTemplate.vue`
    )
  }, 
  {
    path: '/surat/keluar/template/:id',
    meta: { breadcrumb: false },
    name: 'ShowTemplate',
    component: () => import(
      `@/pages/surat/keluar/template/ShowTemplate.vue`
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
    path: '/surat/keluar/create',
    meta: { breadcrumb: false },
    name: 'CreateSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/CreateSuratKeluar.vue`
    )
  }, 
  {
    path: '/surat/keluar/:id/edit',
    meta: { breadcrumb: false },
    name: 'EditSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/EditSuratKeluar.vue`
    )
  }, 
  {
    path: '/surat/keluar/:id',
    meta: { breadcrumb: false },
    name: 'ShowSuratKeluar',
    component: () => import(
      `@/pages/surat/keluar/ShowSuratKeluar.vue`
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
  {
    path: '/dokumen/create',
    meta: { breadcrumb: false },
    name: 'CreateDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/CreateDokumen.vue`
    )
  },
  {
    path: '/dokumen/:id/edit',
    meta: { breadcrumb: false },
    name: 'EditDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/EditDokumen.vue`
    )
  },
  {
    path: '/dokumen/:id',
    meta: { breadcrumb: false },
    name: 'ShowDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/ShowDokumen.vue`
    )
  },
  {
    path: '/dokumen/:document/files/:file',
    meta: { breadcrumb: false },
    name: 'ShowFileDokumen',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/dokumen/ShowFileDokumen.vue`
    )
  },
  {
    path: '/arsip',
    meta: { breadcrumb: true },
    name: 'Arsip',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/arsip/Arsip.vue`
    )
  },
];
