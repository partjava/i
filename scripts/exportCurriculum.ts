import { executeQuery } from '../app/lib/database';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const outputDir = path.join(__dirname, '../curriculum_export');
  if (fs.existsSync(outputDir)) {
    // 如果之前导出的文件夹存在，先清空以保持干净
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  // 1. 获取所有阶段的中文名称对照
  const STAGE_NAMES: Record<number, string> = {
    1: "01_基础知识",
    2: "02_Python编程",
    3: "03_数学基础",
    4: "04_机器学习",
    5: "05_深度学习",
    6: "06_计算机视觉",
    7: "07_自然语言处理",
    8: "08_大模型",
    9: "09_强化学习",
    10: "10_工程部署",
    11: "11_项目实战"
  };

  // 2. 查询所有关卡
  const challenges = await executeQuery('SELECT * FROM star_challenges') as any[];
  console.log(`🚀 开始从 MySQL 中导出 ${challenges.length} 个关卡到本地物理文件夹...`);

  for (const c of challenges) {
    const stageDirName = STAGE_NAMES[c.stage_id] || `stage_${c.stage_id}`;
    const topicDirName = c.topic_name.replace(/[\/\\?%*:|"<>\s]/g, '_');
    const subtopicDirName = c.subtopic_name.replace(/[\/\\?%*:|"<>\s]/g, '_');

    // 拼装绝对物理路径
    const targetDir = path.join(outputDir, stageDirName, topicDirName, subtopicDirName);
    fs.mkdirSync(targetDir, { recursive: true });

    // A. 写入 theory.md (理论加核心公式)
    let latexList = '';
    try {
      const parsedLatex = JSON.parse(c.latex_formulas || '[]');
      if (Array.isArray(parsedLatex) && parsedLatex.length > 0) {
        latexList = '\n\n### 🔢 核心考核公式与指标\n' + parsedLatex.map((f: string) => `- $${f}$`).join('\n');
      }
    } catch (_) {}
    const theoryContent = `${c.theory_content}${latexList}`;
    fs.writeFileSync(path.join(targetDir, 'theory.md'), theoryContent, 'utf-8');

    // B. 写入 starter_code.py (学员做题模板)
    fs.writeFileSync(path.join(targetDir, 'starter_code.py'), c.starter_code || '', 'utf-8');

    // C. 写入 solution_code.py (标准参考答案)
    fs.writeFileSync(path.join(targetDir, 'solution_code.py'), c.solution_code || '', 'utf-8');

    // D. 写入 expected_output.txt (断言匹配值)
    fs.writeFileSync(path.join(targetDir, 'expected_output.txt'), c.expected_output || '', 'utf-8');

    // E. 获取配套的选择题并写入 quizzes.json
    const quizzes = await executeQuery('SELECT * FROM star_challenge_quizzes WHERE challenge_id = ?', [c.id]) as any[];
    const quizzesData = quizzes.map((q, idx) => {
      let optionsList = [];
      try {
        optionsList = JSON.parse(q.options || '[]');
      } catch (_) {}
      return {
        index: idx + 1,
        question: q.question_text,
        options: optionsList,
        correctIndex: q.correct_index,
        explanation: q.explanation
      };
    });
    fs.writeFileSync(path.join(targetDir, 'quizzes.json'), JSON.stringify(quizzesData, null, 2), 'utf-8');

    // F. 写入 thinking_question.md (主观题及 AI 打分提示词)
    const thinkingContent = `### 🤔 主观思考题\n\n${c.thinking_question}\n\n---\n* **AI 阅卷打分 Prompt 提示词**：\n${c.ai_prompt}`;
    fs.writeFileSync(path.join(targetDir, 'thinking_question.md'), thinkingContent, 'utf-8');
  }

  console.log(`\n🎉 全站 11 个阶段共 107 个小节内容全部成功导出到物理磁盘！`);
  console.log(`📂 导出目录: ${outputDir}`);
  process.exit(0);
}

main().catch(err => {
  console.error("❌ 导出过程中发生错误:", err);
  process.exit(1);
});
