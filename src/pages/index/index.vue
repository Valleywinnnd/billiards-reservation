<template>
  <view class="content">
    <!-- <image mode="aspectFill" class="logo" src="/static/logo.png" /> -->
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <view>用户信息: {{ authInfo.profile?.name }}</view>
    </view>
    <view>
      <button
        @tap="authInfo.setProfile({ name: '张三', age: 18 })"
        size="mini"
        plain
        type="primary"
      >
        保存信息
      </button>
      <button @tap="authInfo.clearProfile()" size="mini" plain type="warn">
        清除信息
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores'

const authInfo = useAuthStore()
const title = ref('Hello MJW -------')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
