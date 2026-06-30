#!/usr/bin/env python3
"""修复被编码问题损坏的中文注释 — 将"// 乱码注释代码"拆成两行"""
import re
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 这些是 TypeScript 关键字/标识符，如果出现在注释后面说明代码被吞了
CODE_STARTERS = (
    'const ', 'let ', 'var ', 'function ', 'useEffect', 'useState',
    'useCallback', 'useMemo', 'useRef', 'useContext', 'useReducer',
    'export ', 'import ', 'return ', 'if ', 'for ', 'while ',
    'switch ', 'async ', 'await ', 'throw ', 'try ', 'catch ',
    'class ', 'interface ', 'type ', 'enum ', 'default ',
)

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    changed = False
    new_lines = []
    for line in lines:
        new_lines.append(line)
        # 检查是否是 "// 乱码 代码" 在同一行
        stripped = line.lstrip()
        if stripped.startswith('// '):
            # 去掉行首空白 + //
            after_slash = stripped[3:]
            # 检查是否包含多字节字符（中文乱码）
            has_garbled = any(ord(c) > 127 for c in after_slash)
            if has_garbled:
                # 检查是否有代码关键字跟在注释后面（用空格或TAB间隔）
                for starter in CODE_STARTERS:
                    # 在注释文本中查找代码关键字
                    idx = after_slash.find(starter)
                    if idx > 0:
                        # 确认关键字前面只有空格/TAB/标点，不是字母（防止匹配到注释内的文字）
                        before = after_slash[idx-1] if idx > 0 else ''
                        if before in (' ', '\t', '，', '。', '？', '！', '）', '、', '；', ':', ';', ')'):
                            indent = line[:len(line) - len(stripped)]
                            # 将行拆分为注释行 + 代码行
                            comment = line[:len(line) - len(stripped)] + after_slash[:idx].rstrip()
                            code = indent + after_slash[idx:]
                            new_lines[-1] = comment + '\n' + code
                            changed = True
                            break

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f'  ✅ 已修复: {os.path.relpath(filepath, BASE)}')
        return True
    return False

def main():
    # 需要修复的文件列表（已知有问题的）
    targets = [
        'app/_shared/hooks/useStudyTimer.ts',
        'app/_shared/components/PersistentLearningTracker.tsx',
        'app/_shared/components/LearningTracker.tsx',
        'app/_shared/components/RealTimeLearningTracker.tsx',
        'app/_shared/components/SimpleLearningTracker.tsx',
        'app/notes/page.tsx',
        'app/tools/ai-assistant/page.tsx',
    ]

    print('🔍 扫描并修复合并的注释/代码行...\n')
    count = 0
    for rel in targets:
        path = os.path.join(BASE, rel)
        if os.path.exists(path):
            if fix_file(path):
                count += 1
        else:
            print(f'  ⚠️  文件不存在: {rel}')

    print(f'\n✅ 完成！修复了 {count} 个文件')

if __name__ == '__main__':
    main()
