const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/lib/seedChallenges.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 找到 STAGE_1_CONFIGS 的起始与结束
const startMarker = '// ===========================const STAGE_1_CONFIGS';
const endMarker = '// ==========================================\n// STAGE 2:';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find markers in seedChallenges.ts!");
  process.exit(1);
}

// 在最上面加入 import
const importStr = "import { STAGE_1_CONFIGS } from './challenges/stage1';\n";
content = importStr + content;

// 重新计算索引（因为最上面加了 importStr）
const newStartIndex = content.indexOf(startMarker);
const newEndIndex = content.indexOf(endMarker);

// 用新的注释占位符替换掉原来的 STAGE_1_CONFIGS 整个大对象定义
const replacement = `// STAGE 1: 基础知识 (14 subtopics) - Loaded from challenges/stage1.ts\n`;
content = content.substring(0, newStartIndex) + replacement + content.substring(newEndIndex);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Refactored seedChallenges.ts successfully!");
