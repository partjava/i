import { executeQuery, initDatabase } from '../app/lib/database';
import { STAGES } from '../app/challenges/data/stages';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  await initDatabase();

  const dataDir = path.join(__dirname, '../challenges_data/01_基础知识');
  if (!fs.existsSync(dataDir)) {
    console.error(`目录 ${dataDir} 不存在，请先运行生成器生成物理文件！`);
    process.exit(1);
  }

  console.log('🔄 开始从 physical files 同步到 MySQL 数据库中...');

  // 1. 清理已有数据以防冲突
  console.log('清理老旧数据...');
  await executeQuery('DELETE FROM star_challenge_quizzes');
  await executeQuery('DELETE FROM star_challenges');

  // 2. 递归查找并导入
  const folders = fs.readdirSync(dataDir);
  for (const folder of folders) {
    const subtopicPath = path.join(dataDir, folder);
    if (!fs.statSync(subtopicPath).isDirectory()) continue;

    // 清理前缀得到 subtopic_name (如 "01_计算机组成原理" -> "计算机组成原理")
    const subtopicName = folder.replace(/^\d+_/, '');

    // 在 STAGES 中查找匹配的 stage_id 和 topic_name
    let stageId = 1; // 默认 Stage 1
    let topicName = '';
    
    for (const s of STAGES) {
      for (const t of s.topics) {
        if (t.children.includes(subtopicName)) {
          stageId = s.id;
          topicName = t.name;
          break;
        }
      }
    }

    if (!topicName) {
      console.warn(`⚠️ Warning: 找不到子话题 [${subtopicName}] 对应的 Topic 分类，跳过此小节。`);
      continue;
    }

    console.log(`\n📂 正在处理小节: [${subtopicName}] (Stage: ${stageId}, Topic: ${topicName})`);

    // 读取该小节下的所有关卡文件夹
    const levels = fs.readdirSync(subtopicPath);
    for (const lvlFolder of levels) {
      const lvlPath = path.join(subtopicPath, lvlFolder);
      if (!fs.statSync(lvlPath).isDirectory()) continue;

      // 提取关卡序号 (如 "level1_cpu_time_calc" -> 1)
      const lvlIndexMatch = lvlFolder.match(/^level(\d+)/);
      if (!lvlIndexMatch) continue;
      const levelIndex = parseInt(lvlIndexMatch[1]);

      // 读取关卡数据文件
      const readmeContent = fs.readFileSync(path.join(lvlPath, 'README.md'), 'utf-8');
      const starterCode = fs.readFileSync(path.join(lvlPath, 'starter.py'), 'utf-8');
      const solutionCode = fs.readFileSync(path.join(lvlPath, 'solution.py'), 'utf-8');
      const expectedOutput = fs.readFileSync(path.join(lvlPath, 'expected.txt'), 'utf-8').trim();
      
      const quizzesJson = fs.readFileSync(path.join(lvlPath, 'quizzes.json'), 'utf-8');
      const quizzes = JSON.parse(quizzesJson);

      // 从 README.md 首行提取关卡标题 (如 "### 🛠️ 编程挑战：CPU 执行时间计算" -> "CPU 执行时间计算")
      const firstLine = readmeContent.split('\n')[0] || '';
      const levelTitle = firstLine.replace(/^###\s*(🛠️)?\s*编程挑战：/, '').replace(/^###\s*/, '').trim();

      console.log(`  --> 正在导入关卡 ${levelIndex}: [${levelTitle}]`);

      // 插入到 star_challenges
      const result = await executeQuery(
        `INSERT INTO star_challenges 
         (stage_id, subtopic_name, topic_name, theory_content, latex_formulas, starter_code, solution_code, expected_output, thinking_question, ai_prompt, level_index, level_title, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`,
        [
          stageId,
          subtopicName,
          topicName,
          readmeContent,
          JSON.stringify([levelTitle]), // formulas placeholder
          starterCode,
          solutionCode,
          expectedOutput,
          `请写出该题目的优化方向或复杂度分析。`,
          `评估该编程挑战的深度，评分 0-10。`,
          levelIndex,
          levelTitle
        ]
      ) as { insertId: number };

      const challengeId = result.insertId;

      // 插入选择题
      for (const quiz of quizzes) {
        await executeQuery(
          `INSERT INTO star_challenge_quizzes 
           (challenge_id, question_text, options, correct_index, explanation)
           VALUES (?, ?, ?, ?, ?)`,
          [
            challengeId,
            quiz.question,
            JSON.stringify(quiz.options),
            quiz.answer,
            quiz.explanation
          ]
        );
      }
    }
  }

  // 3. 将未覆盖的其余小节从 seedChallenges 中作为兜底填入，确保主界面不空白
  // 我们只覆盖了 01_计算机组成原理 和 02_操作系统，其他小节用原有的一级数据填充
  console.log('\n🌟 填充其他未录入的 105 个小节作为占位数据...');
  const { seedRemainingChallenges } = require('./seedRemaining');
  await seedRemainingChallenges();

  console.log('\n🎉 所有多级关卡数据和填充数据已成功注入数据库！');
  process.exit(0);
}

main().catch(err => {
  console.error("同步失败:", err);
  process.exit(1);
});
