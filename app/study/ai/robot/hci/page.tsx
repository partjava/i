'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const speechCode = `import speech_recognition as sr
import pyttsx3

recognizer = sr.Recognizer()
engine = pyttsx3.init()

def listen():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
        return recognizer.recognize_google(audio, language='zh-CN')

def speak(text):
    engine.say(text)
    engine.runAndWait()

def process_command(text):
    if '前进' in text: robot.move_forward()
    elif '后退' in text: robot.move_backward()
    elif '停止' in text: robot.stop()
    else: speak('无法识别的命令')`

const META: LessonMeta = { subject: '智能机器人', chapterTitle: '人机交互', chapterNumber: 9, totalChapters: 12, subjectHref: '/study/ai/robot', prevChapter: { label: '机器人导航', href: '/study/ai/robot/navigation' }, nextChapter: { label: '机器人实战', href: '/study/ai/robot/cases' }, theme: THEMES.ai }

const SPREADS = [
  { label: '交互基础', left: (<div className="space-y-4"><PageTitle>人机交互基础</PageTitle><BookParagraph>人机交互（HRI）研究人与机器人之间的有效沟通和协作。好的交互设计能提高用户接受度和任务效率。</BookParagraph><SectionTitle>交互方式</SectionTitle><BookList items={['语音交互：语音识别和合成','手势交互：姿态识别','触觉交互：力反馈','视觉交互：表情和注视']} /></div>), right: (<div className="space-y-4"><SectionTitle>语音控制</SectionTitle><BookCode language="python" code={speechCode} /></div>) },
  { label: '交互界面', left: (<div className="space-y-4"><PageTitle>交互界面</PageTitle><SectionTitle>图形界面</SectionTitle><BookList items={['机器人状态显示','远程控制面板','任务监控界面','数据可视化']} /><SectionTitle>自然交互</SectionTitle><BookList items={['语音对话系统','多模态融合交互','情感识别和表达','自适应交互']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '交互方式', left: (<div className="space-y-4"><PageTitle>交互方式</PageTitle><SectionTitle>协同工作</SectionTitle><BookList items={['人机协作：安全共融','远程操作：遥操作','共享控制：人机共享','社交交互：社交机器人']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['服务机器人：导览、接待','教育机器人：教学、陪伴','医疗机器人：手术、康复','家用机器人：清洁、助理']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotHciPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
