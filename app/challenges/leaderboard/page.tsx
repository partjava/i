'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Tag, 
  Select, 
  Statistic, 
  List, 
  Spin, 
  message,
  Button,
  Divider
} from 'antd';
import { 
  TrophyOutlined, 
  CrownOutlined, 
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface LeaderboardUser {
  id: string;
  username: string;
  email: string;
  totalScore: number;
  solvedChallenges: number;
  rank: number;
  avatar: string;
  lastActive: string;
}

interface LeaderboardStats {
  totalUsers: number;
  averageScore: number;
  totalChallengesSolved: number;
}

const LeaderboardPage: React.FC = () => {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  // 获取排行榜数据
  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/challenges/leaderboard?timeRange=${timeRange}&limit=50`);
      const result = await response.json();

      if (result.success) {
        setLeaderboard(result.data.leaderboard);
        setStats(result.data.stats);
      } else {
        message.error('获取排行榜失败');
      }
    } catch (error) {
      console.error('获取排行榜失败:', error);
      message.error('获取排行榜失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeRange]);

  // 获取排名图标
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownOutlined style={{ color: '#FFD700', fontSize: '24px' }} />;
      case 2:
        return <TrophyOutlined style={{ color: '#C0C0C0', fontSize: '20px' }} />;
      case 3:
        return <TrophyOutlined style={{ color: '#CD7F32', fontSize: '18px' }} />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  // 获取排名颜色
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-gray-100';
    }
  };

  // 格式化时间
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <TrophyOutlined className="mr-3 text-yellow-500" />
            排行榜
          </h1>
          <p className="text-xl text-gray-600">
            查看顶尖程序员的挑战成绩
          </p>
        </div>

        {/* 统计信息 */}
        {stats && (
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={24} sm={8}>
              <Card className="text-center">
                <Statistic
                  title="参与用户"
                  value={stats.totalUsers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center">
                <Statistic
                  title="平均分数"
                  value={stats.averageScore}
                  prefix={<FireOutlined />}
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="text-center">
                <Statistic
                  title="总解题数"
                  value={stats.totalChallengesSolved}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* 筛选选项 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium">时间范围:</span>
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 120 }}
              options={[
                { label: '全部', value: 'all' },
                { label: '本周', value: 'week' },
                { label: '本月', value: 'month' }
              ]}
            />
          </div>
          <Link href="/challenges">
            <Button type="primary">
              开始挑战
            </Button>
          </Link>
        </div>

        {/* 排行榜 */}
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">加载排行榜中...</p>
          </div>
        ) : (
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={leaderboard}
              renderItem={(user, index) => (
                <List.Item
                  className={`${
                    user.rank <= 3 ? getRankColor(user.rank) : 'hover:bg-gray-50'
                  } ${user.rank <= 3 ? 'text-white' : ''} rounded-lg mb-2 px-4 py-3 transition-all duration-200`}
                >
                  <List.Item.Meta
                    avatar={
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar 
                          size={48} 
                          src={user.avatar} 
                          icon={<UserOutlined />}
                          className="border-2 border-white shadow-md"
                        />
                      </div>
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${user.rank <= 3 ? 'text-white' : 'text-gray-900'}`}>
                          {user.username}
                        </span>
                        {user.rank <= 3 && (
                          <Tag color="gold" className="ml-2">
                            TOP {user.rank}
                          </Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className={`flex items-center gap-4 ${user.rank <= 3 ? 'text-white opacity-90' : 'text-gray-600'}`}>
                        <span className="flex items-center gap-1">
                          <TrophyOutlined />
                          {user.totalScore} 分
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircleOutlined />
                          {user.solvedChallenges} 题
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarOutlined />
                          {formatTime(user.lastActive)}
                        </span>
                      </div>
                    }
                  />
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${user.rank <= 3 ? 'text-white' : 'text-gray-900'}`}>
                      {user.totalScore}
                    </div>
                    <div className={`text-sm ${user.rank <= 3 ? 'text-white opacity-75' : 'text-gray-500'}`}>
                      总分
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        )}

        {/* 底部提示 */}
        <div className="mt-8 text-center">
          <Divider />
          <p className="text-gray-600 mb-4">
            想要上榜？立即开始挑战提升你的编程技能！
          </p>
          <Link href="/challenges">
            <Button type="primary" size="large">
              开始挑战
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 