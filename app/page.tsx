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
  SiLatex, SiZotero, SiMiro, SiApifox
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { navigationItems } from './_shared/data/navigation';
import { useAuth } from '@shared/hooks/useAuth';
import HeroSection from './_shared/components/HeroSection';
import StatsSection from './_shared/components/StatsSection';
import ToolCard from './_shared/components/ToolCard';
import ToolGroupPreview from './_shared/components/ToolGroupPreview';
import BackToTop from './_shared/components/BackToTop';
import QuickSearch from './_shared/components/QuickSearch';
import InkWashDecoration from './_shared/components/InkWashDecoration';

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
];

/* 分组竖杠配色：固定映射保证 8 组颜色全不重复，未登记的分组走哈希兜底 */
const GROUP_BAR_COLORS: Record<string, string> = {
  'AI 工具': '#6366f1',
  '编程开发': '#0ea5e9',
  '数据库与数据科学': '#10b981',
  '算法与竞赛': '#f59e0b',
  '网络与安全': '#ef4444',
  '操作系统与虚拟化': '#8b5cf6',
  '硬件与仿真': '#14b8a6',
  '文档与效率': '#ec4899',
};

const FALLBACK_BAR_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

/* 默认文件夹布局（按用户排布设定） */
const DEFAULT_FOLDER_SIZES: Record<string, { k: number; r: number }> = {
  'AI 工具': { k: 5, r: 3 },
  '编程开发': { k: 1, r: 3 },
  '数据库与数据科学': { k: 2, r: 3 },
  '算法与竞赛': { k: 5, r: 2 },
  '网络与安全': { k: 3, r: 2 },
  '操作系统与虚拟化': { k: 4, r: 2 },
  '硬件与仿真': { k: 4, r: 2 },
  '文档与效率': { k: 8, r: 2 },
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
};

