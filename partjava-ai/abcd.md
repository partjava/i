# 游戏开发计划文档

本文档列出了8个待实现的HTML5游戏，所有游戏应放置在`public/partjava-ai/games/`目录下。

## 游戏列表

### 1. 汉诺塔 (tower-of-hanoi.html)

**游戏描述**：
- 经典的汉诺塔游戏，玩家需将圆盘从一根柱子移动到另一根
- 不能将大圆盘放在小圆盘上面
- 每次只能移动一个圆盘

**技术实现**：
- 使用Canvas或DOM元素表示圆盘和柱子
- 实现拖放功能，允许玩家移动圆盘
- 检测非法移动并阻止
- 记录移动次数并与最优解比较

**UI元素**：
- 三根柱子和不同大小的圆盘
- 移动次数计数器
- 难度选择（圆盘数量）
- 重置按钮

### 2. 迷宫探险 (maze-explorer.html)

**游戏描述**：
- 随机生成迷宫，玩家控制角色从起点到达终点
- 可以使用方向键或触摸控制移动
- 设置不同难度级别（迷宫大小）

**技术实现**：
- 使用深度优先搜索或Prim算法生成随机迷宫
- Canvas绘制迷宫和角色
- 碰撞检测防止穿墙
- 计时功能记录完成时间

**UI元素**：
- 迷宫网格
- 玩家角色
- 起点和终点标记
- 计时器和难度选择

### 3. 单词搜索 (word-search.html)

**游戏描述**：
- 在字母网格中寻找隐藏的单词
- 单词可以水平、垂直或对角线排列
- 玩家通过拖动连接字母找出单词

**技术实现**：
- 随机生成字母网格并隐藏预定义单词
- 实现拖动选择功能
- 验证选择的字母是否组成有效单词
- 高亮显示已找到的单词

**UI元素**：
- 字母网格
- 待查找单词列表
- 计时器
- 难度选择（网格大小和单词数量）

### 4. 打字竞速 (typing-race.html)

**游戏描述**：
- 显示单词或句子，玩家需要快速准确地输入
- 计算打字速度（WPM）和准确率
- 不同难度级别提供不同长度和复杂度的文本

**技术实现**：
- 文本显示和输入比对
- 实时计算打字速度和准确率
- 高亮显示错误输入
- 计时功能

**UI元素**：
- 目标文本显示区
- 输入框
- 速度和准确率指示器
- 计时器和难度选择

### 5. 找茬游戏 (spot-difference.html)

**游戏描述**：
- 展示两张相似的图片，玩家需找出它们之间的差异
- 点击差异处得分
- 设置时间限制增加挑战性

**技术实现**：
- 预设图片对和差异点坐标
- 点击检测判断是否找到差异
- 高亮显示已找到的差异
- 计时和计分功能

**UI元素**：
- 两张并排显示的图片
- 找到差异数/总差异数显示
- 计时器
- 提示按钮（可选）

### 6. 水管连接 (pipe-connect.html)

**游戏描述**：
- 旋转管道片段创建从起点到终点的连续路径
- 点击管道片段旋转它们
- 当所有管道连接正确时完成关卡

**技术实现**：
- 随机生成有解的管道布局
- 实现管道旋转动画
- 路径验证算法检查连接是否完成
- 关卡进度系统

**UI元素**：
- 网格化的管道布局
- 起点和终点标记
- 关卡指示器
- 重置和提示按钮

### 7. 填色游戏 (color-by-number.html)

**游戏描述**：
- 根据数字提示在网格中填充颜色
- 完成后显示完整图案
- 提供多种图案选择

**技术实现**：
- 预设图案数据（网格和颜色映射）
- 点击填色功能
- 自动检查填色是否正确
- 保存进度功能

**UI元素**：
- 带数字的网格
- 颜色选择面板
- 进度指示器
- 图案选择菜单

### 8. 猜谜游戏 (riddle-game.html)

**游戏描述**：
- 显示谜题，玩家输入答案
- 提供提示系统帮助解谜
- 多种谜题类型（文字谜、逻辑题等）

**技术实现**：
- 谜题数据库
- 答案验证系统（支持同义词和近似匹配）
- 提示解锁机制
- 进度跟踪

**UI元素**：
- 谜题显示区
- 答案输入框
- 提示按钮和提示显示区
- 计分和进度指示器

## 开发规范

所有游戏应遵循以下规范：

1. **尺寸标准**：
   - 游戏容器：500×600像素
   - 游戏画布：450×450像素
   - 使用响应式设计：`<meta name="viewport" content="width=device-width, initial-scale=1" />`

2. **样式规范**：
   - 标题：24px，颜色#4f8cff
   - 分数显示：1.4em，加粗
   - 提示文本：1.1em，颜色#666
   - 按钮：圆角6px，内边距12px 24px
   - 阴影效果：`box-shadow: 0 4px 16px rgba(0,0,0,0.2)`

3. **HTML结构**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>游戏名称</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { background: #f4f6fa; margin: 0; font-family: 'Segoe UI', Arial, sans-serif; }
    h2 { text-align: center; margin-top: 20px; color: #4f8cff; font-size: 24px; }
    #game-canvas { display: block; margin: 20px auto 0 auto; background: #适当颜色; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
    #score { text-align: center; font-size: 1.4em; color: #333; margin-top: 15px; font-weight: bold; }
    #tip { text-align: center; color: #666; margin-top: 10px; font-size: 1.1em; }
    .game-container { width: 500px; height: 600px; padding: 20px; box-sizing: border-box; margin: 0 auto; }
    /* 游戏特定样式 */
  </style>
</head>
<body>
  <div class="game-container">
    <h2>游戏名称</h2>
    <canvas id="game-canvas" width="450" height="450"></canvas>
    <div id="score">分数: 0</div>
    <div id="tip">操作提示</div>
  </div>
  <script>
    // 游戏代码
  </script>
</body>
</html>
```

## 实现优先级

建议按照以下顺序实现游戏：

1. 打字竞速 (相对简单，主要是文本处理)
2. 填色游戏 (基于网格的简单交互)
3. 汉诺塔 (经典算法，交互相对简单)
4. 猜谜游戏 (主要是内容和验证逻辑)
5. 单词搜索 (需要拖动选择功能)
6. 水管连接 (需要旋转和路径验证)
7. 迷宫探险 (需要迷宫生成算法)
8. 找茬游戏 (需要准备图片资源) 