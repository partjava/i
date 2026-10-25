'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '云安全与合规',
  chapterNumber: 5,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云存储与数据库', href: '/study/se/cloud/storage' },
  nextChapter: { label: '自动化与DevOps', href: '/study/se/cloud/devops' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "先识别资产与信任边界",
    left: (
      <div className="space-y-4">
        <PageTitle>先识别资产与信任边界</PageTitle>
        <BookParagraph>云安全从资产与威胁开始：学习网站包含账号、学习记录、发布凭证和备份。沿浏览器、应用、数据库及运维入口标出数据如何流动，分析凭证泄漏、越权访问、误配置和依赖漏洞的后果。</BookParagraph>
        <BookParagraph>厂商负责其管理的底层设施，客户仍需配置身份、保护数据并修补自己管理的软件。服务通过合规认证不能自动证明你的应用合规，责任需要落实到具体控制、负责人及证据。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>身份优先与最小权限</PageTitle>
        <BookParagraph>人工使用联合登录、多因素认证和短期会话；应用使用工作负载角色取得临时凭证。主账户只用于确有需要的账户级任务，不用于日常开发，也不生成长期密钥塞进脚本或镜像。</BookParagraph>
        <BookParagraph>权限应限定动作、资源与必要条件。读取章节图片的应用不需要删除整个存储空间，更不需要管理员权限；定期检查实际使用权限和闲置身份，在变更后验证合法访问仍可完成。</BookParagraph>
      </div>
    ),
  },
  {
    label: "读懂策略的边界",
    left: (
      <div className="space-y-4">
        <PageTitle>读懂策略的边界</PageTitle>
        <BookParagraph>下面是用于讨论的AWS IAM身份策略片段，不会创建或修改云资源。BUCKET_NAME是待替换的存储桶名称，示例只允许读取public-lessons前缀下的对象，不包含列举、上传或删除权限。</BookParagraph>
        <BookParagraph>默认拒绝和显式拒绝、资源策略及组织约束都会影响最终结果；单看一段Allow不能保证请求成功。策略评审应同时检查目标对象、调用身份和其他授权层，而非失败时直接扩大到星号。</BookParagraph>
        <BookCode language="json" code={"{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::BUCKET_NAME/public-lessons/*\"\n  }]\n}"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络隔离与秘密</PageTitle>
        <BookParagraph>面向用户的入口只暴露必要HTTPS服务，数据库位于私有网络，入站来源限定应用层。运维入口采用受控连接和审计，临时规则应设定回收时间，不能以开放全部端口作为长期排障办法。</BookParagraph>
        <BookParagraph>秘密从受控系统注入并支持轮换；日志遮盖令牌、密码和敏感用户数据。传输加密与静态加密解决不同风险，密钥访问权限同样重要，使用加密并不能修复越权读取。</BookParagraph>
      </div>
    ),
  },
  {
    label: "检测与响应",
    left: (
      <div className="space-y-4">
        <PageTitle>检测与响应</PageTitle>
        <BookParagraph>记录身份登录、权限变更、异常数据导出和应用鉴权失败，为高风险事件设置可操作告警。日志本身可能含隐私，要限制访问并设保留期限；告警必须有人接收，才有机会缩短事故影响。</BookParagraph>
        <BookParagraph>凭证疑似泄漏时先限制相关身份、轮换凭证并检查影响范围，保留必要证据，再恢复受影响服务。不要只删除仓库中的一行密钥，因为历史版本和已复制内容仍可能泄漏。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>合规与可靠性的代价</PageTitle>
        <BookParagraph>数据采集前明确用途、保存时间和访问角色。数据位置、跨境传输、删除请求等义务需要结合业务及适用规则审查，不能用一张ISO证书替代具体分析；本章不作个案法律判断。</BookParagraph>
        <BookParagraph>增加日志、密钥管理和网络防护会增加费用与维护任务，但缺少记录会增加调查时间。对学习网站优先保障身份、私有数据与备份，再依据威胁和预算分阶段增加控制。</BookParagraph>
      </div>
    ),
  },
  { label: "授权要同时检查主体和对象",
    left: (<div className="space-y-4">
      <PageTitle>授权要同时检查主体和对象</PageTitle>
      <BookParagraph>{"例一：用户u1请求读取u2的学习进度，登录验证通过只能证明请求来自u1，不能证明其有权访问u2的数据。服务端必须把资源归属与当前身份关联检查；不能信任URL中的用户编号，也不能把前端隐藏入口当安全控制。"}</BookParagraph>
      <BookParagraph>{"将身份验证、服务权限和对象归属分层，能解释不同拒绝原因。外部响应避免泄漏过多对象信息，内部审计记录安全的关联编号与拒绝类型。下表对比三层控制，测试时必须逐层覆盖，因为通过前一层不会自动通过后一层。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>用允许和拒绝实例检查策略</PageTitle>
      <BookParagraph>{"教学输入定义读者只能读自己进度，编辑可以修改公开课程但不能读取任意私人进度。下面Python 3只模拟业务规则，不替代真实IAM或Web框架鉴权；预期三行分别为True、False、True，对应本人读取、跨用户读取和编辑课程。"}</BookParagraph>
      <BookParagraph>{"把规则写成显式条件可以暴露边界：管理员是否真有读取私人数据的业务需要，离职用户是否已失效，资源不存在时如何响应。实际系统还要从可信会话取得身份，不能让调用者自行填写role字符串。测试中用假角色只是为了隔离验证规则。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">控制层</th><th className="border border-paper-300/80 p-2 text-left">验证问题</th><th className="border border-paper-300/80 p-2 text-left">失败示例</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">身份验证</td><td className="border border-paper-300/80 p-2">你是谁</td><td className="border border-paper-300/80 p-2">令牌过期</td></tr><tr><td className="border border-paper-300/80 p-2">服务权限</td><td className="border border-paper-300/80 p-2">能执行什么动作</td><td className="border border-paper-300/80 p-2">读者修改课程</td></tr><tr><td className="border border-paper-300/80 p-2">对象归属</td><td className="border border-paper-300/80 p-2">能操作哪条数据</td><td className="border border-paper-300/80 p-2">读取他人学习记录</td></tr></tbody></table></div>
<BookCode language="python" code={"def allowed(actor, action, owner=None):\n    return (action == \"read_progress\" and actor[\"id\"] == owner\n            or action == \"edit_course\" and actor[\"role\"] == \"editor\")\nreader = {\"id\": \"u1\", \"role\": \"reader\"}\neditor = {\"id\": \"e1\", \"role\": \"editor\"}\nprint(allowed(reader, \"read_progress\", \"u1\"))\nprint(allowed(reader, \"read_progress\", \"u2\"))\nprint(allowed(editor, \"edit_course\"))"} />
    </div>),
  },
  { label: "威胁建模先算攻击收益",
    left: (<div className="space-y-4">
      <PageTitle>威胁建模先算攻击收益</PageTitle>
      <BookParagraph>{"例二：公开课程标题被读取与备份被批量导出，后果完全不同。对每条数据路径评估攻击者可获得什么、需要什么前提、能够怎样检测，再优先保护高影响路径。安全预算应围绕资产及攻击面，而不是把所有防护产品都购买一遍。"}</BookParagraph>
      <BookParagraph>{"例如发布身份被窃取可能允许篡改网站，数据库身份被窃取可能直接泄漏记录。将两者权限分开能限制影响范围；临时身份到期可缩短泄漏持续时间，但仍需要发现、吊销和调查流程，不能仅依赖凭证自然过期。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>网络隔离的逐跳验证</PageTitle>
      <BookParagraph>{"案例：应用无法连数据库，先检查是否解析到私有目标，再检查路由、网络访问规则、数据库监听与身份凭证。TCP能建立只证明网络层通畅，数据库仍可能因TLS校验或权限不足拒绝。把每一步结果分开记录，有助于避免无目的放宽规则。"}</BookParagraph>
      <BookParagraph>{"受控运维入口也应使用最小权限及日志，临时访问规则记录发起者、用途和到期时间。数据库规则允许应用安全组不代表应用永远可信，仍要限制数据库账号能力和查询范围，并在应用被攻陷时能够撤回工作负载身份。"}</BookParagraph>
    </div>),
  },
  { label: "密钥轮换为何需要重叠窗口",
    left: (<div className="space-y-4">
      <PageTitle>密钥轮换为何需要重叠窗口</PageTitle>
      <BookParagraph>{"例三：应用所有实例都在使用旧秘密，直接替换为新秘密可能使部分仍缓存旧值的实例持续失败。轮换流程通常先准备新凭证，更新应用并验证连接，再撤销旧凭证；过程需要明确有效期、回退条件及异常监控。"}</BookParagraph>
      <BookParagraph>{"下面以教学时间线说明：零分钟发放新凭证，五分钟确认实例已切换，十分钟撤销旧凭证。若检查发现某后台任务尚未更新，先停止切换并修复，而不是永久保留两套凭证。真正顺序需符合具体服务的轮换能力，不在课程中操作真实密钥。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>日志既是证据也可能泄漏</PageTitle>
      <BookParagraph>{"为一次进度读取记录请求编号、内部操作者编号、资源类别、结果与时间，通常比打印完整请求头更有用。访问令牌可能赋予直接调用能力，密码和私人载荷进入日志会扩大需要保护的副本数量。日志应按角色授权并具备保留与删除规则。"}</BookParagraph>
      <BookParagraph>{"本地Python 3例从虚构字典选取白名单字段，输出不含Authorization与password。黑名单容易漏掉新字段，白名单更便于评审；但白名单中的用户编号仍可能关联个人，因此不是匿名化证明，也不能取消日志系统的权限控制。"}</BookParagraph>
<BookCode language="python" code={"request = {\"request_id\": \"demo-1\", \"result\": \"denied\",\n           \"Authorization\": \"EXAMPLE_ONLY\", \"password\": \"EXAMPLE_ONLY\"}\nrecord = {k: request[k] for k in (\"request_id\", \"result\")}\nassert \"Authorization\" not in record and \"password\" not in record\nprint(record)"} />
    </div>),
  },
  { label: "一次凭证泄漏的响应过程",
    left: (<div className="space-y-4">
      <PageTitle>一次凭证泄漏的响应过程</PageTitle>
      <BookParagraph>{"发现代码仓库里出现访问密钥时，第一步限制或吊销已泄漏凭证并准备受控替代，避免只修改当前文件。随后按时间线检查调用审计、对象下载和权限变更，评估暴露数据与被创建的持久入口，保留必要证据。"}</BookParagraph>
      <BookParagraph>{"恢复后检查所有使用该密钥的自动任务，确认它们没有继续失败或输出秘密。对历史版本与缓存副本制定清理措施，但必须承认已经外泄的内容不能靠删除收回。补充提交前检测、短期身份与最小权限，用多层手段减少下一次影响。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>控制失效时如何收敛影响</PageTitle>
      <BookParagraph>{"假设编辑账号被盗，如果账号只能修改课程草稿，损失可限制在受审发布前；若同时拥有发布、数据库和备份管理权限，单次泄漏就可能影响整个平台。职责分离会增加操作步骤，却可以阻断高影响动作的一步完成。"}</BookParagraph>
      <BookParagraph>{"为紧急访问设计限时、可审计的授权，事件结束后回收并复查，不能留下永久“应急管理员”。安全控制应考虑可用性：过于复杂且无人会用的恢复机制可能延迟救援，因此要以模拟事故验证负责人能完成操作。"}</BookParagraph>
    </div>),
  },
  {
    label: "练习：建立访问矩阵",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：建立访问矩阵</PageTitle>
        <BookParagraph>列出读者、编辑、发布流水线和应用角色，分别判断谁能读公开文章、改课程内容、读私人进度、访问备份。设计三个允许案例与三个拒绝案例，说明拒绝是由哪一层控制实现的。</BookParagraph>
        <BookParagraph>参考思路：读者只能读取自己的进度，编辑不默认获得数据库管理权限，流水线只能发布指定应用。网络允许连接不代表业务授权通过，API仍需验证用户身份和对象归属。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与常见错误</PageTitle>
        <BookParagraph>提交访问矩阵、网络草图、脱敏日志样例和凭证泄漏处理清单。验收应能证明跨用户读进度被拒绝，数据库没有公网全开放规则，配置与发布记录中没有真实秘密。</BookParagraph>
        <BookParagraph>常见错误是给开发身份长期管理员权限、把隐藏按钮当鉴权、认为内网流量无需校验。最小权限也需要持续维护，新增功能后应更新允许与拒绝用例，防止旧权限不断堆积。</BookParagraph>
        <BookList items={[
          <a key="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" target="_blank" rel="noopener noreferrer" className="underline">AWS IAM 最佳实践</a>,
          <a key="https://aws.amazon.com/compliance/shared-responsibility-model/" href="https://aws.amazon.com/compliance/shared-responsibility-model/" target="_blank" rel="noopener noreferrer" className="underline">AWS 责任共担</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