export default function Home() {
  const { data: session, status } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [achievementProgress, setAchievementProgress] = useState<{ earned: number; total: number } | null>(null);
  const [folderConfigs, setFolderConfigs] = useState<Record<string, { k: number; r: number }>>({});
  const [previewGroup, setPreviewGroup] = useState<string | null>(null);
  const [resizing, setResizing] = useState<string | null>(null);
  const resizeStart = useRef({ x: 0, y: 0, k: 4, r: 2, group: '' });
  const toolsContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = toolsContainerRef.current;
    if (!el) return;
    const measure = () => setContainerW(el.clientWidth);
    measure();
    // 持续监听容器尺寸变化（侧边栏收起/展开、窗口缩放都会触发）
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    try {
      setFolderConfigs(JSON.parse(localStorage.getItem('folder_sizes_v2') || '{}'));
    } catch {}
  }, []);

  const startResize = (group: string, clientX: number, clientY: number) => {
    const start = folderConfigs[group] || DEFAULT_FOLDER_SIZES[group] || { k: 4, r: 2 };
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
      const nk = Math.min(Math.max(g.k + Math.round((x - g.x) / 156), 1), 8);
      const nr = Math.min(Math.max(g.r + Math.round((y - g.y) / 156), 1), 8);
      setFolderConfigs(prev => {
        const next = { ...prev, [g.group]: { k: nk, r: nr } };
        try { localStorage.setItem('folder_sizes_v3', JSON.stringify(next)); } catch {}
        return next;
      });
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
  }, [resizing]);


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

  // 过滤软件列表
  const filteredSoftware = useMemo(() => {
    if (!searchQuery) return groupedSoftware;
    
    const query = searchQuery.toLowerCase();
    return groupedSoftware.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        group.group.toLowerCase().includes(query)
      )
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  // 天际线装箱：文件夹拖拽定行列，后面的文件夹自动填补空位
  const layout = useMemo(() => {
    const cw = containerW || 1200;
    const CELL = 4;
    const cells = Math.ceil(cw / CELL);
    const S = 148; // 卡片尺寸（全局统一）
    const skyline: number[] = new Array(cells).fill(0);
    const placed: any[] = [];
    let height = 0;
    for (const group of filteredSoftware) {
      const cfg = folderConfigs[group.group] || DEFAULT_FOLDER_SIZES[group.group] || { k: 4, r: 2 };
      const k = Math.min(Math.max(Math.round(Number(cfg.k)) || 4, 1), 8);
      const r = Math.min(Math.max(Math.round(Number(cfg.r)) || 2, 1), 8);
      const w = k * S + (k - 1) * 8 + 24;
      const shown = searchQuery ? group.items.length : Math.min(group.items.length, k * r);
      const rows = Math.max(1, Math.ceil(shown / k));
      const hasMore = group.items.length > shown;
      const bodyH = 24 + rows * S + (rows - 1) * 8 + (hasMore ? 44 : 0);
      const totalH = 56 + bodyH;
      const wCells = Math.max(1, Math.ceil(w / CELL));
      let bestX = 0, bestH = Infinity;
      for (let x0 = 0; x0 <= cells - wCells; x0++) {
        let h = 0;
        for (let i = x0; i < x0 + wCells; i++) h = Math.max(h, skyline[i]);
        if (h < bestH) { bestH = h; bestX = x0; }
      }
      for (let i = bestX; i < Math.min(bestX + wCells, cells); i++) skyline[i] = bestH + totalH;
      height = Math.max(height, bestH + totalH);
      placed.push({ group, cfg: { ...cfg, k, r, S }, x: bestX * CELL, y: bestH, w });
    }
    return { placed, height };
  }, [folderConfigs, containerW, filteredSoftware, searchQuery]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 滚动到软件列表区域
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-surface-page">
      {/* Hero区域 */}
      <HeroSection />

      {/* 数据统计区域（接口失败时自动隐藏） */}
      <StatsSection />

      {/* 成就进度条 - 仅在有数据时显示 */}
      {achievementProgress && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-4">
          <div className="bg-surface-raised rounded-xl shadow-md border border-line-strong p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="font-bold text-lg text-content-primary">已解锁成就</span>
              </div>
              <span className="text-base font-bold font-mono text-content-secondary bg-brand-soft px-3 py-1 rounded-full">
                {achievementProgress.earned} / {achievementProgress.total}
              </span>
            </div>
            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min(100, (achievementProgress.earned / Math.max(1, achievementProgress.total)) * 100)}%`,
                  background: 'linear-gradient(90deg, #4f46e5, #6366f1, #818cf8)',
                  boxShadow: '0 0 8px rgba(99,102,241,0.4)',
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-semibold text-indigo-600">
                {Math.round((achievementProgress.earned / Math.max(1, achievementProgress.total)) * 100)}%
              </span>
              <span className="text-xs text-content-muted">
                {achievementProgress.earned === 0
                  ? '开始你的学习之旅，解锁第一个成就！'
                  : '继续加油，解锁更多成就！'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 学习分类悬停菜单 */}
      <div className="relative">
        <div className="shadow-md py-4 px-3 md:px-6 border-b border-line-strong" style={{ background: 'linear-gradient(180deg, #EDF0F5 0%, #e8ecf2 100%)' }}>
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-content-primary mb-4 md:mb-6 tracking-wide flex items-center gap-2">
              <Image src="/images/logo-calligraphy-transparent.png" alt="PartJava" width={921} height={601} className="h-7 md:h-10 w-auto inline-block" />
              <span>学习平台</span>
            </h1>
            
            {/* 学习分类导航 */}
            <div className="relative group">
              <button className="flex items-center text-content-primary font-semibold text-lg hover:text-content-primary transition-colors py-2 px-4 rounded-md hover:bg-brand-soft">
                🏫 学习中心
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* 悬停显示的学习分类菜单 */}
              <div className="absolute left-0 top-full mt-2 shadow-xl rounded-lg p-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-full max-w-[1400px] border border-line-strong" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f3f8 50%, #f5f7fa 100%)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(navigationItems).map(([category, items]) => (
                    <div key={category} className="col-span-1">
                      <h3 className="text-base font-medium text-content-primary mb-4 pb-2 border-b border-line-strong">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 gap-y-3">
                        {items.map((item) => {
                          let homepage = '';
                          if (item.subitems && item.subitems.length > 0) {
                            const firstHref = item.subitems[0].href;
                            const parts = firstHref.split('/');
                            homepage = parts.slice(0, -1).join('/');
                          } else {
                            homepage = `/study/${item.name.toLowerCase()}`;
                          }
                          return (
                            <Link
                              key={item.code}
                              href={homepage}
                              className="flex items-center space-x-2 text-content-secondary hover:text-content-primary text-sm transition-colors py-1 px-2 rounded hover:bg-brand-soft"
                            >
                              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-brand-soft text-sm text-content-secondary hover:bg-brand-primary/15 hover:text-content-primary rounded">
                                {item.code}
                              </span>
                              <span>{item.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="py-3 md:py-4 px-3 md:px-6">
        {/* 快速搜索 */}
        <div className="max-w-[1400px] mx-auto mb-8">
          <QuickSearch onSearch={handleSearch} />
          {searchQuery && (
            <div className="text-center mb-4">
              <span className="text-content-secondary">
                搜索 "<span className="font-semibold text-brand-primary">{searchQuery}</span>" 
                找到 {filteredSoftware.reduce((acc, group) => acc + group.items.length, 0)} 个结果
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="ml-4 text-brand-primary hover:text-brand-hover underline"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 md:mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-content-primary">常用软件 / 工具官网直达</h1>
            <p className="text-sm text-content-muted mt-1">按知识点分组 · 悬停卡片翻转查看详情 · 点击访问官网</p>
          </div>
          <button
            onClick={() => { setFolderConfigs({}); try { localStorage.removeItem('folder_sizes_v2'); } catch {} }}
            className="flex-shrink-0 text-xs text-content-muted hover:text-brand-primary underline underline-offset-2 transition-colors"
            title="恢复所有文件夹为默认大小"
          >
            重置布局
          </button>
        </div>
        <div ref={toolsContainerRef} className="relative" style={{ height: layout.placed.length ? layout.height : undefined }}>
          {filteredSoftware.length > 0 ? (
            layout.placed.map(({ group, cfg, x, y, w }) => {
              const isSearching = !!searchQuery;
              const visibleItems = isSearching ? group.items : group.items.slice(0, cfg.k * cfg.r);
              const hiddenCount = group.items.length - visibleItems.length;
              const barColor = groupBarColor(group.group);
              return (
                <div key={group.group} className="absolute" style={{ left: x, top: y, width: w }}>
                  <h2
                    className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold mb-2 md:mb-3 text-content-primary border-l-4 pl-2 md:pl-3 py-1 rounded-r"
                    style={{ borderLeftColor: barColor }}
                  >
                    {group.group}
                    <span
                      className="text-xs md:text-sm font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: barColor, background: `${barColor}1a` }}
                    >
                      {group.items.length}
                    </span>
                  </h2>
                  {/* 文件夹容器：固定 148px 图标卡，右下角拖拽改变宽度和数量 */}
                  <div
                    className={`relative rounded-2xl border border-line-strong bg-white/50 p-3 ${
                      resizing === group.group ? 'ring-2 ring-brand-primary/40 shadow-lg' : ''
                    }`}
                  >
                    <div
                      className="grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${cfg.k}, ${cfg.S}px)` }}
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
                          />
                        );
                      })}
                    </div>
                    {hiddenCount > 0 && (
                      <button
                        onClick={() => setPreviewGroup(group.group)}
                        className="mt-2 w-full h-9 rounded-lg border border-dashed border-line-strong text-content-muted hover:text-brand-primary hover:border-brand-primary transition-colors flex items-center justify-center gap-2"
                        title="预览全部工具"
                      >
                        <span className="text-lg tracking-widest leading-none font-bold">···</span>
                        <span className="text-xs">全部 {group.items.length} 个</span>
                      </button>
                    )}
                    {!isSearching && (
                      <div
                        onMouseDown={(e) => { e.preventDefault(); startResize(group.group, e.clientX, e.clientY); }}
                        onTouchStart={(e) => { startResize(group.group, e.touches[0].clientX, e.touches[0].clientY); }}
                        title="拖动调整文件夹大小"
                        className="absolute bottom-1.5 right-1.5 z-10 w-4 h-4 cursor-nwse-resize text-gray-400 hover:text-brand-primary transition-colors"
                      >
                        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none">
                          <path d="M15 15H7M15 15V7M15 15L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
              <h3 className="text-2xl font-bold text-content-primary mb-2">未找到匹配的工具</h3>
              <p className="text-content-muted">试试其他关键词吧</p>
            </div>
          )}
        </div>
        <div className="mt-6 md:mt-8 text-center text-content-muted text-xs md:text-sm">
          如有更多常用软件建议，欢迎补充！
        </div>

        {/* 水墨分隔（缩减为一条细分割线） */}
        <InkWashDecoration variant="divider" height={50} className="mt-8 mb-4" />

        {/* 算法可视化入口 */}
        <div className="mt-12 mb-8">
          <Link href="/code/editor">
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border border-white/10"
              style={{ background: 'linear-gradient(135deg, #0C1F3D 0%, #1a2d4a 55%, #0C1F3D 100%)' }}>
              {/* 水墨山纹（与工具卡背面呼应） */}
              <svg className="absolute bottom-0 left-0 w-full h-1/3 opacity-15" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 100 L0 70 Q30 30 60 50 Q90 70 110 40 Q135 60 160 35 Q185 50 200 55 L200 100 Z" fill="white" />
              </svg>
              {/* 柔光斑 */}
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />
              <div className="relative px-6 py-10 md:py-12 text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">编程实验室</h3>
                <p className="text-gray-300 mb-6">在线编写代码 · 沉浸式 3D 算法可视化体验</p>
                <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-7">
                  <span className="px-3 py-1 bg-white/10 text-[#c7d2fe] rounded-full text-xs border border-white/15">💻 在线编辑</span>
                  <span className="px-3 py-1 bg-white/10 text-[#c7d2fe] rounded-full text-xs border border-white/15">🫧 冒泡排序</span>
                  <span className="px-3 py-1 bg-white/10 text-[#c7d2fe] rounded-full text-xs border border-white/15">⚡ 快速排序</span>
                  <span className="px-3 py-1 bg-white/10 text-[#c7d2fe] rounded-full text-xs border border-white/15">🔍 二分查找</span>
                </div>
                <span className="inline-block px-7 py-2.5 bg-white text-[#0C1F3D] rounded-full font-semibold hover:bg-indigo-50 transition-colors">
                  立即体验 →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* 底部水墨收尾（缩减高度） */}
      <InkWashDecoration variant="landscape" height={120} className="bg-surface-page" />

      {/* 工具分组预览弹窗 */}
      {previewGroup && (() => {
        const g = groupedSoftware.find(gr => gr.group === previewGroup);
        if (!g) return null;
        return (
          <ToolGroupPreview
            group={g.group}
            items={g.items}
            brandColors={brandColors}
            onClose={() => setPreviewGroup(null)}
          />
        );
      })()}

      {/* 回到顶部按钮 */}
      <BackToTop />
      
    </div>
  );
}
