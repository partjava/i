# PartJava 个人学习网站

![网站主页导航](https://github.com/partjava/i/blob/main/public/images/sad/tools-direct-access.png)
**主页是专业软件官网，方便查询**

**个人学习项目，仅供学习参考，禁止商业用途**

## 🌟 项目亮点

### ✨ 为什么选择 PartJava？

- **🎯 一站式学习平台**：集成笔记管理、学习路径、编程挑战和AI助手于一体
- **📚 结构化学习**：提供系统化的学习路径，从基础到进阶，循序渐进
- **🤖 AI智能辅助**：内置AI聊天助手，随时解答学习疑问，提供代码建议
- **💻 实战编程**：在线代码编辑器支持多语言，实时测试和调试
- **📊 学习可视化**：学习热力图、进度追踪，让学习过程一目了然
- **🏆 成就系统**：通过完成学习任务解锁成就，激发学习动力
- **👥 社区互动**：笔记分享、点赞评论，与其他学习者交流经验

### 🚀 技术特色

- **响应式设计**：完美适配桌面端和移动端
- **组件化架构**：高度模块化，易于维护和扩展
- **数据库优化**：MySQL + 自定义ORM，查询效率高
- **安全认证**：NextAuth.js 提供完整的用户认证体系
- **在线代码执行**：集成Judge0 API，支持多语言在线编译运行

## 📖 项目简介

PartJava 是一个专为程序员打造的全方位学习平台，旨在帮助开发者建立系统化的知识体系，提升编程技能。无论你是初学者还是资深开发者，都能在这里找到适合自己的学习内容和挑战。

平台的核心价值在于将**理论学习**与**实践应用**完美结合，通过笔记管理记录学习心得，通过编程挑战验证技能掌握，通过AI助手解决疑难问题，最终形成完整的学习闭环。

## 🎯 适用人群

- **编程初学者**：通过结构化学习路径快速入门，建立编程思维
- **在校学生**：系统学习编程知识，为求职和项目开发做准备
- **职场开发者**：持续学习新技术，提升技能水平
- **技术爱好者**：记录学习心得，分享技术见解
- **自学者**：需要系统化学习资源和学习进度管理

## 💡 使用场景

- **📝 知识整理**：将学习过程中的知识点系统化记录和整理
- **🔄 技能提升**：通过编程挑战和实战项目提升编程能力
- **🤔 问题解决**：遇到技术难题时，AI助手提供即时帮助
- **📈 进度跟踪**：可视化学习进度，保持学习动力
- **👥 经验分享**：与其他开发者交流学习心得和技术见解
- **🎓 求职准备**：通过系统学习和项目实践为技术面试做准备

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
- **代码执行**：Judge0 API 集成
- **文件处理**：Node.js 文件系统操作

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

## 📁 项目结构

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
├── docs/                   # 项目文档
│   ├── CODE_EDITOR_SETUP.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── FEATURES.md
│   ├── HOW_TO_USE.md
│   ├── JUDGE0_SETUP.md
│   ├── MYSQL_SETUP.md
│   └── ONLINE_CODE_EXECUTION.md
├── scripts/                # 数据库和工具脚本
│   ├── init-database.js
│   ├── setup-database.js
│   ├── check-*.js          # 数据检查脚本
│   └── *.sql               # SQL 脚本文件
├── lib/                    # 共享库文件
├── types/                  # TypeScript 类型定义
├── public/                 # 静态资源和项目介绍图集
├── logs/                   # 日志文件
├── partjava-ai/            # AI 相关功能
├── middleware.ts           # Next.js 中间件
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── package.json            # 项目依赖
├── mysql.md                # 数据库文档
├── 项目说明文档.md         # 详细项目说明
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


![学习内容页面](https://github.com/partjava/i/blob/main/public/images/sad/study-content.png)
![主页截图](https://github.com/partjava/i/blob/main/public/images/sad/user-profile.png)
![学习页面截图](https://github.com/partjava/i/blob/main/public/images/sad/study-page.png)
![笔记管理截图](https://github.com/partjava/i/blob/main/public/images/sad/notes-management.png)
![编程挑战截图](https://github.com/partjava/i/blob/main/public/images/sad/coding-challenges.png)
![3D机器人展示](https://github.com/partjava/i/blob/main/public/images/sad/ai-3d-robot.png)
![项目实战教学](https://github.com/partjava/i/blob/main/public/images/sad/project-practice.png)

## 未来计划

- [ ] 添加更多学习路径和内容
- [ ] 改进AI助手功能
- [ ] 添加社区讨论功能
- [ ] 支持更多编程语言
- [ ] 移动端适配优化

## 许可说明

**本项目为个人学习项目，仅供学习和参考使用。未经作者明确许可，禁止用于商业目的。**

Copyright © 2024-2025 PartJava