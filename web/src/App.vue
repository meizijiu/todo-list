<template>
  <div>
    <el-alert
      title="请自觉遵守中国法律法规，切勿输入违法信息，维护良好网络环境"
      type="warning"
      show-icon
      effect="dark"
      :closable="false"
    />
    <hello-world msg="Hello Vue 3 + Vite" />
  </div>
</template>

<script setup>
import { ElAlert } from 'element-plus'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 10px;
}
</style>
