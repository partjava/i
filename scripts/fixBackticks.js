const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/lib/challenges/stage1.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 将 `task_struct` 替换为 \`task_struct\`
const target = '内核为每个运行的进程维护一个结构体 `task_struct` (PCB)';
const replacement = '内核为每个运行的进程维护一个结构体 \\`task_struct\\` (PCB)';

if (!content.includes(target)) {
  console.error("Target string not found in stage1.ts!");
  process.exit(1);
}

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf-8');
console.log("Escaped backticks in stage1.ts successfully!");
