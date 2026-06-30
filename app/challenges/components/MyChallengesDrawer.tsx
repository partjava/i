'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Send, Clock, CheckCircle, FileText, Edit3, GraduationCap } from 'lucide-react';
import { message as antMsg } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { STAGES } from '../data/stages';

interface MyChallengesDrawerProps {
  onClose: () => void;
}

export function MyChallengesDrawer({ onClose }: MyChallengesDrawerProps) {
  const [published, setPublished] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [msg, setMsg] = useState('');
  const [testCases, setTestCases] = useState<Array<{ input: string; expected: string }>>([
    { input: '', expected: '' },
    { input: '', expected: '' },
  ]);
  const [evalCases, setEvalCases] = useState<Array<{ input: string; expected: string }>>([
    { input: '', expected: '' },
    { input: '', expected: '' },
  ]);

  const [form, setForm] = useState({
    stageId: 1,
    topicName: '计算机基础',
    subtopicName: '计算机组成原理',
    levelTitle: '',
    levelIndex: 1,
    difficulty: 'foundation',
    accessLevel: 'member',
    isPublic: true,
    theoryContent: '',
    starterCode: '',
    solutionCode: '',
    thinkingQuestion: '',
  });

  const currentStage = STAGES.find(s => s.id === form.stageId);
  const currentTopic = currentStage?.topics.find(t => t.name === form.topicName);

  // 选中小节变化时，自动计算下一个可用序号
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/star-challenges/${encodeURIComponent(form.subtopicName)}`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled && data.success && data.levels) {
          const maxIdx = data.levels.reduce((max: number, lv: any) => Math.max(max, lv.levelIndex || 0), 0);
          setForm(prev => ({ ...prev, levelIndex: maxIdx + 1 }));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [form.subtopicName]);

  const loadMyChallenges = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/challenges/my');
      const data = await res.json();
      if (data.success) {
        setPublished(data.data?.published || []);
        setDrafts(data.data?.drafts || []);
      }
    } catch (e) {
      console.error('加载个人题目失败:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMyChallenges(); }, []);

  const handleSubmit = async () => {
    if (!form.levelTitle.trim()) {
      antMsg.warning('请填写关卡标题');
      return;
    }
    const validVisible = testCases.filter(t => t.input.trim() && t.expected.trim());
    const validEval = evalCases.filter(t => t.input.trim() && t.expected.trim());
    if (validVisible.length < 2) {
      antMsg.warning('测试样例（学生可见）至少需要2组');
      return;
    }
    if (validEval.length < 2) {
      antMsg.warning('通过样例（隐藏判题）至少需要2组');
      return;
    }
    setSubmitting(true);
    setMsg('');
    try {
      const res = await fetch('/api/challenges/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stageId: form.stageId,
          topicName: form.topicName.trim(),
          subtopicName: form.subtopicName.trim() || form.topicName.trim(),
          levelTitle: form.levelTitle.trim(),
          levelIndex: form.levelIndex,
          difficulty: form.difficulty,
          accessLevel: form.accessLevel,
          isPublic: form.isPublic,
          theoryContent: form.theoryContent.trim(),
          starterCode: form.starterCode.trim(),
          solutionCode: form.solutionCode.trim(),
          thinkingQuestion: form.thinkingQuestion.trim(),
          testCases: testCases.filter(t => t.input || t.expected),
          evaluationCases: evalCases.filter(t => t.input || t.expected),
        }),
      });
      const data = await res.json();
      if (data.success) {
        antMsg.success('草稿已提交，等待管理员审核！');
        setShowForm(false);
        setForm({ stageId: 1, topicName: '计算机基础', subtopicName: '计算机组成原理', levelTitle: '', levelIndex: 1, difficulty: 'foundation', accessLevel: 'member', isPublic: true, theoryContent: '', starterCode: '', solutionCode: '', thinkingQuestion: '' });
        loadMyChallenges();
      } else {
        antMsg.error(data.message || '提交失败');
      }
    } catch { antMsg.error('网络错误，请检查是否已登录'); }
    finally { setSubmitting(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#0C1F3D]/98 backdrop-blur-sm flex overflow-hidden"
    >
      {/* 左侧题目列表 */}
      <div className="w-72 border-r border-[#234272]/60 bg-[#08172F]/90 flex flex-col shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#234272]/60">
          <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-400" /> 我的出题
          </span>
          <button onClick={onClose} className="p-1 rounded text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-3 py-3 border-b border-[#234272]/40 space-y-2">
          <button
            onClick={() => { setShowForm(true); setShowHistory(false); }}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
              showForm && !showHistory
                ? 'bg-slate-800 text-slate-300 border border-slate-700'
                : 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-400 hover:to-fuchsia-400 shadow-lg shadow-purple-500/25'
            }`}
          >
            <Plus className="w-4 h-4" /> 新建出题
          </button>
          <button
            onClick={() => { setShowHistory(!showHistory); setShowForm(false); }}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition border ${
              showHistory
                ? 'bg-slate-800 text-slate-300 border-slate-600'
                : 'bg-transparent text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-500'
            }`}
          >
            <Clock className="w-4 h-4" /> 历史申请
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {loading ? (
            <div className="text-center text-slate-500 text-xs py-8">加载中...</div>
          ) : (
            <>
              {published.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1.5 flex items-center gap-1 px-1">
                    <CheckCircle className="w-3 h-3" /> 已发布 ({published.length})
                  </h4>
                  {published.map((c: any) => (
                    <div key={c.id} className="px-2.5 py-2 rounded-lg hover:bg-slate-900/60 cursor-pointer text-xs mb-1 border border-transparent hover:border-slate-800 transition">
                      <div className="text-slate-200 font-medium truncate">{c.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">S{c.stageId} · {c.topicName}</div>
                    </div>
                  ))}
                </div>
              )}
              {drafts.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1.5 flex items-center gap-1 px-1">
                    <Clock className="w-3 h-3" /> 审核中 ({drafts.length})
                  </h4>
                  {drafts.map((d: any) => (
                    <div key={d.id} className="px-2.5 py-2 rounded-lg hover:bg-slate-900/60 cursor-pointer text-xs mb-1 border border-amber-900/30 hover:border-amber-900/60 transition">
                      <div className="text-slate-200 font-medium truncate">{d.levelTitle}</div>
                      <div className="text-[10px] text-amber-400/70 mt-0.5">{d.status === 'pending' ? '🕐 待审核' : d.status === 'approved' ? '✅ 已通过' : '❌ 已驳回'}</div>
                    </div>
                  ))}
                </div>
              )}
              {published.length === 0 && drafts.length === 0 && (
                <div className="text-center text-slate-600 text-xs py-10">点击上方按钮开始出题</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 右侧出题表单 / 预览区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showForm ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-[#234272]/60 pb-3">
              <Edit3 className="w-4 h-4 text-purple-400" /> 编写新题目
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">阶段</label>
                <select value={form.stageId} onChange={e => {
                  const sid = Number(e.target.value);
                  const st = STAGES.find(s => s.id === sid);
                  const ft = st?.topics[0];
                  setForm({ ...form, stageId: sid, topicName: ft?.name || '', subtopicName: ft?.children[0] || '' });
                }} className="w-full mt-1 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  {STAGES.map(s => <option key={s.id} value={s.id}>S{s.id} {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">主题</label>
                <select value={form.topicName} onChange={e => {
                  const tn = e.target.value;
                  const t = currentStage?.topics.find(tp => tp.name === tn);
                  setForm({ ...form, topicName: tn, subtopicName: t?.children[0] || '' });
                }} className="w-full mt-1 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  {(currentStage?.topics || []).map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">小节（出题位置）</label>
                <select value={form.subtopicName} onChange={e => setForm({ ...form, subtopicName: e.target.value })}
                  className="w-full mt-1 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  {(currentTopic?.children || []).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">关卡序号（自动计算）</label>
                <input type="number" value={form.levelIndex} onChange={e => setForm({ ...form, levelIndex: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-emerald-400 font-mono" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">难度</label>
                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  <option value="foundation">基础</option>
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">权限等级</label>
                <select value={form.accessLevel} onChange={e => setForm({ ...form, accessLevel: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  <option value="free">免费</option>
                  <option value="member">会员</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">可见性</label>
                <select value={form.isPublic ? 'true' : 'false'} onChange={e => setForm({ ...form, isPublic: e.target.value === 'true' })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200">
                  <option value="true">🌐 公开</option>
                  <option value="false">🔒 私有</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wider">关卡标题 *</label>
              <input placeholder="给这道题起个名字" value={form.levelTitle} onChange={e => setForm({ ...form, levelTitle: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200" />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wider">理论内容 (Markdown)</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <textarea placeholder="支持 Markdown 格式..." rows={8} value={form.theoryContent}
                  onChange={e => setForm({ ...form, theoryContent: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 resize-none font-mono" />
                <div className="rounded-lg bg-slate-900 border border-slate-700 p-3 overflow-y-auto max-h-[200px]">
                  {form.theoryContent ? (
                    <div className="prose prose-invert prose-xs max-w-none text-slate-300 text-xs leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {form.theoryContent}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-xs italic">Markdown 预览区域</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">起手代码</label>
                <textarea placeholder="给学生的初始代码模板" rows={5} value={form.starterCode}
                  onChange={e => setForm({ ...form, starterCode: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-emerald-400 font-mono resize-none" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">标准答案</label>
                <textarea placeholder="标准参考代码" rows={5} value={form.solutionCode}
                  onChange={e => setForm({ ...form, solutionCode: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-amber-400 font-mono resize-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wider">思考题</label>
              <textarea placeholder="开放式思考问题..." rows={3} value={form.thinkingQuestion}
                onChange={e => setForm({ ...form, thinkingQuestion: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 resize-none" />
            </div>

            {/* 测试样例 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-wider">测试样例（至少2组）</label>
                <button type="button"
                  onClick={() => setTestCases(prev => [...prev, { input: '', expected: '' }])}
                  className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> 添加
                </button>
              </div>
              <div className="space-y-2">
                {testCases.map((tc, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 p-2 rounded bg-slate-950 border border-slate-800 relative">
                    {testCases.length > 2 && (
                      <button type="button"
                        onClick={() => setTestCases(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">×</button>
                    )}
                    <input placeholder={`输入 #${idx + 1}`} value={tc.input}
                      onChange={e => setTestCases(prev => prev.map((t, i) => i === idx ? { ...t, input: e.target.value } : t))}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono" />
                    <input placeholder={`期望输出 #${idx + 1}`} value={tc.expected}
                      onChange={e => setTestCases(prev => prev.map((t, i) => i === idx ? { ...t, expected: e.target.value } : t))}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono" />
                  </div>
                ))}
              </div>
            </div>

            {/* 隐藏判题样例 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] text-amber-400 uppercase tracking-wider">🔒 通过样例（学生不可见，用于判题）至少2组</label>
                <button type="button"
                  onClick={() => setEvalCases(prev => [...prev, { input: '', expected: '' }])}
                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> 添加
                </button>
              </div>
              <div className="space-y-2">
                {evalCases.map((ec, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 p-2 rounded bg-slate-950 border border-amber-900/40 relative">
                    {evalCases.length > 2 && (
                      <button type="button"
                        onClick={() => setEvalCases(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">×</button>
                    )}
                    <input placeholder={`隐藏输入 #${idx + 1}`} value={ec.input}
                      onChange={e => setEvalCases(prev => prev.map((t, i) => i === idx ? { ...t, input: e.target.value } : t))}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-amber-900/40 text-xs text-amber-300 font-mono" />
                    <input placeholder={`隐藏期望 #${idx + 1}`} value={ec.expected}
                      onChange={e => setEvalCases(prev => prev.map((t, i) => i === idx ? { ...t, expected: e.target.value } : t))}
                      className="px-2 py-1.5 rounded bg-slate-900 border border-amber-900/40 text-xs text-amber-300 font-mono" />
                  </div>
                ))}
              </div>
            </div>

            {msg && (
              <div className={`text-xs px-3 py-2 rounded-lg ${msg.includes('成功') ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' : 'bg-amber-900/30 text-amber-400 border border-amber-800'}`}>
                {msg}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 border border-slate-700 hover:text-white hover:border-slate-600 transition">
                取消
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-400 hover:to-fuchsia-400 shadow-lg shadow-purple-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> {submitting ? '提交中...' : '提交草稿审核'}
              </button>
            </div>
          </div>
        ) : showHistory ? (
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-[#234272]/60 pb-3 mb-4">
              <Clock className="w-4 h-4 text-amber-400" /> 历史申请记录
            </h3>
            {drafts.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-10">暂无申请记录</p>
            ) : (
              <div className="space-y-3">
                {drafts.map((d: any) => (
                  <div key={d.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">{d.levelTitle}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        d.status === 'approved' ? 'bg-emerald-900/40 text-emerald-400' :
                        d.status === 'rejected' ? 'bg-red-900/40 text-red-400' :
                        'bg-amber-900/40 text-amber-400'
                      }`}>
                        {d.status === 'approved' ? '✅ 已通过' : d.status === 'rejected' ? '❌ 已驳回' : '🕐 待审核'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      S{d.stageId} · {d.topicName} / {d.subtopicName} · 难度: {d.difficulty || '基础'}
                    </div>
                    {d.reviewComment && (
                      <div className="text-[10px] text-slate-500 mt-1 border-t border-slate-800 pt-1">
                        审核意见: {d.reviewComment}
                      </div>
                    )}
                    <div className="text-[9px] text-slate-600 mt-1">
                      提交于 {new Date(d.createdAt).toLocaleString('zh-CN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">点击左侧 <span className="text-purple-400 font-bold">新建出题</span> 开始编写题目</p>
                <p className="text-slate-600 text-xs mt-1">提交后由站长或管理员审核通过即可发布到宇宙题库</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
