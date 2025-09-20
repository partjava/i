export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';

// Judge0 CE API 语言ID映射
const LANGUAGE_IDS: Record<string, number> = {
  'python': 71,      // Python (3.8.1)
  'javascript': 63,  // JavaScript (Node.js 12.14.0)
  'java': 62,        // Java (OpenJDK 13.0.1)
  'cpp': 54,         // C++ (GCC 9.2.0)
  'c': 50,           // C (GCC 9.2.0)
  'go': 60,          // Go (1.13.5)
  'php': 68,         // PHP (7.4.1)
  'rust': 73,        // Rust (1.40.0)
  'csharp': 51,      // C# (Mono 6.6.0.161)
  'typescript': 74,  // TypeScript (3.7.4)
};

// 使用您原有的环境变量配置
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '039e43b537msh40765032398a95ep1f61aajsn0321e61fa9d0';
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

// 可靠的Base64解码函数
const decodeBase64 = (data: string): string => {
  try {
    // 处理可能的URL安全Base64编码
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(data, 'base64').toString('utf8');
  } catch (error) {
    console.error('Base64解码失败:', error);
    return data; // 解码失败时返回原始数据，避免整体出错
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language, input } = body;

    if (!code) {
      return NextResponse.json({ success: false, error: '代码不能为空' }, { status: 400 });
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return NextResponse.json({ success: false, error: '不支持的编程语言' }, { status: 400 });
    }

    // 创建提交请求配置
    const createSubmissionOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: input || '',
        base64_encoded: false,
        wait: false
      })
    };

    // 发送代码执行请求
    const createResponse = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions',
      createSubmissionOptions
    );

    // 检查请求是否成功
    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      return NextResponse.json(
        { 
          success: false, 
          error: `创建提交失败: ${errorData.message || createResponse.statusText}` 
        },
        { status: createResponse.status }
      );
    }

    const createData = await createResponse.json();

    if (!createData.token) {
      return NextResponse.json({ success: false, error: '未获取到提交token' }, { status: 500 });
    }

    // 轮询获取结果
    let finalResult: any = null;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const getResultOptions = {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY
        }
      };

      const getResult = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${createData.token}?base64_encoded=true&fields=*`,
        getResultOptions
      );

      if (!getResult.ok) {
        console.error(`获取结果失败: ${getResult.status} ${getResult.statusText}`);
        attempts++;
        continue;
      }

      finalResult = await getResult.json();

      // 检查执行状态
      if (finalResult.status && finalResult.status.id !== 1 && finalResult.status.id !== 2) {
        break;
      }

      attempts++;
    }

    if (!finalResult) {
      return NextResponse.json({ success: false, error: '获取执行结果超时' }, { status: 504 });
    }

    // 处理输出结果 - 强制Base64解码
    let output = finalResult.stdout || '';
    let error = '';
    
    if (finalResult.stderr) {
      error = finalResult.stderr;
    } else if (finalResult.compile_output) {
      error = finalResult.compile_output;
    } else if (finalResult.message) {
      error = finalResult.message;
    }

    // 无论API返回什么标识，都进行解码（解决Base64问题的核心）
    output = decodeBase64(output);
    error = decodeBase64(error);

    return NextResponse.json({
      success: true,
      status: finalResult.status ? finalResult.status.description : 'Unknown',
      time: finalResult.time || 0,
      memory: finalResult.memory || 0,
      output: output,
      error: error
    });

  } catch (error) {
    console.error('代码执行错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误' 
      },
      { status: 500 }
    );
  }
}
