# PartJava 个人学习网站

![PartJava Logo](public/logo.png)

**个人学习项目，仅供学习参考，禁止商业用途**

## 项目简介

PartJava 是一个综合性的个人学习平台，专注于编程知识学习、笔记管理和技能提升。该平台集成了笔记系统、学习路径、编程挑战和AI辅助功能，帮助用户系统化地学习编程知识并记录学习过程。

## 主要功能

### 1. 笔记系统

- **个人笔记管理**：创建、编辑、删除和组织个人学习笔记
- **公开/私有设置**：控制笔记的可见性，选择性分享知识
- **分类与标签**：按技术、类别等多维度组织笔记
- **互动功能**：支持点赞、收藏和评论功能

### 2. 学习路径

- **结构化学习内容**：按主题和难度级别组织的学习材料
- **多领域覆盖**：包括Java、Python、前端、后端、AI等多个技术领域
- **进度追踪**：记录学习时间和完成情况
- **学习热力图**：可视化学习活跃度和持续性

### 3. 编程挑战

- **实战编程题**：各种难度的编程挑战
- **在线代码编辑器**：支持多种编程语言的在线编码和测试
- **排行榜系统**：展示挑战完成情况和排名
- **解题分析**：提供详细的解题思路和优化方案

### 4. 用户系统

- **个人资料管理**：自定义用户信息和头像
- **学习统计**：展示学习时间、笔记数量等统计数据
- **成就系统**：基于学习活动解锁各种成就
- **社区互动**：与其他学习者交流和分享

### 5. AI 辅助功能

- **AI 聊天助手**：解答学习过程中的问题
- **代码辅助**：提供代码建议和优化方案
- **学习推荐**：基于学习历史推荐相关内容

## 技术栈

### 前端
- **框架**：Next.js 14 (React)
- **UI 组件**：Ant Design
- **样式**：Tailwind CSS
- **状态管理**：React Context API
- **动画**：Framer Motion

### 后端
- **API 路由**：Next.js API Routes
- **认证**：NextAuth.js
- **数据库**：MySQL
- **ORM**：自定义数据库操作封装

### 数据库设计
- **用户表**：用户信息和认证数据
- **笔记表**：笔记内容和元数据
- **交互表**：点赞、收藏、评论等用户交互
- **学习统计表**：记录学习时间和活动
- **成就表**：用户成就系统

## 安装与运行

### 前提条件
- Node.js 18+ 
- MySQL 8.0+
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/partjava/i.git
cd i
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
创建 `.env.local` 文件，添加以下内容：
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=partjava_notes
DB_PORT=3306
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. 初始化数据库
```bash
# 使用数据库初始化脚本
mysql -u your_db_user -p your_db_password < init_db.sql
```

5. 运行开发服务器
```bash
npm run dev
# 或
yarn dev
```

6. 构建生产版本
```bash
npm run build
npm start
# 或
yarn build
yarn start
```

## 项目结构

```
partjava/
├── app/                    # Next.js 应用主目录
│   ├── api/                # API 路由
│   ├── components/         # 共享组件
│   ├── lib/                # 工具函数和服务
│   │   ├── auth.ts         # 认证配置
│   │   ├── database.ts     # 数据库连接
│   │   ├── repositories/   # 数据访问层
│   │   └── services/       # 业务逻辑层
│   ├── providers/          # React Context 提供者
│   ├── types/              # TypeScript 类型定义
│   └── [各页面目录]/       # 页面组件
├── public/                 # 静态资源
├── styles/                 # 全局样式
├── next.config.js          # Next.js 配置
├── package.json            # 项目依赖
└── README.md               # 项目文档
```

## 数据库表结构

项目使用MySQL数据库，包含以下主要表：

1. **users** - 用户表
2. **notes** - 笔记表
3. **note_likes** - 笔记点赞表
4. **note_bookmarks** - 笔记收藏表
5. **comments** - 评论表
6. **comment_likes** - 评论点赞表
7. **learning_stats** - 学习统计表
8. **study_sessions** - 学习会话表
9. **user_profiles** - 用户资料表
10. **search_history** - 搜索历史表
11. **achievements** - 成就表
12. **user_achievements** - 用户成就表

详细表结构请参考 [mysql.md](mysql.md) 文件。

## 项目截图

![笔记页面](screenshots/notes.png)
![学习路径](screenshots/learning-path.png)
![个人资料](screenshots/profile.png)
![编程挑战](screenshots/challenges.png)

## 未来计划

- [ ] 添加更多学习路径和内容
- [ ] 改进AI助手功能
- [ ] 添加社区讨论功能
- [ ] 支持更多编程语言
- [ ] 移动端适配优化

## 许可说明

**本项目为个人学习项目，仅供学习和参考使用。未经作者明确许可，禁止用于商业目的。**

Copyright © 2023-2025 PartJava