const mysql = require('mysql2/promise');
require('dotenv').config();

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'ecs-user',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'partjava_notes'
};

// 示例挑战数据
const challenges = [
  {
    title: '两数之和',
    description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。',
    difficulty: 'easy',
    category: '数组',
    points: 10,
    test_cases: JSON.stringify([
      { input: [[2,7,11,15], 9], output: [0,1] },
      { input: [[3,2,4], 6], output: [1,2] }
    ]),
    starter_code: 'function twoSum(nums, target) {\n  // 在这里编写你的代码\n}',
    solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}'
  },
  {
    title: '反转字符串',
    description: '编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。',
    difficulty: 'easy',
    category: '字符串',
    points: 10,
    test_cases: JSON.stringify([
      { input: [['h','e','l','l','o']], output: ['o','l','l','e','h'] },
      { input: [['H','a','n','n','a','h']], output: ['h','a','n','n','a','H'] }
    ]),
    starter_code: 'function reverseString(s) {\n  // 在这里编写你的代码\n}',
    solution: 'function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n  return s;\n}'
  },
  {
    title: '有效的括号',
    description: '给定一个只包括 \'(\'，\')\'，\'{\',\'}\',\'[\',\']\' 的字符串 s ，判断字符串是否有效。',
    difficulty: 'easy',
    category: '栈',
    points: 15,
    test_cases: JSON.stringify([
      { input: ['()'], output: true },
      { input: ['()[]{}'], output: true },
      { input: ['(]'], output: false }
    ]),
    starter_code: 'function isValid(s) {\n  // 在这里编写你的代码\n}',
    solution: 'function isValid(s) {\n  const stack = [];\n  const map = { \')\': \'(\', \'}\': \'{\', \']\': \'[\' };\n  for (let char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}'
  },
  {
    title: '合并两个有序链表',
    description: '将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。',
    difficulty: 'medium',
    category: '链表',
    points: 20,
    test_cases: JSON.stringify([
      { input: [[1,2,4], [1,3,4]], output: [1,1,2,3,4,4] },
      { input: [[], []], output: [] }
    ]),
    starter_code: 'function mergeTwoLists(l1, l2) {\n  // 在这里编写你的代码\n}',
    solution: 'function mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val < l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoLists(l1, l2.next);\n    return l2;\n  }\n}'
  },
  {
    title: '最长公共前缀',
    description: '编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。',
    difficulty: 'easy',
    category: '字符串',
    points: 10,
    test_cases: JSON.stringify([
      { input: [['flower','flow','flight']], output: 'fl' },
      { input: [['dog','racecar','car']], output: '' }
    ]),
    starter_code: 'function longestCommonPrefix(strs) {\n  // 在这里编写你的代码\n}',
    solution: 'function longestCommonPrefix(strs) {\n  if (!strs.length) return "";\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.slice(0, -1);\n      if (!prefix) return "";\n    }\n  }\n  return prefix;\n}'
  }
];

async function seedChallenges() {
  let connection;
  
  try {
    console.log('🔗 连接数据库...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ 数据库连接成功');

    // 检查表是否存在
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'challenges'"
    );
    
    if (tables.length === 0) {
      console.log('❌ challenges 表不存在，请先运行 npm run db:init');
      process.exit(1);
    }

    // 检查是否已有数据
    const [existing] = await connection.execute('SELECT COUNT(*) as count FROM challenges');
    if (existing[0].count > 0) {
      console.log(`ℹ️  已存在 ${existing[0].count} 个挑战，跳过插入`);
      return;
    }

    // 插入挑战数据
    console.log('📝 插入挑战数据...');
    for (const challenge of challenges) {
      await connection.execute(
        `INSERT INTO challenges (title, description, difficulty, category, points, test_cases, starter_code, solution)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          challenge.title,
          challenge.description,
          challenge.difficulty,
          challenge.category,
          challenge.points,
          challenge.test_cases,
          challenge.starter_code,
          challenge.solution
        ]
      );
      console.log(`  ✓ ${challenge.title}`);
    }

    console.log(`✅ 成功插入 ${challenges.length} 个挑战`);

  } catch (error) {
    console.error('❌ 插入挑战数据失败:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔗 数据库连接已关闭');
    }
  }
}

// 运行脚本
if (require.main === module) {
  seedChallenges();
}

module.exports = { seedChallenges };
