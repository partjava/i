const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/challenges/components/QuizWorkspace.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. 替换 State 声明
const oldStates = `  const [activeTab, setActiveTab] = useState<'theory' | 'conceptual' | 'thinking'>('theory');
  const [detail, setDetail] = useState<SubtopicDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);`;

const newStates = `  const [activeTab, setActiveTab] = useState<'theory' | 'conceptual' | 'thinking'>('theory');
  const [levels, setLevels] = useState<SubtopicDetail[]>([]);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);
  const detail = levels[activeLevelIndex] || null;
  const [loading, setLoading] = useState<boolean>(true);`;

if (!content.includes(oldStates)) {
  console.error("oldStates not found!");
  process.exit(1);
}
content = content.replace(oldStates, newStates);

// 2. 替换 fetchDetail
const oldFetch = `  // 1. 获取子话题详情
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setTestResults("");
      setIsPassed(null);
      setSelectedQuizAnswers({});
      setShowQuizExplains({});
      setThinkingAnswer("");
      try {
        const res = await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}\`);
        const data = await res.json();
        if (data.success && data.detail) {
          setDetail(data.detail);
          setCodeValue(data.detail.starterCode);
          
          // 如果有用户记录，则回显
          if (data.detail.userRecord) {
            const r = data.detail.userRecord;
            if (r.codePassed) setIsPassed(true);
            if (r.quizAnswers) {
              setSelectedQuizAnswers(r.quizAnswers);
              const explains: Record<number, boolean> = {};
              Object.keys(r.quizAnswers).forEach((key: any) => {
                explains[key] = true;
              });
              setShowQuizExplains(explains);
            }
            if (r.thinkingFeedback) {
              setAiChatMessages([
                { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' },
                { sender: 'ai', text: r.thinkingFeedback }
              ]);
            }
          }
        } else {
          // 降级使用静态默认模板
          const fallback = getDefaultDetail(selectedNodeName);
          setDetail(fallback);
          setCodeValue(fallback.starterCode);
        }
      } catch (err) {
        console.error('获取关卡数据失败:', err);
        const fallback = getDefaultDetail(selectedNodeName);
        setDetail(fallback);
        setCodeValue(fallback.starterCode);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [selectedNodeName]);`;

const newFetch = `  // 1. 获取子话题详情列表
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}\`);
        const data = await res.json();
        if (data.success && data.levels && data.levels.length > 0) {
          setLevels(data.levels);
          setActiveLevelIndex(0);
        } else {
          // 降级使用静态默认模板
          const fallback = getDefaultDetail(selectedNodeName);
          setLevels([fallback]);
          setActiveLevelIndex(0);
        }
      } catch (err) {
        console.error('获取关卡数据失败:', err);
        const fallback = getDefaultDetail(selectedNodeName);
        setLevels([fallback]);
        setActiveLevelIndex(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [selectedNodeName]);

  // 监听当前活跃的关卡索引，同步表单数据和AI对话状态
  useEffect(() => {
    if (!detail) return;
    setCodeValue(detail.starterCode);
    setTestResults("");
    setIsPassed(null);
    setSelectedQuizAnswers({});
    setShowQuizExplains({});
    setThinkingAnswer("");
    setAiChatMessages([
      { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }
    ]);

    if (detail.userRecord) {
      const r = detail.userRecord;
      if (r.codePassed) setIsPassed(true);
      if (r.quizAnswers) {
        setSelectedQuizAnswers(r.quizAnswers);
        const explains: Record<number, boolean> = {};
        Object.keys(r.quizAnswers).forEach((key: any) => {
          explains[key] = true;
        });
        setShowQuizExplains(explains);
      }
      if (r.thinkingFeedback) {
        setAiChatMessages([
          { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' },
          { sender: 'ai', text: r.thinkingFeedback }
        ]);
      }
    }
  }, [activeLevelIndex, levels]);`;

if (!content.includes(oldFetch)) {
  console.error("oldFetch not found!");
  process.exit(1);
}
content = content.replace(oldFetch, newFetch);

// 3. 替换 submit-code
const oldSubmitCode = `      // 如果已登录，将代码状态回写至数据库
      if (status === 'authenticated') {
        try {
          await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-code\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passed }),
          });
        } catch (e) {
          console.error('上报代码状态失败:', e);
        }
      }`;

const newSubmitCode = `      // 如果已登录，将代码状态回写至数据库
      if (status === 'authenticated') {
        try {
          await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-code\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passed, challengeId: detail.id }),
          });
          // 本地同步更新状态以实时解锁下一关
          setLevels(prev => prev.map((l, idx) => {
            if (idx === activeLevelIndex) {
              return {
                ...l,
                userRecord: {
                  ...l.userRecord,
                  codePassed: passed
                }
              };
            }
            return l;
          }));
        } catch (e) {
          console.error('上报代码状态失败:', e);
        }
      }`;

