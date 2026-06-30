'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: 'Vue进阶',
  chapterNumber: 19,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'Vue基础', href: '/study/computer/frontend/vue' },
  nextChapter: { label: '前端项目实战', href: '/study/computer/frontend/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '复用与优化',
    left: (
      <div className="space-y-4">
        <PageTitle>组件复用</PageTitle>
        <BookParagraph><b>混入mixin：</b></BookParagraph>
        <BookCode language="javascript" code={`// 混入：复用逻辑
// mixin.js
export default {
  data() { return { msg: 'hello' } },
  created() { console.log('混入生命周期') }
}
// 组件中使用
import mixin from './mixin.js'
export default { mixins: [mixin] }
}`} />
        <BookParagraph><b>组合式API与插件：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 组合式API：逻辑复用更灵活 -->
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
createApp(App).use(MyPlugin)`} />
        <SectionTitle>性能优化</SectionTitle>
        <BookList items={[
          'v-memo：条件缓存静态内容。',
          'v-once：只渲染一次。',
          'defineAsyncComponent：异步组件。',
          '虚拟滚动：提升长列表性能。',
        ]} />
        <BookCode language="html" code={`<!-- 异步组件 -->
<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'))
</script>
<template>
  <Suspense><AsyncComp /></Suspense>
</template>
<!-- v-memo缓存静态内容 -->
<div v-memo="[a, b]">静态内容</div>
<!-- v-once只渲染一次 -->
<div v-once>只渲染一次</div>
<!-- 虚拟滚动，需第三方库如vue-virtual-scroller -->
<virtual-list :size="40" :remain="10" :bench="5" :item="item" :item-count="1000" />`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>状态管理</SectionTitle>
        <BookParagraph><b>Pinia与Vuex原理：</b></BookParagraph>
        <BookCode language="javascript" code={`// Pinia用法
import { defineStore } from 'pinia'
export const useCounter = defineStore('counter', {
  state: () => ({ n: 0 }),
  actions: { inc() { this.n++ } }
})
// 组件中使用
const counter = useCounter()
counter.inc()
// Vuex原理：集中式状态管理，mutation驱动变更`} />
        <BookParagraph><b>provide/inject进阶：</b></BookParagraph>
        <BookCode language="html" code={`<!-- provide/inject可传递响应式对象，实现全局共享 -->
<script setup>
import { provide, inject, reactive } from 'vue'
const theme = reactive({ color: 'red' })
provide('theme', theme)
const t = inject('theme')
</script>`} />
        <SectionTitle>路由与动态加载</SectionTitle>
        <BookParagraph><b>vue-router基本用法：</b></BookParagraph>
        <BookCode language="javascript" code={`import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/a', component: A },
  { path: '/b', component: B }
]
const router = createRouter({ history: createWebHistory(), routes })
// App.vue中
<router-link to="/a">A</router-link>
<router-view />`} />
        <BookParagraph><b>路由懒加载与导航守卫：</b></BookParagraph>
        <BookCode language="javascript" code={`// 路由懒加载
const routes = [
  { path: '/a', component: () => import('./A.vue') }
]
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogin()) next('/auth/login')
  else next()
})`} />
        <TagGrid items={['组合式API', 'Pinia', '异步组件', '路由', '懒加载']} />
      </div>
    ),
  },
  {
    label: '数据请求与测试',
    left: (
      <div className="space-y-4">
        <PageTitle>异步与数据请求</PageTitle>
        <BookParagraph><b>watchEffect与axios：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
const data = ref(null)
watchEffect(async () => {
  data.value = (await axios.get('/api/data')).data
})
</script>`} />
        <BookParagraph><b>Suspense异步组件：</b></BookParagraph>
        <BookCode language="html" code={`<!-- Suspense包裹异步组件，支持加载占位 -->
<template>
  <Suspense>
    <AsyncComp />
    <template #fallback>加载中...</template>
  </Suspense>
</template>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试与调试</SectionTitle>
        <BookList items={[
          'Vue Devtools：调试组件树和响应式数据的浏览器插件。',
          '@vue/test-utils + Jest：单元测试。',
        ]} />
        <BookCode language="javascript" code={`import { mount } from '@vue/test-utils'
test('渲染', () => {
  const wrapper = mount({ template: '<button>hi</button>' })
  expect(wrapper.text()).toBe('hi')
})`} />
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>主题切换：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
import { provide, inject, reactive } from 'vue'
const theme = reactive({ color: 'red' })
provide('theme', theme)
const t = inject('theme')
</script>
<template>
  <button @click="t.color = t.color === 'red' ? 'blue' : 'red'">切换主题</button>
  <span :style="{color: t.color}">当前主题色: {{ t.color }}</span>
</template>`} />
        <BookParagraph><b>异步列表：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
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
</template>`} />
        <TagGrid items={['axios', 'watchEffect', '测试', 'Devtools', '练习']} />
      </div>
    ),
  },
  {
    label: '练习与拓展',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={[
          '用Pinia实现全局计数器。',
          '用vue-router实现多页面切换。',
          '用Suspense实现异步加载占位。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'Vue官方文档：cn.vuejs.org',
          'Vue Router：router.vuejs.org/zh',
          'Pinia：pinia.vuejs.org/zh',
        ]} />
        <TagGrid items={['Pinia', 'Vue Router', 'Suspense', '练习', '拓展']} />
      </div>
    ),
  },
]

export default function FrontendVueAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
