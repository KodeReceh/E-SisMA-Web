const Menu =  [
  { header: 'Menu' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    permissions: [
      'regular',
      'super_user'
    ]
  },
  {
    title: 'Surat',
    group: 'surat',
    icon: 'local_post_office',
    component: 'surat',
    permissions: [
      'atur_surat_masuk',
      'atur_surat_keluar',
      'atur_template_surat',
      'atur_draft_surat_keluar',
      'super_user'
    ],
    items: [
      { name: 'masuk', title: 'Surat Masuk', component: 'pages/surat/masuk' },
      { name: 'keluar', title: 'Surat Keluar', component: 'pages/surat/keluar' },
      { name: 'keluar/template', title: 'Template Surat Keluar', component: 'pages/surat/keluar/template' },
      { name: 'draft-surat-keluar', title: 'Draft Surat Keluar', component: 'pages/surat/draft-surat-keluar' },
    ]
  },
  {
    title: 'Dokumen',
    group: 'apps',
    icon: 'description',
    name: 'Dokumen',
    permissions: ['regular', 'super_user'],
  },
  {
    title: 'Arsip',
    group: 'apps',
    icon: 'folder',
    name: 'Arsip',
    permissions: ['regular', 'super_user'],
  },
  {
    title: 'Pengaturan',
    group: 'pengaturan',
    icon: 'settings',
    component: 'pengaturan',
    permissions: ['super_user'],
    items: [
      { name: 'user', title: 'User' },
      { name: 'role', title: 'Jabatan' },
    ]
  },
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
