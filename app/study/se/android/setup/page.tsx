'use client';
export default function AndroidSetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">开发环境配置</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">JDK与Android Studio安装</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 安装JDK 8或以上版本</li>
          <li>• 下载并安装Android Studio</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">SDK配置与AVD模拟器</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 配置SDK路径</li>
          <li>• 创建并启动AVD模拟器</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">常用插件与调试工具</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• ADB调试</li>
          <li>• Android Lint</li>
          <li>• LeakCanary内存检测</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Gradle构建示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`apply plugin: 'com.android.application'

android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.example.demo"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/intro" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 概述
        </a>
        <a href="/study/se/android/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          基础语法与组件 →
        </a>
      </div>
    </div>
  );
} 