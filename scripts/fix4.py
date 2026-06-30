#!/usr/bin/env python3
"""修复 SimpleLearningTracker.tsx 中损坏的代码段"""
import re

path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换损坏的 useEffect 代码块
old_block = """  // 自动保存 - 每分钟保存一次
  useEffect(() => {
      if (isActive && seconds >= 60) {
      if (isActive && seconds >= 60) {
        saveToDatabase(1); // 每次存 1 分钟
      }
    }, 60000); // 1分钟

    return () => clearInterval(saveTimer);

  const getPageCategory = (path: string): string => {"""

new_block = """  // 自动保存 - 每分钟保存一次
  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (isActive && seconds >= 60) {
        saveToDatabase(1);
      }
    }, 60000);
    return () => clearInterval(saveTimer);
  }, [isActive, seconds, todayTotal]);

  const getPageCategory = (path: string): string => {"""

content = content.replace(old_block, new_block)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
