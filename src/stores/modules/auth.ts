import type { IProfile } from '@/types/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useAuthStore = defineStore(
  'auth',
  () => {
    // 信息
    const profile = ref<IProfile>()

    // 保存个人信息，登陆时使用
    const setProfile = (val: IProfile) => {
      profile.value = val
    }

    // 清理个人信息
    const clearProfile = () => {
      profile.value = undefined
    }

    return {
      profile,
      setProfile,
      clearProfile
    }
  },
  // 持久化
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    }
  }
)
