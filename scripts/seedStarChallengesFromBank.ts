import { executeQuery, initDatabase } from '../app/lib/database';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================
// Step 1: 数据库迁移 — 补充缺失字段
// ============================================================
async function migrateStarChallenges() {
  console.log('🔍 检查 star_challenges 表结构...');

  const columns = await executeQuery('SHOW COLUMNS FROM star_challenges') as any[];
  const columnNames = columns.map((c: any) => c.Field);

  const newColumns = [
    { name: 'slug',          definition: "VARCHAR(255) NULL COMMENT '稳定题目标识'" },
    { name: 'difficulty',    definition: "VARCHAR(50) DEFAULT 'foundation' COMMENT '难度: foundation/intermediate/advanced/project'" },
    { name: 'access_level',  definition: "VARCHAR(50) DEFAULT 'member' COMMENT '访问权限: free/member/vip/admin_only'" },
    { name: 'tags',          definition: "JSON COMMENT '题目标签'" },
    { name: 'test_cases',    definition: "JSON COMMENT '自动评测用例'" },
  ];

  for (const col of newColumns) {
    if (!columnNames.includes(col.name)) {
      console.log(`  ➕ 添加字段: ${col.name}`);
      await executeQuery(`ALTER TABLE star_challenges ADD COLUMN ${col.name} ${col.definition}`);
    } else {
      console.log(`  ✅ 字段已存在: ${col.name}`);
    }
  }

  // 添加 slug 唯一键（如不冲突则加）
  try {
    await executeQuery('ALTER TABLE star_challenges ADD UNIQUE KEY uk_challenge_slug (slug)');
    console.log('  ➕ 添加唯一键: uk_challenge_slug');
  } catch {
    console.log('  ✅ 唯一键 uk_challenge_slug 已存在');
  }
}

// ============================================================
// Step 2: 加载题库文件
// ============================================================
function loadChallengeBank(bankDir: string): any[] {
  const files = fs.readdirSync(bankDir).filter(f => f.endsWith('.json')).sort();
  const challenges: any[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(bankDir, file), 'utf-8');
    const items = JSON.parse(content);
    if (Array.isArray(items)) {
      console.log(`  📄 ${file}: ${items.length} 道题`);
      challenges.push(...items);
    }
  }

  return challenges;
}

// ============================================================
// Step 3: 校验
// ============================================================
function validateChallenge(challenge: any, sourceFile: string): void {
  const required = [
    'slug', 'stageId', 'subtopicName', 'levelIndex', 'levelTitle',
    'theoryContent', 'starterCode', 'solutionCode', 'expectedOutput',
  ];

  for (const field of required) {
    // eslint-disable-next-line
    if (challenge[field] === undefined || challenge[field] === null || challenge[field] === '') {
      throw new Error(
        `[${sourceFile}] 缺少必填字段 "${field}" (题目: "${challenge.levelTitle || challenge.slug}")`
      );
    }
  }

  if (challenge.quizzes && Array.isArray(challenge.quizzes)) {
    for (const [idx, q] of challenge.quizzes.entries()) {
      if (q.answer < 0 || q.answer >= q.options.length) {
        throw new Error(
          `[${sourceFile}] 选择题答案越界: 第 ${idx + 1} 题 answer=${q.answer}, options 长度=${q.options.length} (${challenge.slug})`
        );
      }
    }
  }
}

// ============================================================
// Step 4: 标准化字段（JSON -> DB）
// ============================================================
function normalizeChallengeForDb(challenge: any) {
  return {
    slug:              challenge.slug,
    stageId:           challenge.stageId,
    topicName:         challenge.topicName || '',
    subtopicName:      challenge.subtopicName,
    levelIndex:        challenge.levelIndex,
    levelTitle:        challenge.levelTitle,
    theoryContent:     challenge.theoryContent,
    latexFormulasJson: JSON.stringify(challenge.latexFormulas || []),
    starterCode:       challenge.starterCode,
    solutionCode:      challenge.solutionCode,
    expectedOutput:    challenge.expectedOutput,
    difficulty:        challenge.difficulty || 'foundation',
    accessLevel:       challenge.accessLevel || 'member',
    tagsJson:          JSON.stringify(challenge.tags || []),
    testCasesJson:     JSON.stringify(challenge.testCases || []),
    thinkingQuestion:  challenge.thinkingQuestion || '',
    aiPrompt:          challenge.aiPrompt || '',
    status:            challenge.status || 'published',
    quizzes:           challenge.quizzes || [],
  };
}

