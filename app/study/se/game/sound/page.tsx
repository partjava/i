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
        <BookParagraph>从规则事件到听见声音，要经过选素材、检查并发、设置音量与位置、提交音频播放等步骤。规则主循环和音频设备并不使用完全相同的时钟，因此节奏提示与淡入淡出应安排在音频时间轴上，画面则保留对应的视觉确认。</BookParagraph>
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
  { label: "规则时钟与音频时钟", left: (<div className="space-y-4"><PageTitle>规则时钟与音频时钟</PageTitle><BookParagraph>游戏帧率可能波动，但音频按采样时钟连续处理。若每帧检查“现在该响了吗”再立即播放，节拍时刻会受渲染延迟影响。需要精确节奏时，可提前把播放安排到音频时间轴；普通按钮提示则更关注输入后的低延迟反馈。</BookParagraph>
<BookParagraph>暂停时需要分别决定音乐、环境与动作声的行为。音乐可以继续、渐弱或暂停，循环机器声通常应随世界冻结。若只停止生成新音源，已经播放的长声音仍可能继续；场景需要持有活动声音句柄，才能明确停止或淡出。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>素材阶段与故障定位</PageTitle><BookParagraph>资源地址正确不代表音频一定可播，还需经历下载、解码、设备启动与播放调度。日志记录失败阶段，才能区分网络故障、格式不支持和用户交互限制。失败时允许继续操作，并用文字或图标保留关键反馈。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">声音类别</th><th className="text-left p-2 font-semibold">调度重点</th><th className="text-left p-2 font-semibold">资源策略</th></tr></thead><tbody><tr className="border-b"><td className="p-2">按钮与拾取</td><td className="p-2">响应及时、避免重复触发</td><td className="p-2">短素材预加载、复用解码结果</td></tr><tr className="border-b"><td className="p-2">音乐与环境</td><td className="p-2">连续性、循环与场景切换</td><td className="p-2">长素材考虑流式与淡入淡出</td></tr><tr className="border-b"><td className="p-2">危险与语音</td><td className="p-2">可辨识、优先级与字幕</td><td className="p-2">优先保障关键信息的可听性</td></tr></tbody></table></div></div>) },
  { label: "增益、分贝与听感", left: (<div className="space-y-4"><PageTitle>增益、分贝与听感</PageTitle><BookParagraph>线性增益零点五表示信号振幅减半，换算约负六点零二分贝，并不等于所有人都觉得响度恰好减半。声音频率、时长和听者条件也影响听感。音量滑块应有可理解的范围与静音入口，再通过实际素材试听决定映射曲线。</BookParagraph>
<BookParagraph>多个信号相加时需要预留余量，完全同相只是容易手算的最坏情况之一。压低单个素材峰值可以减少超限风险，但不能替代并发控制和总线监听。最终混音应在最密集战斗、菜单叠音与语音播报同时发生时检查。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>总线结构与提示优先级</PageTitle><BookParagraph>动作声先进入效果总线，音乐进入音乐总线，二者再进入主总线。玩家调节效果音量不会改变音乐，主音量则影响全部。关键危险提示可以暂时降低音乐，但应通过短渐变进入和退出，防止音量突然跳动。</BookParagraph>
<BookParagraph>优先级规则要能解释冲突。四个音源名额已满时，新危险提示可替换低优先级远处脚步，普通拾取则可能直接丢弃。替换时若立即截断波形会产生爆音，可先短淡出；被替换音源的结束回调仍需正确清理计数。</BookParagraph></div>) },
  { label: "包络为什么能减少爆音", left: (<div className="space-y-4"><PageTitle>包络为什么能减少爆音</PageTitle><BookParagraph>波形从非零值突然切断会产生宽频瞬变，听起来像咔嗒。短包络先由很小振幅上升，再逐渐衰减到接近零后停止，可减轻这种突变。渐变应安排到音频参数时间轴，而不是依靠每帧改一次音量。</BookParagraph>
<BookParagraph>原示例指数衰减使用很小的正值作为起终点，是因为该类增益指数曲线不能直接连接零值。真正静音仍可在衰减后停止音源。包络太短可能仍有瞬变，太长又会模糊打击感，需要结合素材与目标设备试听。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>把增益关系算清楚</PageTitle><BookParagraph>示例比较一、零点五与零点一增益，对应零、约负六与负二十分贝。输入限定为非负线性增益；负数不属于此音量模型。这个计算描述比例，不预测声卡输出或耳边声压，也不能用来证明某一播放音量安全。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：线性增益；输出：相对增益分贝，0表示静音负无穷\nfunction gainDb(gain) {\n  return gain === 0 ? -Infinity : 20 * Math.log10(gain);\n}\nconsole.log(gainDb(1)); // 0 dB\nconsole.log(gainDb(0.5).toFixed(2)); // -6.02 dB\nconsole.log(gainDb(0.1)); // -20 dB\n// 只表示信号增益比，不等于听者耳边的声压级"} /></div>) },
  { label: "空间声与循环交接", left: (<div className="space-y-4"><PageTitle>空间声与循环交接</PageTitle><BookParagraph>左右声像提供粗略方向，距离衰减表达远近；二维界面音通常不应因为角色位置跑到屏幕一侧。场景声源需要随世界对象移动，界面声源则走稳定的非空间通道。听者对象与相机分离时，还需明确以哪个位置作为听觉中心。</BookParagraph>
<BookParagraph>循环素材首尾若不连续，会在接缝产生明显节拍或爆音。先检查切点波形，再试听多次完整循环；循环点、编码与播放实现都可能影响接缝。长音乐跨场景延续时，由持久音乐管理器接管，避免每次切场景都从头播放。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>音源释放与资源复用</PageTitle><BookParagraph>短音效可以复用已解码的音频数据，但每次播放仍需要独立的播放实例及其状态。不要把数据缓存与正在播放的实例混为一谈。声音结束后清理节点连接和活动集合；退出场景时停止所属实例，并让结束回调能够重复安全清理。</BookParagraph>
<BookParagraph>素材表除名称与授权外，还应注明单声道或立体声、时长、循环方式和用途。空间点声源通常不必使用复杂立体声素材；界面提示则要在小扬声器、耳机与静音模式中保持信息可理解，视觉反馈应一起设计。</BookParagraph></div>) },
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
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime" target="_blank" rel="noreferrer">MDN：指数包络的参数与限制</a></BookParagraph>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API" target="_blank" rel="noreferrer">MDN：使用Web Audio API</a></BookParagraph>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Games/Anatomy" target="_blank" rel="noreferrer">MDN：游戏主循环与事件</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameSoundPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
