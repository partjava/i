'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全', chapterTitle: '移动应用测试', chapterNumber: 7,
  totalChapters: 10, subjectHref: '/study/security/penetration',
  prevChapter: { label: 'Web应用测试', href: '/study/security/penetration/web' },
  nextChapter: { label: '无线网络测试', href: '/study/security/penetration/wireless' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>移动应用测试基础概念</PageTitle>
        <BookParagraph>移动应用测试是针对Android、iOS等移动端App进行安全性评估，发现应用在数据存储、通信、权限、加密、逆向等方面的安全隐患。测试内容涵盖本地存储、网络通信、组件滥用、代码安全、第三方库等多个层面。</BookParagraph>
        <BookList items={['目标：发现移动App中的安全漏洞，防止数据泄露和被攻击', '范围：APK/IPA包、App本地存储、网络接口、系统权限、加密实现等', '方法：静态分析+动态分析+逆向工程+手工测试']} />
        <BookCode language="bash" code={`# APK反编译
apktool d app.apk -o out

# iOS砸壳
frida -U -f com.example.app -l dump.js --no-pause

# 抓包分析
mitmproxy -p 8080`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>测试流程</PageTitle>
        <BookList items={['环境准备：搭建测试手机/模拟器、抓包代理、root/jailbreak', '静态分析：反编译App，分析代码、资源、配置', '动态分析：运行时监控、Hook、流量抓取、行为分析', '逆向工程：分析加密算法、协议、关键逻辑', '漏洞验证：手动复现和确认漏洞', '报告编写：整理漏洞细节和修复建议']} />
        <BookCode language="bash" code={`# Android抓取本地数据库
adb shell "run-as com.example.app cat /data/data/com.example.app/databases/user.db > /sdcard/user.db"
adb pull /sdcard/user.db

# iOS查看Keychain
security dump-keychain -d login.keychain-db

# Frida注入脚本
frida -U -f com.example.app -l hook.js --no-pause`} />
      </div>
    ),
  },
  {
    label: '常见漏洞',
    left: (
      <div className="space-y-4">
        <PageTitle>常见移动应用漏洞类型</PageTitle>
        <BookList items={['数据泄露：敏感信息明文存储、日志泄露、SD卡泄露', '逆向破解：代码混淆不足、加固绕过、算法泄露', '权限绕过：滥用系统权限、未授权操作、组件导出', '通信劫持：HTTP明文、证书校验缺失、中间人攻击', '恶意注入：WebView注入、动态加载、反射调用', '代码执行：远程命令执行、动态代码加载']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>漏洞利用代码示例</PageTitle>
        <BookCode language="bash" code={`# Android本地数据库明文
adb shell "cat /data/data/com.example.app/databases/user.db"

# iOS越狱后提权
su root

# WebView注入
javascript:alert(document.cookie)`} />
      </div>
    ),
  },
  {
    label: '工具实践',
    left: (
      <div className="space-y-4">
        <PageTitle>移动安全测试工具</PageTitle>
        <BookList items={['Frida：动态注入与Hook分析', 'Jadx/Apktool：APK反编译与静态分析', 'MobSF：一站式移动安全自动化分析平台', 'Burp Suite/mitmproxy：抓包与流量劫持', 'Objection：无Root/Jailbreak下的渗透测试工具', 'Cycript/Needle：iOS动态分析与注入']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工具实践示例</PageTitle>
        <BookCode language="bash" code={`# MobSF自动化分析
python manage.py runserver
# 浏览器访问 http://127.0.0.1:8000 上传APK/IPA

# Frida注入
frida -U -f com.example.app -l hook.js --no-pause

# Jadx反编译APK
jadx-gui app.apk`} />
      </div>
    ),
  },
]

export default function PenetrationMobilePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
