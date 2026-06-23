export const meta = {
  name: 'migrate-nlp-pages',
  description: '迁移NLP剩余页面到书本翻页模板，完整保留所有内容',
  phases: [
    { title: '迁移', detail: '并行迁移NLP页面' },
    { title: '验证', detail: '类型检查' },
  ],
}

const PAGES = [
  'machine-translation', 'text-generation', 'sentiment-analysis',
  'qa', 'dialogue', 'frameworks', 'cases', 'interview', 'advanced'
]

function buildPrompt(slug) {
  var prompt = '你的任务是将一个NLP页面从旧格式迁移为新书本翻页模板格式。\n\n'
  prompt += '操作方法：\n'
  prompt += '1. 用 Read 工具读取 /root/aidnz/i/app/study/ai/nlp/' + slug + '/page.tsx 的完整内容\n'
  prompt += '2. 读完所有内容后，用 Write 工具写入新文件到相同路径\n\n'
  prompt += '章节编号（按导航顺序）：\n'
  prompt += '- machine-translation: 6/14（上一章ner, 下一章text-generation）\n'
  prompt += '- text-generation: 7/14（上一章machine-translation, 下一章sentiment-analysis）\n'
  prompt += '- sentiment-analysis: 8/14（上一章text-generation, 下一章qa）\n'
  prompt += '- qa: 9/14（上一章sentiment-analysis, 下一章dialogue）\n'
  prompt += '- dialogue: 10/14（上一章qa, 下一章frameworks）\n'
  prompt += '- frameworks: 11/14（上一章dialogue, 下一章cases）\n'
  prompt += '- cases: 12/14（上一章frameworks, 下一章interview）\n'
  prompt += '- interview: 13/14（上一章cases, 下一章advanced）\n'
  prompt += '- advanced: 14/14（上一章interview, 无下一章）\n\n'
  prompt += '硬性规则：\n'
  prompt += '1. 用 Read 工具读完整旧文件，一字不差保留所有内容\n'
  prompt += '2. 替换：tabs.map() + useState → LessonLayout + SPREADS\n'
  prompt += '3. 替换：h1/h2 → PageTitle, h3 → SectionTitle, p → BookParagraph\n'
  prompt += '4. 替换：ul/li → BookList items={[...]}（纯字符串）\n'
  prompt += '5. 替换：pre/code → BookCode language="python" code={...}\n'
  prompt += '6. SVG 保持原样（合法JSX）\n'
  prompt += '7. 删除 toggleCode/expandedCode/showAnswer 等交互逻辑，代码直接显示\n'
  prompt += '8. 删除手动导航 <Link>，用 META prevChapter/nextChapter\n'
  prompt += '9. 主题用 THEMES.ai\n'
  prompt += '10. 不得省略任何文字、代码、SVG！\n'

  return prompt
}

phase('迁移')

var results = await parallel(PAGES.map(function(slug) {
  return function() {
    return agent(buildPrompt(slug), {
      label: 'NLP: ' + slug,
      phase: '迁移',
    })
  }
}))

phase('验证')
await agent([
  'cd /root/aidnz/i',
  'npx tsc --noEmit 2>&1',
].join(' && '), { label: 'tsc', phase: '验证' })
