import { NextRequest, NextResponse } from 'next/server';

const GLM_API_KEY = process.env.GLM_API_KEY || '';
const GLM_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4';
const GLM_MODEL = process.env.GLM_MODEL || 'glm-4';

async function callGLM(message: string): Promise<string> {
  const response = await fetch(`${GLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: GLM_MODEL,
      messages: [
        {
          role: 'system',
          content: '你是袋子，一个可爱的AI学习助手。你擅长编程、Java、Python、大数据等技术领域。回答简洁友好，使用Markdown格式，代码用```包裹。'
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`GLM API 错误: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function callPythonAI(message: string): Promise<string> {
  const response = await fetch('http://localhost:8000/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: message, conversation_id: null }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) throw new Error(`Python AI 错误: ${response.status}`);

  const data = await response.json();
  if (!data?.answer) throw new Error('返回格式错误');

  let answer = data.answer;
  if (data.content_blocks && Array.isArray(data.content_blocks)) {
    data.content_blocks.forEach((block: any, index: number) => {
      if (block.type === 'code' && block.content) {
        answer = answer.replace(
          `[CODE_BLOCK_${index}]`,
          `\`\`\`${block.content.language || 'python'}\n${block.content.code}\n\`\`\``
        );
      }
    });
  }
  return answer;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 });
    }

    // 优先用 GLM，失败降级到 Python 服务
    try {
      const reply = await callGLM(message);
      if (reply) return NextResponse.json({ reply });
    } catch (glmError) {
      console.warn('GLM API 失败，降级到 Python 服务:', glmError);
    }

    try {
      const reply = await callPythonAI(message);
      return NextResponse.json({ reply });
    } catch (pyError) {
      console.warn('Python AI 服务也失败:', pyError);
    }

    // 最终 fallback
    const lowerMessage = message.toLowerCase();
    let reply = '';
    if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      reply = '你好！我是袋子，你的AI学习助手 🎯\n\n我可以帮你：\n- 📝 记录和管理学习笔记\n- 📊 追踪学习进度和时间\n- 🎓 推荐学习资源\n- 💡 解答编程问题\n\n有什么我可以帮助你的吗？';
    } else if (lowerMessage.includes('学习') || lowerMessage.includes('笔记')) {
      reply = '关于学习和笔记管理，我有以下建议：\n\n1. **创建笔记**：点击顶部的"笔记"按钮\n2. **学习追踪**：系统会自动记录你的学习时间\n3. **分类整理**：使用标签和分类来组织笔记\n4. **定期复习**：查看学习热力图，保持连续性\n\n需要我详细介绍某个功能吗？';
    } else {
      reply = '抱歉，AI服务暂时不可用 😔\n\n不过我仍然可以帮你：\n- 📝 管理学习笔记\n- 📊 查看学习统计\n- 💡 推荐学习资源\n\n需要我帮你做什么吗？';
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI对话失败:', error);
    return NextResponse.json({ reply: '抱歉，服务暂时不可用，请稍后再试。' });
  }
}