if (!content.includes(oldSubmitCode)) {
  console.error("oldSubmitCode not found!");
  process.exit(1);
}
content = content.replace(oldSubmitCode, newSubmitCode);

// 4. 替换 submit-quiz
const oldSubmitQuiz = `    // 如果已登录，上报选择题作答
    if (status === 'authenticated') {
      try {
        await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-quiz\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers }),
        });
      } catch (e) {
        console.error('上报选择题进度失败:', e);
      }
    }`;

const newSubmitQuiz = `    // 如果已登录，上报选择题作答
    if (status === 'authenticated') {
      try {
        await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-quiz\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers, challengeId: detail.id }),
        });
        // 本地同步更新选择题记录
        setLevels(prev => prev.map((l, idx) => {
          if (idx === activeLevelIndex) {
            return {
              ...l,
              userRecord: {
                ...l.userRecord,
                quizAnswers: newAnswers
              }
            };
          }
          return l;
        }));
      } catch (e) {
        console.error('上报选择题进度失败:', e);
      }
    }`;

if (!content.includes(oldSubmitQuiz)) {
  console.error("oldSubmitQuiz not found!");
  process.exit(1);
}
content = content.replace(oldSubmitQuiz, newSubmitQuiz);

// 5. 替换 submit-thinking
const oldSubmitThinking = `      if (status === 'authenticated') {
        const res = await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-thinking\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: thinkingAnswer }),
        });
        const data = await res.json();
        if (data.success) {
          setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.feedback }]);
        } else {
          message.error(data.error || '提交打分失败');
        }
      }`;

const newSubmitThinking = `      if (status === 'authenticated') {
        const res = await fetch(\`/api/star-challenges/\${encodeURIComponent(selectedNodeName)}/submit-thinking\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: thinkingAnswer, challengeId: detail.id }),
        });
        const data = await res.json();
        if (data.success) {
          setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.feedback }]);
          // 本地同步更新思考题评语和分数
          setLevels(prev => prev.map((l, idx) => {
            if (idx === activeLevelIndex) {
              return {
                ...l,
                userRecord: {
                  ...l.userRecord,
                  thinkingScore: data.score,
                  thinkingFeedback: data.feedback
                }
              };
            }
            return l;
          }));
        } else {
          message.error(data.error || '提交打分失败');
        }
      }`;

if (!content.includes(oldSubmitThinking)) {
  console.error("oldSubmitThinking not found!");
  process.exit(1);
}
content = content.replace(oldSubmitThinking, newSubmitThinking);

// 6. 替换 JSX return
const oldJSX = `  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex overflow-hidden z-10"
    >
      {/* 1. 左侧：理论讲解与选择题练习 */}
      <div className="w-[30%] border-r border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col overflow-hidden">`;

const newJSX = `  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col overflow-hidden z-10"
    >
      {/* 顶部：关卡选择器 */}
      <div className="bg-slate-950 border-b border-slate-900 px-6 py-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold text-white tracking-wider font-sans flex items-center gap-1">
             当前的闯关进度：
          </span>
          <div className="flex items-center gap-2">
            {levels.map((lvl, index) => {
              // 解锁逻辑：第一关始终解锁；后面的关卡要求前一关通过了代码测试且写过选择题
              const isUnlocked = index === 0 || levels.slice(0, index).every(l => l.userRecord?.codePassed);
              const isActive = index === activeLevelIndex;
              return (
                <button
                  key={index}
                  disabled={!isUnlocked}
                  onClick={() => setActiveLevelIndex(index)}
                  className={\`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition flex items-center gap-1.5 border \${
                    isActive 
                      ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]" 
                      : isUnlocked 
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                        : "bg-slate-950 border-slate-950 text-slate-600 cursor-not-allowed"
                  }\`}
                >
                  {isUnlocked ? "⭐" : "🔒"} 第 {lvl.levelIndex} 关：{lvl.levelTitle}
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          {selectedNodeName} // STAGE {levels[0]?.stageId}
        </div>
      </div>

      {/* 下方：双栏布局 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. 左侧：理论讲解与选择题练习 */}
        <div className="w-[30%] border-r border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col overflow-hidden">`;

if (!content.includes(oldJSX)) {
  console.error("oldJSX not found!");
  process.exit(1);
}
content = content.replace(oldJSX, newJSX);

// 7. 替换结尾的闭合标签
const oldClose = `    </motion.div>
  );
};`;

const newClose = `      </div>
    </motion.div>
  );
};`;

if (!content.includes(oldClose)) {
  console.error("oldClose not found!");
  process.exit(1);
}
content = content.replace(oldClose, newClose);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Patched QuizWorkspace.tsx successfully!");
