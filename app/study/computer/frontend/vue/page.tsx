'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: 'Vue基础',
  chapterNumber: 18,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'React进阶', href: '/study/computer/frontend/react-advanced' },
  nextChapter: { label: 'Vue进阶', href: '/study/computer/frontend/vue-advanced' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Vue简介与模板',
    left: (
      <div className="space-y-4">
        <PageTitle>Vue简介</PageTitle>
        <BookParagraph>Vue是一款渐进式JavaScript框架，核心思想是响应式、声明式渲染和组件化开发。</BookParagraph>
        <BookList items={[
          '响应式：数据变化自动驱动视图更新。',
          '声明式渲染：用模板语法描述UI。',
          '组件化开发：UI拆分为可复用组件。',
        ]} />
        <BookCode language="html" code={`<!-- 最简单的Vue组件 -->
<script setup>
const msg = 'Hello, Vue!'
</script>
<template>
  <h1>{{ msg }}</h1>
</template>`} />
        <SectionTitle>模板语法与指令</SectionTitle>
        <BookCode language="html" code={`<!-- 插值语法 -->
<span>{{ msg }}</span>
<!-- v-if 条件渲染 -->
<p v-if="ok">显示</p>
<!-- v-for 列表渲染 -->
<li v-for="item in list" :key="item">{{ item }}</li>
<!-- v-bind 绑定属性 -->
<img :src="imgUrl" />
<!-- v-on 绑定事件 -->
<button @click="onClick">点我</button>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>组件开发与通信</SectionTitle>
        <BookParagraph><b>props与事件：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 父传子：props -->
<!-- Parent.vue -->
<Child :msg="msg" />
<!-- 子组件接收 -->
<script setup>
defineProps(['msg'])
</script>
<!-- 子传父：事件 -->
<!-- Child.vue -->
<button @click="$emit('change', val)">通知父组件</button>`} />
        <BookParagraph><b>插槽与依赖注入：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 插槽slot -->
<template>
  <slot>默认内容</slot>
</template>
<!-- provide/inject 跨层通信 -->
<script setup>
import { provide, inject } from 'vue'
provide('color', 'red')
const color = inject('color')
</script>`} />
        <TagGrid items={['Vue', '模板', '指令', '组件', 'props']} />
      </div>
    ),
  },
  {
    label: '响应式与表单',
    left: (
      <div className="space-y-4">
        <PageTitle>响应式原理与数据绑定</PageTitle>
        <BookParagraph><b>ref与reactive：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
import { ref, reactive, watch, computed } from 'vue'
// ref: 基本类型响应式
const count = ref(0)
// reactive: 对象响应式
const state = reactive({ n: 0 })
// watch: 侦听变化
watch(count, (nv, ov) => console.log(nv))
// computed: 计算属性
const double = computed(() => count.value * 2)
</script>`} />
        <SectionTitle>生命周期与副作用</SectionTitle>
        <BookCode language="html" code={`<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'
onMounted(() => { /* 挂载后 */ })
onUpdated(() => { /* 更新后 */ })
onUnmounted(() => { /* 卸载前 */ })
</script>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>表单与双向绑定</SectionTitle>
        <BookParagraph>v-model 实现表单与数据的双向绑定。</BookParagraph>
        <BookCode language="html" code={`<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <input v-model="val" />
  <span>{{ val }}</span>
</template>`} />
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>计数器：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
import { ref } from 'vue'
const n = ref(0)
</script>
<template>
  <button @click="n++">{{ n }}</button>
</template>`} />
        <BookParagraph><b>TodoList：</b></BookParagraph>
        <BookCode language="html" code={`<script setup>
import { ref } from 'vue'
const list = ref([])
const val = ref('')
function add() {
  list.value.push(val.value)
  val.value = ''
}
</script>
<template>
  <input v-model="val" />
  <button @click="add">添加</button>
  <ul>
    <li v-for="(item,i) in list" :key="i">{{ item }}</li>
  </ul>
</template>`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '实现一个带删除功能的TodoList。',
          '用provide/inject实现全局主题色。',
          '用watch实现输入防抖。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'Vue官方文档：cn.vuejs.org',
          'Vue3英文文档：vuejs.org/guide/introduction.html',
        ]} />
        <TagGrid items={['ref', 'reactive', 'computed', 'watch', '生命周期']} />
      </div>
    ),
  },
]

export default function FrontendVuePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
