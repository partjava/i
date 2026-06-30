#!/usr/bin/env python3
import os, re

base = '/home/liming/partjava/i'

files = [
    'app/_shared/hooks/useStudyTimer.ts',
    'app/_shared/components/PersistentLearningTracker.tsx',
    'app/_shared/components/LearningTracker.tsx',
    'app/_shared/components/RealTimeLearningTracker.tsx',
    'app/_shared/components/SimpleLearningTracker.tsx',
    'app/notes/page.tsx',
    'app/tools/ai-assistant/page.tsx',
]

for rel in files:
    path = os.path.join(base, rel)
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find lines that have garbled Chinese but no //
    def fix_line(m):
        line = m.group(0)
        stripped = line.lstrip()
        if stripped.startswith('//') or stripped.startswith('*'):
            return line
        # Has Chinese chars but no comment marker
        if any('一' <= c <= '鿿' or ord(c) > 0x80 for c in stripped):
            indent = line[:len(line) - len(stripped)]
            return indent + '// ' + stripped
        return line

    lines = content.split('\n')
    new_lines = []
    for line in lines:
        stripped = line.lstrip()
        # Check if line has Chinese/garbled chars but no comment prefix
        has_chinese = any(ord(c) > 127 for c in stripped)
        if has_chinese and not stripped.startswith('// ') and not stripped.startswith('/*') and not stripped.startswith('*'):
            indent = line[:len(line) - len(stripped)]
            line = indent + '// ' + stripped
        new_lines.append(line)

    new_content = '\n'.join(new_lines)
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed: {rel}')
    else:
        print(f'OK: {rel}')
