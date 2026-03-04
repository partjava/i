'use client';
import {
  SiPycharm, SiIntellijidea, SiEclipseide, SiClion, SiGoland, SiPhpstorm, SiWebstorm, SiDevdotto, SiXcode, SiAndroidstudio, SiNotepadplusplus, SiVim, SiGit, SiGithub, SiGitee, SiNodedotjs, SiPython, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiSqlite, SiDbeaver, SiDocker, SiLinux, SiUbuntu, SiCentos, SiFedora, SiShell, SiMobx, SiVmware, SiVirtualbox, SiAnaconda, SiJupyter, SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiGooglecolab, SiLeetcode, SiCodeforces, SiFigma, SiTypeorm, SiNotion, SiMarkdown, SiMdbook, SiJsfiddle, SiWireshark, SiBurpsuite, SiMamp, SiKagi, SiOpenssl, SiArduino, SiRaspberrypi, SiLogitech, SiOpenai, SiComposer, SiXampp, SiPhp, SiGo, SiCmake, SiCplusplus, SiJavascript, SiReact, SiVuedotjs, SiWebpack, SiBabel, SiTypescript, SiGradle, SiSpring, SiFlutter, SiDart, SiAltiumdesigner, SiProteus, SiMultisim, SiStmicroelectronics, SiGooglechrome, SiFirefoxbrowser, SiDedge, SiOpera, SiSafari, SiSourceforge, SiIcloud, SiWebex, SiGitlab, SiFiles, SiCoder, SiRocket, SiLightburn, SiStarz, SiQuest
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { navigationItems } from './data/navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FlipCard from './components/FlipCard';
import BackToTop from './components/BackToTop';
import QuickSearch from './components/QuickSearch';

const groupedSoftware = [
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
      { name: 'ChatGPT', icon: SiOpenai, url: 'https://chat.openai.com/', desc: 'AI助手' },
      { name: 'GitBook', icon: SiGitlab, url: 'https://www.gitbook.com/', desc: '文档协作平台' },
      { name: 'Confluence', icon: SiGitlab, url: 'https://www.atlassian.com/software/confluence', desc: '团队协作平台' },
      { name: 'Slack', icon: SiRocket, url: 'https://slack.com/', desc: '团队沟通工具' },
      { name: 'Microsoft Teams', icon: SiWebex, url: 'https://www.microsoft.com/en-us/microsoft-teams', desc: '团队协作工具' },
      { name: 'Discord', icon: SiRocket, url: 'https://discord.com/', desc: '社区沟通工具' },
    ]
  },
];

const brandColors: { [key: string]: string } = {
  'VS Code': '#007ACC',
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
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 滚动到软件列表区域
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero区域 */}
      <HeroSection />

      {/* 数据统计区域 */}
      <StatsSection />

      {/* 学习分类悬停菜单 */}
      <div className="relative">
        <div className="bg-white shadow-md py-4 px-3 md:px-6">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">PartJava 学习平台</h1>
            
            {/* 学习分类导航 */}
            <div className="relative group">
              <button className="flex items-center text-blue-700 font-semibold text-lg hover:text-blue-900 transition-colors py-2 px-4 rounded-md hover:bg-blue-50">
                🏫 学习中心
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* 悬停显示的学习分类菜单 */}
              <div className="absolute left-0 top-full mt-2 bg-white shadow-xl rounded-lg p-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-full max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(navigationItems).map(([category, items]) => (
                    <div key={category} className="col-span-1">
                      <h3 className="text-base font-medium text-gray-900 mb-4 pb-2 border-b">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 gap-y-3">
                        {items.map((item) => {
                          let homepage = '';
                          if (item.subitems && item.subitems.length > 0) {
                            // 取第一个子项的href，提取目录路径
                            const firstHref = item.subitems[0].href;
                            const parts = firstHref.split('/');
                            // 移除最后一个部分（页面名称），保留目录路径
                            homepage = parts.slice(0, -1).join('/');
                          } else {
                            homepage = `/study/${item.name.toLowerCase()}`;
                          }
                          return (
                            <Link
                              key={item.code}
                              href={homepage}
                              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm transition-colors py-1 px-2 rounded hover:bg-blue-50"
                            >
                              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-100 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded">
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
              <span className="text-gray-600">
                搜索 "<span className="font-semibold text-blue-600">{searchQuery}</span>" 
                找到 {filteredSoftware.reduce((acc, group) => acc + group.items.length, 0)} 个结果
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="ml-4 text-blue-600 hover:text-blue-800 underline"
              >
                清除搜索
              </button>
            </div>
          )}
        </div>

        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">常用软件/工具官网直达（按知识点分组）</h1>
        <div className="space-y-4 md:space-y-6">
          {filteredSoftware.length > 0 ? (
            filteredSoftware.map(group => (
              <div key={group.group}>
                <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-blue-700 border-l-4 border-blue-400 pl-2 md:pl-3 bg-blue-50 py-1 rounded-r">
                  {group.group} ({group.items.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const color = brandColors[item.name] || '#3B82F6';
                    return (
                      <FlipCard
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
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">未找到匹配的工具</h3>
              <p className="text-gray-500">试试其他关键词吧</p>
            </div>
          )}
        </div>
        <div className="mt-6 md:mt-8 text-center text-gray-500 text-xs md:text-sm">
          如有更多常用软件建议，欢迎补充！
        </div>

        {/* 算法可视化入口 */}
        <div className="mt-12 mb-8">
          <Link href="/code-editor">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="bg-slate-900 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  编程实验室 - 代码编辑 + 3D 算法可视化
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  在线编写代码，沉浸式体验算法的魅力
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                    💻 在线编辑
                  </span>
                  <span className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                    🫧 冒泡排序
                  </span>
                  <span className="px-4 py-2 bg-pink-600/30 text-pink-300 rounded-full text-sm">
                    ⚡ 快速排序
                  </span>
                  <span className="px-4 py-2 bg-green-600/30 text-green-300 rounded-full text-sm">
                    🔍 二分查找
                  </span>
                </div>
                <div className="mt-6">
                  <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                    立即体验 →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* 回到顶部按钮 */}
      <BackToTop />
      
    </div>
  );
}
