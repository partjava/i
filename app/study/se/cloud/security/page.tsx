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
