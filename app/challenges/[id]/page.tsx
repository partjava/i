'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Select, 
  Divider, 
  Tabs, 
  Alert, 
  message,
  Spin,
  Progress,
  Modal
} from 'antd';
import { 
  TrophyOutlined, 
  ClockCircleOutlined, 
  DatabaseOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BulbOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SimpleCodeEditor from '@/app/components/SimpleCodeEditor';
import { difficultyColors, difficultyLabels } from '@/app/data/challenges';

const { TabPane } = Tabs;

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
  testCases: TestCase[];
  hints: string[];
  points: number;
}

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description?: string;
}

interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime: number;
  memoryUsed: number;
  error?: string;
}

const ChallengeDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const challengeId = params.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');

  // 获取挑战详情
  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/challenges/${challengeId}`);
      const result = await response.json();

      if (result.success) {
        setChallenge(result.data);
        // 设置默认代码模板
        setDefaultCode(result.data, language);
      } else {
        message.error('获取挑战详情失败');
        router.push('/challenges');
      }
    } catch (error) {
      console.error('获取挑战详情失败:', error);
      message.error('获取挑战详情失败');
      router.push('/challenges');
    } finally {
      setLoading(false);
    }
  };

  // 设置默认代码模板
  const setDefaultCode = (challenge: Challenge, lang: string) => {
    const templates: { [key: string]: string } = {
      python: `def solution():\n    # 在这里编写你的解决方案\n    pass\n\n# 测试代码\nif __name__ == "__main__":\n    result = solution()\n    print(result)`,
      javascript: `function solution() {\n    // 在这里编写你的解决方案\n    return null;\n}\n\n// 测试代码\nconsole.log(solution());`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        Solution sol = new Solution();\n        // 在这里调用你的解决方案\n        System.out.println(sol.solution());\n    }\n    \n    public Object solution() {\n        // 在这里编写你的解决方案\n        return null;\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    // 在这里编写你的解决方案\n    void solution() {\n        \n    }\n};\n\nint main() {\n    Solution sol;\n    sol.solution();\n    return 0;\n}`
    };

    setCode(templates[lang] || templates.python);
  };

  useEffect(() => {
    if (challengeId) {
      fetchChallenge();
    }
  }, [challengeId]);

  useEffect(() => {
    if (challenge) {
      setDefaultCode(challenge, language);
    }
  }, [language, challenge]);

  // 提交代码
  const handleSubmit = async () => {
    if (!session) {
      message.error('请先登录');
      return;
    }

    if (!code.trim()) {
      message.error('请输入代码');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTestResults(result.data.testResults);
        setScore(result.data.score);
        setStatus(result.data.status);
        setShowResults(true);
        
        if (result.data.status === 'accepted') {
          message.success(`恭喜！挑战通过，获得 ${result.data.score} 分！`);
        } else {
          message.warning('部分测试用例未通过，请检查代码');
        }
      } else {
        message.error(result.error || '提交失败');
      }
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 运行示例测试
  const handleRunSample = async () => {
    if (!challenge || !code.trim()) {
      message.error('请输入代码');
      return;
    }

    const sampleTestCase = challenge.testCases.find(tc => !tc.isHidden);
    if (!sampleTestCase) {
      message.error('没有可用的示例测试用例');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          input: sampleTestCase.input
        }),
      });

      const result = await response.json();

      if (result.success) {
        const passed = result.output?.trim() === sampleTestCase.expectedOutput?.trim();
        Modal.info({
          title: '示例测试结果',
          content: (
            <div>
              <p><strong>输入:</strong> {sampleTestCase.input}</p>
              <p><strong>期望输出:</strong> {sampleTestCase.expectedOutput}</p>
              <p><strong>实际输出:</strong> {result.output}</p>
              <p><strong>结果:</strong> 
                {passed ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>通过</Tag>
                ) : (
                  <Tag color="red" icon={<CloseCircleOutlined />}>未通过</Tag>
                )}
              </p>
              {result.error && <p><strong>错误:</strong> {result.error}</p>}
            </div>
          ),
          width: 600,
        });
      } else {
        message.error(result.error || '运行失败');
      }
    } catch (error) {
      console.error('运行失败:', error);
      message.error('运行失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert message="挑战不存在" type="error" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row gutter={[24, 24]}>
          {/* 左侧：题目描述 */}
          <Col xs={24} lg={12}>
            <Card className="h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h1 className="text-2xl font-bold">{challenge.title}</h1>
                  <Tag
                    color={difficultyColors[challenge.difficulty]}
                    className="font-medium"
                  >
                    {difficultyLabels[challenge.difficulty]}
                  </Tag>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <TrophyOutlined className="mr-1" />
                    {challenge.points} 分
                  </div>
                  <div className="flex items-center">
                    <ClockCircleOutlined className="mr-1" />
                    时间限制: {challenge.timeLimit}s
                  </div>
                                     <div className="flex items-center">
                     <DatabaseOutlined className="mr-1" />
                     内存限制: {challenge.memoryLimit}MB
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Tag color="blue">{challenge.category}</Tag>
                  {challenge.tags.map(tag => (
                    <Tag key={tag} color="geekblue">{tag}</Tag>
                  ))}
                </div>
              </div>

              <Tabs defaultActiveKey="description">
                <TabPane tab="题目描述" key="description">
                  <div className="prose max-w-none">
                    <div 
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: challenge.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }}
                    />
                  </div>
                </TabPane>
                
                                 <TabPane tab="示例测试" key="examples">
                   {challenge.testCases.filter(tc => !tc.isHidden).map((testCase, index) => (
                     <Card key={testCase.id} className="mb-4 text-sm">
                       <h4>示例 {index + 1}:</h4>
                       <p><strong>输入:</strong></p>
                       <pre className="bg-gray-100 p-2 rounded">{testCase.input}</pre>
                       <p><strong>输出:</strong></p>
                       <pre className="bg-gray-100 p-2 rounded">{testCase.expectedOutput}</pre>
                       {testCase.description && (
                         <p><strong>说明:</strong> {testCase.description}</p>
                       )}
                     </Card>
                   ))}
                 </TabPane>
                
                <TabPane tab={<span><BulbOutlined />提示</span>} key="hints">
                  {challenge.hints.map((hint, index) => (
                    <Alert
                      key={index}
                      message={`提示 ${index + 1}`}
                      description={hint}
                      type="info"
                      className="mb-3"
                    />
                  ))}
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* 右侧：代码编辑器 */}
          <Col xs={24} lg={12}>
            <Card className="h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold flex items-center">
                    <CodeOutlined className="mr-2" />
                    代码编辑器
                  </h2>
                  <Select
                    value={language}
                    onChange={setLanguage}
                    style={{ width: 120 }}
                    options={challenge.languages.map(lang => ({
                      label: lang.toUpperCase(),
                      value: lang
                    }))}
                  />
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    type="default"
                    icon={<PlayCircleOutlined />}
                    onClick={handleRunSample}
                    loading={submitting}
                  >
                    运行示例
                  </Button>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleSubmit}
                    loading={submitting}
                    disabled={!session}
                  >
                    提交代码
                  </Button>
                  {!session && (
                    <span className="text-sm text-gray-500 self-center">
                      请先登录后提交
                    </span>
                  )}
                </div>
              </div>

                             <div>
                 <SimpleCodeEditor
                   value={code}
                   onChange={setCode}
                   language={language}
                   height="500px"
                 />
               </div>

              {/* 测试结果 */}
              {showResults && (
                <div className="mt-4">
                  <Divider>测试结果</Divider>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">总体结果:</span>
                      <Tag
                        color={status === 'accepted' ? 'green' : 'red'}
                        icon={status === 'accepted' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                      >
                        {status === 'accepted' ? '通过' : '未通过'}
                      </Tag>
                    </div>
                    <Progress
                      percent={Math.round((testResults.filter(r => r.passed).length / testResults.length) * 100)}
                      status={status === 'accepted' ? 'success' : 'exception'}
                      format={() => `${testResults.filter(r => r.passed).length}/${testResults.length}`}
                    />
                    <div className="text-sm text-gray-600 mt-1">
                      得分: {score} / {challenge.points}
                    </div>
                  </div>

                  <div className="space-y-2">
                                         {testResults.map((result, index) => (
                       <Card key={result.testCaseId} className="text-sm">
                         <div className="flex items-center justify-between">
                           <span>测试用例 {index + 1}</span>
                           <Tag
                             color={result.passed ? 'green' : 'red'}
                             icon={result.passed ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                           >
                             {result.passed ? '通过' : '未通过'}
                           </Tag>
                         </div>
                        {!result.passed && (
                          <div className="mt-2 text-sm">
                            <p><strong>输入:</strong> {result.input}</p>
                            <p><strong>期望:</strong> {result.expectedOutput}</p>
                            <p><strong>实际:</strong> {result.actualOutput}</p>
                            {result.error && <p><strong>错误:</strong> {result.error}</p>}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChallengeDetailPage; 