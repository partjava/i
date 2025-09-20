document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const loadingIndicator = document.getElementById('loading-indicator');
    const conversationList = document.getElementById('conversation-list');
    
    // 当前会话ID
    let currentConversationId = localStorage.getItem('currentConversationId') || null;
    
    // 初始化
    init();
    
    // 初始化函数
    async function init() {
        console.log("初始化聊天界面...");
        
        // 加载对话列表
        try {
            await loadConversations();
            
            // 如果有当前会话，加载会话历史
            if (currentConversationId) {
                console.log("发现已保存的对话ID:", currentConversationId);
                try {
                    await loadConversationHistory(currentConversationId);
                } catch (error) {
                    console.error("加载对话历史失败:", error);
                    showNotification("加载对话历史失败，开始新的对话", "error");
                    currentConversationId = null;
                    localStorage.removeItem('currentConversationId');
                }
            } else {
                // 如果没有当前会话，且对话列表为空，创建一个新的对话
                const conversations = document.querySelectorAll('.conversation-item');
                if (conversations.length === 0) {
                    console.log("没有当前对话且对话列表为空，创建新对话");
                    currentConversationId = await createNewConversation();
                }
            }
        } catch (error) {
            console.error("初始化失败:", error);
            showNotification("初始化失败，请刷新页面重试", "error");
        }
    }
    
    // 加载对话列表
    async function loadConversations() {
        try {
            console.log("开始加载对话列表...");
            showLoading(true);
            
            // 先尝试获取最近20条对话
            const response = await fetch('/conversations?limit=20');
            if (!response.ok) {
                throw new Error(`HTTP错误 ${response.status}`);
            }
            
            const data = await response.json();
            console.log("获取到对话列表:", data);
            
            if (!data.conversations || !Array.isArray(data.conversations)) {
                console.error("对话列表格式不正确:", data);
                throw new Error("对话列表格式不正确");
            }
            
            renderConversationList(data.conversations);
            
            // 如果对话列表为空，显示提示
            if (data.conversations.length === 0) {
                console.log("对话列表为空，显示提示");
                showNotification("没有历史对话，请开始新的对话", "info");
            }
            
            return data.conversations;
        } catch (error) {
            console.error('加载对话列表错误:', error);
            showNotification('加载对话列表失败', 'error');
            // 显示空状态
            if (conversationList) {
                conversationList.innerHTML = '<div class="empty-state">无法加载对话列表</div>';
            }
            return [];
        } finally {
            showLoading(false);
        }
    }
    
    // 渲染对话列表
    function renderConversationList(conversations) {
        if (!conversationList) {
            console.error("找不到对话列表元素");
            return;
        }
        
        console.log("渲染对话列表，数量:", conversations.length);
        conversationList.innerHTML = '';
        
        if (conversations.length === 0) {
            console.log("对话列表为空，显示空状态");
            conversationList.innerHTML = '<div class="empty-state">没有历史对话</div>';
            return;
        }
        
        conversations.forEach(conversation => {
            try {
                const item = document.createElement('div');
                item.className = `conversation-item ${conversation.conversation_id === currentConversationId ? 'active' : ''}`;
                item.dataset.id = conversation.conversation_id;
                
                const time = new Date(conversation.updated_at);
                const formattedTime = time.toLocaleString();
                
                let preview = conversation.preview || '新对话';
                
                item.innerHTML = `
                    <div class="conversation-preview">
                        <div class="conversation-title">${preview}</div>
                        <div class="conversation-meta">
                            <span class="conversation-time">${formattedTime}</span>
                            <span class="conversation-count">${conversation.message_count || 0}条消息</span>
                        </div>
                    </div>
                    <button class="delete-conversation" title="删除对话">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                item.addEventListener('click', (e) => {
                    // 如果点击的是删除按钮，不切换对话
                    if (e.target.closest('.delete-conversation')) {
                        e.stopPropagation();
                        deleteConversation(conversation.conversation_id);
                        return;
                    }
                    
                    // 切换当前对话
                    setCurrentConversation(conversation.conversation_id);
                });
                
                conversationList.appendChild(item);
            } catch (e) {
                console.error("渲染对话项时出错:", e, conversation);
            }
        });
    }
    
    // 设置当前对话
    async function setCurrentConversation(conversationId) {
        // 更新UI
        const items = document.querySelectorAll('.conversation-item');
        items.forEach(item => {
            item.classList.toggle('active', item.dataset.id === conversationId);
        });
        
        // 更新当前会话ID
        currentConversationId = conversationId;
        localStorage.setItem('currentConversationId', conversationId);
        
        // 清空消息区域
        chatMessages.innerHTML = '';
        
        // 加载会话历史
        await loadConversationHistory(conversationId);
    }
    
    // 加载会话历史
    async function loadConversationHistory(conversationId) {
        try {
            showLoading(true);
            
            const response = await fetch(`/conversations/${conversationId}/history`);
            if (!response.ok) throw new Error('加载会话历史失败');
            
            const messages = await response.json();
            
            // 清空消息区域
            chatMessages.innerHTML = '';
            
            // 渲染消息
            messages.forEach(message => {
                renderMessage(message);
            });
            
            // 滚动到底部
            scrollToBottom();
        } catch (error) {
            console.error('加载会话历史错误:', error);
            showNotification('加载会话历史失败', 'error');
        } finally {
            showLoading(false);
        }
    }
    
    // 删除对话
    async function deleteConversation(conversationId) {
        if (!confirm('确定要删除这个对话吗？此操作不可撤销。')) {
            return;
        }
        
        try {
            const response = await fetch(`/conversations/${conversationId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('删除对话失败');
            
            // 如果删除的是当前对话，清空当前对话ID和消息区域
            if (conversationId === currentConversationId) {
                currentConversationId = null;
                localStorage.removeItem('currentConversationId');
                chatMessages.innerHTML = '';
            }
            
            // 重新加载对话列表
            await loadConversations();
            
            showNotification('对话已删除', 'success');
        } catch (error) {
            console.error('删除对话错误:', error);
            showNotification('删除对话失败', 'error');
        }
    }
    
    // 创建新对话
    async function createNewConversation() {
        try {
            const response = await fetch('/conversations', {
                method: 'POST'
            });
            
            if (!response.ok) throw new Error('创建对话失败');
            
            const data = await response.json();
            
            // 设置新创建的对话为当前对话
            setCurrentConversation(data.conversation_id);
            
            // 重新加载对话列表
            await loadConversations();
            
            return data.conversation_id;
        } catch (error) {
            console.error('创建对话错误:', error);
            showNotification('创建对话失败', 'error');
            return null;
        }
    }
    
    // 处理表单提交
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const question = chatInput.value.trim();
        if (!question) return;
        
        // 清空输入框
        chatInput.value = '';
        
        // 如果没有当前会话，创建一个新的
        if (!currentConversationId) {
            currentConversationId = await createNewConversation();
            if (!currentConversationId) return;
        }
        
        // 添加用户消息
        addUserMessage(question);
        
        // 滚动到底部
        scrollToBottom();
        
        // 发送请求
        await sendMessage(question);
    });
    
    // 添加用户消息
    function addUserMessage(content) {
        const message = {
            role: 'user',
            content: content,
            timestamp: new Date().toISOString()
        };
        
        renderMessage(message);
    }
    
    // 渲染消息
    function renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${message.role === 'user' ? 'user' : 'ai'} fade-in`;
        
        const time = new Date(message.timestamp);
        const formattedTime = time.toLocaleTimeString();
        
        const content = processMessageContent(message);
        
        messageElement.innerHTML = `
            <div class="message-header">${message.role === 'user' ? '你' : 'AI'}</div>
            <div class="message-bubble">
                <div class="message-content">${content}</div>
            </div>
            <div class="message-time">${formattedTime}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // 处理代码块的复制功能
        const codeBlocks = messageElement.querySelectorAll('.code-block');
        codeBlocks.forEach(block => {
            const copyButton = block.querySelector('.copy-button');
            if (copyButton) {
                copyButton.addEventListener('click', () => {
                    const code = block.querySelector('pre').textContent;
                    navigator.clipboard.writeText(code)
                        .then(() => {
                            copyButton.textContent = '已复制!';
                            setTimeout(() => {
                                copyButton.textContent = '复制';
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('复制失败:', err);
                        });
                });
            }
        });
    }
    
    // 处理消息内容，解析特殊格式
    function processMessageContent(message) {
        if (!message || !message.content) return '';
        
        // 检查是否有结构化内容块
        if (message.content_blocks && Array.isArray(message.content_blocks)) {
            console.log("处理结构化内容块:", message.content_blocks);
            
            // 创建内容容器
            const contentContainer = document.createElement('div');
            contentContainer.className = 'message-content-blocks';
            
            // 处理每个内容块
            message.content_blocks.forEach((block, index) => {
                if (block.type === 'code') {
                    // 处理代码块
                    const codeBlock = document.createElement('div');
                    codeBlock.className = 'code-block';
                    
                    // 代码头部（语言和复制按钮）
                    const codeHeader = document.createElement('div');
                    codeHeader.className = 'code-header';
                    
                    const langLabel = document.createElement('span');
                    langLabel.className = 'code-language';
                    langLabel.textContent = block.content.language || 'text';
                    
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-code-button';
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> 复制';
                    copyButton.onclick = function() {
                        navigator.clipboard.writeText(block.content.code)
                            .then(() => {
                                copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';
                                setTimeout(() => {
                                    copyButton.innerHTML = '<i class="fas fa-copy"></i> 复制';
                                }, 2000);
                            })
                            .catch(err => {
                                console.error('复制失败:', err);
                            });
                    };
                    
                    codeHeader.appendChild(langLabel);
                    codeHeader.appendChild(copyButton);
                    
                    // 代码内容
                    const codeContent = document.createElement('pre');
                    codeContent.className = 'code-content';
                    
                    const codeElement = document.createElement('code');
                    codeElement.className = block.content.language || '';
                    codeElement.textContent = block.content.code || '';
                    
                    // 如果有hljs，应用语法高亮
                    if (window.hljs) {
                        try {
                            hljs.highlightElement(codeElement);
                        } catch (e) {
                            console.error('语法高亮失败:', e);
                        }
                    }
                    
                    codeContent.appendChild(codeElement);
                    
                    // 组合代码块
                    codeBlock.appendChild(codeHeader);
                    codeBlock.appendChild(codeContent);
                    
                    // 如果有执行结果，添加结果区域
                    if (block.content.execute_result) {
                        const resultBlock = document.createElement('div');
                        resultBlock.className = 'code-execution-result';
                        resultBlock.textContent = block.content.execute_result;
                        codeBlock.appendChild(resultBlock);
                    }
                    
                    contentContainer.appendChild(codeBlock);
                } else if (block.type === 'markdown') {
                    // 处理Markdown内容
                    const mdBlock = document.createElement('div');
                    mdBlock.className = 'markdown-block';
                    
                    // 如果有marked库，使用它来渲染Markdown
                    if (window.marked) {
                        mdBlock.innerHTML = marked(block.content);
                    } else {
                        // 否则简单处理换行和段落
                        mdBlock.innerHTML = formatTextContent(block.content);
                    }
                    
                    contentContainer.appendChild(mdBlock);
                }
            });
            
            return contentContainer.outerHTML;
        }
        
        // 如果没有结构化内容块，处理纯文本
        // 检查是否包含代码块
        const hasCodeBlock = message.content.includes('```');
        
        if (hasCodeBlock) {
            // 处理代码块
            let content = message.content;
            
            // 使用正则表达式匹配代码块
            const codeBlockRegex = /```([a-zA-Z0-9_+-]*)?\s*([\s\S]*?)\s*```/g;
            
            // 替换代码块为HTML
            content = content.replace(codeBlockRegex, function(match, language, code) {
                language = language || 'text';
                
                return `
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">${escapeHtml(language)}</span>
                        <button class="copy-code-button" onclick="navigator.clipboard.writeText(\`${escapeHtml(code)}\`).then(() => { this.innerHTML = '<i class=\"fas fa-check\"></i> 已复制'; setTimeout(() => { this.innerHTML = '<i class=\"fas fa-copy\"></i> 复制'; }, 2000); })">
                            <i class="fas fa-copy"></i> 复制
                        </button>
                    </div>
                    <pre class="code-content"><code class="${escapeHtml(language)}">${escapeHtml(code)}</code></pre>
                </div>
                `;
            });
            
            // 应用语法高亮
            setTimeout(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    if (window.hljs) {
                        try {
                            hljs.highlightElement(block);
                        } catch (e) {
                            console.error('语法高亮失败:', e);
                        }
                    }
                });
            }, 0);
            
            return content;
        }
        
        // 普通文本，格式化后返回
        return formatTextContent(message.content);
    }
    
    // 格式化纯文本内容，保留换行和段落
    function formatTextContent(text) {
        if (!text) return '';
        
        // 基本的HTML转义
        let formattedText = escapeHtml(text);
        
        // 标准化换行符
        formattedText = formattedText.replace(/\r\n/g, '\n');
        
        // 将连续两个换行转换为段落
        formattedText = formattedText.replace(/\n\n+/g, '</p><p>');
        
        // 将单个换行转换为<br>
        formattedText = formattedText.replace(/\n/g, '<br>');
        
        // 如果有段落标记，确保正确包裹
        if (formattedText.includes('</p><p>')) {
            formattedText = '<p>' + formattedText + '</p>';
        } else {
            // 如果没有段落标记，手动添加段落标签
            formattedText = '<p>' + formattedText + '</p>';
        }
        
        return formattedText;
    }
    
    // HTML转义函数
    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    
    // 发送消息
    async function sendMessage(question) {
        try {
            showLoading(true);
            
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    conversation_id: currentConversationId
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || '发送消息失败');
            }
            
            const data = await response.json();
            
            // 渲染AI回复
            renderMessage({
                role: 'assistant',
                content: data.answer,
                content_blocks: data.content_blocks,
                timestamp: data.timestamp
            });
            
            // 更新对话列表
            await loadConversations();
            
            // 滚动到底部
            scrollToBottom();
        } catch (error) {
            console.error('发送消息错误:', error);
            showNotification(error.message || '发送消息失败', 'error');
        } finally {
            showLoading(false);
        }
    }
    
    // 显示/隐藏加载指示器
    function showLoading(show) {
        if (loadingIndicator) {
            loadingIndicator.style.display = show ? 'block' : 'none';
        }
    }
    
    // 显示通知
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fade-in`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // 滚动到底部
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 创建新对话按钮事件
    const newChatButton = document.getElementById('new-chat-button');
    if (newChatButton) {
        newChatButton.addEventListener('click', async () => {
            console.log("点击新对话按钮");
            currentConversationId = null;
            localStorage.removeItem('currentConversationId');
            chatMessages.innerHTML = '';
            
            // 移除所有对话项的活动状态
            const items = document.querySelectorAll('.conversation-item');
            items.forEach(item => {
                item.classList.remove('active');
            });
            
            // 创建新对话前先强制刷新对话列表
            try {
                await loadConversations();
                
                currentConversationId = await createNewConversation();
                if (!currentConversationId) {
                    showNotification("创建新对话失败", "error");
                } else {
                    showNotification("已创建新对话", "success");
                    
                    // 创建成功后再次刷新对话列表
                    setTimeout(async () => {
                        await loadConversations();
                    }, 500);
                }
            } catch (error) {
                console.error("创建新对话失败:", error);
                showNotification("创建新对话失败", "error");
            }
        });
    } else {
        console.error("找不到新对话按钮");
    }

    // 添加侧边栏标题
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const sidebarHeader = document.querySelector('.sidebar-header') || document.createElement('div');
        
        if (!sidebarHeader.classList.contains('sidebar-header')) {
            sidebarHeader.className = 'sidebar-header';
            sidebarHeader.innerHTML = `
                <h2>对话历史</h2>
                <button id="refresh-conversations" class="btn btn-sm" title="刷新对话列表">
                    <i class="fas fa-sync-alt"></i>
                </button>
            `;
            
            if (sidebar.firstChild) {
                sidebar.insertBefore(sidebarHeader, sidebar.firstChild);
            } else {
                sidebar.appendChild(sidebarHeader);
            }
            
            // 添加刷新按钮事件
            const refreshButton = document.getElementById('refresh-conversations');
            if (refreshButton) {
                refreshButton.addEventListener('click', async () => {
                    await loadConversations();
                    showNotification("对话列表已刷新", "info");
                });
            }
        }
    }
}); 
 