// ============================================================
// Step 5: 写入数据库（upsert）
// ============================================================
async function upsertChallenge(normalized: ReturnType<typeof normalizeChallengeForDb>): Promise<number | null> {
  await executeQuery(
    `INSERT INTO star_challenges
     (slug, stage_id, topic_name, subtopic_name, level_index, level_title,
      theory_content, latex_formulas, starter_code, solution_code, expected_output,
      difficulty, access_level, tags, test_cases,
      thinking_question, ai_prompt, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      slug            = VALUES(slug),
      topic_name      = VALUES(topic_name),
      level_title     = VALUES(level_title),
      theory_content  = VALUES(theory_content),
      latex_formulas  = VALUES(latex_formulas),
      starter_code    = VALUES(starter_code),
      solution_code   = VALUES(solution_code),
      expected_output = VALUES(expected_output),
      difficulty      = VALUES(difficulty),
      access_level    = VALUES(access_level),
      tags            = VALUES(tags),
      test_cases      = VALUES(test_cases),
      thinking_question = VALUES(thinking_question),
      ai_prompt       = VALUES(ai_prompt),
      status          = VALUES(status)`,
    [
      normalized.slug,
      normalized.stageId,
      normalized.topicName,
      normalized.subtopicName,
      normalized.levelIndex,
      normalized.levelTitle,
      normalized.theoryContent,
      normalized.latexFormulasJson,
      normalized.starterCode,
      normalized.solutionCode,
      normalized.expectedOutput,
      normalized.difficulty,
      normalized.accessLevel,
      normalized.tagsJson,
      normalized.testCasesJson,
      normalized.thinkingQuestion,
      normalized.aiPrompt,
      normalized.status,
    ]
  );

  // 优先按 slug 查，兜底按 (stage_id, subtopic_name, level_index) 查
  let rows = await executeQuery(
    'SELECT id FROM star_challenges WHERE slug = ?',
    [normalized.slug]
  ) as any[];

  if (rows.length === 0) {
    rows = await executeQuery(
      'SELECT id FROM star_challenges WHERE stage_id = ? AND subtopic_name = ? AND level_index = ?',
      [normalized.stageId, normalized.subtopicName, normalized.levelIndex]
    ) as any[];
  }

  return rows.length > 0 ? rows[0].id : null;
}

async function replaceQuizzes(challengeId: number, quizzes: any[]) {
  // 清空旧选择题，插入新题
  await executeQuery('DELETE FROM star_challenge_quizzes WHERE challenge_id = ?', [challengeId]);

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
        quiz.explanation,
      ]
    );
  }
}

// ============================================================
// Main
// ============================================================
async function main() {
  await initDatabase();

  // ---- 迁移 ----
  console.log('\n═══════════════════════════════════════');
  console.log('  第 1 步：数据库迁移');
  console.log('═══════════════════════════════════════');
  await migrateStarChallenges();

  // ---- 加载 ----
  const bankDir = path.join(__dirname, '..', 'challenges_bank');
  if (!fs.existsSync(bankDir)) {
    console.error(`❌ 题库目录不存在: ${bankDir}`);
    process.exit(1);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('  第 2 步：加载题库文件');
  console.log('═══════════════════════════════════════');
  const challenges = loadChallengeBank(bankDir);
  console.log(`  共加载 ${challenges.length} 道题`);

  // ---- 校验 ----
  console.log('\n═══════════════════════════════════════');
  console.log('  第 3 步：校验');
  console.log('═══════════════════════════════════════');
  const errors: string[] = [];
  const valid: any[] = [];

  for (const ch of challenges) {
    try {
      validateChallenge(ch, 'challenges_bank');
      valid.push(ch);
    } catch (e: any) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    console.error(`  ❌ ${errors.length} 道题校验失败:`);
    for (const err of errors) {
      console.error(`     ${err}`);
    }
  } else {
    console.log('  ✅ 全部校验通过');
  }

  // ---- 导入 ----
  console.log('\n═══════════════════════════════════════');
  console.log('  第 4 步：导入数据库');
  console.log('═══════════════════════════════════════');
  let success = 0;
  let skipped = 0;

  for (const ch of valid) {
    try {
      const normalized = normalizeChallengeForDb(ch);
      const challengeId = await upsertChallenge(normalized);
      if (challengeId === null) {
        console.error(`  ❌ 找不到对应记录: ${ch.slug}`);
        skipped++;
        continue;
      }
      await replaceQuizzes(challengeId, normalized.quizzes);
      success++;
      console.log(`  ✅ [${success}/${valid.length}] ${ch.slug}`);
    } catch (e: any) {
      console.error(`  ❌ 导入失败: ${ch.slug} — ${e.message}`);
      skipped++;
    }
  }

  // ---- 报告 ----
  console.log('\n═══════════════════════════════════════');
  console.log('  导入报告');
  console.log('═══════════════════════════════════════');
  console.log(`  总数:     ${challenges.length}`);
  console.log(`  成功:     ${success}`);
  console.log(`  跳过:     ${skipped + errors.length}`);
  if (errors.length > 0) console.log(`  校验失败:  ${errors.length}`);

  console.log('\n🎉 导入完成！');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ 导入失败:', err);
  process.exit(1);
});
