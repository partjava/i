import { executeQuery } from '../app/lib/database';
import { STAGES } from '../app/challenges/data/stages';
import { seedChallengesIfNeeded } from '../app/lib/seedChallenges';

// 我们需要从原来的 seedChallenges 中读取所有子话题配置，但排除已覆盖的这两个
export async function seedRemainingChallenges() {
  // 可以利用 seedChallenges 中的默认行为，先注入全部 107 个默认关卡
  // 然后排除我们要单独覆盖的两个小节
  
  // 1. 先查询这 107 个默认话题
  // 为了不冲突，我们直接在数据库层面进行操作
  // 我们可以临时备份，但更简单的是，在 syncFromFiles 清理完之后，我们调用原来的导入逻辑，然后把“计算机组成原理”和“操作系统”的旧行删除，只保留其他行！
  // 哇！这太聪明了！
  
  console.log('正在生成兜底占位数据...');
  await seedChallengesIfNeeded();
  
  // 2. 删除“计算机组成原理”和“操作系统”的一级占位行（它们的 level_index 是 1 且没有被详细配置覆盖过）
  // 这样它们在接下来物理覆盖时就不会有冲突
  console.log('清理将被覆盖的旧小节记录...');
  await executeQuery(`
    DELETE FROM star_challenge_quizzes 
    WHERE challenge_id IN (
      SELECT id FROM star_challenges 
      WHERE subtopic_name IN ('计算机组成原理', '操作系统')
    )
  `);
  
  await executeQuery(`
    DELETE FROM star_challenges 
    WHERE subtopic_name IN ('计算机组成原理', '操作系统')
  `);
}
