import { executeQuery } from '../app/lib/database';

async function main() {
  console.log('🔄 Starting database migration for multi-level challenges...');

  try {
    // 1. 查询表结构，判断字段是否存在
    const columns = await executeQuery('SHOW COLUMNS FROM star_challenges') as any[];
    const columnNames = columns.map(c => c.Field);

    // 添加 level_index
    if (!columnNames.includes('level_index')) {
      console.log('正在添加 level_index 字段...');
      await executeQuery(`
        ALTER TABLE star_challenges 
        ADD COLUMN level_index INT NOT NULL DEFAULT 1 COMMENT '小节内的关卡序号'
      `);
    } else {
      console.log('level_index 字段已存在，跳过');
    }

    // 添加 level_title
    if (!columnNames.includes('level_title')) {
      console.log('正在添加 level_title 字段...');
      await executeQuery(`
        ALTER TABLE star_challenges 
        ADD COLUMN level_title VARCHAR(255) DEFAULT '基础关卡' COMMENT '当前关卡标题'
      `);
    } else {
      console.log('level_title 字段已存在，跳过');
    }

    // 2. 检查现有的唯一约束，并更新它
    console.log('正在更新唯一约束，支持 (stage_id, subtopic_name, level_index)...');
    
    // 尝试删除旧的唯一约束 uk_stage_subtopic
    try {
      await executeQuery('ALTER TABLE star_challenges DROP KEY uk_stage_subtopic');
      console.log('成功移除旧的单关卡约束: uk_stage_subtopic');
    } catch (e) {
      console.log('旧的约束 uk_stage_subtopic 不存在或已从表上移除');
    }

    // 尝试添加新的唯一约束 uk_stage_subtopic_level
    try {
      await executeQuery('ALTER TABLE star_challenges ADD UNIQUE KEY uk_stage_subtopic_level (stage_id, subtopic_name, level_index)');
      console.log('成功添加多关卡联合约束: uk_stage_subtopic_level');
    } catch (e) {
      console.log('新的唯一约束已存在，无需重复添加');
    }

    console.log('🎉 数据库迁移成功！');
    process.exit(0);
  } catch (err) {
    console.error('❌ 数据库迁移失败:', err);
    process.exit(1);
  }
}

main();
