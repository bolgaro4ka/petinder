import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const colors: Ref<{
    primary: string
    surface: string
    background: string
    onPrimary: string
    secondary: string
    tertiary: string
    outline: string
    textPrimary: string
    textSecondary: string
  }> = ref({
    primary: '#1db954',
    surface: '#282828',
    background: '#121212',
    onPrimary: '#ffffff',
    secondary: '#181818',
    tertiary: '#282828',
    outline: '#282828',
    textPrimary: '#ffffff',
    textSecondary: '#b3b3b3',
  })

  const theme = ref<'light' | 'dark'>('dark')

  return { colors, theme }
})
