const Menu =  [
  { header: 'Menu' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },
  {
    title: 'Surat',
    group: 'surat',
    icon: 'local_post_office',
    component: 'surat',
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
    name: 'Dokumen'
  },
  {
    title: 'Arsip',
    group: 'apps',
    icon: 'folder',
    name: 'Arsip'
  },
  {
    title: 'Pengaturan',
    group: 'pengaturan',
    icon: 'settings',
    component: 'pengaturan',
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
