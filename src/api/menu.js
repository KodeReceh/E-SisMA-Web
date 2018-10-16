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
    group: 'apps',
    icon: 'local_post_office',
    component: 'surat',
    items: [
      { name: 'masuk', title: 'Surat Masuk', component: 'pages/surat/masuk' },
      { name: 'keluar', title: 'Surat Keluar', component: 'pages/surat/keluar' },
    ]
  },
  {
    title: 'User',
    group: 'apps',
    icon: 'account_box',
    name: 'User',
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
