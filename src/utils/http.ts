import { useAuthStore } from '@/stores'

const baseUrl = ''

const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 请求时拼接基本地址
    if (!options.url.startsWith('http')) {
      options.url + baseUrl + options.url
    }
    // 设置请求超时时间
    options.timeout = 60000
    const authStore = useAuthStore()
    const token = authStore.profile?.token
    // 请求头携带token
    options.header = {
      ...options.header,
      Authorization: token
    }
  }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 */
type Data<T> = {
  code: string
  msg: string
  message: string
  data: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        const data = res.data as Data<T>
        // 响应成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data as Data<T>)
        } else if (res.statusCode === 401) {
          // 未登录或登录信息失效
          const authStore = useAuthStore()
          authStore.clearProfile()
          // 跳转到登录页面
          // uni.navigateTo()
          reject(res)
        } else {
          // 其它错误
          uni.showToast({
            icon: 'none',
            title: data.msg || data.message || '请求错误'
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误'
        })
        reject(err)
      }
    })
  })
}
