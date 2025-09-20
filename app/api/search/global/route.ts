export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

// 课程数据结构
const courseData = {
  programming: [
    { name: 'Python编程入门', category: '编程语言', path: '/study/python/intro', description: '学习Python基础语法和编程概念' },
    { name: 'Python基础语法', category: '编程语言', path: '/study/python/basic', description: 'Python变量、数据类型、运算符等基础内容' },
    { name: 'Python数据类型', category: '编程语言', path: '/study/python/datatypes', description: '深入了解Python的各种数据类型' },
    { name: 'Python控制结构', category: '编程语言', path: '/study/python/control', description: '条件语句、循环、异常处理等控制结构' },
    { name: 'Python函数编程', category: '编程语言', path: '/study/python/functions', description: '函数定义、参数传递、递归等概念' },
    { name: 'Python面向对象', category: '编程语言', path: '/study/python/oop', description: '类、对象、继承、多态等面向对象编程' },
    { name: 'Python文件操作', category: '编程语言', path: '/study/python/file-io', description: '文件读写、路径操作、数据持久化' },
    { name: 'Python异常处理', category: '编程语言', path: '/study/python/exceptions', description: '错误处理机制和调试技巧' },
    { name: 'Python标准库', category: '编程语言', path: '/study/python/stdlib', description: '常用标准库和模块使用' },
    { name: 'Python包管理', category: '编程语言', path: '/study/python/packages', description: 'pip、虚拟环境、包发布等' },
    { name: 'Python项目实战', category: '编程语言', path: '/study/python/projects', description: '完整项目开发和最佳实践' }
  ],
  java: [
    { name: 'Java编程入门', category: '编程语言', path: '/study/java/intro', description: '学习Java基础语法和面向对象编程' },
    { name: 'Java基础语法', category: '编程语言', path: '/study/java/basic', description: 'Java变量、数据类型、运算符等基础' },
    { name: 'Java控制结构', category: '编程语言', path: '/study/java/control', description: 'Java条件语句、循环控制等' },
    { name: 'Java面向对象', category: '编程语言', path: '/study/java/oop', description: '类、对象、继承、多态、封装等OOP概念' },
    { name: 'Java集合框架', category: '编程语言', path: '/study/java/collections', description: 'List、Set、Map等集合的使用' },
    { name: 'Java异常处理', category: '编程语言', path: '/study/java/exceptions', description: 'try-catch、自定义异常等' },
    { name: 'Java文件IO', category: '编程语言', path: '/study/java/file-io', description: '文件读写、流操作、NIO等' },
    { name: 'Java网络编程', category: '编程语言', path: '/study/java/network', description: 'Socket编程、HTTP客户端等' },
    { name: 'Java多线程', category: '编程语言', path: '/study/java/thread', description: '线程创建、同步、线程池等' },
    { name: 'Java项目实战', category: '编程语言', path: '/study/java/projects', description: 'Spring Boot项目开发实践' }
  ],
  frontend: [
    { name: '前端开发概览', category: '前端开发', path: '/study/frontend', description: 'Web前端开发技术栈和发展趋势' },
    { name: 'HTML基础', category: '前端开发', path: '/study/frontend/html', description: 'HTML标签、语义化、表单等基础知识' },
    { name: 'CSS样式设计', category: '前端开发', path: '/study/frontend/css', description: 'CSS选择器、盒模型、布局等样式技术' },
    { name: 'JavaScript基础', category: '前端开发', path: '/study/frontend/js', description: 'JS语法、DOM操作、事件处理等' },
    { name: 'React框架', category: '前端开发', path: '/study/frontend/react', description: 'React组件、状态管理、路由等' },
    { name: 'Vue框架', category: '前端开发', path: '/study/frontend/vue', description: 'Vue基础、组件开发、Vuex等' }
  ],
  ai: [
    { name: '机器学习基础', category: '人工智能', path: '/study/ai/ml', description: '机器学习算法、模型训练、特征工程' },
    { name: '深度学习', category: '人工智能', path: '/study/ai/dl', description: '神经网络、深度学习框架、模型优化' },
    { name: '计算机视觉', category: '人工智能', path: '/study/ai/cv', description: '图像处理、目标检测、图像识别' },
    { name: '自然语言处理', category: '人工智能', path: '/study/ai/nlp', description: 'NLP技术、文本分析、语言模型' },
    { name: '推荐系统', category: '人工智能', path: '/study/ai/recsys', description: '协同过滤、内容推荐、个性化算法' },
    { name: '强化学习', category: '人工智能', path: '/study/ai/rl', description: 'Q-learning、策略梯度、强化学习应用' }
  ],
  system: [
    { name: '数据结构与算法', category: '计算机基础', path: '/study/ds', description: '数组、链表、树、图、排序、搜索算法' },
    { name: '操作系统', category: '计算机基础', path: '/study/os', description: '进程管理、内存管理、文件系统等' },
    { name: '计算机网络', category: '计算机基础', path: '/study/network', description: 'TCP/IP、HTTP、网络协议、网络安全' },
    { name: 'Linux系统', category: '计算机基础', path: '/study/linux', description: 'Linux命令、Shell脚本、系统管理' },
    { name: '数据库技术', category: '计算机基础', path: '/study/sql', description: 'SQL语法、数据库设计、查询优化' }
  ]
};

