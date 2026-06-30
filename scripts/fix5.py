#!/usr/bin/env python3
"""修复 handleUnload 函数"""
path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old = """      if (isActive && seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const minutes = Math.floor(seconds / 60);
          time: minutes,
          category: getPageCategory(pathname),
          technology: getPageCategory(pathname),
          description: `在线学习 ${minutes} 分钟`,
        }));
      }

    window.addEventListener('beforeunload', handleUnload);"""

new = """      if (isActive && seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        navigator.sendBeacon('/api/study/sync-time', JSON.stringify({
          time: minutes,
          category: getPageCategory(pathname),
          technology: getPageCategory(pathname),
          description: `在线学习 ${minutes} 分钟`,
        }));
      }
    };

    window.addEventListener('beforeunload', handleUnload);"""

content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
