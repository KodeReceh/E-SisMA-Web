export default [
  {
    path: "*",
    meta: {
      public: true
    },
    redirect: {
      path: "/404"
    }
  },
  {
    path: "/404",
    meta: {
      public: true
    },
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/NotFound.vue`)
  },
  {
    path: "/verify-letter",
    meta: {
      public: true
    },
    name: "VerifyLetter",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/VerifyLetter.vue`)
  },
  {
    path: "/403",
    meta: {
      public: true
    },
    name: "AccessDenied",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Deny.vue`)
  },
  {
    path: "/500",
    meta: {
      public: true
    },
    name: "ServerError",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Error.vue`)
  },
  {
    path: "/login",
    meta: {
      public: true,
      checkLogin: true
    },
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Login.vue`)
  },
  {
    path: "/",
    meta: {
      requiresAuth: true
    },
    name: "Root",
    redirect: {
      name: "Dashboard"
    }
  },
  {
    path: "/pengaturan/user",
    meta: {
      requiresAuth: true
    },
    name: "pengaturan/user",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/user/User.vue`)
  },
  {
    path: "/pengaturan/user/create",
    meta: {
      requiresAuth: true
    },
    name: "CreateUser",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/user/CreateUser.vue`)
  },
  {
    path: "/pengaturan/user/:id/edit",
    meta: {
      requiresAuth: true
    },
    name: "EditUser",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/user/EditUser.vue`)
  },
  {
    path: "/pengaturan/user/:id",
    meta: {
      requiresAuth: true
    },
    name: "ShowUser",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/user/ShowUser.vue`)
  },
  {
    path: "/pengaturan/role",
    meta: {
      requiresAuth: true
    },
    name: "pengaturan/role",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/role/Role.vue`)
  },
  {
    path: "/pengaturan/role/create",
    meta: {
      requiresAuth: true
    },
    name: "CreateRole",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/role/CreateRole.vue`)
  },
  {
    path: "/pengaturan/role/:id/edit",
    meta: {
      requiresAuth: true
    },
    name: "EditRole",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/role/EditRole.vue`)
  },
  {
    path: "/surat/masuk",
    meta: {
      requiresAuth: true
    },
    name: "views/surat/masuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/SuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/CreateSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/edit",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "EditSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/EditSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/disposisi",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowDisposisiSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/ShowDisposisiSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/disposisi/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateDisposisiSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/CreateDisposisiSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/disposisi/edit",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "EditDisposisiSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/EditDisposisiSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/user/:user_id/disposisi",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowDisposisiSuratMasukUser",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/detail/ShowDisposisiSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/ShowSuratMasuk.vue`)
  },
  {
    path: "/surat/masuk/:id/dokumen/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateDokumenSuratMasuk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/masuk/CreateDokumen.vue`)
  },
  {
    path: "/surat/template-surat-keluar",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "views/surat/keluar/template",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/template/Template.vue`)
  },
  {
    path: "/surat/template-surat-keluar/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateTemplate",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/template/CreateTemplate.vue`)
  },
  {
    path: "/surat/template-surat-keluar/:id/create-letter",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateLetter",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/template/CreateLetter.vue`)
  },
  {
    path: "/surat/template-surat-keluar/:id/edit",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "EditTemplate",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/template/EditTemplate.vue`)
  },
  {
    path: "/surat/template-surat-keluar/:id",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowTemplate",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/template/ShowTemplate.vue`)
  },
  {
    path: "/surat/keluar",
    meta: {
      requiresAuth: true
    },
    name: "views/surat/keluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/SuratKeluar.vue`)
  },
  {
    path: "/surat/draft-surat-keluar",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "views/surat/draft-surat-keluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/draft/DraftSuratKeluar.vue`)
  },
  {
    path: "/surat/draft-surat-keluar/:id",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowDraftSuratKeluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/draft/ShowDraftSuratKeluar.vue`)
  },
  {
    path: "/surat/keluar/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateSuratKeluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/CreateSuratKeluar.vue`)
  },
  {
    path: "/surat/keluar/:id/edit",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "EditSuratKeluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/EditSuratKeluar.vue`)
  },
  {
    path: "/surat/keluar/:id",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowSuratKeluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/ShowSuratKeluar.vue`)
  },
  {
    path: "/surat/keluar/:id/dokumen/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateDokumenSuratKeluar",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/surat/keluar/CreateDokumen.vue`)
  },
  {
    path: "/dashboard",
    meta: {
      requiresAuth: true
    },
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`)
  },
  {
    path: "/dokumen",
    meta: {
      requiresAuth: true
    },
    name: "Dokumen",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/dokumen/Dokumen.vue`)
  },
  {
    path: "/dokumen/create",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "CreateDokumen",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/dokumen/CreateDokumen.vue`)
  },
  {
    path: "/dokumen/:id/edit",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "EditDokumen",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/dokumen/EditDokumen.vue`)
  },
  {
    path: "/dokumen/:id",
    meta: {
      breadcrumb: false,
      requiresAuth: true
    },
    name: "ShowDokumen",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/dokumen/ShowDokumen.vue`)
  },
  {
    path: "/arsip",
    meta: {
      requiresAuth: true
    },
    name: "Arsip",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/arsip/Arsip.vue`)
  },
  {
    path: "/arsip/create",
    meta: {
      requiresAuth: true
    },
    name: "CreateArsip",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/arsip/CreateArsip.vue`)
  },
  {
    path: "/arsip/:id/edit",
    meta: {
      requiresAuth: true
    },
    name: "EditArsip",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/arsip/EditArsip.vue`)
  },
  {
    path: "/arsip/:id/dokumen/create",
    meta: {
      requiresAuth: true
    },
    name: "CreateArsipDokumen",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/arsip/CreateDokumen.vue`)
  },
  {
    path: "/arsip/:id",
    meta: {
      requiresAuth: true
    },
    name: "ShowArsip",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/arsip/ShowArsip.vue`)
  },
  {
    path: "/penduduk",
    meta: {
      requiresAuth: true
    },
    name: "Penduduk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/penduduk/Penduduk.vue`)
  },
  {
    path: "/penduduk/create",
    meta: {
      requiresAuth: true
    },
    name: "CreatePenduduk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/penduduk/CreatePenduduk.vue`)
  },
  {
    path: "/penduduk/:id/edit",
    meta: {
      requiresAuth: true
    },
    name: "EditPenduduk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/penduduk/EditPenduduk.vue`)
  },
  {
    path: "/penduduk/:id",
    meta: {
      requiresAuth: true
    },
    name: "ShowPenduduk",
    component: () =>
      import(/* webpackChunkName: "routes" */
      `@/views/penduduk/ShowPenduduk.vue`)
  }
];
