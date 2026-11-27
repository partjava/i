'use client';
import {
  SiPycharm, SiIntellijidea, SiEclipseide, SiClion, SiGoland, SiPhpstorm, SiWebstorm, SiDevdotto, SiXcode, SiAndroidstudio, SiNotepadplusplus, SiVim, SiGit, SiGithub, SiGitee, SiNodedotjs, SiPython, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiSqlite, SiDbeaver, SiDocker, SiLinux, SiUbuntu, SiCentos, SiFedora, SiShell, SiMobx, SiVmware, SiVirtualbox, SiAnaconda, SiJupyter, SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiGooglecolab, SiLeetcode, SiCodeforces, SiFigma, SiTypeorm, SiNotion, SiMarkdown, SiMdbook, SiJsfiddle, SiWireshark, SiBurpsuite, SiMamp, SiKagi, SiOpenssl, SiArduino, SiRaspberrypi, SiLogitech, SiOpenai, SiComposer, SiXampp, SiPhp, SiGo, SiCmake, SiCplusplus, SiJavascript, SiReact, SiVuedotjs, SiWebpack, SiBabel, SiTypescript, SiGradle, SiSpring, SiFlutter, SiDart, SiAltiumdesigner, SiProteus, SiMultisim, SiStmicroelectronics, SiGooglechrome, SiFirefoxbrowser, SiDedge, SiOpera, SiSafari, SiSourceforge, SiIcloud, SiWebex, SiGitlab, SiFiles, SiCoder, SiRocket, SiLightburn, SiStarz, SiQuest
} from 'react-icons/si';
import {
  SiClaude, SiGooglegemini, SiPerplexity, SiHuggingface, SiMistralai, SiGithubcopilot,
  SiX, SiMeta, SiOllama, SiAlibabacloud, SiBaidu, SiCoze, SiSparkar, SiBraintrust,
  SiWindsurf, SiV0, SiNotebooklm, SiCanva, SiDeepl, SiLangchain, SiPoe, SiSuno,
  SiRust, SiKotlin, SiSwift, SiDotnet, SiNextdotjs, SiTailwindcss, SiVite, SiAntdesign,
  SiNginx, SiPandas, SiNumpy, SiElastic, SiCodewars, SiVirustotal, SiHackerone, SiOwasp,
  SiDebian, SiArchlinux, SiQemu, SiKubernetes, SiPlatformio, SiKicad, SiEspressif,
  SiLatex, SiZotero, SiMiro, SiApifox, SiLintcode,
  SiBilibili, SiFreecodecamp, SiMdnwebdocs, SiZhihu, SiCsdn, SiJuejin,
  SiStackoverflow, SiGeeksforgeeks, SiCoursera, SiKhanacademy, SiUdemy,
  SiPaddlepaddle, SiGoogle, SiKaggle, SiBookstack
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Trophy, ArrowRight, Code2, ChevronDown, ChevronUp, Users, FileText, Clock, Box, BookOpen, Wrench, Gamepad2, Search, X, Sparkles, Palette, Eye, Film, Layers, Wand2, LayoutGrid, MousePointerClick, Activity, Clapperboard, Play, Video, GraduationCap, PenTool, ShieldCheck, Blocks, ListChecks, Zap, Minimize2, Scissors, Smile } from 'lucide-react';
import { useAuth } from '@shared/hooks/useAuth';
import SanctuaryHero, { SanctuaryFocusTarget } from './_shared/components/sanctuary/SanctuaryHero';
import { ALGORITHM_REGISTRY } from './_shared/components/visualizer/registry';
import { navigationItems } from './_shared/data/navigation';
import CoreEnginesShowcase from './_shared/components/CoreEnginesShowcase';
import ToolCard from './_shared/components/ToolCard';
import ToolGroupPreview from './_shared/components/ToolGroupPreview';
import BackToTop from './_shared/components/BackToTop';
import SiteFooter from './_shared/components/SiteFooter';
import { useSidebar } from './_shared/components/Sidebar';
import { useLocale, UI_DICT } from './_shared/lib/i18n';
import mobileStyles from './mobile-home.module.css';

