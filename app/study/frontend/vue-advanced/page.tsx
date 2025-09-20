'use client';

import React from 'react';
import { Typography, Card, Divider, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const codeBlockStyle = {
  background: '#f6f8fa',
  borderRadius: 6,
  padding: '12px 16px',
  fontSize: 15,
  margin: '12px 0',
  fontFamily: 'monospace',
  overflowX: 'auto' as const,
};

const tabItems = [
  {
    key: '1',
    label: '组件复用',
    children: (
      <>
        <Card title="混入mixin" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- 混入：复用逻辑 -->
<script>
export default {
  data() { return { msg: 'hello' } },
  created() { console.log('混入生命周期') }
}
</script>
<script>
import mixin from './mixin.js'
export default { mixins: [mixin] }
</script>`}</pre>
        </Card>
        <Card title="组合式API与插件" size="small">
          <pre style={codeBlockStyle}>{`<!-- 组合式API：逻辑复用更灵活 -->
<script setup>
import { ref, onMounted } from 'vue'
function useCounter() {
  const n = ref(0)
  const inc = () => n.value++
  return { n, inc }
}
const { n, inc } = useCounter()
onMounted(() => inc())
</script>
<!-- 插件注册 -->
import { createApp } from 'vue'
import MyPlugin from './plugin'
createApp(App).use(MyPlugin)`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '性能优化',
    children: (
      <>
        <Card title="异步组件与v-memo/v-once" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- 异步组件 -->
<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'))
</script>
<template>
  <Suspense><AsyncComp /></Suspense>
</template>
<!-- v-memo缓存静态内容，v-once只渲染一次 -->
<div v-memo="[a, b]">静态内容</div>
<div v-once>只渲染一次</div>`}</pre>
        </Card>
        <Card title="虚拟滚动" size="small">
          <pre style={codeBlockStyle}>{`<!-- 虚拟滚动：提升长列表性能，需第三方库如vue-virtual-scroller -->
<virtual-list :size="40" :remain="10" :bench="5" :item="item" :item-count="1000" />`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '状态管理',
    children: (
      <>
        <Card title="Pinia与Vuex原理" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- Pinia用法 -->
import { defineStore } from 'pinia'
export const useCounter = defineStore('counter', {
  state: () => ({ n: 0 }),
  actions: { inc() { this.n++ } }
})
// 组件中使用
const counter = useCounter()
counter.inc()
<!-- Vuex原理：集中式状态管理，mutation驱动变更 -->`}</pre>
        </Card>
        <Card title="provide/inject进阶" size="small">
          <pre style={codeBlockStyle}>{`<!-- provide/inject可传递响应式对象，实现全局共享 -->
<script setup>
import { provide, inject, reactive } from 'vue'
const theme = reactive({ color: 'red' })
provide('theme', theme)
const t = inject('theme')
</script>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '路由与动态加载',
    children: (
      <>
        <Card title="vue-router基本用法" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- vue-router配置 -->
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/a', component: A },
  { path: '/b', component: B }
]
const router = createRouter({ history: createWebHistory(), routes })
// App.vue中
<router-link to="/a">A</router-link>
<router-view />`}</pre>
        </Card>
        <Card title="路由懒加载与导航守卫" size="small">
          <pre style={codeBlockStyle}>{`// 路由懒加载
const routes = [
  { path: '/a', component: () => import('./A.vue') }
]
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogin()) next('/login')
  else next()
})`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '异步与数据请求',
    children: (
      <>
        <Card title="watchEffect与axios" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
const data = ref(null)
watchEffect(async () => {
  data.value = (await axios.get('/api/data')).data
})
</script>`}</pre>
        </Card>
        <Card title="Suspense异步组件" size="small">
          <pre style={codeBlockStyle}>{`<!-- Suspense包裹异步组件，支持加载占位 -->
<template>
  <Suspense>
    <AsyncComp />
    <template #fallback>加载中...</template>
  </Suspense>
</template>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '测试与调试',
    children: (
      <>
        <Card title="Vue Devtools" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// Vue Devtools：调试组件树和响应式数据的浏览器插件
// https://devtools.vuejs.org/`}</pre>
        </Card>
        <Card title="单元测试" size="small">
          <pre style={codeBlockStyle}>{`// Vue组件单元测试：@vue/test-utils + Jest
import { mount } from '@vue/test-utils'
test('渲染', () => {
  const wrapper = mount({ template: '<button>hi</button>' })
  expect(wrapper.text()).toBe('hi')
})`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="主题切换" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<script setup>
import { provide, inject, reactive } from 'vue'
const theme = reactive({ color: 'red' })
provide('theme', theme)
const t = inject('theme')
</script>
<template>
  <button @click="t.color = t.color === 'red' ? 'blue' : 'red'">切换主题</button>
  <span :style="{color: t.color}">当前主题色: {{ t.color }}</span>
</template>`}</pre>
        </Card>
        <Card title="异步列表" size="small">
          <pre style={codeBlockStyle}>{`<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const list = ref([])
onMounted(async () => {
  list.value = (await axios.get('/api/list')).data
})
</script>
<template>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
</template>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '8',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用Pinia实现全局计数器。</li>
          <li>用vue-router实现多页面切换。</li>
          <li>用Suspense实现异步加载占位。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://cn.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue官方文档</a></li>
          <li><a href="https://router.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">Vue Router</a></li>
          <li><a href="https://pinia.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">Pinia</a></li>
        </ul>
      </>
    ),
  },
];

export default function VueAdvancedPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>Vue进阶</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/vue"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          上一章：Vue基础
        </a>
        <a
          href="/study/frontend/projects"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          下一章：前端项目实战
        </a>
      </div>
    </div>
  );
} 