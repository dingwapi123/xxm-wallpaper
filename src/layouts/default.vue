<template>
  <wd-config-provider
    :theme="themeStore.isDark ? 'dark' : 'light'"
    :themeVars="themeVars"
  >
    <view
      :class="{ dark: themeStore.isDark }"
      class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <slot />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>
