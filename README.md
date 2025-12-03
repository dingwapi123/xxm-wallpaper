# 咸虾米壁纸 (xxm-wallpaper)

基于 [unibest](https://github.com/feige996/unibest) 框架开发的跨平台壁纸应用，使用 Vue 3 + TypeScript + UnoCSS + Pinia 构建，支持微信小程序、H5 等多端发布。

本项目创意及 API 来源于 [咸虾米 (qingnian8)](https://gitee.com/qingnian8)。

## ✨ 项目特色

- **跨平台开发**：基于 uni-app，一套代码同时发布到微信小程序、H5、App 等多个平台。
- **现代化技术栈**：采用 Vue 3 setup 语法糖、TypeScript 类型支持、Pinia 状态管理。
- **原子化 CSS**：集成 UnoCSS，实现快速样式开发与暗黑模式适配。
- **沉浸式体验**：
  - 全局自定义导航栏，支持背景透传与沉浸式布局。
  - 完美适配各端状态栏与胶囊按钮位置。
  - 丝滑的明暗模式切换动画。
- **功能丰富**：
  - **首页**：精选轮播图、每日推荐、公告滚动、专题精选。
  - **分类**：支持多维度壁纸分类浏览。
  - **专题**：精选专题列表，支持专题详情查看。
  - **搜索**：支持关键词搜索、历史记录管理。
  - **预览**：大图预览、滑动切换、长按保存、信息查看。

## 🛠️ 技术栈

- **框架核心**: [uni-app](https://uniapp.dcloud.net.cn/) + [Vue 3](https://cn.vuejs.org/)
- **脚手架**: [unibest](https://www.unibest.tech/)
- **构建工具**: [Vite](https://cn.vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式库**: [UnoCSS](https://unocss.dev/) + [Wot Design Uni](https://wot-design-uni.cn/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- **网络请求**: `uni.request` 封装 (拦截器、类型支持)

## 🚀 快速开始

### 环境准备

确保你的环境满足以下要求：

- Node.js >= 18
- pnpm >= 7.30

### 安装依赖

```bash
pnpm install
```

### 运行项目

**H5 端预览**

```bash
pnpm dev:h5
```

**微信小程序预览**

```bash
pnpm dev:mp-weixin
```

运行成功后，请使用微信开发者工具导入 `dist/dev/mp-weixin` 目录。

### 构建发布

**构建 H5**

```bash
pnpm build:h5
```

**构建微信小程序**

```bash
pnpm build:mp-weixin
```

## 📂 目录结构

```
src/
├── common/          # 公共资源 (图片、样式)
├── components/      # 公共组件 (自定义导航栏、标题等)
├── hooks/           # 组合式函数
├── interceptors/    # 请求拦截器
├── layouts/         # 页面布局
├── pages/           # 页面文件
│   ├── index/       # 首页
│   ├── classify/    # 分类页
│   ├── subject/     # 专题页
│   ├── search/      # 搜索页
│   ├── classlist/   # 壁纸列表页
│   └── preview/     # 壁纸预览页
├── service/         # API 服务接口
├── static/          # 静态资源
├── store/           # Pinia 状态管理
├── utils/           # 工具函数 (系统信息、HTTP封装等)
├── App.vue          # 应用入口
├── main.ts          # Vue 初始化
├── manifest.json    # 应用配置
├── pages.json       # 页面路由配置
└── uni.scss         # 全局样式变量
```

## 🧩 核心功能实现

### 1. 自定义导航栏 (`custom-navbar`)

- 封装了通用的自定义导航栏组件，自动适配不同平台的状态栏高度。
- 在小程序端，自动计算胶囊按钮位置，确保搜索框与胶囊对齐。
- 支持左侧标题、搜索框宽度自适应等配置。

### 2. 明暗模式

- 基于 Pinia 管理全局主题状态 (`themeStore`)。
- 结合 UnoCSS 的 `dark:` 前缀，实现全站样式的自动适配。
- 支持跟随系统自动切换或手动切换。

### 3. 网络请求封装

- 基于 `uni.request` 二次封装，统一处理响应拦截、错误提示。
- 完整的 TypeScript 类型定义，开发体验更佳。

## 👏 致谢

- 框架支持：[unibest](https://www.unibest.tech/)
- 创意与 API：[咸虾米 (qingnian8)](https://gitee.com/qingnian8)

## 📄 许可证

[MIT](./LICENSE) License