// 工具数据（从首页提取）
const toolsData = [
  // 编程开发工具
  { name: 'VS Code', category: '编程开发', description: '主流免费代码编辑器', url: 'https://code.visualstudio.com/' },
  { name: 'PyCharm', category: '编程开发', description: 'Python开发IDE', url: 'https://www.jetbrains.com/pycharm/' },
  { name: 'IntelliJ IDEA', category: '编程开发', description: 'Java/Kotlin等开发IDE', url: 'https://www.jetbrains.com/idea/' },
  { name: 'Eclipse', category: '编程开发', description: '经典Java开发IDE', url: 'https://www.eclipse.org/' },
  { name: 'Git', category: '编程开发', description: '分布式版本控制', url: 'https://git-scm.com/' },
  { name: 'GitHub', category: '编程开发', description: '代码托管平台', url: 'https://github.com/' },
  { name: 'Python', category: '编程开发', description: '主流编程语言', url: 'https://www.python.org/' },
  { name: 'Node.js', category: '编程开发', description: 'JavaScript运行环境', url: 'https://nodejs.org/' },
  
  // 数据库工具
  { name: 'MySQL', category: '数据库', description: '流行的关系型数据库', url: 'https://www.mysql.com/' },
  { name: 'MongoDB', category: '数据库', description: 'NoSQL数据库', url: 'https://www.mongodb.com/' },
  { name: 'Redis', category: '数据库', description: '高性能缓存数据库', url: 'https://redis.io/' },
  
  // 学习平台
  { name: 'LeetCode', category: '学习平台', description: '算法刷题平台', url: 'https://leetcode.cn/' },
  { name: 'Codeforces', category: '学习平台', description: '国际算法竞赛平台', url: 'https://codeforces.com/' },
  { name: '牛客网', category: '学习平台', description: '国内算法/面试平台', url: 'https://www.nowcoder.com/' }
];

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'course' | 'tool' | 'note' | 'user';
  path?: string;
  url?: string;
  avatar?: string;
  email?: string;
  github?: string;
  score: number;
}

