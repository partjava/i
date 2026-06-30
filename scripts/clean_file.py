#!/usr/bin/env python3
"""重新读取并写出文件，清理不可见字符"""
path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'
with open(path, 'rb') as f:
    data = f.read()

# Write back as clean UTF-8
with open(path, 'w', encoding='utf-8') as f:
    text = data.decode('utf-8')
    # Remove any null bytes
    text = text.replace('\0', '')
    f.write(text)

print('Done')
