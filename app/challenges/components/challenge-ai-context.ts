import type { SubtopicDetail } from './data';

const clip = (value: string | undefined, limit: number) => {
  const text = value || '';
  return text.length > limit ? text.slice(0, limit) + '\n[内容已截断]' : text;
};

/** Build from current state, rather than scraping the editor DOM or sending solution fields. */
export function buildChallengeContext(state: {
  detail: SubtopicDetail; nodeName: string; activeTab: string;
  code: string; testResults: string; thinkingAnswer: string;
  selectedAnswers: Record<number, number>;
}): string {
  const { detail, nodeName, activeTab, code, testResults, thinkingAnswer, selectedAnswers } = state;
  const quizzes = detail.conceptualQuizzes.map((quiz, index) => {
    const selection = selectedAnswers[index];
    return `${index + 1}. ${quiz.question}\n${quiz.options.map((option, i) => `${String.fromCharCode(65 + i)}. ${option}`).join('\n')}\n学生已选：${selection === undefined ? '未作答' : String.fromCharCode(65 + selection)}`;
  }).join('\n\n');
  const thinking: unknown = detail.thinkingQuestion;
  const thinkingText = typeof thinking === 'string' ? thinking
    : thinking && typeof thinking === 'object' && 'question' in thinking ? String(thinking.question) : '';
  return [
    '[当前挑战题目]',
    `关卡：${nodeName} / ${detail.levelTitle || detail.name}（${detail.id}）`,
    `当前标签：${({ theory: '理论讲解', conceptual: '理解测试', thinking: '思考答疑' } as Record<string, string>)[activeTab] || activeTab}`,
    `理解测试题与选项：\n${clip(quizzes, 2600)}`,
    `思考题：\n${clip(thinkingText, 1000)}`,
    `学生思考题回答：\n${clip(thinkingAnswer, 1000) || '尚未填写'}`,
    `学生当前编辑的代码：\n${clip(code, 3000) || '空白'}`,
    `最近运行结果（属于上次运行，代码可能已经修改）：\n${clip(testResults, 1500) || '尚未运行'}`,
    `预期输出：\n${clip(detail.expectedOutput, 500)}`,
    `理论参考：\n${clip(detail.theory, 1500)}`,
  ].join('\n\n');
}
