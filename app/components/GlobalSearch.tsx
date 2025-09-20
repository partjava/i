'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input, Dropdown, Card, Tag, Spin, Empty, Button, message } from 'antd';
import { 
  SearchOutlined, 
  BookOutlined, 
  ToolOutlined, 
  FileTextOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  ClearOutlined
} from '@ant-design/icons';

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
}

interface SearchHistoryItem {
  id: string;
  query: string;
  searchType: string;
  category: string;
  resultCount: number;
  createdAt: string;
  updatedAt: string;
}

interface SearchHistoryResponse {
  success: boolean;
  history: SearchHistoryItem[];
}

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
}

export default function GlobalSearch({ 
  className = '', 
  placeholder = '搜索课程、工具、笔记...',
  size = 'middle'
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  const { data: session } = useSession();
  const router = useRouter();
  const searchRef = useRef<any>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // 加载搜索历史
  useEffect(() => {
    if (session?.user?.email) {
      loadSearchHistory();
    } else {
      // 未登录用户使用本地存储
      const localHistory = localStorage.getItem('search_history');
      if (localHistory) {
        try {
          const parsed = JSON.parse(localHistory);
          const formatted = parsed.map((item: string, index: number) => ({
            id: `local_${index}`,
            query: item,
            searchType: 'all',
            category: '',
            resultCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setSearchHistory(formatted);
        } catch (error) {
          console.error('加载本地搜索历史失败:', error);
        }
      }
    }
  }, [session]);

  // 加载服务器端搜索历史
  const loadSearchHistory = async () => {
    if (!session?.user?.email) return;
    
    setHistoryLoading(true);
    try {
      const response = await fetch('/api/search/history?limit=10');
      const data: SearchHistoryResponse = await response.json();
      
      if (data.success && data.history) {
        setSearchHistory(data.history);
      } else if (response.status === 401) {
        // 未登录，使用本地历史
        const localHistory = localStorage.getItem('search_history');
        if (localHistory) {
          const historyArray = JSON.parse(localHistory);
          const formatted = historyArray.map((item: string, index: number) => ({
            id: `local_${index}`,
            query: item,
            searchType: 'all',
            category: '',
            resultCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setSearchHistory(formatted);
        }
      }
    } catch (error) {
      console.error('加载搜索历史失败:', error);
      // 错误时尝试加载本地历史
      try {
        const localHistory = localStorage.getItem('search_history');
        if (localHistory) {
          const historyArray = JSON.parse(localHistory);
          const formatted = historyArray.map((item: string, index: number) => ({
            id: `local_${index}`,
            query: item,
            searchType: 'all',
            category: '',
            resultCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setSearchHistory(formatted);
        }
      } catch (localError) {
        console.error('加载本地历史失败:', localError);
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  // 保存搜索历史
  const saveToHistory = async (searchQuery: string, resultCount: number = 0) => {
    if (!searchQuery.trim()) return;
    
    // 暂时只使用本地存储，不调用服务器API
    const localHistory = searchHistory.map(h => h.query);
    const newHistory = [searchQuery, ...localHistory.filter(h => h !== searchQuery)].slice(0, 10);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
    
    const formatted = newHistory.map((item, index) => ({
      id: `local_${index}`,
      query: item,
      searchType: 'all',
      category: '',
      resultCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    setSearchHistory(formatted);
  };

  // 删除搜索历史项
  const deleteHistoryItem = async (historyId: string, query: string) => {
    // 暂时只使用本地删除
    const newHistory = searchHistory.filter(h => h.query !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('search_history', JSON.stringify(newHistory.map(h => h.query)));
    message.success('已删除搜索历史');
  };

  // 清空所有搜索历史
  const clearAllHistory = async () => {
    // 暂时只使用本地清空
    setSearchHistory([]);
    localStorage.removeItem('search_history');
    message.success('已清空所有搜索历史');
  };

  // 防抖搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type: 'all',
        limit: '6' // 快速预览只显示前6个结果
      });

      const response = await fetch(`/api/search/global?${params}`);
      const data: SearchResponse = await response.json();

      if (data.success) {
        setResults(data.results);
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    // 清除之前的防抖定时器
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 设置新的防抖定时器
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    saveToHistory(trimmedQuery, results.length);
    setShowDropdown(false);
    setQuery('');
    
    // 跳转到搜索结果页面
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleResultClick = (result: SearchResult) => {
    saveToHistory(query, results.length);
    setShowDropdown(false);
    setQuery('');
    
    if (result.path) {
      router.push(result.path);
    } else if (result.url) {
      window.open(result.url, '_blank');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem: SearchHistoryItem) => {
    setQuery(historyItem.query);
    handleSearch(historyItem.query);
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

  // 构建下拉菜单内容
  const dropdownContent = (
    <div className="w-96 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      {loading ? (
        <div className="p-4 text-center">
          <Spin size="small" />
          <span className="ml-2 text-gray-500">搜索中...</span>
        </div>
      ) : query.length >= 2 ? (
        <>
          {/* 搜索结果 */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">搜索结果</div>
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1 mb-1">
                        <Tag color={
                          result.type === 'course' ? 'blue' : 
                          result.type === 'tool' ? 'green' : 'purple'
                        }>
                          {getResultTypeText(result.type)}
                        </Tag>
                        <span className="text-xs text-gray-400">{result.category}</span>
                      </div>
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {result.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 查看更多结果 */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <div
                  className="p-2 hover:bg-gray-50 cursor-pointer rounded text-center text-sm text-blue-600"
                  onClick={() => handleSearch(query)}
                >
                  查看所有 "{query}" 的搜索结果 →
                </div>
              </div>
            </div>
          )}

          {/* 搜索建议 */}
          {suggestions.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">相关搜索</div>
              <div className="flex flex-wrap gap-1">
                {suggestions.slice(0, 8).map((suggestion, index) => (
                  <Tag
                    key={index}
                    className="cursor-pointer text-xs"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* 无结果 */}
          {results.length === 0 && !loading && query.length >= 2 && (
            <div className="p-4 text-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span className="text-sm">没有找到相关内容</span>}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {/* 搜索历史 */}
          {searchHistory.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1 flex items-center justify-between">
                <span className="flex items-center">
                  <ClockCircleOutlined className="mr-1" />
                  最近搜索
                </span>
                <Button
                  type="text"
                  size="small"
                  icon={<ClearOutlined />}
                  onClick={clearAllHistory}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  清空
                </Button>
              </div>
              {historyLoading ? (
                <div className="p-2 text-center">
                  <Spin size="small" />
                </div>
              ) : (
                searchHistory.slice(0, 5).map((historyItem) => (
                  <div
                    key={historyItem.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer rounded text-sm text-gray-700 flex items-center justify-between group"
                  >
                    <span
                      className="flex-1 truncate"
                      onClick={() => handleHistoryClick(historyItem)}
                    >
                      {historyItem.query}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(historyItem.id, historyItem.query);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-red-500"
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* 热门搜索 */}
          <div className="border-t border-gray-100 p-2">
            <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1 flex items-center">
              <SearchOutlined className="mr-1" />
              热门搜索
            </div>
            <div className="flex flex-wrap gap-1">
              {['Python', 'Java', 'React', 'Vue', 'MySQL', '算法', '数据结构', '机器学习'].map((hotSearch, index) => (
                <Tag
                  key={index}
                  className="cursor-pointer text-xs"
                  onClick={() => handleSuggestionClick(hotSearch)}
                >
                  {hotSearch}
                </Tag>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <Dropdown
        dropdownRender={() => dropdownContent}
        trigger={['click']}
        open={showDropdown}
        onOpenChange={setShowDropdown}
        placement="bottomLeft"
        overlayClassName="z-[1050]"
      >
        <div>
          <Search
            ref={searchRef}
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onFocus={() => setShowDropdown(true)}
            size={size}
            allowClear
            enterButton={<SearchOutlined />}
            className="global-search"
          />
        </div>
      </Dropdown>

      {/* 点击外部关闭下拉菜单 */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
} 