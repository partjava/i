#!/usr/bin/env python3
"""完全重建 SimpleLearningTracker.tsx 的 JSX 部分（去掉被破坏的行）"""
path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Filter out lines that have garbled Chinese in JSX (non-comment lines with high-byte chars)
import re
new_lines = []
for i, line in enumerate(lines):
    stripped = line.lstrip()
    # Keep if it's a comment, import, empty, or has no garbled chars
    if stripped.startswith('//') or stripped.startswith('*') or stripped.startswith('import') or stripped.strip() == '':
        new_lines.append(line)
        continue

    # Check if line has Chinese chars
    has_cjk = any('一' <= c <= '鿿' for c in stripped)
    has_garbled = any(ord(c) > 0x80 and not ('一' <= c <= '鿿') for c in stripped)

    if has_garbled:
        print(f"Removing line {i+1}: {stripped[:60]}")
        continue  # Skip garbled lines
    new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Done. {len(lines)} -> {len(new_lines)} lines")
