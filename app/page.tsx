'use client';
import {
  SiPycharm, SiIntellijidea, SiEclipseide, SiClion, SiGoland, SiPhpstorm, SiWebstorm, SiDevdotto, SiXcode, SiAndroidstudio, SiNotepadplusplus, SiVim, SiGit, SiGithub, SiGitee, SiNodedotjs, SiPython, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiSqlite, SiDbeaver, SiDocker, SiLinux, SiUbuntu, SiCentos, SiFedora, SiShell, SiMobx, SiVmware, SiVirtualbox, SiAnaconda, SiJupyter, SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiGooglecolab, SiLeetcode, SiCodeforces, SiFigma, SiTypeorm, SiNotion, SiMarkdown, SiMdbook, SiJsfiddle, SiWireshark, SiBurpsuite, SiMamp, SiKagi, SiOpenssl, SiArduino, SiRaspberrypi, SiLogitech, SiOpenai, SiComposer, SiXampp, SiPhp, SiGo, SiCmake, SiCplusplus, SiJavascript, SiReact, SiVuedotjs, SiWebpack, SiBabel, SiTypescript, SiGradle, SiSpring, SiFlutter, SiDart, SiAltiumdesigner, SiProteus, SiMultisim, SiStmicroelectronics, SiGooglechrome, SiFirefoxbrowser, SiDedge, SiOpera, SiSafari, SiSourceforge, SiIcloud, SiWebex, SiGitlab, SiFiles, SiCoder, SiRocket, SiLightburn, SiStarz, SiQuest
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
// import { AIBot } from '../ai-bot';

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
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-3 md:py-4 px-3 md:px-6">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">常用软件/工具官网直达（按知识点分组）</h1>
        <div className="space-y-4 md:space-y-6">
          {groupedSoftware.map(group => (
            <div key={group.group}>
              <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-blue-700 border-l-4 border-blue-400 pl-2 md:pl-3 bg-blue-50 py-1 rounded-r">
                {group.group}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const color = brandColors[item.name] || '#3B82F6'; // 默认蓝色
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md hover:shadow-lg md:hover:shadow-2xl transition-all p-3 md:p-4 border border-gray-100 hover:border-gray-200 active:scale-95 md:transform md:hover:-translate-y-1 md:hover:scale-105 duration-200 group mobile-nav-item"
                      style={{ borderTop: `3px solid ${color}` }}
                    >
                      <Icon className="text-2xl md:text-3xl mr-2 md:mr-3 flex-shrink-0" style={{ color }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm md:text-lg font-semibold mb-0.5 md:mb-1 truncate" style={{ color }}>{item.name}</div>
                        <div className="text-gray-600 text-xs md:text-sm line-clamp-2">{item.desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-8 text-center text-gray-500 text-xs md:text-sm">
          如有更多常用软件建议，欢迎补充！
        </div>
      </main>
      
    </div>
  );
}
