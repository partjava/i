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
    label: 'Vue简介',
    children: (
      <>
        <Card title="Vue核心思想" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>响应式：数据变化自动驱动视图更新。</li>
            <li>声明式渲染：用模板语法描述UI。</li>
            <li>组件化开发：UI拆分为可复用组件。</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<!-- 最简单的Vue组件 -->
<script setup>
const msg = 'Hello, Vue!'
</script>
<template>
  <h1>{{ msg }}</h1>
</template>`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '模板语法与指令',
    children: (
      <>
        <Card title="插值与指令" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- 插值语法 -->
<span>{{ msg }}</span>
<!-- v-if 条件渲染 -->
<p v-if="ok">显示</p>
<!-- v-for 列表渲染 -->
<li v-for="item in list" :key="item">{{ item }}</li>
<!-- v-bind 绑定属性 -->
<img :src="imgUrl" />
<!-- v-on 绑定事件 -->
<button @click="onClick">点我</button>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '组件开发与通信',
    children: (
      <>
        <Card title="props与事件" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<!-- 父传子：props -->
<!-- Parent.vue -->
<Child :msg="msg" />
<!-- 子组件接收 -->
<script setup>
defineProps(['msg'])
</script>
<!-- 子传父：事件 -->
<!-- Child.vue -->
<button @click="$emit('change', val)">通知父组件</button>`}</pre>
        </Card>
        <Card title="插槽与依赖注入" size="small">
          <pre style={codeBlockStyle}>{`<!-- 插槽slot -->
<template>
  <slot>默认内容</slot>
</template>
<!-- provide/inject 跨层通信 -->
<script setup>
import { provide, inject } from 'vue'
provide('color', 'red')
const color = inject('color')
</script>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '响应式原理与数据绑定',
    children: (
      <>
        <Card title="ref与reactive" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<script setup>
import { ref, reactive, watch, computed } from 'vue'
// ref: 基本类型响应式
const count = ref(0)
// reactive: 对象响应式
const state = reactive({ n: 0 })
// watch: 侦听变化
watch(count, (nv, ov) => console.log(nv))
// computed: 计算属性
const double = computed(() => count.value * 2)
</script>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '生命周期与副作用',
    children: (
      <>
        <Card title="生命周期钩子" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'
onMounted(() => { /* 挂载后 */ })
onUpdated(() => { /* 更新后 */ })
onUnmounted(() => { /* 卸载前 */ })
</script>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '表单与双向绑定',
    children: (
      <>
        <Paragraph>v-model 实现表单与数据的双向绑定。</Paragraph>
        <pre style={codeBlockStyle}>{`<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <input v-model="val" />
  <span>{{ val }}</span>
</template>`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="计数器" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<script setup>
import { ref } from 'vue'
const n = ref(0)
</script>
<template>
  <button @click="n++">{{ n }}</button>
</template>`}</pre>
        </Card>
        <Card title="TodoList" size="small">
          <pre style={codeBlockStyle}>{`<script setup>
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
          <li>实现一个带删除功能的TodoList。</li>
          <li>用provide/inject实现全局主题色。</li>
          <li>用watch实现输入防抖。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://cn.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue官方文档</a></li>
          <li><a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Vue3英文文档</a></li>
        </ul>
      </>
    ),
  },
];

export default function VueBasicPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>Vue基础</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/react-advanced"
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
          上一章：React进阶
        </a>
        <a
          href="/study/frontend/vue-advanced"
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
          下一章：Vue进阶
        </a>
      </div>
    </div>
  );
} 