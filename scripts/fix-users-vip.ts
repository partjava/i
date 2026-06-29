import { initDatabase, executeQuery } from '../app/lib/database';

async function main() {
  await initDatabase();
  const cols = await executeQuery('SHOW COLUMNS FROM users') as any[];
  const names = cols.map((c: any) => c.Field);

  if (!names.includes('vip')) {
    await executeQuery("ALTER TABLE users ADD COLUMN vip VARCHAR(50) DEFAULT 'free' COMMENT '会员等级'");
    console.log('+ Added vip');
  }
  if (!names.includes('vip_level')) {
    await executeQuery("ALTER TABLE users ADD COLUMN vip_level INT DEFAULT 0 COMMENT '会员等级数值'");
    console.log('+ Added vip_level');
  }
  if (!names.includes('vip_expire_time')) {
    await executeQuery("ALTER TABLE users ADD COLUMN vip_expire_time DATETIME NULL COMMENT '会员到期时间'");
    console.log('+ Added vip_expire_time');
  }
  console.log('✅ Done');
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
