import type { LoginParams } from '@/types/auth'
import { http } from '@/utils/http'

/**
 * 登录
 * @param data
 * @returns
 */
export const LoginApi = (data: LoginParams) => {
  return http({
    method: 'POST',
    url: '/login',
    data
  })
}
