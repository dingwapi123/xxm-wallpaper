/**
 * 系统信息工具类
 * 封装获取系统状态栏、导航栏和安全区域等相关信息的方法
 */

// 获取系统信息并缓存
const systemInfo = uni.getSystemInfoSync()

// 默认值常量
const DEFAULT_STATUS_BAR_HEIGHT = 20
const DEFAULT_NAV_BAR_HEIGHT = 44
const DEFAULT_SAFE_AREA_INSETS = { bottom: 0, top: 0 }

/**
 * 获取菜单按钮（胶囊）信息
 * @returns {UniApp.GetMenuButtonBoundingClientRectRes | null} 菜单按钮信息
 */
export const getMenuButtonInfo =
  (): UniApp.GetMenuButtonBoundingClientRectRes | null => {
    // #ifdef MP
    return uni.getMenuButtonBoundingClientRect()
    // #endif
    // #ifndef MP
    return null
    // #endif
  }

/**
 * 获取状态栏高度
 * @returns {number} 状态栏高度，默认返回 20px
 */
export const getStatusBarHeight = (): number => {
  return systemInfo.statusBarHeight || DEFAULT_STATUS_BAR_HEIGHT
}

/**
 * 获取导航栏内容高度（不含状态栏）
 * @returns {number} 导航栏内容高度，默认返回 44px
 */
export const getNavBarContentHeight = (): number => {
  const menuButtonInfo = getMenuButtonInfo()
  // #ifdef MP
  if (menuButtonInfo) {
    const statusBarHeight = getStatusBarHeight()
    // 胶囊按钮高度 + (胶囊顶部 - 状态栏高度) * 2
    // 即：胶囊高度 + 上下间距
    const gap = menuButtonInfo.top - statusBarHeight
    return menuButtonInfo.height + gap * 2
  }
  // #endif
  return DEFAULT_NAV_BAR_HEIGHT
}

/**
 * 获取导航栏总高度（状态栏 + 内容高度）
 * @returns {number} 导航栏总高度
 */
export const getNavBarHeight = (): number => {
  return getStatusBarHeight() + getNavBarContentHeight()
}

/**
 * 获取胶囊左侧位置（用于布局左侧内容不被胶囊遮挡）
 * @returns {number} 胶囊左边界坐标，H5 返回 0
 */
export const getMenuButtonLeft = (): number => {
  const menuButtonInfo = getMenuButtonInfo()
  return menuButtonInfo ? menuButtonInfo.left : 0
}

/**
 * 获取安全区域信息
 * @returns {UniApp.SafeAreaInsets} 安全区域对象
 */
export const getSafeAreaInsets = () => {
  return (
    systemInfo.safeAreaInsets || {
      bottom: DEFAULT_SAFE_AREA_INSETS.bottom,
      top: DEFAULT_SAFE_AREA_INSETS.top,
      left: 0,
      right: 0,
    }
  )
}

export default {
  getStatusBarHeight,
  getNavBarContentHeight,
  getNavBarHeight,
  getMenuButtonInfo,
  getMenuButtonLeft,
  getSafeAreaInsets,
}
