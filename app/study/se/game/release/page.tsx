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
  chapterTitle: '游戏发布',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏测试', href: '/study/se/game/testing' },
  nextChapter: { label: '实战案例与项目', href: '/study/se/game/projects' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "发布是可重复交付",
    left: (
      <div className="space-y-4">
        <PageTitle>发布是可重复交付</PageTitle>
        <BookParagraph>发布不仅是得到一个压缩包，而是把某次源代码、资源和构建配置对应到可识别的产物。记录版本号、提交标识、目标平台、导出配置和校验值，确保测试过的文件就是交给玩家的文件。开发环境能运行不代表导出包包含了所有素材与权限配置。</BookParagraph>
        <BookParagraph>交付对象还包括玩家如何安装、从哪里读取旧存档、失败时如何恢复，以及维护者如何知道当前运行的是哪一版。把这些信息与产物一起保存，才能在出现问题时迅速关联代码、配置和受影响玩家，而不是凭文件名猜测。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>确定平台与产物</PageTitle>
        <BookParagraph>先选择桌面、移动或网页中的一个目标，再列运行前提。桌面要查架构、路径与读写目录；网页要查资源地址、浏览器音频解锁和刷新行为；移动端要查横竖屏、触摸、挂起恢复。签名与商店条款应在发布当时查对应平台官方要求，不能照搬另一平台清单。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["固定版本与导出配置，校验产物后再做最终冒烟。", "先备份并校验存档，再迁移；把回退读档纳入发布演练。"]} />
      </div>
    ),
  },
  {
    label: "平台核对清单",
    left: (
      <div className="space-y-4">
        <PageTitle>平台核对清单</PageTitle>
        <BookParagraph>在没有开发工具的干净环境安装导出包，从启动走完新游戏、暂停、结算、保存与重开。另测网络断开、只读安装目录、用户名含中文和资源文件大小写；这些条件常被开发机缓存掩盖。将配置、个人密钥和测试账号排除在分发内容之外。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>存档版本迁移</PageTitle>
        <BookParagraph>存档结构必须有独立版本号。游戏版本一改颜色不一定需要改变存档版本，但字段更名、单位改变或道具标识变化需要迁移。先解析与校验，再复制旧文件作为备份，迁移到新结构，最后验证并保存；不应边读取边覆盖唯一旧档。</BookParagraph>
        <BookParagraph>JavaScript 纯数据迁移示例；磁盘备份与原子替换需按实际平台另行实现。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js；仅迁移数据\nfunction migrate(raw) {\n  const old = JSON.parse(raw);\n  if (!old || typeof old !== 'object') throw Error('invalid save');\n  const version = old.version;\n  if (version !== 1 && version !== 2) throw Error('unsupported version');\n  const coins = version === 1 ? old.gold : old.coins;\n  if (!Number.isSafeInteger(coins) || coins < 0) throw Error('invalid coins');\n  const levels = version === 1 ? ['intro'] : old.levels;\n  if (!Array.isArray(levels) || !levels.every(x => typeof x === 'string')) {\n    throw Error('invalid levels');\n  }\n  return { version: 2, coins, levels: [...levels] };\n}\nconsole.log(migrate('{\"version\":1,\"gold\":12}'));"} />
      </div>
    ),
  },
  {
    label: "升级与回退",
    left: (
      <div className="space-y-4">
        <PageTitle>升级与回退</PageTitle>
        <BookParagraph>示例将旧金币字段转换为新结构；真实系统还要验证角色、关卡与物品数据。遇到未知的更高版本应明确拒绝而非按旧格式乱读。回退旧程序可能无法读取新存档，因此要明确备份恢复策略，并演练迁移中断、空间不足与文件截断。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>上线后的证据</PageTitle>
        <BookParagraph>发布记录保留已知问题、修复内容和兼容范围。观察启动失败、崩溃、读档失败等事件时只收集排障所需数据，给出清晰说明。发生严重故障时暂停分发有问题的版本，保留证据，先验证修复与存档兼容，再重新发布。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["把存档写进安装目录，遇到只读权限后才发现无法保存。", "只验证新档能读，没有验证旧档迁移、失败保护与回退兼容。"]} />
      </div>
    ),
  },
  { label: "从源码到唯一产物", left: (<div className="space-y-4"><PageTitle>从源码到唯一产物</PageTitle><BookParagraph>一次发布可按冻结输入、生成产物、计算标识、验证产物、分发的顺序组织。冻结输入不仅是代码提交，还包括导出预设、素材版本和构建工具版本。若资源从可变网络地址下载，同一提交也可能得到不同结果，需要记录或固定资源内容。</BookParagraph>
<BookParagraph>验证应针对最终产物而非编辑器预览。测试完成后临时修改一张图再重新打包，就产生了未经验证的新产物。给安装包附校验摘要与构建记录，可以回答测试包和分发包是否相同；摘要用于完整性核对，并不自动证明来源可信。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>分清三种版本</PageTitle><BookParagraph>例如产品版本一点二包含两个构建编号，第二个仅修正打包遗漏，存档仍为第二版。玩家反馈时同时采集产品版本与构建编号，迁移器只读取存档版本。把三者都叫version会让修复、回退与兼容判断混在一起。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">标识</th><th className="text-left p-2 font-semibold">说明内容</th><th className="text-left p-2 font-semibold">发生变化的条件</th></tr></thead><tbody><tr className="border-b"><td className="p-2">游戏版本</td><td className="p-2">玩家可识别的功能与修复</td><td className="p-2">发布新的产品版本</td></tr><tr className="border-b"><td className="p-2">构建编号</td><td className="p-2">一次具体生成的二进制或资源包</td><td className="p-2">同版本重新构建</td></tr><tr className="border-b"><td className="p-2">存档结构版本</td><td className="p-2">字段、单位与兼容规则</td><td className="p-2">数据格式需要迁移</td></tr></tbody></table></div></div>) },
  { label: "发布闸门与责任记录", left: (<div className="space-y-4"><PageTitle>发布闸门与责任记录</PageTitle><BookParagraph>将发布前必须满足的条件写成明确闸门，例如新旧存档均可加载、主流程无阻断、资源清单完整、目标平台启动成功。每项附对应产物编号和证据位置；已知的非阻断问题则写清影响和临时处理，不用一句“测试通过”掩盖范围。</BookParagraph>
<BookParagraph>冒烟测试以短时间确认最关键路径，不能替代全部回归。对一个小型躲避游戏，至少在干净环境完成启动、移动、暂停、失败、重试和退出后再启动。只读安装目录中仍能保存，说明写入位置没有依赖开发权限。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>网页与桌面的差异</PageTitle><BookParagraph>网页资源通常通过地址加载，子目录部署和缓存可能让旧脚本引用新素材。桌面包则可能受到架构、依赖库和路径权限影响。按目标平台制定检查点：网页实际访问发布路径，桌面实际启动导出文件，避免用同一条开发命令代替交付验证。</BookParagraph>
<BookParagraph>更新时应防止混用版本资源。给资源使用内容标识或独立版本路径，使一份页面引用完整一致的一组文件；清理缓存前先明确旧页面是否仍需要旧文件。缓存刷新策略应在真实托管环境中演练，而不是只看本地刷新成功。</BookParagraph></div>) },
  { label: "迁移是受控的数据转换", left: (<div className="space-y-4"><PageTitle>迁移是受控的数据转换</PageTitle><BookParagraph>迁移过程先读取旧字节，再解析并校验，生成新对象后执行结构与业务校验。确认有可恢复备份后才尝试写入新文件。写临时文件再替换可减少中途损坏风险，但原子性与持久化保证依赖平台，课程中的数据函数不能承担这些文件系统职责。</BookParagraph>
<BookParagraph>如果迁移包含重命名道具编号，还应保存显式映射表，未知编号不能悄悄丢弃。失败时给出可理解的原因并保留原档；反复启动不能反复赠送补偿。迁移步骤应根据结构版本判断是否需要执行，而不是根据某个字段碰巧存在。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>先验证内存对象隔离</PageTitle><BookParagraph>下面的微型示例表明新对象与旧对象可以保持不同结构。成功转换不等于安全保存：还需单独演练磁盘空间不足、写入中断与备份恢复。把数据正确性与文件可靠性拆开验证，能明确失败发生在哪一层。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 输入：旧版存档对象；输出：独立的新对象，不覆盖旧数据\nfunction upgradeV1(old) {\n  if (old.version !== 1 || !Number.isSafeInteger(old.gold) || old.gold < 0)\n    throw Error('invalid v1');\n  return { version: 2, coins: old.gold, levels: ['intro'] };\n}\nconst source = { version: 1, gold: 12 };\nconst upgraded = upgradeV1(source);\nconsole.log(source.version, upgraded.version, upgraded.coins); // 1 2 12\nupgraded.levels.push('forest');\nconsole.log(source.levels); // undefined，旧对象保持原结构"} /></div>) },
  { label: "回退要先回答数据兼容", left: (<div className="space-y-4"><PageTitle>回退要先回答数据兼容</PageTitle><BookParagraph>程序可回退不代表存档可回退。新版本若加入旧版无法识别的道具，直接恢复旧程序可能让玩家进度丢失。可选策略包括旧版拒绝新档、读取升级前备份或设计向后兼容字段；应在发布前明确哪个选择适合项目。</BookParagraph>
<BookParagraph>恢复备份也可能丢失升级后的新进度，所以不能把回退描述成无损操作。记录备份创建时间和适用构建，恢复前保留当前档以便诊断。发布演练中从升级前文件走完升级、保存、回退，才能知道每一步会保留什么。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>上线后如何定位问题</PageTitle><BookParagraph>观察错误时附带构建编号、平台、失败阶段和简短错误码，使启动故障与读档故障可被区分。优先收集足以排障的最小信息，避免把完整个人存档无条件上传。日志应有容量边界，长期运行不能无限占满磁盘。</BookParagraph>
<BookParagraph>热修复先从已发布输入重建问题，修复后复查相关兼容路径，再给出新的构建标识。若仅覆盖原下载地址却不记录新编号，维护者无法区分玩家手里的两个包，也难以判断故障是否来自修复前版本。</BookParagraph></div>) },
  {
    label: "练习：升级演练",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：升级演练</PageTitle>
        <BookParagraph>模拟一次从存档版本一到二的升级：旧字段gold改为coins，并新增已解锁关卡列表。准备正常、缺字段、负数、损坏JSON和未来版本五种输入；每种都记录是迁移、拒绝还是恢复备份，以及给玩家的提示。</BookParagraph>
        <BookAlert type="info" message={"编写五类输入的迁移断言，并用复制文件模拟失败后恢复旧档，附目标平台冒烟清单。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收原始存档在失败时保持不变，成功迁移后金币数一致，重复加载不再重复迁移，未来版本被拒绝。交付导出平台清单、两个产物的版本记录、一次升级与回退演练日志，并在干净环境完成一局后重启读档。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：读取到内存后先生成新对象；写入临时文件并验证成功后才替换，保留最近可恢复备份。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html" target="_blank" rel="noreferrer">Godot：导出项目</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/io/saving_games.html" target="_blank" rel="noreferrer">Godot：游戏存档</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameReleasePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
