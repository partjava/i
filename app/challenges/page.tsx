'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Tag, Button, Input, Pagination, Spin, message } from 'antd';
import { 
  TrophyOutlined, 
  ClockCircleOutlined, 
  DatabaseOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { challengeCategories, difficultyColors, difficultyLabels } from '@/app/data/challenges';

const { Search } = Input;

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  languages: string[];
  timeLimit: number;
  memoryLimit: number;
  points: number;
}

const ChallengePage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // 获取挑战列表
  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters.difficulty !== 'all') {
        params.append('difficulty', filters.difficulty);
      }
      if (filters.category !== 'all') {
        params.append('category', filters.category);
      }

      const response = await fetch(`/api/challenges?${params}`);
      const result = await response.json();

      if (result.success) {
        let filteredChallenges = result.data.challenges;

        // 客户端搜索过滤
        if (filters.search) {
          filteredChallenges = filteredChallenges.filter((challenge: Challenge) =>
            challenge.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            challenge.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            challenge.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
          );
        }

        setChallenges(filteredChallenges);
        setPagination(prev => ({
          ...prev,
          total: result.data.pagination.total,
          totalPages: result.data.pagination.totalPages
        }));
      } else {
        message.error('获取挑战列表失败');
      }
    } catch (error) {
      console.error('获取挑战列表失败:', error);
      message.error('获取挑战列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [pagination.page, filters.difficulty, filters.category]);

  // 处理搜索
  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    fetchChallenges();
  };

  // 处理筛选
  const handleFilter = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <TrophyOutlined className="mr-3 text-yellow-500" />
            代码挑战
          </h1>
          <p className="text-xl text-gray-600">
            通过编程挑战提升你的算法和编程技能
          </p>
          <div className="mt-4">
            <Link href="/challenges/leaderboard">
              <Button type="default" className="mr-4">
                查看排行榜
              </Button>
            </Link>
          </div>
        </div>

        {/* 筛选和搜索 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={6}>
              <div className="flex items-center gap-2">
                <FilterOutlined />
                <span className="font-medium">难度:</span>
                <Select
                  value={filters.difficulty}
                  onChange={(value) => handleFilter('difficulty', value)}
                  style={{ width: 120 }}
                  options={[
                    { label: '全部', value: 'all' },
                    { label: '简单', value: 'easy' },
                    { label: '中等', value: 'medium' },
                    { label: '困难', value: 'hard' }
                  ]}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="flex items-center gap-2">
                <FilterOutlined />
                <span className="font-medium">分类:</span>
                <Select
                  value={filters.category}
                  onChange={(value) => handleFilter('category', value)}
                  style={{ width: 120 }}
                  options={[
                    { label: '全部', value: 'all' },
                    ...challengeCategories.map(cat => ({ label: cat, value: cat }))
                  ]}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Search
                placeholder="搜索挑战标题、描述或标签..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </div>

        {/* 挑战列表 */}
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">加载挑战中...</p>
          </div>
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {challenges.map((challenge) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={challenge.id}>
                  <Card
                    hoverable
                    className="h-full challenge-card"
                    cover={
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <div className="flex justify-between items-start mb-2">
                          <Tag
                            color={difficultyColors[challenge.difficulty]}
                            className="font-medium"
                          >
                            {difficultyLabels[challenge.difficulty]}
                          </Tag>
                          <div className="flex items-center text-sm">
                            <TrophyOutlined className="mr-1" />
                            {challenge.points}分
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm opacity-90">
                          <div className="flex items-center">
                            <ClockCircleOutlined className="mr-1" />
                            {challenge.timeLimit}s
                          </div>
                          <div className="flex items-center">
                            <DatabaseOutlined className="mr-1" />
                            {challenge.memoryLimit}MB
                          </div>
                        </div>
                      </div>
                    }
                    actions={[
                      <Link key="solve" href={`/challenges/${challenge.id}`}>
                        <Button type="primary" block>
                          开始挑战
                        </Button>
                      </Link>
                    ]}
                  >
                    <div className="p-2">
                      <div className="mb-3">
                        <Tag color="blue">{challenge.category}</Tag>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {challenge.description.substring(0, 100)}...
                      </p>
                      
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">支持语言:</div>
                        <div className="flex flex-wrap gap-1">
                                                     {challenge.languages.slice(0, 3).map(lang => (
                             <Tag key={lang} className="text-xs">
                               {lang.toUpperCase()}
                             </Tag>
                           ))}
                           {challenge.languages.length > 3 && (
                             <Tag className="text-xs">+{challenge.languages.length - 3}</Tag>
                           )}
                        </div>
                      </div>
                      
                                             <div className="flex flex-wrap gap-1">
                         {challenge.tags.slice(0, 2).map(tag => (
                           <Tag key={tag} className="text-xs" color="geekblue">
                             {tag}
                           </Tag>
                         ))}
                         {challenge.tags.length > 2 && (
                           <Tag className="text-xs" color="geekblue">+{challenge.tags.length - 2}</Tag>
                         )}
                       </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 分页 */}
            {pagination.total > pagination.limit && (
              <div className="mt-8 text-center">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  pageSize={pagination.limit}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `第 ${range[0]}-${range[1]} 条，共 ${total} 条挑战`
                  }
                />
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .challenge-card {
          transition: all 0.3s ease;
        }
        .challenge-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ChallengePage; 