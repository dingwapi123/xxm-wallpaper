import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/images/tabbar/home.png',
        selectedIconPath: 'static/images/tabbar/home-h.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/images/tabbar/classify.png',
        selectedIconPath: 'static/images/tabbar/classify-h.png',
        pagePath: 'pages/classify/classify',
        text: '分类',
      },
      {
        iconPath: 'static/images/tabbar/user.png',
        selectedIconPath: 'static/images/tabbar/user-h.png',
        pagePath: 'pages/user/user',
        text: '我的',
      },
    ],
  },
})
