'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全', chapterTitle: '社会工程学', chapterNumber: 9,
  totalChapters: 10, subjectHref: '/study/security/penetration',
  prevChapter: { label: '无线网络测试', href: '/study/security/penetration/wireless' },
  nextChapter: { label: '渗透测试报告', href: '/study/security/penetration/report' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>社会工程学基础概念</PageTitle>
        <BookParagraph>社会工程学（Social Engineering）是指利用人性的弱点，通过心理操控、欺骗、诱导等手段获取敏感信息、访问权限或实施攻击的技术和方法。它强调「攻心为上」，往往绕过技术防线，直接针对人。</BookParagraph>
        <BookList items={['目标：获取账号密码、敏感数据、物理访问、植入恶意程序等', '常见对象：企业员工、管理人员、IT支持、普通用户', '典型特征：伪装、诱骗、紧急感、权威感、好奇心、贪婪心理']} />
        <BookCode language="bash" code={`# 钓鱼邮件伪造
sendEmail -f fake@company.com -t victim@company.com -u "紧急：请重置密码" -m "请点击链接重置密码" -s smtp.server.com:25

# 伪造登录页面（Phishing）
# 使用SET工具包
setoolkit
# 选择 Social-Engineering Attacks -> Website Attack Vectors -> Credential Harvester Attack Method`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>攻击流程</PageTitle>
        <BookList items={['信息收集：收集目标个人、组织、联系方式、兴趣、社交账号等信息', '关系建立：通过邮件、电话、社交平台等建立初步信任', '心理诱导：利用权威、紧急、好奇、贪婪等心理弱点设计诱饵', '实施攻击：发送钓鱼邮件、伪造网站、电话诈骗、USB投递等', '获取结果：收集凭证、植入后门、窃取数据、物理入侵等', '痕迹清理：删除痕迹、销毁证据、转移赃物']} />
        <BookCode language="bash" code={`# 社交平台信息收集
python3 sherlock.py username

# 邮箱泄露查询
python3 holehe.py victim@email.com

# 电话钓鱼自动拨号（Twilio API）
from twilio.rest import Client
client = Client(account_sid, auth_token)
call = client.calls.create(to='+8613812345678', from_='+12025550123', url='http://demo.twilio.com/docs/voice.xml')`} />
      </div>
    ),
  },
  {
    label: '常见手法',
    left: (
      <div className="space-y-4">
        <PageTitle>常见社会工程学攻击手法</PageTitle>
        <BookList items={['钓鱼攻击（Phishing）：伪造邮件、网站、短信诱骗用户输入敏感信息', '电话诈骗（Vishing）：伪装成客服、银行、技术支持等进行电话欺骗', '鱼叉式攻击（Spear Phishing）：针对特定目标定制化钓鱼内容', '诱骗U盘投递：故意丢弃带有恶意程序的U盘，诱使目标插入电脑', '假冒身份：伪装成同事、领导、供应商等获取信任', '尾随入侵：跟随合法人员进入受限区域', '社交媒体诱导：通过社交平台获取信息或实施攻击']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>攻击脚本与真实案例</PageTitle>
        <BookCode language="text" code={`# 伪造短信钓鱼
sms-tool send --to 13812345678 --text "您的快递已到，请点击链接填写信息"

# U盘自动运行木马
[autorun]
open=malware.exe

# 社交平台自动化私信
python3 mass_dm.py --platform twitter --message "Hi, 请查收附件"`} />
        <BookAlert type="warning" message="真实案例：2016年美国民主党邮件泄露事件（鱼叉式钓鱼）、某企业员工遭伪造领导邮件被骗数十万元、某公司U盘投递导致内网沦陷。这些案例表明，人的因素往往是安全链中最薄弱的环节。" />
      </div>
    ),
  },
  {
    label: '防御方法',
    left: (
      <div className="space-y-4">
        <PageTitle>社会工程学防御与检测</PageTitle>
        <BookList items={['安全意识培训：定期开展员工安全教育，提升防范意识', '钓鱼邮件仿真演练：使用PhishMe、GoPhish等平台进行内部演练', '多因素认证：降低凭证泄露带来的风险', '邮件/短信网关过滤：部署反钓鱼、反垃圾邮件系统', '物理安全措施：门禁、访客登记、视频监控等', '异常行为检测：日志分析、UEBA、SOC联动']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>防御实操与建议</PageTitle>
        <BookCode language="bash" code={`# GoPhish搭建钓鱼演练平台
gophish admin --listen 0.0.0.0:3333

# 邮件网关规则示例
if subject contains "重置密码" and sender not in whitelist then quarantine

# 检测异常登录
python3 detect_login_anomaly.py --logfile auth.log`} />
        <BookList items={['定期开展社会工程学攻防演练，检验员工防范能力', '完善应急响应流程，发现异常及时处置', '加强物理和信息安全的协同防护', '建立举报机制，鼓励员工发现可疑行为及时上报']} />
      </div>
    ),
  },
]

export default function PenetrationSocialPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
