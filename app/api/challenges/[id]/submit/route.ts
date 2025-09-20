export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { challenges } from '@/app/data/challenges';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: '请先登录' },
        { status: 401 }
      );
    }

    const challengeId = params.id;
    const challenge = challenges.find(c => c.id === challengeId);

    if (!challenge) {
      return NextResponse.json(
        { success: false, error: '挑战不存在' },
        { status: 404 }
      );
    }

    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { success: false, error: '代码和语言不能为空' },
        { status: 400 }
      );
    }

    // 运行测试用例
    const testResults = await runTestCases(challenge, code, language);
    
    // 计算得分
    const passedTests = testResults.filter(result => result.passed).length;
    const totalTests = testResults.length;
    const score = Math.round((passedTests / totalTests) * challenge.points);

    // 判断状态
    let status = 'wrong_answer';
    if (passedTests === totalTests) {
      status = 'accepted';
    }

    // 这里应该保存到数据库，现在先返回结果
    const attempt = {
      id: `attempt_${Date.now()}`,
      challengeId,
      userId: session.user.email,
      code,
      language,
      status,
      score,
      executionTime: testResults.reduce((sum, r) => sum + (r.executionTime || 0), 0) / testResults.length,
      memoryUsed: testResults.reduce((sum, r) => sum + (r.memoryUsed || 0), 0) / testResults.length,
      submittedAt: new Date().toISOString(),
      testResults
    };

    return NextResponse.json({
      success: true,
      data: attempt
    });
  } catch (error) {
    console.error('提交挑战失败:', error);
    return NextResponse.json(
      { success: false, error: '提交挑战失败' },
      { status: 500 }
    );
  }
}

async function runTestCases(challenge: any, code: string, language: string) {
  const results = [];

  for (const testCase of challenge.testCases) {
    try {
      // 调用代码执行API
      const response = await fetch(`/api/execute-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          input: testCase.input
        }),
      });

      const result = await response.json();

      if (result.success) {
        const passed = result.output?.trim() === testCase.expectedOutput?.trim();
        results.push({
          testCaseId: testCase.id,
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.output,
          executionTime: parseFloat(result.time) || 0,
          memoryUsed: parseInt(result.memory) || 0,
          error: result.error
        });
      } else {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: '',
          executionTime: 0,
          memoryUsed: 0,
          error: result.error
        });
      }
    } catch (error) {
      results.push({
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
        executionTime: 0,
        memoryUsed: 0,
        error: error instanceof Error ? error.message : '运行错误'
      });
    }
  }

  return results;
}