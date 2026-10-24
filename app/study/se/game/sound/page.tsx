'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '游戏音效',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏美术', href: '/study/se/game/art' },
  nextChapter: { label: '游戏策划', href: '/study/se/game/planning' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "声音承担反馈职责",
    left: (
      <div className="space-y-4">
        <PageTitle>声音承担反馈职责</PageTitle>
        <BookParagraph>游戏音效可分为音乐、环境、动作、界面和语音。先明确每种声音告诉玩家什么：拾取确认、危险方向或按钮成功。音效由规则事件触发，不能反过来以播放结束决定伤害是否生效；静音或设备不可用时，游戏规则仍应完整运行。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>从事件到音频总线</PageTitle>
        <BookParagraph>将音源分组到效果、音乐与主输出总线，玩家才能独立调节。常驻音乐通常预加载或流式播放，短促高频音效适合复用已解码数据。浏览器需注意用户交互后的音频启动；加载、解码与播放是不同阶段，报错时应记录资源地址和阶段。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先列规则事件、音频类别与优先级，再设计总线和音量控制。", "在高并发而非单音状态校验峰值，并为停止与场景退出建立清理入口。"]} />
      </div>
    ),
  },
  {
    label: "叠加音量与余量",
    left: (
      <div className="space-y-4">
        <PageTitle>叠加音量与余量</PageTitle>
        <BookParagraph>音量滑块与数字信号增益不是同一概念。多个音源在输出处相加，即使各自没有超限，叠加仍可能削波。三个完全同相、峰值零点五的信号理论上可叠到一点五，因此要留余量、控制同时发声数，并在最密集战斗中检查峰值。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>点击后播放示例</PageTitle>
        <BookParagraph>示例在用户点击按钮时创建或恢复音频上下文，再生成短正弦提示音。单次包络从很小增益上升后衰减，避免突变产生爆音；每个振荡器播放后停止并断开。演示不用外部素材，正式游戏可把振荡器换成已解码音频缓冲源。</BookParagraph>
        <BookParagraph>支持Web Audio API的浏览器；点击按钮解锁音频，示例未实现并发限制，由练习补充。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// 浏览器控制台运行，再点击生成的按钮\nconst button = document.createElement('button');\nbutton.textContent = '播放拾取提示';\ndocument.body.append(button);\nlet audio;\nbutton.onclick = async () => {\n  audio ??= new AudioContext();\n  await audio.resume();\n  const t = audio.currentTime;\n  const source = audio.createOscillator();\n  const gain = audio.createGain();\n  source.frequency.value = 660;\n  gain.gain.setValueAtTime(0.0001, t);\n  gain.gain.exponentialRampToValueAtTime(0.08, t + 0.01);\n  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);\n  source.connect(gain).connect(audio.destination);\n  source.onended = () => { source.disconnect(); gain.disconnect(); };\n  source.start(t); source.stop(t + 0.13);\n};"} />
      </div>
    ),
  },
  {
    label: "并发与空间提示",
    left: (
      <div className="space-y-4">
        <PageTitle>并发与空间提示</PageTitle>
        <BookParagraph>同类音效需要并发策略：十发子弹同帧命中可以只播放部分、合并为一声或限制同类最大数量。脚步声按落脚事件触发，不能每帧播放。空间声的位置应跟随声源，离开场景时停止循环声；音源被销毁后仍响通常是生命周期清理遗漏。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>素材与可访问性</PageTitle>
        <BookParagraph>优先级让语音、危险提示在音乐和环境声中可听见，可在关键提示期间短暂降低音乐，但切换要渐变。对听力或静音玩家提供字幕、方向图标和受击视觉反馈。资产清单还应记录采样率、声道、时长、循环点和授权，避免循环缝隙或未经许可素材进入发布包。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["单声道样本试听正常就直接交付，未测试大量同类声音叠加。", "每帧创建音源或离场后忘停循环声，造成内存与声音同时累积。"]} />
      </div>
    ),
  },
  {
    label: "练习：不会炸响的连击",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：不会炸响的连击</PageTitle>
        <BookParagraph>制作一个点击拾取演示，连续点击触发短音，每次显示当前发声数量；最多允许四个同时存在，超额按明确规则丢弃或替换。增加效果与主音量两级控制，并让静音时仍出现拾取文字反馈。</BookParagraph>
        <BookAlert type="info" message={"在演示中实现四声并发上限、两级音量和静音视觉反馈，记录十次快速点击的峰值与计数。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收快速连点十次不会无限增加音源，峰值保持预设余量，停止后计数归零；首次交互前不自动发声；切换静音无明显爆音。提交正常与最密集场景的监听记录，说明并发策略以及音频失败时的视觉回退。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：用集合保存活动音源，在onended清理；加入效果GainNode与主GainNode，音量变化采用短渐变。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API" target="_blank" rel="noreferrer">MDN：使用Web Audio API</a></BookParagraph>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Games/Anatomy" target="_blank" rel="noreferrer">MDN：游戏主循环与事件</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameSoundPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
