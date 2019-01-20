const Menu = [
  { header: "Menu" },
  {
    title: "Dashboard",
    group: "apps",
    icon: "dashboard",
    name: "Dashboard"
  },
  {
    title: "Surat",
    group: "surat",
    icon: "local_post_office",
    component: "surat",
    permissions: [
      "atur_surat_masuk",
      "atur_surat_keluar",
      "atur_template_surat",
      "atur_draft_surat_keluar"
    ],
    items: [
      { name: "masuk", title: "Surat Masuk", component: "views/surat/masuk" },
      {
        name: "keluar",
        title: "Surat Keluar",
        component: "views/surat/keluar"
      },
      {
        name: "keluar/template",
        title: "Template Surat Keluar",
        component: "views/surat/keluar/template"
      },
      {
        name: "kode-surat",
        title: "Kode Surat",
        component: "views/surat/kode-surat"
      }
    ]
  },
  {
    title: "Dokumen",
    group: "apps",
    icon: "description",
    name: "Dokumen",
    permissions: ["regular"]
  },
  {
    title: "Arsip",
    group: "apps",
    icon: "folder",
    name: "Arsip",
    permissions: ["regular"]
  },
  {
    title: "Penduduk",
    group: "apps",
    icon: "group",
    name: "Penduduk",
    permissions: ["atur_penduduk"]
  },
  {
    title: "Pengaturan",
    group: "pengaturan",
    icon: "settings",
    component: "pengaturan",
    permissions: ["atur_pengguna"],
    items: [{ name: "user", title: "User" }, { name: "role", title: "Jabatan" }]
  },
  {
    title: "Verifikasi Surat",
    group: "apps",
    icon: "check_circle",
    name: "VerifyLetter",
    target: "_blank"
  }
];
// reorder menu
// Menu.forEach((item) => {
//   if (item.items) {
//     item.items.sort((x, y) => {
//       let textA = x.title.toUpperCase();
//       let textB = y.title.toUpperCase();
//       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//     });
//   }
// });

export default Menu;
