# 咸虾米壁纸项目文档

## 1. API 接口规范

### 基础信息
- **Base URL**: `https://tea.qingnian8.com/api/bizhi`
- **Headers**: 
  - `access-key`: 必填，用于鉴权（示例值：`123321` 或 `525288` 等，需定期获取或使用固定测试Key）
  - `Content-Type`: `application/json`

### 接口列表

#### 1.1 首页轮播图
- **URL**: `/homeBanner`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "errCode": 0,
    "errMsg": "成功",
    "data": [
      {
        "_id": "...",
        "picurl": "...",
        "target": "..."
      }
    ]
  }
  ```

#### 1.2 随机/推荐壁纸 (WallList)
- **URL**: `/wallList`
- **Method**: `GET`
- **Params**:
  - `classid`: 分类ID (可选)
  - `pageNum`: 页码
  - `pageSize`: 每页数量
- **Response**: 壁纸列表数据

#### 1.3 分类列表 (Classify)
- **URL**: `/classify`
- **Method**: `GET`
- **Params**:
  - `select`: 是否精选 (boolean, 可选)
  - `pageNum`: 页码
  - `pageSize`: 每页数量

#### 1.4 壁纸资讯 (WallNewsList)
- **URL**: `/wallNewsList`
- **Method**: `GET`
- **Params**:
  - `select`: 是否推荐
  - `pageNum`
  - `pageSize`

#### 1.5 用户下载/评分 (UserWallList)
- **URL**: `/userWallList`
- **Method**: `GET`
- **Params**:
  - `type`: `download` (下载) | `score` (评分)
  - `pageNum`
  - `pageSize`

#### 1.6 错误码
- `0`: 成功
- `400`: 请求参数错误
- `401`: 未授权/Key无效

---

## 2. 明暗模式设计规范

### 2.1 配色方案

| 语义变量 | 亮色模式 (Light) | 暗色模式 (Dark) | 说明 |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#ffffff` | `#1a1a1a` | 页面主背景 |
| `--bg-secondary` | `#f5f5f5` | `#242424` | 卡片/次级背景 |
| `--text-primary` | `#333333` | `#e0e0e0` | 主标题/正文 |
| `--text-secondary` | `#999999` | `#a0a0a0` | 次级文本/说明 |
| `--border-color` | `#eeeeee` | `#333333` | 边框颜色 |
| `--brand-color` | `#28b389` | `#28b389` | 品牌主色 (咸虾米绿) |

### 2.2 切换逻辑
1. **状态管理**: 使用 Pinia `themeStore` 管理 `mode` ('light' | 'dark' | 'auto')。
2. **持久化**: 状态变更时保存至 `uni.setStorageSync('theme_mode')`。
3. **初始化**: 应用启动时读取本地存储，若无则读取系统偏好 (`uni.getSystemInfo`).
4. **响应式**: 监听系统主题变化 (`uni.onThemeChange`) 更新状态（当 mode 为 'auto' 时）。

### 2.3 组件适配
- 使用 UnoCSS 的 `dark:` 前缀类名。
- 全局样式文件 `uni.scss` 或 `index.scss` 中定义 CSS 变量。
- 图片/Icon: 尽量使用 SVG 或 Iconfont，颜色跟随 `currentColor` 或 CSS 变量。
