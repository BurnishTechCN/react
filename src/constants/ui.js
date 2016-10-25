// ui动画
export const UI_SIDEBAR_COLLAPSE = 'UI_SIDEBAR_COLLAPSE';
export const SIDEBAR_MENU = [
  {
    title: '车辆管理',
    icon: 'ion-android-bus',
    to: '/truck',
  },
  {
    title: '配置管理',
    icon: 'ion-ios-gear',
    to: '/settings',
  },
  {
    title: '服务',
    icon: 'ion-ios-medkit',
    to: '#',
    submenu: [
      {
        title: '救援服务',
        to: '/service/sos',
      },
      {
        title: '服务站',
        to: '/service/rest',
      },
    ],
  },
];