function searchInText(text: string, query: string): number {
  if (!text || !query) return 0;
  
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // 完全匹配得分最高
  if (textLower.includes(queryLower)) {
    const index = textLower.indexOf(queryLower);
    // 开头匹配得分更高
    return index === 0 ? 100 : 80;
  }
  
  // 分词匹配
  const queryWords = queryLower.split(/\s+/);
  let matchCount = 0;
  
  for (const word of queryWords) {
    if (textLower.includes(word)) {
      matchCount++;
    }
  }
  
  return matchCount > 0 ? (matchCount / queryWords.length) * 60 : 0;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('q')?.trim();
    const type = searchParams.get('type'); // 'all', 'course', 'tool', 'note', 'user'
    const category = searchParams.get('category');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10')));
    const offset = (page - 1) * limit;
    
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        total: 0,
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        },
        message: '请输入至少2个字符进行搜索'
      });
    }

    const results: SearchResult[] = [];

    // 搜索课程内容
    if (!type || type === 'all' || type === 'course') {
      Object.entries(courseData).forEach(([key, courses]) => {
        courses.forEach((course, index) => {
          const titleScore = searchInText(course.name, query);
          const descScore = searchInText(course.description, query) * 0.7;
          const categoryScore = searchInText(course.category, query) * 0.5;
          
          const totalScore = Math.max(titleScore, descScore, categoryScore);
          
          if (totalScore > 0) {
            if (!category || course.category.includes(category)) {
              results.push({
                id: `course_${key}_${index}`,
                title: course.name,
                description: course.description,
                category: course.category,
                type: 'course',
                path: course.path,
                score: totalScore
              });
            }
          }
        });
      });
    }

    // 搜索工具
    if (!type || type === 'all' || type === 'tool') {
      toolsData.forEach((tool, index) => {
        const titleScore = searchInText(tool.name, query);
        const descScore = searchInText(tool.description, query) * 0.7;
        const categoryScore = searchInText(tool.category, query) * 0.5;
        
        const totalScore = Math.max(titleScore, descScore, categoryScore);
        
        if (totalScore > 0) {
          if (!category || tool.category.includes(category)) {
            results.push({
              id: `tool_${index}`,
              title: tool.name,
              description: tool.description,
              category: tool.category,
              type: 'tool',
              url: tool.url,
              score: totalScore
            });
          }
        }
      });
    }

    // 搜索笔记（如果用户已登录）
    if (!type || type === 'all' || type === 'note') {
      try {
        const session = await getServerSession(authOptions);
        if (session?.user?.id) {
          // 先获取笔记总数
          const countResult = await executeQuery(`
            SELECT COUNT(*) as total
            FROM notes n
            WHERE (n.is_public = true OR n.author_id = ?) 
              AND (n.title LIKE ? OR n.content LIKE ? OR n.category LIKE ? OR n.technology LIKE ?)
          `, [
            parseInt(session.user.id),
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`
          ]) as any[];

          const noteCount = countResult[0].total;

          // 获取笔记数据（分页）
          const notes = await executeQuery(`
            SELECT n.id, n.title, n.content, n.category, n.technology, n.subcategory, n.tags, 
                   n.is_public, n.created_at, n.updated_at, u.name as author_name
            FROM notes n
            LEFT JOIN users u ON n.author_id = u.id 
            WHERE (n.is_public = true OR n.author_id = ?) 
              AND (n.title LIKE ? OR n.content LIKE ? OR n.category LIKE ? OR n.technology LIKE ?)
            ORDER BY n.updated_at DESC
            LIMIT ? OFFSET ?
          `, [
            parseInt(session.user.id),
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            Math.min(20, limit), // 限制笔记数量
            0 // 笔记从第一条开始，不受分页影响（因为和其他类型混合排序）
          ]) as any[];

          notes.forEach((note) => {
            const titleScore = searchInText(note.title, query);
            const contentScore = searchInText(note.content, query) * 0.6;
            const categoryScore = searchInText(note.category, query) * 0.8;
            const techScore = searchInText(note.technology, query) * 0.8;
            
            const totalScore = Math.max(titleScore, contentScore, categoryScore, techScore);
            
            if (totalScore > 0) {
              results.push({
                id: `note_${note.id}`,
                title: note.title,
                description: note.content.substring(0, 150) + '...',
                category: `${note.category} - ${note.technology}`,
                type: 'note',
                path: `/notes/${note.id}`,
                score: totalScore
              });
            }
          });
        }
      } catch (error) {
        console.error('搜索笔记出错:', error);
      }
    }

    // 搜索用户
    if (!type || type === 'all' || type === 'user') {
      try {
        // 只查公开用户（可根据需求调整）
        const users = await executeQuery(
          `SELECT id, name, email, github, bio, image
           FROM users
           WHERE 
             (name LIKE ? OR email LIKE ? OR github LIKE ? OR bio LIKE ?)
           LIMIT 20`,
          [
            `%${query}%`,
            `%${query}%`,
            `%${query}%`,
            `%${query}%`
          ]
        ) as any[];

        users.forEach((user) => {
          // 邮箱完全匹配得分高
          const emailScore = user.email === query ? 100 : searchInText(user.email, query) * 1.2;
          const nameScore = searchInText(user.name, query);
          const githubScore = searchInText(user.github, query);
          const bioScore = searchInText(user.bio, query) * 0.7;
          const totalScore = Math.max(emailScore, nameScore, githubScore, bioScore);

          if (totalScore > 0) {
            results.push({
              id: `user_${user.id}`,
              title: user.name || user.email,
              description: user.bio || user.email,
              category: '用户',
              type: 'user',
              avatar: user.image,
              email: user.email,
              github: user.github,
              path: `/profile/${user.id}`,
              score: totalScore
            });
          }
        });
      } catch (error) {
        console.error('搜索用户出错:', error);
      }
    }

    // 按分数排序
    const sortedResults = results.sort((a, b) => b.score - a.score);
    
    // 应用分页
    const totalResults = sortedResults.length;
    const paginatedResults = sortedResults.slice(offset, offset + limit);
    
    // 计算分页信息
    const totalPages = Math.ceil(totalResults / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return NextResponse.json({
      success: true,
      results: paginatedResults,
      total: totalResults,
      pagination: {
        page,
        limit,
        total: totalResults,
        totalPages,
        hasNext,
        hasPrev
      },
      query,
      suggestions: generateSuggestions(query, sortedResults)
    });

  } catch (error) {
    console.error('全局搜索失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '搜索失败，请重试',
        results: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

function generateSuggestions(query: string, results: SearchResult[]): string[] {
  const suggestions: Set<string> = new Set();
  
  // 基于搜索结果生成相关建议
  results.slice(0, 5).forEach(result => {
    // 提取关键词
    const words = result.title.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 2 && !query.toLowerCase().includes(word)) {
        suggestions.add(word);
      }
    });
  });
  
  // 添加一些热门搜索建议
  const hotSuggestions = [
    'python', 'java', 'javascript', 'react', 'vue', 'nodejs',
    'mysql', 'mongodb', 'git', 'linux', 'docker', 'kubernetes',
    '算法', '数据结构', '机器学习', '深度学习', '前端', '后端'
  ];
  
  hotSuggestions.forEach(suggestion => {
    if (suggestion.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(suggestion);
    }
  });
  
  return Array.from(suggestions).slice(0, 8);
}