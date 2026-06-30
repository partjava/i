#!/usr/bin/env python3
"""修复 GBK → UTF-8 编码损坏的中文注释"""
import os, re, sys

base = '/home/liming/partjava/i'

# 需要修复的文件
files = [
    'app/_shared/hooks/useStudyTimer.ts',
    'app/_shared/components/PersistentLearningTracker.tsx',
    'app/_shared/components/LearningTracker.tsx',
    'app/_shared/components/RealTimeLearningTracker.tsx',
    'app/_shared/components/SimpleLearningTracker.tsx',
    'app/notes/page.tsx',
    'app/tools/ai-assistant/page.tsx',
]

def fix_mojibake(text):
    """尝试将 GBK→UTF-8 乱码恢复为中文"""
    try:
        # 将乱码文本按 Latin-1 编码成字节，再按 GBK 解码
        raw = text.encode('latin-1', errors='replace')
        return raw.decode('gbk')
    except:
        return text

def fix_line(line):
    """修复一行中的乱码中文"""
    # 只处理 // 注释中的内容
    if '//' in line:
        before, after = line.split('//', 1)
        # 只修复注释部分
        fixed = fix_mojibake(after)
        if fixed != after:
            return before + '//' + fixed
    return line

for rel in files:
    path = os.path.join(base, rel)
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = '\n'.join(fix_line(l) for l in content.split('\n'))

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'✅ {rel}')
    else:
        print(f'  {rel} (无变化)')
