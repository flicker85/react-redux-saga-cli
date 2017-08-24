export const menu = [
  { id: '1', title: 'HOME', icon: 'home', url: '/' },
  { id: '4', title: 'TABLE', icon: 'schedule', url: '/table' },
  { id: '2', title: 'ABOUT', icon: 'team', url: '/about' },
  { id: '3', title: 'Multi-Level', icon: 'plus-square-o', url: '/menu', children: [
    { id: '31', title: 'Menu1', url: '/menu/one', children: [
      { id: '311', title: 'Menu1-1', url: '/menu/one/1' },
      { id: '312', title: 'Menu1-2', url: '/menu/one/2' }
    ] },
    { id: '32', title: 'Menu2', url: '/menu/two' }
  ] },
];
// navigation menu orientation: [horizontal: true, vertical: false]
export const horizontal = false;