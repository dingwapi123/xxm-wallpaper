import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mode = ref<'light' | 'dark' | 'auto'>('auto')

    const isDark = computed(() => {
      if (mode.value === 'auto') {
        try {
          const sys = uni.getSystemInfoSync()
          return sys.osTheme === 'dark'
        } catch (e) {
          return false
        }
      }
      return mode.value === 'dark'
    })

    const setMode = (newMode: 'light' | 'dark' | 'auto') => {
      mode.value = newMode
    }

    const toggleMode = () => {
      mode.value = mode.value === 'dark' ? 'light' : 'dark'
    }

    return {
      mode,
      isDark,
      setMode,
      toggleMode,
    }
  },
  {
    persist: true,
  },
)
