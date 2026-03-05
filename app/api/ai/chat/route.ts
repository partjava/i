import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      );
    }

    // 调用Python FastAPI服务的 /ask 端点
    try {
      // 直接调用本地Python服务（绕过Nginx代理）
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: message,
          conversation_id: null
        }),
        signal: AbortSignal.timeout(15000), // 15秒超时
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Python AI服务错误:', response.status, errorData);
        throw new Error(`AI服务错误: ${response.status}`);
      }

      const data = await response.json();
      
      // Python服务返回格式: { answer: "...", content_blocks: [...], ... }
      if (data && data.answer) {
        let processedAnswer = data.answer;
        
        // 处理结构化内容，替换代码块占位符
        if (data.content_blocks && Array.isArray(data.content_blocks)) {
          data.content_blocks.forEach((block: any, index: number) => {
            if (block.type === 'code' && block.content) {
              const placeholder = `[CODE_BLOCK_${index}]`;
              const codeBlock = `\`\`\`${block.content.language || 'python'}\n${block.content.code}\n\`\`\``;
              processedAnswer = processedAnswer.replace(placeholder, codeBlock);
            }
          });
        }
        
        return NextResponse.json({ reply: processedAnswer });
      }
      
      throw new Error('AI返回数据格式错误');
    } catch (fetchError) {
      console.error('调用Python AI服务失败:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('AI对话失败:', error);
    
    // Fallback响应
    const body = await request.json().catch(() => ({ message: '' }));
    const { message } = body;
    const lowerMessage = message?.toLowerCase() || '';
    
    let reply = '';
    
    if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      reply = '你好！我是你的学习助手史迪奇 🎯\n\n我可以帮你：\n- 📝 记录和管理学习笔记\n- 📊 追踪学习进度和时间\n- 🎓 推荐学习资源\n- 💡 解答编程问题\n\n有什么我可以帮助你的吗？';
    } else if (lowerMessage.includes('学习') || lowerMessage.includes('笔记')) {
      reply = '关于学习和笔记管理，我有以下建议：\n\n1. **创建笔记**：点击顶部的"笔记"按钮，开始记录你的学习内容\n2. **学习追踪**：系统会自动记录你的学习时间和进度\n3. **分类整理**：使用标签和分类来组织你的笔记\n4. **定期复习**：查看学习热力图，保持学习连续性\n\n需要我详细介绍某个功能吗？';
    } else {
      reply = '抱歉，AI服务暂时不可用 😔\n\n不过我仍然可以帮你：\n- 📝 管理学习笔记\n- 📊 查看学习统计\n- 🎯 设置学习目标\n- 💡 推荐学习资源\n\n需要我帮你做什么吗？';
    }
    
    return NextResponse.json({ reply });
  }
}
