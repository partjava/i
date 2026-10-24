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
