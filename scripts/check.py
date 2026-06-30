#!/usr/bin/env python3
"""检查 SimpleLearningTracker.tsx 的括号匹配"""
path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'
with open(path) as f:
    lines = f.readlines()

# Count braces
stack = []
for i, line in enumerate(lines, 1):
    for ch in line:
        if ch in '({[':
            stack.append((ch, i))
        elif ch in ')}]':
            if not stack:
                print(f'Line {i}: Extra closing {ch}')
            else:
                open_ch = stack.pop()[0]
                expected = {'(': ')', '{': '}', '[': ']'}[open_ch]
                if ch != expected:
                    print(f'Line {i}: Mismatch: {open_ch} vs {ch}')

if stack:
    print(f'Unclosed brackets: {stack}')
else:
    print('All brackets matched!')
