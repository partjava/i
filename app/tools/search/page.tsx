'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Card, Button, Tabs, Tag, Empty, Spin, Radio, Select } from 'antd';
import {
  SearchOutlined,
  BookOutlined,
  ToolOutlined,
  FileTextOutlined,
  LinkOutlined,
  FilterOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { navigationItems } from '@shared/data/navigation';
import InkWashDecoration from '@shared/components/InkWashDecoration';

const { Search } = Input;

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'course' | 'tool' | 'note';
  path?: string;
  url?: string;
  score: number;
}

interface SearchResponse {
  success: boolean;
  results: SearchResult[];
  total: number;
  query: string;
  suggestions: string[];
  message?: string;
}

function SearchContent() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('query') || '';

  useEffect(() => {
    if (initialQuery) {
      setCurrentQuery(initialQuery);
      performSearch(initialQuery, selectedType, selectedCategory);
    }
  }, [initialQuery, selectedType, selectedCategory]);

  const performSearch = async (query: string, type: string = 'all', category: string = '') => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setTotal(0);
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const results: SearchResult[] = [];
    const seen = new Set<string>();

    // 0. 搜索本地工具 (software tools)
    const toolsData: { name: string; desc: string; url: string }[] = [
      { name:'VS Code', desc:'主流免费代码编辑器', url:'https://code.visualstudio.com/' },
      { name:'PyCharm', desc:'Python开发IDE', url:'https://www.jetbrains.com/pycharm/' },
      { name:'IntelliJ IDEA', desc:'Java/Kotlin等开发IDE', url:'https://www.jetbrains.com/idea/' },
      { name:'Eclipse', desc:'经典Java开发IDE', url:'https://www.eclipse.org/' },
      { name:'CLion', desc:'C/C++开发IDE', url:'https://www.jetbrains.com/clion/' },
      { name:'GoLand', desc:'Go开发IDE', url:'https://www.jetbrains.com/go/' },
      { name:'PHPStorm', desc:'PHP开发IDE', url:'https://www.jetbrains.com/phpstorm/' },
      { name:'WebStorm', desc:'前端开发IDE', url:'https://www.jetbrains.com/webstorm/' },
      { name:'Android Studio', desc:'安卓开发IDE', url:'https://developer.android.com/studio/' },
      { name:'Vim', desc:'强大命令行编辑器', url:'https://www.vim.org/' },
      { name:'Git', desc:'分布式版本控制', url:'https://git-scm.com/' },
      { name:'GitHub', desc:'代码托管平台', url:'https://github.com/' },
      { name:'Node.js', desc:'JavaScript运行环境', url:'https://nodejs.org/' },
      { name:'Python', desc:'主流编程语言', url:'https://www.python.org/' },
      { name:'Java', desc:'主流编程语言', url:'https://www.oracle.com/java/' },
      { name:'Go', desc:'高效编程语言', url:'https://go.dev/' },
      { name:'PHP', desc:'Web后端开发语言', url:'https://www.php.net/' },
      { name:'C++', desc:'高性能编程语言', url:'https://isocpp.org/' },
      { name:'JavaScript', desc:'前端/全栈开发语言', url:'https://developer.mozilla.org/docs/Web/JavaScript' },
      { name:'TypeScript', desc:'强类型JS超集', url:'https://www.typescriptlang.org/' },
      { name:'React', desc:'前端UI框架', url:'https://react.dev/' },
      { name:'Vue', desc:'前端UI框架', url:'https://vuejs.org/' },
      { name:'MySQL', desc:'关系型数据库', url:'https://www.mysql.com/' },
      { name:'PostgreSQL', desc:'开源关系型数据库', url:'https://www.postgresql.org/' },
      { name:'MongoDB', desc:'NoSQL文档数据库', url:'https://www.mongodb.com/' },
      { name:'Redis', desc:'内存缓存数据库', url:'https://redis.io/' },
      { name:'Docker', desc:'容器化平台', url:'https://www.docker.com/' },
      { name:'Kubernetes', desc:'容器编排平台', url:'https://kubernetes.io/' },
      { name:'TensorFlow', desc:'深度学习框架', url:'https://www.tensorflow.org/' },
      { name:'PyTorch', desc:'深度学习框架', url:'https://pytorch.org/' },
      { name:'Spring', desc:'Java企业级框架', url:'https://spring.io/' },
      { name:'Flutter', desc:'跨平台UI框架', url:'https://flutter.dev/' },
      { name:'LeetCode', desc:'算法刷题平台', url:'https://leetcode.com/' },
      { name:'Wireshark', desc:'网络抓包工具', url:'https://www.wireshark.org/' },
      { name:'Postman', desc:'API测试工具', url:'https://www.postman.com/' },
      { name:'Linux', desc:'开源操作系统', url:'https://www.linux.org/' },
      { name:'Nginx', desc:'高性能Web服务器', url:'https://nginx.org/' },
    ];
    toolsData.forEach(tool => {
      if (tool.name.toLowerCase().includes(q) || tool.desc.toLowerCase().includes(q)) {
        const tk = `tool-${tool.name}`;
        if (seen.has(tk)) return;
        seen.add(tk);
        results.push({
          id: tk, title: tool.name, description: tool.desc,
          category: '工具', type: 'tool', url: tool.url, score: 0.6,
        } as SearchResult);
      }
    });

    // 1. 搜索本地学习课程 (navigationItems)
    Object.entries(navigationItems).forEach(([subject, items]) => {
      items.forEach((item) => {
        const match = item.name.toLowerCase().includes(q) || subject.toLowerCase().includes(q);
        if (!match) return;
        const key = `course-${item.code || item.name}`;
        if (seen.has(key)) return;
        seen.add(key);
        results.push({
          id: key,
          title: item.name,
          description: `${subject} · 课程`,
          category: subject,
          type: 'course',
          path: item.href || `/study`,
          score: 0.7,
        });
        // 子主题
        item.subitems?.forEach((sub, i) => {
          if (sub.name.toLowerCase().includes(q)) {
            const sk = `course-${item.code}-${i}`;
            if (seen.has(sk)) return;
            seen.add(sk);
            results.push({
              id: sk,
              title: `${item.name} → ${sub.name}`,
              description: `${subject} · ${item.name}`,
              category: subject,
              type: 'course',
              path: sub.href,
              score: 0.7,
            });
          }
        });
      });
    });

    // 2. 从后端搜索笔记和挑战
    setLoading(true);
    try {
      const response = await fetch(`/api/search/global?query=${encodeURIComponent(query)}`);
      const json = await response.json();

      if (json.success && json.data) {
        const { notes = [], challenges = [] } = json.data;
        const stripMarkdown = (text: string) =>
          text.replace(/[#*`\[\]()>|_-]/g, ' ').replace(/\s+/g, ' ').trim();

        notes.forEach((note: any) => {
          const raw = note.content || '';
          const plain = stripMarkdown(raw).slice(0, 160);
          const nk = `note-${note.id}`;
          if (seen.has(nk)) return;
          seen.add(nk);
          results.push({
            id: nk,
            title: note.title || '',
            description: plain,
            category: note.category || '',
            type: 'note',
            path: `/notes/${note.id}`,
            score: 0.9,
          });
        });

        challenges.forEach((ch: any) => {
          const ck = `ch-${ch.id}`;
          if (seen.has(ck)) return;
          seen.add(ck);
          results.push({
            id: ck,
            title: ch.title || '',
            description: ch.topicName ? `${ch.topicName} · ${ch.difficulty || ''}` : '',
            category: ch.topicName || '',
            type: 'course',
            path: `/challenges`,
            score: 0.8,
          });
        });
      }
    } catch (error) {
      console.error('后端搜索失败:', error);
    } finally {
      setLoading(false);
    }

    const filtered = type !== 'all' ? results.filter(r => r.type === type) : results;
    setSearchResults(category ? filtered.filter(r => r.category === category) : filtered);
    setTotal(results.length);
    setSuggestions([]);
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setCurrentQuery(trimmedValue);

    // 更新URL
    const newUrl = trimmedValue ? `/tools/search?query=${encodeURIComponent(trimmedValue)}` : '/tools/search';
    router.push(newUrl, { scroll: false });

    performSearch(trimmedValue, selectedType, selectedCategory);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (currentQuery) {
      performSearch(currentQuery, type, selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (currentQuery) {
      performSearch(currentQuery, selectedType, category);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOutlined className="text-blue-500" />;
      case 'tool':
        return <ToolOutlined className="text-green-500" />;
      case 'note':
        return <FileTextOutlined className="text-purple-500" />;
      default:
        return <SearchOutlined />;
    }
  };

  const getResultTypeText = (type: string) => {
    switch (type) {
      case 'course':
        return '课程';
      case 'tool':
        return '工具';
      case 'note':
        return '笔记';
      default:
        return '';
    }
  };

  const groupedResults = {
    all: searchResults,
    course: searchResults.filter(r => r.type === 'course'),
    tool: searchResults.filter(r => r.type === 'tool'),
    note: searchResults.filter(r => r.type === 'note')
  };


  const categories = Array.from(new Set(searchResults.map(r => r.category))).filter(Boolean);

  return (
    <div className="min-h-screen bg-surface-page">
      {/* 水墨画顶部装饰 */}
      <InkWashDecoration variant="landscape" height={160} className="bg-surface-page" />
      <InkWashDecoration variant="mist" height={50} className="bg-surface-page -mt-4" />

      <div className="py-6">
        {/* 搜索头部 */}
        <div className="bg-surface-raised shadow-sm p-6 mb-6 border-b border-line-subtle">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-content-primary mb-4 flex items-center">
              <SearchOutlined className="mr-2" />
              全局搜索
            </h1>

            <Search
              placeholder="搜索课程、工具、笔记..."
              allowClear
              enterButton="搜索"
              size="large"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              onSearch={handleSearch}
              className="mb-4"
            />

            {/* 搜索建议 */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-content-secondary mr-2">相关搜索:</span>
                {suggestions.map((suggestion, index) => (
                  <Tag
                    key={index}
                    className="cursor-pointer mb-1"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Tag>
                ))}
              </div>
            )}

            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <FilterOutlined className="text-content-muted" />
                <span className="text-sm text-content-secondary">类型:</span>
                <Radio.Group
                  value={selectedType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  size="small"
                >
                  <Radio.Button value="all">全部</Radio.Button>
                  <Radio.Button value="course">课程</Radio.Button>
                  <Radio.Button value="tool">工具</Radio.Button>
                  <Radio.Button value="note">笔记</Radio.Button>
                </Radio.Group>
              </div>

              {categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-content-secondary">分类:</span>
                  <Select
                    placeholder="选择分类"
                    size="small"
                    style={{ width: 120 }}
                    value={selectedCategory || undefined}
                    onChange={handleCategoryChange}
                    allowClear
                  >
                    {categories.map(category => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 搜索结果 */}
        <div className="max-w-4xl mx-auto px-4">
          {loading && (
            <div className="text-center py-8">
              <Spin size="large" />
              <p className="text-content-muted mt-2">搜索中...</p>
            </div>
          )}

          {!loading && currentQuery && (
            <div className="mb-4">
              <p className="text-sm text-content-secondary">
                找到 <span className="font-semibold text-content-secondary">{total}</span> 条结果，
                关键词 "<span className="font-semibold">{currentQuery}</span>"
              </p>
            </div>
          )}

          {!loading && searchResults.length === 0 && currentQuery && (
            <Empty
              description="没有找到相关结果"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <p className="text-content-muted mb-4">
                尝试使用不同的关键词或调整筛选条件
              </p>
              {suggestions.length > 0 && (
                <div>
                  <p className="text-sm text-content-secondary mb-2">推荐搜索:</p>
                  {suggestions.map((suggestion, index) => (
                    <Tag
                      key={index}
                      className="cursor-pointer mb-1"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Tag>
                  ))}
                </div>
              )}
            </Empty>
          )}

          {!loading && searchResults.length > 0 && (
            <Tabs defaultActiveKey="all" className="mt-4" items={[
              {
                key: 'all',
                label: `全部 (${groupedResults.all.length})`,
                children: (
                  <div className="space-y-4">
                    {groupedResults.all.map((result) => (
                      <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getResultIcon(result.type)}
                              <span className="text-xs text-content-muted bg-surface-muted px-2 py-1 rounded">{getResultTypeText(result.type)}</span>
                              {result.category && <span className="text-xs text-content-link bg-brand-soft px-2 py-1 rounded">{result.category}</span>}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{result.description}</p>
                            <div className="flex items-center gap-4">
                              {result.path && <Link href={result.path} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><LinkOutlined />查看详情</Link>}
                              {result.url && <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 flex items-center gap-1"><LinkOutlined />打开</a>}
                            </div>
                          </div>
                          {result.type !== 'tool' && <div className="text-right"><div className="text-sm text-content-muted">相关度: {Math.round(result.score * 100)}%</div></div>}
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              },
              {
                key: 'course',
                label: `课程 (${groupedResults.course.length})`,
                children: (
                  <div className="space-y-4">
                    {groupedResults.course.map((result) => (
                      <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOutlined className="text-blue-500" />
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{result.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                            <p className="text-gray-600 mb-3">{result.description}</p>
                            {result.path && <Link href={result.path} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><BookOutlined />开始学习</Link>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              },
              {
                key: 'tool',
                label: `工具 (${groupedResults.tool.length})`,
                children: (
                  <div className="space-y-4">
                    {groupedResults.tool.map((result) => (
                      <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <ToolOutlined className="text-green-500" />
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">{result.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                            <p className="text-gray-600 mb-3">{result.description}</p>
                            {result.url && <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 flex items-center gap-1"><LinkOutlined />使用工具</a>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              },
              {
                key: 'note',
                label: `笔记 (${groupedResults.note.length})`,
                children: (
                  <div className="space-y-4">
                    {groupedResults.note.map((result) => (
                      <Card key={result.id} className="hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileTextOutlined className="text-purple-500" />
                              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{result.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                            <p className="text-gray-600 mb-3">{result.description}</p>
                            {result.path && <Link href={result.path} className="text-purple-600 hover:text-purple-800 flex items-center gap-1"><FileTextOutlined />查看笔记</Link>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ),
              },
            ].filter(tab => {
              if (tab.key === 'all') return true;
              const cnt = groupedResults[tab.key as keyof typeof groupedResults]?.length ?? 0;
              return cnt > 0;
            })} />
          )}
        </div>
      </div>

      {/* 水墨画底部装饰 */}
      <InkWashDecoration variant="bamboo" height={100} className="bg-surface-page mt-8" />
      <InkWashDecoration variant="landscape" height={200} className="bg-surface-page" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-page flex items-center justify-center">
      <Spin size="large" />
    </div>}>
      <SearchContent />
    </Suspense>
  );
}
