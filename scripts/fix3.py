#!/usr/bin/env python3
"""精确修复 SimpleLearningTracker.tsx 中被误删的代码"""
import os

path = '/home/liming/partjava/i/app/_shared/components/SimpleLearningTracker.tsx'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 修复索引从0开始
fixes = {
    # getTodayKey 函数上面的注释
    17: "  // 获取今天的存储key\n",
    # 恢复初始化注释
    23: "  // 初始化 - 从 localStorage 恢复今日总时长\n",
    # 恢复最小化状态注释
    33: "      // 恢复最小化状态\n",
    # console.error 恢复
    37: "      console.error('恢复数据失败:', error);\n",
    # 主计时器注释
    41: "  // 主计时器 - 每秒更新\n",
    # 检查是否还活跃
    48: "      // 检查是否还活跃（30秒内有活动）\n",
    # saveToDatabase 注释
    56: "  // 保存学习时间到数据库\n",
    # 更新今日总时长注释
    60: "    // 更新今日总时长\n",
    # 静默失败注释
    78: "      // 静默失败，不影响用户体验\n",
    # 重置计时器
    81: "    // 重置计时器\n",
    # 自动保存注释
    85: "  // 自动保存 - 每分钟保存一次\n",
    # 修复 useEffect 被删除的代码体
    89: "      if (isActive && seconds >= 60) {\n",
    90: "        saveToDatabase(1); // 每次存 1 分钟\n",
    91: "      }\n",
    92: "    }, 60000); // 1分钟\n",
    93: "\n",
    94: "    return () => clearInterval(saveTimer);\n",
    # 获取页面类别注释
    96: "  // 获取页面类别\n",
    # 修复 getPageCategory 函数体
    98: "    if (path.includes('/notes')) return '笔记';\n",
    99: "    if (path.includes('/profile')) return '个人中心';\n",
    100: "    if (path.includes('/code/editor')) return '代码编辑';\n",
    101: "    if (path.includes('/challenges')) return '编程挑战';\n",
    102: "    if (path.includes('/ai')) return 'AI助手';\n",
    103: "    return '学习';\n",
    104: "  };\n",
    # 活动检测
    106: "  // 活动检测\n",
    # 格式化时间
    112: "  // 格式化时间\n",
    # 页面切换时保存
    119: "  // 页面切换时保存\n",
    # 设置事件监听
    129: "  // 设置事件监听\n",
    # handleUnload 中的 navigator.sendBeacon
    139: "        const minutes = Math.floor(seconds / 60);\n",
    140: "        navigator.sendBeacon('/api/study/sync-time', JSON.stringify({\n",
    141: "          time: minutes,\n",
    142: "          category: getPageCategory(pathname),\n",
    143: "          technology: getPageCategory(pathname),\n",
    144: "          description: `在线学习 ${minutes} 分钟`,\n",
    145: "        }));\n",
    146: "      }\n",
    # 切换最小化
    158: "  // 切换最小化状态\n",
    # 只在登录时显示
    168: "  // 只在登录时显示\n",
    169: "  if (!session?.user?.id) return null;\n",
    # 完全隐藏状态
    174: "  // 完全隐藏状态\n",
    # JSX中的title属性
    180: '        title="显示学习追踪"\n',
    191: "      {/* 简化版 */}\n",
    206: '              title="隐藏"\n',
    217: "      {/* 展开版 */}\n",
    223: '                <span className="text-sm font-mono">本次: {formatTime(seconds)}</span>\n',
    # JSX中更多属性
    207: '              title="隐藏"\n',  # duplicate with above, keep one
    239: '              title="隐藏"\n',
    248: '              今日: {displayTotal}分钟 · {getPageCategory(pathname)}\n',
    251: '              活跃中 | 点击展开\n',
}

for idx, new_content in fixes.items():
    if 0 <= idx < len(lines):
        lines[idx] = new_content

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('✅ SimpleLearningTracker.tsx 修复完成')
