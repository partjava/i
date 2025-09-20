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

const { Search } = Input;
const { TabPane } = Tabs;

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
  
  const initialQuery = searchParams.get('q') || '';

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

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        type,
        limit: '20'
      });
      
      if (category) {
        params.append('category', category);
      }

      const response = await fetch(`/api/search/global?${params}`);
      const data: SearchResponse = await response.json();

      if (data.success) {
        setSearchResults(data.results);
        setTotal(data.total);
        setSuggestions(data.suggestions || []);
      } else {
        console.error('搜索失败:', data.message);
        setSearchResults([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('搜索请求失败:', error);
      setSearchResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setCurrentQuery(trimmedValue);
    
    // 更新URL
    const newUrl = trimmedValue ? `/search?q=${encodeURIComponent(trimmedValue)}` : '/search';
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
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        {/* 搜索头部 */}
        <div className="bg-white shadow-sm p-6 mb-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
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
                <span className="text-sm text-gray-600 mr-2">相关搜索:</span>
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
                <FilterOutlined className="text-gray-500" />
                <span className="text-sm text-gray-600">类型:</span>
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
                  <span className="text-sm text-gray-600">分类:</span>
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
              <p className="text-gray-500 mt-2">搜索中...</p>
            </div>
          )}

          {!loading && currentQuery && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                找到 <span className="font-semibold text-blue-600">{total}</span> 条结果，
                关键词 "<span className="font-semibold">{currentQuery}</span>"
              </p>
            </div>
          )}

          {!loading && searchResults.length === 0 && currentQuery && (
            <Empty
              description="没有找到相关结果"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <p className="text-gray-500 mb-4">
                尝试使用不同的关键词或调整筛选条件
              </p>
              {suggestions.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">推荐搜索:</p>
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
            <Tabs defaultActiveKey="all" className="mt-4">
              <TabPane tab={`全部 (${groupedResults.all.length})`} key="all">
                <div className="space-y-4">
                  {groupedResults.all.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getResultIcon(result.type)}
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {getResultTypeText(result.type)}
                            </span>
                            {result.category && (
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {result.category}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {result.description}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            {result.path && (
                              <Link 
                                href={result.path}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <LinkOutlined />
                                查看详情
                              </Link>
                            )}
                            {result.url && (
                              <a 
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 flex items-center gap-1"
                              >
                                <LinkOutlined />
                                外部链接
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            相关度: {Math.round(result.score * 100)}%
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>

              <TabPane tab={`课程 (${groupedResults.course.length})`} key="course">
                <div className="space-y-4">
                  {groupedResults.course.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOutlined className="text-blue-500" />
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {result.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3">
                            {result.description}
                          </p>
                          
                          {result.path && (
                            <Link 
                              href={result.path}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <BookOutlined />
                              开始学习
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>

              <TabPane tab={`工具 (${groupedResults.tool.length})`} key="tool">
                <div className="space-y-4">
                  {groupedResults.tool.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <ToolOutlined className="text-green-500" />
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              {result.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3">
                            {result.description}
                          </p>
                          
                          {result.url && (
                            <a 
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 flex items-center gap-1"
                            >
                              <ToolOutlined />
                              使用工具
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>

              <TabPane tab={`笔记 (${groupedResults.note.length})`} key="note">
                <div className="space-y-4">
                  {groupedResults.note.map((result) => (
                    <Card key={result.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileTextOutlined className="text-purple-500" />
                            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                              {result.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {result.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-3">
                            {result.description}
                          </p>
                          
                          {result.path && (
                            <Link 
                              href={result.path}
                              className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                            >
                              <FileTextOutlined />
                              查看笔记
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Spin size="large" />
    </div>}>
      <SearchContent />
    </Suspense>
  );
} 