const groupedSoftware = [
  {
    group: 'AI 工具',
    items: [
      // 国外 AI（官方图标）
      { name: 'ChatGPT', icon: SiOpenai, url: 'https://chatgpt.com/', desc: 'OpenAI对话助手' },
      { name: 'Claude', icon: SiClaude, url: 'https://claude.ai/', desc: 'Anthropic对话助手' },
      { name: 'Gemini', icon: SiGooglegemini, url: 'https://gemini.google.com/', desc: 'Google大模型' },
      { name: 'Grok', icon: SiX, url: 'https://grok.com/', desc: 'xAI大模型' },
      { name: 'GitHub Copilot', icon: SiGithubcopilot, url: 'https://github.com/features/copilot', desc: 'AI编程助手' },
      { name: 'Windsurf', icon: SiWindsurf, url: 'https://windsurf.com/', desc: 'AI编程IDE' },
      { name: 'v0', icon: SiV0, url: 'https://v0.dev/', desc: 'AI生成前端界面' },
      { name: 'Perplexity', icon: SiPerplexity, url: 'https://www.perplexity.ai/', desc: 'AI搜索引擎' },
      { name: 'Mistral', icon: SiMistralai, url: 'https://chat.mistral.ai/', desc: 'Le Chat对话助手' },
      { name: 'Hugging Face', icon: SiHuggingface, url: 'https://huggingface.co/', desc: '开源模型社区' },
      { name: 'Meta AI', icon: SiMeta, url: 'https://www.meta.ai/', desc: 'Llama系列大模型' },
      { name: 'Ollama', icon: SiOllama, url: 'https://ollama.com/', desc: '本地运行开源大模型' },
      { name: 'NotebookLM', icon: SiNotebooklm, url: 'https://notebooklm.google.com/', desc: 'Google AI学习笔记' },
      { name: 'DeepL', icon: SiDeepl, url: 'https://www.deepl.com/', desc: 'AI翻译工具' },
      { name: 'Poe', icon: SiPoe, url: 'https://poe.com/', desc: '多模型聚合对话' },
      { name: 'Suno', icon: SiSuno, url: 'https://suno.com/', desc: 'AI音乐生成' },
      { name: 'LangChain', icon: SiLangchain, url: 'https://www.langchain.com/', desc: 'LLM应用开发框架' },
      { name: 'Canva', icon: SiCanva, url: 'https://www.canva.cn/', desc: 'AI设计平台' },
      // 国产 AI（有官方图标）
      { name: '通义千问', icon: SiAlibabacloud, url: 'https://tongyi.aliyun.com/', desc: '阿里大模型' },
      { name: '文心一言', icon: SiBaidu, url: 'https://yiyan.baidu.com/', desc: '百度大模型' },
      { name: '智谱清言', icon: SiBraintrust, url: 'https://chatglm.cn/', desc: 'ChatGLM大模型' },
      { name: '秘塔AI搜索', icon: SiKagi, url: 'https://metaso.cn/', desc: 'AI搜索引擎' },
      { name: '扣子', icon: SiCoze, url: 'https://www.coze.cn/', desc: '字节AI应用搭建平台' },
      // 国产 AI（暂无官方图标）
      { name: 'DeepSeek', icon: SiSparkar, url: 'https://chat.deepseek.com/', desc: '深度求索大模型' },
      { name: 'Kimi', icon: SiSparkar, url: 'https://kimi.moonshot.cn/', desc: '月之暗面长文本助手' },
      { name: '豆包', icon: SiSparkar, url: 'https://www.doubao.com/', desc: '字节跳动AI助手' },
      { name: '讯飞星火', icon: SiSparkar, url: 'https://xinghuo.xfyun.cn/', desc: '科大讯飞大模型' },
      { name: '腾讯元宝', icon: SiSparkar, url: 'https://yuanbao.tencent.com/', desc: '腾讯AI助手' },
      { name: '海螺AI', icon: SiSparkar, url: 'https://hailuoai.com/', desc: 'MiniMax AI助手' },
      { name: '即梦AI', icon: SiSparkar, url: 'https://jimeng.jianying.com/', desc: '字节AI绘画平台' },
      { name: 'Cursor', icon: SiSparkar, url: 'https://cursor.com/', desc: 'AI优先代码编辑器' },
      { name: 'Gamma', icon: SiSparkar, url: 'https://gamma.app/', desc: 'AI生成PPT/网页' },
      { name: '飞桨 AI Studio', icon: SiPaddlepaddle, url: 'https://aistudio.baidu.com/', desc: '百度飞桨深度学习社区' },
      { name: 'Google AI', icon: SiGoogle, url: 'https://ai.google/', desc: 'Google AI 官方门户' },
      { name: 'DeepLearning.AI', icon: SiSparkar, url: 'https://www.deeplearning.ai/', desc: '吴恩达深度学习课程' },
    ]
  },
  {
    group: '编程开发',
    items: [
      { name: 'VS Code', icon: VscVscode, url: 'https://code.visualstudio.com/', desc: '主流免费代码编辑器' },
      { name: 'PyCharm', icon: SiPycharm, url: 'https://www.jetbrains.com/pycharm/', desc: 'Python开发IDE' },
      { name: 'IntelliJ IDEA', icon: SiIntellijidea, url: 'https://www.jetbrains.com/idea/', desc: 'Java/Kotlin等开发IDE' },
      { name: 'Eclipse', icon: SiEclipseide, url: 'https://www.eclipse.org/', desc: '经典Java开发IDE' },
      { name: 'CLion', icon: SiClion, url: 'https://www.jetbrains.com/clion/', desc: 'C/C++开发IDE' },
      { name: 'GoLand', icon: SiGoland, url: 'https://www.jetbrains.com/go/', desc: 'Go开发IDE' },
      { name: 'PHPStorm', icon: SiPhpstorm, url: 'https://www.jetbrains.com/phpstorm/', desc: 'PHP开发IDE' },
      { name: 'WebStorm', icon: SiWebstorm, url: 'https://www.jetbrains.com/webstorm/', desc: '前端开发IDE' },
      { name: 'Dev-C++', icon: SiDevdotto, url: 'https://sourceforge.net/projects/orwelldevcpp/', desc: '轻量C++开发环境' },
      { name: 'Xcode', icon: SiXcode, url: 'https://developer.apple.com/xcode/', desc: '苹果开发IDE' },
      { name: 'Android Studio', icon: SiAndroidstudio, url: 'https://developer.android.com/studio', desc: '安卓开发IDE' },
      { name: 'Notepad++', icon: SiNotepadplusplus, url: 'https://notepad-plus-plus.org/', desc: '轻量文本编辑器' },
      { name: 'Vim', icon: SiVim, url: 'https://www.vim.org/', desc: '强大命令行编辑器' },
      { name: 'Git', icon: SiGit, url: 'https://git-scm.com/', desc: '分布式版本控制' },
      { name: 'GitHub', icon: SiGithub, url: 'https://github.com/', desc: '代码托管平台' },
      { name: 'Gitee', icon: SiGitee, url: 'https://gitee.com/', desc: '国产代码托管平台' },
      { name: 'Node.js', icon: SiNodedotjs, url: 'https://nodejs.org/', desc: 'JavaScript运行环境' },
      { name: 'Python', icon: SiPython, url: 'https://www.python.org/', desc: '主流编程语言' },
      { name: 'Java', icon: SiSpring, url: 'https://www.oracle.com/java/', desc: '主流编程语言' },
      { name: 'Go', icon: SiGo, url: 'https://go.dev/', desc: '高效编程语言' },
      { name: 'PHP', icon: SiPhp, url: 'https://www.php.net/', desc: 'Web后端开发语言' },
      { name: 'C++', icon: SiCplusplus, url: 'https://isocpp.org/', desc: '高性能编程语言' },
      { name: 'JavaScript', icon: SiJavascript, url: 'https://developer.mozilla.org/docs/Web/JavaScript', desc: '前端/全栈开发语言' },
      { name: 'TypeScript', icon: SiTypescript, url: 'https://www.typescriptlang.org/', desc: '强类型JS超集' },
      { name: 'React', icon: SiReact, url: 'https://react.dev/', desc: '前端UI框架' },
      { name: 'Vue', icon: SiVuedotjs, url: 'https://vuejs.org/', desc: '前端UI框架' },
      { name: 'Webpack', icon: SiWebpack, url: 'https://webpack.js.org/', desc: '前端打包工具' },
      { name: 'Babel', icon: SiBabel, url: 'https://babeljs.io/', desc: 'JS转译工具' },
      { name: 'CMake', icon: SiCmake, url: 'https://cmake.org/', desc: '跨平台构建工具' },
      { name: 'Gradle', icon: SiGradle, url: 'https://gradle.org/', desc: '自动化构建工具' },
      { name: 'Spring', icon: SiSpring, url: 'https://spring.io/', desc: 'Java企业开发框架' },
      { name: 'Flutter', icon: SiFlutter, url: 'https://flutter.dev/', desc: '跨平台UI框架' },
      { name: 'Dart', icon: SiDart, url: 'https://dart.dev/', desc: 'Flutter开发语言' },
      { name: 'Rust', icon: SiRust, url: 'https://www.rust-lang.org/', desc: '安全系统级语言' },
      { name: 'Kotlin', icon: SiKotlin, url: 'https://kotlinlang.org/', desc: 'Android/JVM语言' },
      { name: 'Swift', icon: SiSwift, url: 'https://www.swift.org/', desc: '苹果生态语言' },
      { name: '.NET', icon: SiDotnet, url: 'https://dotnet.microsoft.com/', desc: '微软开发平台' },
      { name: 'Next.js', icon: SiNextdotjs, url: 'https://nextjs.org/', desc: 'React全栈框架' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, url: 'https://tailwindcss.com/', desc: '原子化CSS框架' },
      { name: 'Vite', icon: SiVite, url: 'https://vitejs.dev/', desc: '新一代前端构建工具' },
      { name: 'Ant Design', icon: SiAntdesign, url: 'https://ant.design/', desc: '企业级React组件库' },
      { name: 'Nginx', icon: SiNginx, url: 'https://nginx.org/', desc: '高性能Web服务器' },
    ]
  },
  {
    group: '数据库与数据科学',
    items: [
      { name: 'MySQL', icon: SiMysql, url: 'https://www.mysql.com/', desc: '流行的关系型数据库' },
      { name: 'PostgreSQL', icon: SiPostgresql, url: 'https://www.postgresql.org/', desc: '强大的开源数据库' },
      { name: 'MongoDB', icon: SiMongodb, url: 'https://www.mongodb.com/', desc: 'NoSQL数据库' },
      { name: 'Redis', icon: SiRedis, url: 'https://redis.io/', desc: '高性能缓存数据库' },
      { name: 'SQLite', icon: SiSqlite, url: 'https://www.sqlite.org/', desc: '轻量级数据库' },
      { name: 'Navicat', icon: SiDbeaver, url: 'https://www.navicat.com/', desc: '数据库管理工具' },
      { name: 'DBeaver', icon: SiDbeaver, url: 'https://dbeaver.io/', desc: '开源数据库管理' },
      { name: 'Anaconda', icon: SiAnaconda, url: 'https://www.anaconda.com/', desc: '数据科学Python发行版' },
      { name: 'Jupyter', icon: SiJupyter, url: 'https://jupyter.org/', desc: '交互式笔记本' },
      { name: 'TensorFlow', icon: SiTensorflow, url: 'https://www.tensorflow.org/', desc: '深度学习框架' },
      { name: 'PyTorch', icon: SiPytorch, url: 'https://pytorch.org/', desc: '深度学习框架' },
      { name: 'Keras', icon: SiKeras, url: 'https://keras.io/', desc: '神经网络库' },
      { name: 'Scikit-learn', icon: SiScikitlearn, url: 'https://scikit-learn.org/', desc: '机器学习库' },
      { name: 'Colab', icon: SiGooglecolab, url: 'https://colab.research.google.com/', desc: '云端数据科学平台' },
      { name: 'Pandas', icon: SiPandas, url: 'https://pandas.pydata.org/', desc: 'Python数据分析' },
      { name: 'NumPy', icon: SiNumpy, url: 'https://numpy.org/', desc: 'Python科学计算' },
      { name: 'Elasticsearch', icon: SiElastic, url: 'https://www.elastic.co/', desc: '搜索引擎数据库' },
    ]
  },
  {
    group: '算法与竞赛',
    items: [
      { name: 'LeetCode', icon: SiLeetcode, url: 'https://leetcode.cn/', desc: '算法刷题平台' },
      { name: 'Codeforces', icon: SiCodeforces, url: 'https://codeforces.com/', desc: '国际算法竞赛平台' },
      { name: '牛客网', icon: SiLeetcode, url: 'https://www.nowcoder.com/', desc: '国内算法/面试平台' },
      { name: 'VisuAlgo', icon: SiLeetcode, url: 'https://visualgo.net/', desc: '算法可视化学习' },
      { name: '洛谷', icon: SiLeetcode, url: 'https://www.luogu.com.cn/', desc: '国内算法竞赛平台' },
      { name: 'AcWing', icon: SiLeetcode, url: 'https://www.acwing.com/', desc: '算法学习平台' },
      { name: 'CodeChef', icon: SiLeetcode, url: 'https://www.codechef.com/', desc: '国际算法竞赛平台' },
      { name: 'AtCoder', icon: SiLeetcode, url: 'https://atcoder.jp/', desc: '日本算法竞赛平台' },
      { name: 'Topcoder', icon: SiLeetcode, url: 'https://www.topcoder.com/', desc: '国际算法竞赛平台' },
      { name: 'HackerRank', icon: SiLeetcode, url: 'https://www.hackerrank.com/', desc: '编程技能评估平台' },
      { name: 'HackerEarth', icon: SiLeetcode, url: 'https://www.hackerearth.com/', desc: '编程竞赛平台' },
      { name: 'Codewars', icon: SiCodewars, url: 'https://www.codewars.com/', desc: '编程挑战修炼平台' },
      { name: 'LintCode', icon: SiLintcode, url: 'https://www.lintcode.com/', desc: '企业级算法题库' },
      { name: 'VJudge', icon: SiLeetcode, url: 'https://vjudge.net/', desc: 'OJ 聚合刷题' },
      { name: '蓝桥云课', icon: SiLeetcode, url: 'https://www.lanqiao.cn/', desc: '蓝桥杯练习与课程' },
      { name: 'PTA 拼题A', icon: SiLeetcode, url: 'https://pintia.cn/', desc: '高校编程测评平台' },
      { name: 'HDU OJ', icon: SiLeetcode, url: 'http://acm.hdu.edu.cn/', desc: '经典算法 OJ' },
      { name: 'Project Euler', icon: SiStarz, url: 'https://projecteuler.net/', desc: '数学编程挑战' },
      { name: '信息学奥赛一本通', icon: SiLeetcode, url: 'http://ybt.ssoier.cn:8088/', desc: '信奥 OJ 题库' },
      { name: '青岛大学 OJ', icon: SiLeetcode, url: 'https://qduoj.com/', desc: '开源在线评测' },
      { name: '数据结构可视化', icon: SiStarz, url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html', desc: '数据结构动画演示' },
    ]
  },
  {
    group: '网络与安全',
    items: [
      { name: 'Wireshark', icon: SiWireshark, url: 'https://www.wireshark.org/', desc: '网络抓包分析' },
      { name: 'Postman', icon: SiJsfiddle, url: 'https://www.postman.com/', desc: 'API测试工具' },
      { name: 'Burp Suite', icon: SiBurpsuite, url: 'https://portswigger.net/burp', desc: '安全测试平台' },
      { name: 'Nmap', icon: SiMamp, url: 'https://nmap.org/', desc: '端口扫描工具' },
      { name: 'Kali Linux', icon: SiKagi, url: 'https://www.kali.org/', desc: '渗透测试系统' },
      { name: 'OpenSSL', icon: SiOpenssl, url: 'https://www.openssl.org/', desc: '加密工具' },
      { name: 'Fiddler', icon: SiJsfiddle, url: 'https://www.telerik.com/fiddler', desc: '网络调试代理' },
      { name: 'Charles', icon: SiJsfiddle, url: 'https://www.charlesproxy.com/', desc: '网络调试代理' },
      { name: 'OWASP ZAP', icon: SiJsfiddle, url: 'https://owasp.org/www-project-zap/', desc: '开源安全测试工具' },
      { name: 'Metasploit', icon: SiJsfiddle, url: 'https://www.metasploit.com/', desc: '渗透测试框架' },
      { name: 'Shodan', icon: SiJsfiddle, url: 'https://www.shodan.io/', desc: '网络设备搜索引擎' },
      { name: 'VirusTotal', icon: SiVirustotal, url: 'https://www.virustotal.com/', desc: '文件/网址病毒扫描' },
      { name: 'HackerOne', icon: SiHackerone, url: 'https://www.hackerone.com/', desc: '漏洞赏金平台' },
      { name: 'OWASP', icon: SiOwasp, url: 'https://owasp.org/', desc: 'Web安全开放社区' },
    ]
  },
  {
    group: '操作系统与虚拟化',
    items: [
      { name: 'Linux', icon: SiLinux, url: 'https://www.kernel.org/', desc: '开源操作系统' },
      { name: 'Ubuntu', icon: SiUbuntu, url: 'https://ubuntu.com/', desc: '主流Linux发行版' },
      { name: 'CentOS', icon: SiCentos, url: 'https://www.centos.org/', desc: '企业级Linux' },
      { name: 'Fedora', icon: SiFedora, url: 'https://getfedora.org/', desc: '社区Linux发行版' },
      { name: 'Xshell', icon: SiShell, url: 'https://www.netsarang.com/zh/xshell/', desc: 'SSH终端' },
      { name: 'MobaXterm', icon: SiMobx, url: 'https://mobaxterm.mobatek.net/', desc: '多功能终端' },
      { name: 'VMware', icon: SiVmware, url: 'https://www.vmware.com/', desc: '虚拟机软件' },
      { name: 'VirtualBox', icon: SiVirtualbox, url: 'https://www.virtualbox.org/', desc: '开源虚拟机' },
      { name: 'Docker', icon: SiDocker, url: 'https://www.docker.com/', desc: '容器化平台' },
      { name: 'Kubernetes', icon: SiKubernetes, url: 'https://kubernetes.io/', desc: '容器编排系统' },
      { name: 'Debian', icon: SiDebian, url: 'https://www.debian.org/', desc: '稳定Linux发行版' },
      { name: 'Arch Linux', icon: SiArchlinux, url: 'https://archlinux.org/', desc: '滚动更新Linux' },
      { name: 'QEMU', icon: SiQemu, url: 'https://www.qemu.org/', desc: '开源模拟器' },
    ]
  },
  {
    group: '硬件与仿真',
    items: [
      { name: 'Arduino IDE', icon: SiArduino, url: 'https://www.arduino.cc/en/software', desc: '嵌入式开发' },
      { name: 'Keil', icon: SiLightburn, url: 'https://www.keil.com/', desc: '单片机开发' },
      { name: 'STM32CubeMX', icon: SiStmicroelectronics, url: 'https://www.st.com/en/development-tools/stm32cubemx.html', desc: 'STM32配置工具' },
      { name: 'Proteus', icon: SiProteus, url: 'https://www.labcenter.com/', desc: '电路仿真' },
      { name: 'Multisim', icon: SiMultisim, url: 'https://www.ni.com/zh-cn/support/downloads/software-products/download.multisim.html', desc: '电路仿真' },
      { name: 'Logisim', icon: SiLogitech, url: 'http://www.cburch.com/logisim/', desc: '数字电路仿真' },
      { name: 'Raspberry Pi', icon: SiRaspberrypi, url: 'https://www.raspberrypi.org/', desc: '树莓派开发' },
      { name: 'Altium Designer', icon: SiAltiumdesigner, url: 'https://www.altium.com/altium-designer', desc: 'PCB设计工具' },
      { name: 'MATLAB', icon: SiPython, url: 'https://www.mathworks.com/products/matlab.html', desc: '数学建模与仿真' },
      { name: 'LabVIEW', icon: SiVirtualbox, url: 'https://www.ni.com/en-us/shop/labview.html', desc: '图形化编程环境' },
      { name: 'PlatformIO', icon: SiPlatformio, url: 'https://platformio.org/', desc: '跨平台嵌入式开发' },
      { name: 'KiCad', icon: SiKicad, url: 'https://www.kicad.org/', desc: '开源PCB设计' },
      { name: 'ESP32', icon: SiEspressif, url: 'https://www.espressif.com/', desc: '乐鑫物联网芯片' },
    ]
  },
  {
    group: '文档与效率',
    items: [
      { name: 'Typora', icon: SiTypeorm, url: 'https://typora.io/', desc: 'Markdown编辑器' },
      { name: 'Notion', icon: SiNotion, url: 'https://www.notion.so/', desc: '知识管理平台' },
      { name: 'Obsidian', icon: SiMdbook, url: 'https://obsidian.md/', desc: '本地知识库' },
      { name: 'XMind', icon: SiMdbook, url: 'https://xmind.cn/', desc: '思维导图' },
      { name: 'Draw.io', icon: SiMdbook, url: 'https://app.diagrams.net/', desc: '流程图/架构图' },
      { name: 'Markdown', icon: SiMarkdown, url: 'https://markdown.com.cn/', desc: '标记语言' },
      { name: 'Figma', icon: SiFigma, url: 'https://www.figma.com/', desc: 'UI设计工具' },
      { name: 'GitBook', icon: SiGitlab, url: 'https://www.gitbook.com/', desc: '文档协作平台' },
      { name: 'Confluence', icon: SiGitlab, url: 'https://www.atlassian.com/software/confluence', desc: '团队协作平台' },
      { name: 'Slack', icon: SiRocket, url: 'https://slack.com/', desc: '团队沟通工具' },
      { name: 'Microsoft Teams', icon: SiWebex, url: 'https://www.microsoft.com/en-us/microsoft-teams', desc: '团队协作工具' },
      { name: 'Discord', icon: SiRocket, url: 'https://discord.com/', desc: '社区沟通工具' },
      { name: 'LaTeX', icon: SiLatex, url: 'https://www.latex-project.org/', desc: '学术论文排版' },
      { name: 'Zotero', icon: SiZotero, url: 'https://www.zotero.org/', desc: '文献管理工具' },
      { name: 'Miro', icon: SiMiro, url: 'https://miro.com/', desc: '在线协作白板' },
      { name: 'Apifox', icon: SiApifox, url: 'https://apifox.com/', desc: 'API调试/文档/测试一体化' },
    ]
  },
  {
    group: '学习网站',
    items: [
      { name: 'B站', icon: SiBilibili, url: 'https://www.bilibili.com/', desc: '海量编程视频教程' },
      { name: '菜鸟教程', icon: SiSparkar, url: 'https://www.runoob.com/', desc: '编程基础入门教程' },
      { name: 'fast.ai', icon: SiPytorch, url: 'https://www.fast.ai/', desc: '实用深度学习课程' },
      { name: 'Kaggle', icon: SiKaggle, url: 'https://www.kaggle.com/', desc: '数据科学竞赛社区' },
      { name: 'MIT OpenCourseWare', icon: SiSparkar, url: 'https://ocw.mit.edu/', desc: 'MIT 公开课' },
      { name: 'w3school', icon: SiSparkar, url: 'https://www.w3school.com.cn/', desc: 'Web 中文教程' },
      { name: 'w3schools', icon: SiSparkar, url: 'https://www.w3schools.com/', desc: 'Web 英文教程' },
      { name: '书栈网', icon: SiBookstack, url: 'https://www.bookstack.cn/', desc: '开源技术文档书店' },
      { name: '学习强国', icon: SiSparkar, url: 'https://www.xuexi.cn/', desc: '综合学习平台' },
      { name: '慕课网', icon: SiSparkar, url: 'https://www.imooc.com/', desc: 'IT 技能在线学习' },
      { name: 'Python 教程', icon: SiSparkar, url: 'http://c.biancheng.net/python/', desc: 'Python 入门详细教程' },
      { name: 'freeCodeCamp', icon: SiFreecodecamp, url: 'https://www.freecodecamp.org/chinese/', desc: '免费交互式编程课程' },
      { name: 'MDN Web Docs', icon: SiMdnwebdocs, url: 'https://developer.mozilla.org/zh-CN/', desc: 'Web 技术权威文档' },
      { name: '知乎', icon: SiZhihu, url: 'https://www.zhihu.com/', desc: '问答与知识分享社区' },
      { name: 'CSDN', icon: SiCsdn, url: 'https://www.csdn.net/', desc: '中文技术博客社区' },
      { name: '掘金', icon: SiJuejin, url: 'https://juejin.cn/', desc: '开发者技术文章社区' },
      { name: 'Stack Overflow', icon: SiStackoverflow, url: 'https://stackoverflow.com/', desc: '英文编程问答' },
      { name: 'GeeksforGeeks', icon: SiGeeksforgeeks, url: 'https://www.geeksforgeeks.org/', desc: '算法与数据结构学习' },
      { name: '中国大学MOOC', icon: SiKhanacademy, url: 'https://www.icourse163.org/', desc: '高校公开课平台' },
      { name: 'Coursera', icon: SiCoursera, url: 'https://www.coursera.org/', desc: '国际大学在线课程' },
      { name: 'Udemy', icon: SiUdemy, url: 'https://www.udemy.com/', desc: '综合在线课程平台' },
    ]
  },
  {
    group: 'AI Skills 技能库',
    items: [
      { name: 'finesse-ui', icon: Palette, url: 'https://github.com/mouse-lin/finesse-skill', desc: '后台/工作台/H5/苹果风高质感前端设计与定向精修工作流' },
      { name: 'ui-ux-pro-max', icon: Sparkles, url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill', desc: '内置 80 套风格、194 配色与 74 字体配对的本地设计知识库' },
      { name: 'taste-skill', icon: Eye, url: 'https://github.com/Leonxlnx/taste-skill', desc: '专治“AI 模板感”的官网审美与浏览器一致性验收规范' },
      { name: 'motionsites', icon: Film, url: 'https://github.com/motionsites-ai/claude-skill', desc: '电影级官网、Hero 首屏、3D/WebGL 与视差滚动落地页方案' },
      { name: 'awesome-design-md', icon: Layers, url: 'https://github.com/VoltAgent/awesome-design-md', desc: '84 套 Apple、Linear、Stripe、Vercel 等大厂逆向 DESIGN.md 设计系统' },
      { name: 'stitch-skills', icon: Wand2, url: 'https://github.com/google-labs-code/stitch-skills', desc: 'Google Stitch 提示词强化、提取 DESIGN.md 与导出静态 HTML 套件' },
      { name: 'shadcn-ui', icon: LayoutGrid, url: 'https://github.com/shadcn-ui/ui', desc: 'React + Tailwind 下的 shadcn/ui 组件选型与主题定制指南' },
      { name: 'emilkowalski/skills', icon: MousePointerClick, url: 'https://github.com/emilkowalski/skills', desc: 'UI 微交互物理手感、手势拖拽、缓动曲线与动效审查/做减法' },
      { name: 'gsap-skills', icon: Activity, url: 'https://github.com/greensock/gsap-skills', desc: 'GSAP 官方时间轴、ScrollTrigger 滚动视差与 React useGSAP() 规范' },
      { name: 'chaojifeng-video-design', icon: Clapperboard, url: 'https://github.com/mileson/chaojifeng-video-design', desc: '中文抖音科普/口播视频全流程，含 59 套视觉风格包与成片工具' },
      { name: 'hyperframes', icon: Play, url: 'https://github.com/heygen-com/hyperframes', desc: 'HeyGen 开源的轻量 HTML+CSS+GSAP 代码视频与参考视频复刻框架' },
      { name: 'remotion-skills', icon: Video, url: 'https://github.com/remotion-dev/skills', desc: 'Remotion 官方 React+TS 代码视频与动态关键词高亮字幕规范' },
      { name: 'CCFA-Skills', icon: GraduationCap, url: 'https://github.com/mikubaka88/CCFA-Skills', desc: 'CCF-A 顶会科研全周期助手（选题、调研、实验、写作、绘图、审稿与 Rebuttal）' },
      { name: 'anti-defensive-writing', icon: PenTool, url: 'https://github.com/Adkid-Zephyr/anti-defensive-writing-Skill', desc: '去除论文与文档中“心虚/过度免责”的防御性 AI 腔' },
      { name: 'superpowers', icon: ShieldCheck, url: 'https://github.com/obra/superpowers', desc: '强工程纪律开发工作流（头脑风暴、写计划、系统排错、代码审查与实测验收）' },
      { name: 'anthropics/skills', icon: Blocks, url: 'https://github.com/anthropics/skills', desc: 'Anthropic 官方工具集（MCP 开发、PPTX 制作、Skill 创建与 Playwright 前端测试）' },
      { name: 'planning-with-files', icon: ListChecks, url: 'https://github.com/OthmanAdi/planning-with-files', desc: '用本地 Markdown 文件做长任务持久化记忆与进度跟踪' },
      { name: 'caveman', icon: Zap, url: 'https://github.com/JuliusBrussee/caveman', desc: '极简无废话回答模式，大幅节省 Token' },
      { name: 'ponytail', icon: Minimize2, url: 'https://github.com/DietrichGebert/ponytail', desc: '懒人高级工程师模式，强制最小改动、拒绝过度设计' },
      { name: 'code-simplifier', icon: Scissors, url: 'https://github.com/anthropics/claude-plugins-official', desc: '不改功能的前提下精简重构刚修改的代码' },
      { name: 'hatch-pet', icon: Smile, url: 'https://github.com/openai/skills', desc: 'OpenAI 官方 Codex 动画桌宠制作与雪碧图打包工具' },
    ]
  },
];

/* 分组竖杠配色：固定映射保证各组颜色互异，未登记的分组走哈希兜底 */
const GROUP_BAR_COLORS: Record<string, string> = {
  'AI 工具': '#6366f1',
  '编程开发': '#0ea5e9',
  '数据库与数据科学': '#10b981',
  '算法与竞赛': '#f59e0b',
  '网络与安全': '#ef4444',
  '操作系统与虚拟化': '#8b5cf6',
  '硬件与仿真': '#14b8a6',
  '文档与效率': '#ec4899',
  'AI Skills 技能库': '#D4AD72',
};

const FALLBACK_BAR_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

/* 默认文件夹布局（左侧目录展开时：每行 8 列） */
const DEFAULT_FOLDER_SIZES_EXPANDED: Record<string, { k: number; r: number }> = {
  'AI 工具': { k: 5, r: 3 },
  '编程开发': { k: 1, r: 3 },
  '数据库与数据科学': { k: 2, r: 3 },
  '算法与竞赛': { k: 5, r: 2 },
  '网络与安全': { k: 3, r: 2 },
  '操作系统与虚拟化': { k: 4, r: 2 },
  '硬件与仿真': { k: 4, r: 2 },
  '文档与效率': { k: 3, r: 2 },
  '学习网站': { k: 5, r: 2 },
  'AI Skills 技能库': { k: 8, r: 2 },
};

/* 默认文件夹布局（左侧目录收缩时：每行 10 列，三行对齐） */
const DEFAULT_FOLDER_SIZES_COLLAPSED: Record<string, { k: number; r: number }> = {
  'AI 工具': { k: 5, r: 3 },
  '编程开发': { k: 3, r: 3 },
  '数据库与数据科学': { k: 2, r: 3 },
  '算法与竞赛': { k: 5, r: 2 },
  '网络与安全': { k: 2, r: 2 },
  '操作系统与虚拟化': { k: 3, r: 2 },
  '硬件与仿真': { k: 2, r: 2 },
  '文档与效率': { k: 3, r: 2 },
  '学习网站': { k: 5, r: 2 },
  'AI Skills 技能库': { k: 10, r: 2 },
};

function groupBarColor(group: string): string {
  const mapped = GROUP_BAR_COLORS[group];
  if (mapped) return mapped;
  let h = 0;
  for (let i = 0; i < group.length; i++) h = (h * 31 + group.charCodeAt(i)) % 997;
  return FALLBACK_BAR_COLORS[h % FALLBACK_BAR_COLORS.length];
}

const brandColors: { [key: string]: string } = {  'VS Code': '#007ACC',
  'PyCharm': '#21D789',
  'IntelliJ IDEA': '#000000',
  'Eclipse': '#2C2255',
  'CLion': '#41B883',
  'GoLand': '#00ADD8',
  'PHPStorm': '#8E44AD',
  'WebStorm': '#00C3E6',
  'Dev-C++': '#4D89F9',
  'Xcode': '#1575F9',
  'Android Studio': '#3DDC84',
  'Notepad++': '#8ECC39',
  'Vim': '#019733',
  'Git': '#F05032',
  'GitHub': '#181717',
  'Gitee': '#C71D23',
  'Node.js': '#339933',
  'Python': '#3776AB',
  'Java': '#007396',
  'Go': '#00ADD8',
  'PHP': '#777BB4',
  'C++': '#00599C',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'React': '#61DAFB',
  'Vue': '#42B883',
  'Webpack': '#8DD6F9',
  'Babel': '#F9DC3E',
  'CMake': '#064F8C',
  'Gradle': '#02303A',
  'Spring': '#6DB33F',
  'Flutter': '#02569B',
  'Dart': '#0175C2',
  'MySQL': '#4479A1',
  'PostgreSQL': '#336791',
  'MongoDB': '#47A248',
  'Redis': '#DC382D',
  'SQLite': '#003B57',
  'Navicat': '#2699FB',
  'DBeaver': '#372923',
  'Anaconda': '#44A833',
  'Jupyter': '#F37626',
  'TensorFlow': '#FF6F00',
  'PyTorch': '#EE4C2C',
  'Keras': '#D00000',
  'Scikit-learn': '#F7931E',
  'Colab': '#F9AB00',
  'LeetCode': '#FFA116',
  'Codeforces': '#1F8ACB',
  '牛客网': '#00B38A',
  'VisuAlgo': '#F48024',
  'Wireshark': '#1679A7',
  'Postman': '#FF6C37',
  'Burp Suite': '#FF8000',
  'Nmap': '#4682B4',
  'Kali Linux': '#268BEE',
  'OpenSSL': '#721412',
  'Fiddler': '#3C9CDC',
  'Linux': '#FCC624',
  'Ubuntu': '#E95420',
  'CentOS': '#262577',
  'Fedora': '#294172',
  'Xshell': '#D71920',
  'MobaXterm': '#2C2C2C',
  'VMware': '#607078',
  'VirtualBox': '#183A61',
  'Arduino IDE': '#00979D',
  'Keil': '#1A9FFF',
  'STM32CubeMX': '#03234B',
  'Proteus': '#1B1464',
  'Multisim': '#FFB400',
  'Logisim': '#E34F26',
  'Raspberry Pi': '#C51A4A',
  'Typora': '#3E3E3E',
  'Notion': '#000000',
  'Obsidian': '#483699',
  'XMind': '#C92C2C',
  'Draw.io': '#F08705',
  'Markdown': '#000000',
  'Figma': '#F24E1E',
  'ChatGPT': '#10A37F',
  '洛谷': '#FF7D00',
  'AcWing': '#00A1D6',
  'CodeChef': '#5B4638',
  'AtCoder': '#1E88E5',
  'Topcoder': '#FF6600',
  'HackerRank': '#2EC866',
  'HackerEarth': '#2C3454',
  'Charles': '#4B8BF5',
  'OWASP ZAP': '#005571',
  'Metasploit': '#990000',
  'Shodan': '#FD6925',
  'Altium Designer': '#0098D4',
  'MATLAB': '#0076A8',
  'LabVIEW': '#FF9900',
  'GitBook': '#3884FF',
  'Confluence': '#172B4D',
  'Slack': '#4A154B',
  'Microsoft Teams': '#6264A7',
  'Discord': '#7289DA',
  'DeepSeek': '#4D6BFE',
  'Kimi': '#141414',
  '豆包': '#3B82F6',
  '通义千问': '#6236FF',
  '文心一言': '#2932E1',
  '智谱清言': '#3859FF',
  '讯飞星火': '#FF3B30',
  '腾讯元宝': '#0052D9',
  'Claude': '#D97757',
  'Gemini': '#4285F4',
  'Grok': '#000000',
  'GitHub Copilot': '#181717',
  'Cursor': '#171717',
  'Windsurf': '#27CE85',
  'v0': '#171717',
  'Perplexity': '#20808D',
  'Mistral': '#FA500F',
  'Hugging Face': '#FFD21E',
  'Meta AI': '#0866FF',
  'Ollama': '#656A70',
  'NotebookLM': '#1A73E8',
  '秘塔AI搜索': '#4E6EF2',
  '扣子': '#2563EB',
  '海螺AI': '#FF5A3C',
  '即梦AI': '#6C5CE7',
  'DeepL': '#0F2B46',
  'Poe': '#5D3BC0',
  'Suno': '#F8A256',
  'Gamma': '#8B5CF6',
  'LangChain': '#1C3C3C',
  'Canva': '#00C4CC',
  'Rust': '#DEA584',
  'Kotlin': '#7F52FF',
  'Swift': '#F05138',
  '.NET': '#512BD4',
  'Next.js': '#000000',
  'Tailwind CSS': '#06B6D4',
  'Vite': '#646CFF',
  'Ant Design': '#1677FF',
  'Nginx': '#009639',
  'Pandas': '#150458',
  'NumPy': '#013243',
  'Elasticsearch': '#005571',
  'Codewars': '#B1361E',
  'VirusTotal': '#394EFF',
  'HackerOne': '#494649',
  'OWASP': '#54626F',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'Debian': '#A81D33',
  'Arch Linux': '#1793D1',
  'QEMU': '#FF6600',
  'PlatformIO': '#F5822A',
  'KiCad': '#314CB0',
  'ESP32': '#E7352C',
  'LaTeX': '#008080',
  'Zotero': '#CC2936',
  'Miro': '#FFD02F',
  'Apifox': '#E8433F',
  'LintCode': '#007AC1',
  '蓝桥云课': '#2B7DE9',
  'VJudge': '#2E6FD8',
  'PTA 拼题A': '#4A90D9',
  'HDU OJ': '#2E86AB',
  'Project Euler': '#7D3C98',
  'B站': '#FB7299',
  '菜鸟教程': '#16A34A',
  'freeCodeCamp': '#0A0A23',
  'MDN Web Docs': '#000000',
  '知乎': '#0084FF',
  'CSDN': '#FC5531',
  '掘金': '#1E80FF',
  'Stack Overflow': '#F58025',
  'GeeksforGeeks': '#0F9D58',
  '中国大学MOOC': '#14BF96',
  'Coursera': '#0056D2',
  'Udemy': '#A435F0',
  '飞桨 AI Studio': '#2563EB',
  'Google AI': '#4285F4',
  'DeepLearning.AI': '#7C3AED',
  '信息学奥赛一本通': '#1667C9',
  '青岛大学 OJ': '#27AE60',
  '数据结构可视化': '#8E44AD',
  'fast.ai': '#EE4C2C',
  'Kaggle': '#20BEFF',
  'MIT OpenCourseWare': '#A31F34',
  'w3school': '#0C969C',
  'w3schools': '#054DA7',
  '书栈网': '#3B82F6',
  '学习强国': '#E60012',
  '慕课网': '#F08519',
  'Python 教程': '#3776AB',
  'finesse-ui': '#D4AD72',
  'ui-ux-pro-max': '#8B5CF6',
  'taste-skill': '#EC4899',
  'motionsites': '#6366F1',
  'awesome-design-md': '#0EA5E9',
  'stitch-skills': '#3B82F6',
  'shadcn-ui': '#18181B',
  'emilkowalski/skills': '#F97316',
  'gsap-skills': '#88CE02',
  'chaojifeng-video-design': '#EF4444',
  'hyperframes': '#14B8A6',
  'remotion-skills': '#2563EB',
  'CCFA-Skills': '#B45309',
  'anti-defensive-writing': '#10B981',
  'superpowers': '#059669',
  'anthropics/skills': '#D97757',
  'planning-with-files': '#0284C7',
  'caveman': '#F59E0B',
  'ponytail': '#64748B',
  'code-simplifier': '#7C3AED',
  'hatch-pet': '#FB7185',
};

export default function Home() {
  const { data: session, status } = useAuth();
  const { collapsed } = useSidebar();
  const locale = useLocale();
  const t = UI_DICT[locale].home;
  const [isDark, setIsDark] = useState(false);
  const [selectedArsenalGroup, setSelectedArsenalGroup] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [arsenalExpanded, setArsenalExpanded] = useState(false);

  useEffect(() => {
    const syncDark = () => setIsDark(document.body.classList.contains('dark'));
    syncDark();
    const observer = new MutationObserver(syncDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('partjava-settings-change', syncDark);
    return () => {
      observer.disconnect();
      window.removeEventListener('partjava-settings-change', syncDark);
    };
  }, []);
  const [achievementProgress, setAchievementProgress] = useState<{ earned: number; total: number } | null>(null);
  const [platformStats, setPlatformStats] = useState<{
    users: number | null;
    notes: number | null;
    studyHours: number | null;
    challenges: number;
  }>({ users: null, notes: null, studyHours: null, challenges: 215 });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/stats/platform')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json || cancelled) return;
        const d = json.data ?? json;
        setPlatformStats({
          users: typeof d.users === 'number' ? d.users : null,
          notes: typeof d.notes === 'number' ? d.notes : null,
          studyHours: typeof d.totalStudyTime === 'number' ? Math.floor(d.totalStudyTime / 3600) : null,
          challenges: typeof d.challenges === 'number' && d.challenges > 0 ? d.challenges : 215,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const [folderConfigsExpanded, setFolderConfigsExpanded] = useState<Record<string, { k: number; r: number }>>({});
  const [folderConfigsCollapsed, setFolderConfigsCollapsed] = useState<Record<string, { k: number; r: number }>>({});
  const [previewGroup, setPreviewGroup] = useState<string | null>(null);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [resizing, setResizing] = useState<string | null>(null);
  const resizeStart = useRef({ x: 0, y: 0, k: 4, r: 2, group: '' });
  const toolsContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerW, setContainerW] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const activeDefaultSizes = collapsed ? DEFAULT_FOLDER_SIZES_COLLAPSED : DEFAULT_FOLDER_SIZES_EXPANDED;
  const activeFolderConfigs = collapsed ? folderConfigsCollapsed : folderConfigsExpanded;

  useEffect(() => {
    if (!arsenalExpanded) return;
    const el = toolsContainerRef.current;
    if (!el) return;
    const measure = () => setContainerW(el.clientWidth);
    measure();
    const rafId = requestAnimationFrame(measure);
    // 持续监听容器尺寸变化（侧边栏收起/展开、窗口缩放都会触发）
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [arsenalExpanded]);

  useEffect(() => {
    try {
      setFolderConfigsExpanded(JSON.parse(localStorage.getItem('folder_sizes_expanded_v2') || '{}'));
      setFolderConfigsCollapsed(JSON.parse(localStorage.getItem('folder_sizes_collapsed_v2') || '{}'));
    } catch {}
  }, []);

  const startResize = (group: string, clientX: number, clientY: number) => {
    if (isMobile) return;
    const start = activeFolderConfigs[group] || activeDefaultSizes[group] || { k: 4, r: 2 };
    resizeStart.current = { x: clientX, y: clientY, k: start.k, r: start.r, group };
    setResizing(group);
  };

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = e.touches ? e.touches[0].clientY : (e as MouseEvent).clientY;
      if (e.touches) e.preventDefault();
      const g = resizeStart.current;
      const nk = Math.min(Math.max(g.k + Math.round((x - g.x) / 146), 1), 10);
      const nr = Math.min(Math.max(g.r + Math.round((y - g.y) / 146), 1), 8);
      if (collapsed) {
        setFolderConfigsCollapsed(prev => {
          const next = { ...prev, [g.group]: { k: nk, r: nr } };
          try { localStorage.setItem('folder_sizes_collapsed_v2', JSON.stringify(next)); } catch {}
          return next;
        });
      } else {
        setFolderConfigsExpanded(prev => {
          const next = { ...prev, [g.group]: { k: nk, r: nr } };
          try { localStorage.setItem('folder_sizes_expanded_v2', JSON.stringify(next)); } catch {}
          return next;
        });
      }
    };
    const onUp = () => setResizing(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as any, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [resizing, collapsed]);


  // 加载成就进度
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetch('/api/user/stats', { credentials: 'include' })
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
        .then(json => {
          const data = json.data ?? json;
          if (data?.achievements) {
            setAchievementProgress({
              earned: Number(data.achievements.earned ?? 0),
              total: Number(data.achievements.total || 10),
            });
          }
        })
        .catch(err => console.warn('获取成就数据失败:', err.message));
    }
  }, [status, session]);

  // 过滤软件列表（支持关键词检索与分类胶囊速跳）
  const filteredSoftware = useMemo(() => {
    const base =
      selectedArsenalGroup === '全部'
        ? groupedSoftware
        : groupedSoftware.filter((g) => g.group === selectedArsenalGroup);
    if (!searchQuery) return base;

    const query = searchQuery.toLowerCase();
    return base
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query) ||
            group.group.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, selectedArsenalGroup]);

  // 天际线装箱：文件夹拖拽定行列，后面的文件夹自动填补空位（带灰金文件夹舒适间距，支持展开8列/收缩10列双默认布局）
  const layout = useMemo(() => {
    if (isMobile) {
      const width = containerW || 320;
      const itemSize = Math.max(1, (width - 32 - 10) / 2);
      return {
        height: 0,
        placed: filteredSoftware.map(group => ({
          group, cfg: { k: 2, r: 3, S: itemSize, ITEM_GAP: 10 },
          x: 0, y: 0, w: width, folderH: 0,
        })),
      };
    }
    const cw = containerW || (collapsed ? 1580 : 1340);
    const CELL = 4;
    const cells = Math.ceil(cw / CELL);
    const ITEM_GAP = 10; // 文件夹内部图标间距
    const FOLDER_PAD = 32; // 文件夹左右内边距总和 (16px * 2)
    const GAP_X = 16; // 文件夹之间横向间距
    const GAP_Y = 18; // 文件夹之间纵向间距
    // 自适应桌面图标尺寸：大屏保持 136px，若容器宽度略窄则微缩以确保展开8列/收缩10列一行能放下3个文件夹不折行
    const targetCols = collapsed ? 10 : 8;
    const maxFitS = Math.floor((cw - 3 * FOLDER_PAD - (targetCols - 3) * ITEM_GAP - 2 * GAP_X - 8) / targetCols);
    const S = cw >= 960 ? Math.min(136, Math.max(96, maxFitS)) : 136;
    const skyline: number[] = new Array(cells).fill(0);
    const placed: any[] = [];
    let height = 0;
    for (const group of filteredSoftware) {
      const cfg = activeFolderConfigs[group.group] || activeDefaultSizes[group.group] || { k: 4, r: 2 };
      const k = Math.min(Math.max(Math.round(Number(cfg.k)) || 4, 1), 10);
      const r = Math.min(Math.max(Math.round(Number(cfg.r)) || 2, 1), 8);
      const w = Math.min(cw, k * S + (k - 1) * ITEM_GAP + FOLDER_PAD);
      const shown = searchQuery ? group.items.length : Math.min(group.items.length, k * r);
      const rows = Math.max(1, Math.ceil(shown / k));
      // 文件夹内部包含标题栏(48px) + 上下内边距(32px) + 图标网格（全部按钮已收进标题栏右侧）
      const folderH = 32 + 48 + rows * S + (rows - 1) * ITEM_GAP;
      const totalH = folderH + GAP_Y;
      const wWithGapCells = Math.max(1, Math.ceil((w + GAP_X) / CELL));
      const wOnlyCells = Math.max(1, Math.ceil(w / CELL));
      let bestX = 0, bestH = Infinity;
      const maxStart = Math.max(0, cells - wOnlyCells);
      for (let x0 = 0; x0 <= maxStart; x0++) {
        let h = 0;
        for (let i = x0; i < Math.min(cells, x0 + wOnlyCells); i++) {
          h = Math.max(h, skyline[i]);
        }
        if (h < bestH) { bestH = h; bestX = x0; }
      }
      for (let i = bestX; i < Math.min(cells, bestX + wWithGapCells); i++) {
        skyline[i] = bestH + totalH;
      }
      height = Math.max(height, bestH + folderH);
      placed.push({ group, cfg: { ...cfg, k, r, S, ITEM_GAP }, x: bestX * CELL, y: bestH, w, folderH });
    }
    return { placed, height };
  }, [activeFolderConfigs, activeDefaultSizes, collapsed, containerW, filteredSoftware, searchQuery, isMobile]);


  const totalToolCount = useMemo(
    () => groupedSoftware.reduce((acc, g) => acc + g.items.length, 0),
    [],
  );
  const totalLessonCount = useMemo(
    () => Object.values(navigationItems).flat().reduce((acc, item) => acc + (item.subitems?.length || 1), 0),
    [],
  );
  const [hoveredFocus, setHoveredFocus] = useState<SanctuaryFocusTarget>(null);

  const arsenalShortcuts = useMemo(() => {
    const targets: Array<{ name: string; dotColor: string; fallbackUrl: string }> = [
      { name: 'ChatGPT', dotColor: '#10A37F', fallbackUrl: 'https://chatgpt.com/' },
      { name: 'Claude', dotColor: '#D97757', fallbackUrl: 'https://claude.ai/' },
      { name: 'VS Code', dotColor: '#007ACC', fallbackUrl: 'https://code.visualstudio.com/' },
      { name: 'PyTorch', dotColor: '#EE4C2C', fallbackUrl: 'https://pytorch.org/' },
      { name: 'LeetCode', dotColor: '#FFA116', fallbackUrl: 'https://leetcode.cn/' },
    ];
    const urlMap = new Map<string, string>();
    groupedSoftware.forEach((group) => {
      group.items.forEach((item) => urlMap.set(item.name, item.url));
    });
    return targets.map((t) => ({
      ...t,
      url: urlMap.get(t.name) || t.fallbackUrl,
    }));
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('unolgy_recent_tools') || '[]');
      if (Array.isArray(saved)) setRecentTools(saved.slice(0, 6));
    } catch {}
  }, []);

  const recordRecentTool = (name: string) => {
    setRecentTools((prev) => {
      const next = [name, ...prev.filter((item) => item !== name)].slice(0, 6);
      try {
        localStorage.setItem('unolgy_recent_tools', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toolLookup = useMemo(() => {
    const map = new Map<string, { name: string; url: string; color: string }>();
    groupedSoftware.forEach((group) => {
      group.items.forEach((item) => {
        map.set(item.name, {
          name: item.name,
          url: item.url,
          color: brandColors[item.name] || '#3B82F6',
        });
      });
    });
    return map;
  }, []);

  return (
    <div className={`${mobileStyles.page} min-h-[calc(100vh-70px)] flex flex-col justify-between`}>
      <div>
      {/* 第一屏：左清爽教程引导 + 右缩放嵌入 3D 数字书房 */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-1.5 pb-1.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
          <div className="lg:col-span-5 space-y-2">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-line-subtle shadow-sm text-xs font-medium text-brand-primary shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AD72]" />
                <span>{t.eyebrow}</span>
              </div>
              <span data-brand-meaning className="text-[11.5px] text-content-muted tracking-wide">
                {t.brandMeaning}
              </span>
            </div>

            <h1 className="font-display text-[28px] sm:text-[32px] xl:text-[34px] 2xl:text-[42px] font-bold text-content-primary leading-[1.28] tracking-tight">
              {t.titleLine1}
              <br />
              <span className="text-brand-primary whitespace-nowrap">{t.titleLine2}</span>
            </h1>

            <p className="text-sm sm:text-[14.5px] text-content-secondary leading-relaxed max-w-md">
              {t.subtitle}
            </p>

            <div className="pt-0.5 flex flex-wrap items-center gap-3">
              <Link
                href="/challenges"
                onMouseEnter={() => setHoveredFocus('lamp')}
                onMouseLeave={() => setHoveredFocus(null)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-hover text-content-inverse text-sm font-semibold shadow-sm transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/code/editor"
                onMouseEnter={() => setHoveredFocus('monitor')}
                onMouseLeave={() => setHoveredFocus(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-raised hover:bg-surface-muted text-content-primary border border-line-strong text-sm font-medium shadow-sm transition-[transform,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              >
                <Code2 className="w-4 h-4 text-brand-primary" />
                <span>{t.ctaSecondary}</span>
              </Link>
            </div>

            {/* 平台核心数据条：有实时统计时显示用户/笔记/时长/挑战，离线时平滑展示真实静态课程资产（绝不空留 ---） */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {platformStats.users !== null ? (
                <>
                  <Link
                    href="/profile"
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <Users className="w-3 h-3 text-brand-primary shrink-0" />
                      <span className="truncate">{t.statUsers}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {`${platformStats.users}+`}
                    </span>
                  </Link>

                  <Link
                    href="/notes"
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <FileText className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{t.statNotes}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {`${platformStats.notes ?? 0}+`}
                    </span>
                  </Link>

                  <Link
                    href="/profile"
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{t.statHours}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {`${platformStats.studyHours ?? 0}h`}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/code/editor?tab=visualizer"
                    onMouseEnter={() => setHoveredFocus('monitor')}
                    onMouseLeave={() => setHoveredFocus(null)}
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <Box className="w-3 h-3 text-brand-primary shrink-0" />
                      <span className="truncate">{t.statAlgos}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {ALGORITHM_REGISTRY.length}
                    </span>
                  </Link>

                  <Link
                    href="/study"
                    onMouseEnter={() => setHoveredFocus('book')}
                    onMouseLeave={() => setHoveredFocus(null)}
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <BookOpen className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{t.statChapters}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {totalLessonCount}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setArsenalExpanded(true)}
                    className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5 text-left"
                  >
                    <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                      <Wrench className="w-3 h-3 text-[#B88A44] shrink-0" />
                      <span className="truncate">{t.statTools}</span>
                    </div>
                    <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                      {totalToolCount}
                    </span>
                  </button>
                </>
              )}

              <Link
                href="/challenges"
                onMouseEnter={() => setHoveredFocus('lamp')}
                onMouseLeave={() => setHoveredFocus(null)}
                className="group rounded-xl bg-surface-raised border border-line-subtle px-2.5 py-1.5 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-sm transition-[transform,border-color,box-shadow] duration-150 active:scale-[0.97] flex items-center justify-between gap-1.5"
              >
                <div className="flex items-center gap-1 text-[11px] text-content-muted min-w-0">
                  <Trophy className="w-3 h-3 text-[#D4AD72] shrink-0" />
                  <span className="truncate">{t.statChallenges}</span>
                </div>
                <span className="font-code text-xs font-bold text-content-primary tabular-nums group-hover:text-brand-primary transition-colors shrink-0">
                  {`${platformStats.challenges}+`}
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SanctuaryHero embedded focusTarget={hoveredFocus} />
          </div>
        </div>
      </section>

      {/* 第二屏：三大核心学习模块（带动态演示与点击直达） */}
      <CoreEnginesShowcase challengesCount={platformStats.challenges} onHoverEngine={setHoveredFocus} />

      <div id="developer-arsenal" className={`${arsenalExpanded ? 'py-3 md:py-4' : 'pt-1 pb-1.5'} px-3 md:px-6`}>
        {/* 默认折叠的单行工具矩阵直达条（点击右侧按钮完整展开全部桌面文件夹） */}
        <div className={`max-w-[1440px] mx-auto px-1 sm:px-0 lg:px-2 ${arsenalExpanded ? 'mb-4' : 'mb-0'}`}>
          <div className="rounded-2xl bg-surface-raised border border-line-subtle shadow-sm px-4 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-0.5 rounded-md bg-[#0F1D33] text-[#D4AD72] text-[11px] font-mono font-bold tracking-wider uppercase shrink-0">
                ARSENAL
              </span>
              <span className="text-sm font-bold text-content-primary shrink-0">
                {t.arsenalTitle}
              </span>
              <span className="text-xs text-content-muted hidden sm:inline truncate">
                {t.arsenalDesc.replace('{count}', String(totalToolCount))}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {arsenalShortcuts.map((shortcut) => (
                <a
                  key={shortcut.name}
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line-subtle bg-surface-muted hover:bg-brand-soft px-2.5 py-1 text-xs font-medium text-content-secondary hover:text-content-primary transition-[transform,background-color,color] duration-150 active:scale-[0.96]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: shortcut.dotColor }}
                  />
                  <span>{shortcut.name}</span>
                </a>
              ))}

              <Link
                href="/tools/game"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AD72]/35 bg-[#D4AD72]/10 hover:bg-[#D4AD72]/20 px-2.5 py-1 text-xs font-medium text-content-primary transition-[transform,background-color] duration-150 active:scale-[0.96]"
                title="进入极客解压游戏中心（20 款原生编程小游戏）"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-[#D4AD72] shrink-0" />
                <span>{t.arcadeLabel}</span>
              </Link>

              <button
                type="button"
                data-arsenal-toggle
                onClick={() => setArsenalExpanded((v) => !v)}
                aria-expanded={arsenalExpanded}
                className="inline-flex items-center gap-1 ml-1 px-2 py-1 rounded-lg text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-hover hover:bg-brand-soft transition-[transform,color,background-color] duration-150 active:scale-[0.96] cursor-pointer"
              >
                <span>{arsenalExpanded ? t.collapseFolders : t.expandFolders}</span>
                {arsenalExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {arsenalExpanded && (
          <>
            {/* 双态桌面文件夹舞台（方向 A 通透玻璃工作台 + 分类胶囊 + 行内即时搜工具 + 最近打开 + 顶边微光 + 标题区全部按钮） */}
            <div
              data-arsenal-stage
              className="rounded-3xl p-4 md:p-6 border shadow-xl transition-colors"
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, #131720 0%, #191F2B 55%, #11151D 100%)'
                  : 'linear-gradient(145deg, #F8F9FB 0%, #FFFFFF 55%, #F2F4F8 100%)',
                borderColor: isDark ? 'rgba(212, 173, 114, 0.24)' : 'rgba(27, 59, 111, 0.14)',
              }}
            >
          <div
            className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b pb-4"
            style={{ borderColor: isDark ? 'rgba(242, 233, 220, 0.08)' : 'rgba(15, 29, 51, 0.08)' }}
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest mb-1.5"
                style={{
                  background: isDark ? 'rgba(212, 173, 114, 0.12)' : 'rgba(27, 59, 111, 0.08)',
                  color: isDark ? '#D4AD72' : '#1B3B6F',
                  border: isDark ? '1px solid rgba(212, 173, 114, 0.28)' : '1px solid rgba(27, 59, 111, 0.18)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? '#D4AD72' : '#1B3B6F' }} />
                <span>{t.expandedBadge}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: isDark ? '#F2E9DC' : '#0F1D33' }}>
                {t.expandedTitle}
              </h2>
              <p className="text-xs md:text-sm mt-1" style={{ color: isDark ? 'rgba(242, 233, 220, 0.62)' : '#42526B' }}>
                {t.expandedSub}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedArsenalGroup('全部');
                setSearchQuery('');
                setFolderConfigsExpanded({});
                setFolderConfigsCollapsed({});
                try {
                  localStorage.removeItem('folder_sizes_v2');
                  localStorage.removeItem('folder_sizes_expanded_v2');
                  localStorage.removeItem('folder_sizes_collapsed_v2');
                } catch {}
              }}
              className="flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full font-medium transition-[transform,background-color] duration-150 active:scale-[0.96]"
              style={{
                color: isDark ? '#D4AD72' : '#1B3B6F',
                background: isDark ? 'rgba(212, 173, 114, 0.12)' : 'rgba(27, 59, 111, 0.08)',
                border: isDark ? '1px solid rgba(212, 173, 114, 0.32)' : '1px solid rgba(27, 59, 111, 0.22)',
              }}
              title="恢复所有文件夹为默认大小"
            >
              {t.resetLayout}
            </button>
          </div>

          {/* 分类速跳过滤胶囊栏 + 舞台内即时搜工具输入框 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4" data-arsenal-filters>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedArsenalGroup('全部')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-[transform,background-color,color] duration-150 active:scale-[0.96] border ${
                  selectedArsenalGroup === '全部'
                    ? isDark
                      ? 'bg-[#D4AD72] text-[#0E1116] border-[#D4AD72] font-semibold'
                      : 'bg-[#1B3B6F] text-white border-[#1B3B6F] font-semibold'
                    : isDark
                    ? 'bg-white/[0.04] text-[#C5CBD6] border-white/10 hover:text-[#F2EDE4]'
                    : 'bg-white text-[#42526B] border-[#E3E7F0] hover:text-[#0F1D33]'
                }`}
              >
                {t.allGroups} ({totalToolCount})
              </button>
              {groupedSoftware.map((grp) => {
                const active = selectedArsenalGroup === grp.group;
                return (
                  <button
                    key={grp.group}
                    type="button"
                    onClick={() => setSelectedArsenalGroup(grp.group)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-[transform,background-color,color] duration-150 active:scale-[0.96] border ${
                      active
                        ? isDark
                          ? 'bg-[#D4AD72] text-[#0E1116] border-[#D4AD72] font-semibold'
                          : 'bg-[#1B3B6F] text-white border-[#1B3B6F] font-semibold'
                        : isDark
                        ? 'bg-white/[0.04] text-[#C5CBD6] border-white/10 hover:text-[#F2EDE4]'
                        : 'bg-white text-[#42526B] border-[#E3E7F0] hover:text-[#0F1D33]'
                    }`}
                  >
                    {grp.group} · {grp.items.length}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-56 shrink-0">
              <Search
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: isDark ? 'rgba(242, 233, 220, 0.45)' : '#64748B' }}
              />
              <input
                type="text"
                data-arsenal-search
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchToolsPlaceholder}
                className="w-full h-8 pl-8 pr-7 rounded-full text-xs border focus:outline-none transition-colors"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(242, 233, 220, 0.14)' : 'rgba(15, 29, 51, 0.12)',
                  color: isDark ? '#F2EDE4' : '#0F1D33',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="清除筛选"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center opacity-65 hover:opacity-100"
                  style={{ color: isDark ? '#F2EDE4' : '#0F1D33' }}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 最近打开直达条（点击任意工具后自动记录，最多 6 个） */}
          {recentTools.length > 0 && !searchQuery && (
            <div
              data-arsenal-recent
              className="mb-4 flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-2xl border"
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(27, 59, 111, 0.03)',
                borderColor: isDark ? 'rgba(242, 233, 220, 0.08)' : 'rgba(15, 29, 51, 0.07)',
              }}
            >
              <span
                className="text-[11px] font-medium mr-1 flex items-center gap-1"
                style={{ color: isDark ? '#D4AD72' : '#1B3B6F' }}
              >
                <Clock className="w-3 h-3" />
                {t.recentToolsLabel}
              </span>
              {recentTools.map((name) => {
                const meta = toolLookup.get(name);
                if (!meta) return null;
                return (
                  <a
                    key={name}
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordRecentTool(name)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors hover:brightness-110"
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(242, 233, 220, 0.12)' : 'rgba(15, 29, 51, 0.1)',
                      color: isDark ? '#E8E2D6' : '#0F1D33',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                    <span>{meta.name}</span>
                  </a>
                );
              })}
            </div>
          )}

          <div ref={toolsContainerRef} className={`${mobileStyles.tools} relative`} style={{ height: layout.placed.length ? layout.height : undefined }}>
            {filteredSoftware.length > 0 ? (
              layout.placed.map(({ group, cfg, x, y, w }) => {
                const isSearching = !!searchQuery;
                const visibleItems = isSearching ? group.items : group.items.slice(0, cfg.k * cfg.r);
                const hiddenCount = group.items.length - visibleItems.length;
                const barColor = groupBarColor(group.group);
                return (
                  <div
                    key={group.group}
                    className={`${mobileStyles.folder} absolute hover:z-20`}
                    style={{ left: x, top: y, width: w }}
                  >
                    {/* 桌面文件夹容器：顶边微光高亮 + 悬停氛围光 + 标题栏右置「全部 ↗」 + 右下角安静缩放标 */}
                    <div
                      className={`group/folder relative rounded-[24px] p-4 transition-all duration-200 ${
                        resizing === group.group ? 'ring-2 ring-[#D4AD72] shadow-2xl' : ''
                      }`}
                      style={{
                        background: isDark
                          ? 'linear-gradient(165deg, rgba(28, 34, 46, 0.92) 0%, rgba(19, 23, 32, 0.96) 100%)'
                          : 'linear-gradient(165deg, #FFFFFF 0%, #F7F8FB 100%)',
                        border: isDark
                          ? '1px solid rgba(242, 233, 220, 0.11)'
                          : '1px solid rgba(15, 29, 51, 0.09)',
                        boxShadow: isDark
                          ? '0 14px 34px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          : '0 10px 26px rgba(15, 29, 51, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                      }}
                    >
                      {/* 顶缘玻璃高光 + 悬停左侧品牌主题微光条 */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 inset-x-6 h-px rounded-full opacity-0 group-hover/folder:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, transparent 5%, ${barColor}B3 50%, transparent 95%)`,
                        }}
                      />

                      {/* 文件夹内部标题栏：左侧分类名与总数 + 右侧轻量「全部 XX ↗」胶囊 */}
                      <div
                        className="flex items-center justify-between gap-2 mb-3 pl-2.5 border-l-[3px] h-9"
                        style={{ borderLeftColor: barColor }}
                      >
                        <h2 className="flex items-center gap-2 text-base md:text-lg font-bold truncate min-w-0" style={{ color: isDark ? '#F2E9DC' : '#0F1D33' }}>
                          <span className="truncate">{group.group}</span>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              color: isDark ? '#D4AD72' : '#1B3B6F',
                              background: isDark ? 'rgba(212, 173, 114, 0.13)' : '#EEF2F8',
                              border: isDark ? '1px solid rgba(212, 173, 114, 0.28)' : '1px solid rgba(27, 59, 111, 0.16)',
                            }}
                          >
                            {group.items.length}
                          </span>
                        </h2>

                        {hiddenCount > 0 && (
                          <button
                            type="button"
                            onClick={() => setPreviewGroup(group.group)}
                            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition-[transform,background-color] duration-150 active:scale-[0.96] cursor-pointer"
                            style={{
                              color: isDark ? '#D4AD72' : '#1B3B6F',
                              background: isDark ? 'rgba(212, 173, 114, 0.1)' : 'rgba(27, 59, 111, 0.06)',
                              border: isDark ? '1px solid rgba(212, 173, 114, 0.24)' : '1px solid rgba(27, 59, 111, 0.16)',
                            }}
                            title="预览全部工具"
                          >
                            {t.allToolsBtn.replace('{count}', String(group.items.length))}
                          </button>
                        )}
                      </div>

                      {/* 桌面图标网格 */}
                      <div
                        className={`${mobileStyles.toolGrid} grid`}
                        style={{
                          gridTemplateColumns: `repeat(${cfg.k}, ${cfg.S}px)`,
                          gap: `${cfg.ITEM_GAP}px`,
                        }}
                      >
                        {visibleItems.map((item: any) => {
                          const Icon = item.icon;
                          const color = brandColors[item.name] || '#3B82F6';
                          return (
                            <ToolCard
                              key={item.name}
                              name={item.name}
                              icon={Icon}
                              url={item.url}
                              desc={item.desc}
                              color={color}
                              isDark={isDark}
                              onVisit={recordRecentTool}
                            />
                          );
                        })}
                      </div>

                      {!isSearching && !isMobile && (
                        <div
                          onMouseDown={(e) => { e.preventDefault(); startResize(group.group, e.clientX, e.clientY); }}
                          onTouchStart={(e) => { startResize(group.group, e.touches[0].clientX, e.touches[0].clientY); }}
                          title="拖动调整文件夹大小"
                          className="absolute bottom-2.5 right-2.5 z-20 w-3.5 h-3.5 cursor-nwse-resize transition-opacity opacity-20 group-hover/folder:opacity-75 hover:!opacity-100"
                          style={{ color: isDark ? '#D4AD72' : '#1B3B6F' }}
                        >
                          <svg viewBox="0 0 16 16" className="w-full h-full" fill="none">
                            <path d="M15 15H7M15 15V7M15 15L5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: isDark ? '#F2E9DC' : '#0F1D33' }}>
                  {t.emptySearchTitle}
                </h3>
                <p style={{ color: isDark ? 'rgba(242, 233, 220, 0.6)' : '#42526B' }}>{t.emptySearchSub}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-8 text-center text-content-muted text-xs md:text-sm">
          {t.feedbackNote}
        </div>
          </>
        )}
      </div>
      </div>

      {/* 网站合规备案与页脚 */}
      <SiteFooter className="!py-2.5" />

      {/* 工具分组预览弹窗 */}
      {previewGroup && (() => {
        const g = groupedSoftware.find(gr => gr.group === previewGroup);
        if (!g) return null;
        return (
          <ToolGroupPreview
            group={g.group}
            items={g.items}
            brandColors={brandColors}
            isDark={isDark}
            onVisit={recordRecentTool}
            onClose={() => setPreviewGroup(null)}
          />
        );
      })()}

      {/* 回到顶部按钮 */}
      <BackToTop />
      
    </div>
  );
}
