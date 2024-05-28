export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/report',
    name: '报表',
    icon: 'crown',
    routes: [
      { path: '/report', redirect: '/report/market' },
      { path: '/report/market', name: '营销报表', component: './ReportManage/MarketReport' },
      { path: '/report/performance', name: '业绩报表', component: './ReportManage/PerformanceReport' },
      { path: '/report/traffic', name: '流量报表', component: './ReportManage/TrafficReport' },
    ],
  },
  {
    path: '/product',
    name: '商品管理',
    icon: 'crown',
    routes: [
      { path: '/product', redirect: '/product/manage' },
      { path: '/product/manage', name: '产品管理', component: './ProductManage' },
      { path: '/product/brand-manage', name: '品牌管理', component: './ProductManage/ProductBrandManage' },
      { path: '/product/type-manage', name: '类型管理', component: './ProductManage/ProductTypeManage' },
      { path: '/product/color-manage', name: '颜色管理', component: './ProductManage/ProductColorManage' },
      { path: '/product/size-manage', name: '尺码管理', component: './ProductManage/ProductSizeManage' },
    ],
  },
  { name: '用户管理', icon: 'user', path: '/user-manage', component: './UserManage' },
  { name: '订单管理', icon: 'crown', path: '/order-manage', component: './OrderManage' },
  {
    path: '/spread',
    name: '企宣管理',
    icon: 'crown',
    routes: [
      { path: '/spread', redirect: '/spread/ad-manage' },
      { path: '/spread/ad-manage', name: '广告管理', component: './Spread/Ad' },
      { path: '/spread/link-manage', name: '友情链接管理', component: './Spread/FriendLink' },
    ],
  },

  { path: '/', redirect: '/report' },
  { path: '*', layout: false, component: './404' },
];
