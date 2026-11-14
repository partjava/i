'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Row, Col, Select, Tag, Tabs, message, Spin, InputNumber } from 'antd';
import { Edit3, Plus, Trash2, CheckCircle, XCircle, Clock, RotateCcw, Trash, History, Eye, Copy, RefreshCw, Search } from 'lucide-react';
import { Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getAuthHeaders } from '@shared/lib/auth-client';

interface AdminSubmission {
  id: number;
  userId: number;
  username: string;
  challengeId: number;
  challengeTitle: string;
  stageId?: number;
  topicName?: string;
  subtopicName?: string;
  code: string;
  language: string;
  status: string;
  executionTime?: number;
  errorMessage?: string;
  submittedAt: string;
}

interface ChallengeRecord {
  id: number; title: string; stageId: number; topicName: string;
  subtopicName: string; levelIndex: number; difficulty: string;
  accessLevel: string; status: string; slug: string; authorId?: number;
  isPublic?: boolean;
  theoryContent?: string; starterCode?: string; solutionCode?: string;
  thinkingQuestion?: string; aiPrompt?: string;
}

interface ChallengeTabProps {
  challenges: ChallengeRecord[];
  drafts?: Array<{ id: number; userId: number; levelTitle: string; topicName: string; subtopicName: string; stageId: number; levelIndex: number; status: string; theoryContent?: string; starterCode?: string; solutionCode?: string; createdAt: string }>;
  users?: Array<{ id: number; username: string }>;
  onApproveDraft?: (draftId: number, slug: string, levelIndex: number) => void;
  onRejectDraft?: (draftId: number) => void;
  onDeleteDraft?: (draftId: number) => void;
  onDeleteChallenge?: (id: number) => void;
  onRestoreChallenge?: (id: number) => void;
  onRefresh?: () => void;
}

const STAGES = ['', '计算机基础', '编程入门', '数据结构', '机器学习', '深度学习', 'NLP', '计算机视觉', '强化学习', '生成式AI', 'MLOps', '量子计算'];

interface CaseItem {
  mode?: string;
  function?: string;
  args?: any;
  kwargs?: any;
  input?: string;
  expected?: any;
  expectedException?: string;
  description?: string;
}

function getSubmissionTagColor(status: string): string {
  const s = (status || '').toUpperCase();
  if (s === 'ACCEPTED' || s === 'PASSED') return 'green';
  if (s === 'SAMPLE_ACCEPTED') return 'cyan';
  if (s === 'WRONG_ANSWER' || s === 'RUNTIME_ERROR' || s === 'TIME_LIMIT_EXCEEDED' || s === 'COMPILE_ERROR' || s === 'FAILED') {
    return 'red';
  }
  return 'gold';
}

function formatCaseField(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'string') return val;
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function parseJsonOrString(raw: string, fallbackToString = true): any {
  const trimmed = raw.trim();
  if (!trimmed) return fallbackToString ? '' : undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return fallbackToString ? raw : raw;
  }
}

function CaseJsonField({
  value,
  onCommit,
  placeholder,
  className,
}: {
  value: any;
  onCommit: (nextVal: any) => void;
  placeholder?: string;
  className?: string;
}) {
  const [text, setText] = useState(() => formatCaseField(value));

  useEffect(() => {
    setText(formatCaseField(value));
  }, [value]);

  return (
    <Input
      size="small"
      placeholder={placeholder}
      value={text}
      className={className}
      onChange={e => setText(e.target.value)}
      onBlur={() => onCommit(parseJsonOrString(text))}
    />
  );
}

function CaseEditorList({
  cases,
  onChange,
  isEval,
}: {
  cases: CaseItem[];
  onChange: React.Dispatch<React.SetStateAction<CaseItem[]>>;
  isEval?: boolean;
}) {
  const borderCls = isEval ? 'border-amber-900/40' : 'border-slate-700';
  const textCls = isEval ? 'text-amber-300' : '';
  const prefix = isEval ? '隐藏' : '';

  return (
    <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
      {cases.map((c, idx) => {
        const isCallMode = c.mode === 'call' || Boolean(c.function);
        return (
          <div key={idx} className={`p-2.5 rounded bg-slate-950 border ${borderCls} relative space-y-2`}>
            {cases.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(prev => prev.filter((_, i) => i !== idx))}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
              >
                ×
              </button>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">#{idx + 1}</span>
              <Select
                size="small"
                value={c.mode || (c.function ? 'call' : 'stdin')}
                style={{ width: 120 }}
                onChange={val => onChange(prev => prev.map((item, i) => i === idx ? { ...item, mode: val } : item))}
                options={[
                  { value: 'stdin', label: '标准输入 (stdin)' },
                  { value: 'call', label: '函数调用 (call)' },
                  { value: 'script', label: '脚本检查 (script)' },
                ]}
              />
              <Input
                size="small"
                placeholder="用例说明 (description, 可选)"
                value={c.description || ''}
                className="flex-1 min-w-[160px]"
                onChange={e => onChange(prev => prev.map((item, i) => i === idx ? { ...item, description: e.target.value } : item))}
              />
            </div>

            {isCallMode ? (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  size="small"
                  placeholder="函数名 (function)"
                  value={c.function || ''}
                  className={textCls}
                  onChange={e => onChange(prev => prev.map((item, i) => i === idx ? { ...item, function: e.target.value } : item))}
                />
                <CaseJsonField
                  placeholder="位置参数 args (JSON 数组)"
                  value={c.args ?? []}
                  className={textCls}
                  onCommit={val => onChange(prev => prev.map((item, i) => i === idx ? { ...item, args: val } : item))}
                />
                <CaseJsonField
                  placeholder="关键字参数 kwargs (JSON 对象)"
                  value={c.kwargs ?? {}}
                  className={textCls}
                  onCommit={val => onChange(prev => prev.map((item, i) => i === idx ? { ...item, kwargs: val } : item))}
                />
                <CaseJsonField
                  placeholder={`${prefix}期望返回值 (expected, JSON/文本)`}
                  value={c.expected}
                  className={textCls}
                  onCommit={val => onChange(prev => prev.map((item, i) => i === idx ? { ...item, expected: val } : item))}
                />
                <Input
                  size="small"
                  placeholder="期望异常类型 (expectedException, 可选)"
                  value={c.expectedException || ''}
                  className={`col-span-2 ${textCls}`}
                  onChange={e => onChange(prev => prev.map((item, i) => i === idx ? { ...item, expectedException: e.target.value } : item))}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  size="small"
                  placeholder={`${prefix}输入 #${idx + 1}`}
                  value={c.input || ''}
                  className={textCls}
                  onChange={e => onChange(prev => prev.map((item, i) => i === idx ? { ...item, input: e.target.value } : item))}
                />
                <CaseJsonField
                  placeholder={`${prefix}期望输出 #${idx + 1}`}
                  value={c.expected}
                  className={textCls}
                  onCommit={val => onChange(prev => prev.map((item, i) => i === idx ? { ...item, expected: val } : item))}
                />
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(prev => [...prev, { input: '', expected: '' }])}
        className={`w-full py-1.5 rounded border border-dashed ${isEval ? 'border-amber-800 text-amber-500 hover:border-amber-500 hover:text-amber-400' : 'border-slate-600 text-slate-400 hover:border-cyan-500 hover:text-cyan-400'} text-xs flex items-center justify-center gap-1`}
      >
        <Plus className="w-3 h-3" /> {isEval ? '添加通过样例' : '添加测试样例'}
      </button>
    </div>
  );
}

function getAuthorName(authorId: number | undefined, users?: Array<{ id: number; username: string }>) {
  if (!authorId) return '—'; if (!users) return `UID-${authorId}`;
  const u = users.find(u => u.id === authorId);
  return u ? `@${u.username}` : `UID-${authorId}`;
}

export default function ChallengeTab({ challenges, drafts, users, onApproveDraft, onRejectDraft, onDeleteDraft, onDeleteChallenge, onRestoreChallenge, onRefresh }: ChallengeTabProps) {
  const [showTrash, setShowTrash] = useState(false);
  const [trashChallenges, setTrashChallenges] = useState<ChallengeRecord[]>([]);
  const [editing, setEditing] = useState<ChallengeRecord | null>(null);
  const [editData, setEditData] = useState<ChallengeRecord | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stageFilter, setStageFilter] = useState<number | null>(null);
  const [challengeSearch, setChallengeSearch] = useState('');
  const [previewMd, setPreviewMd] = useState('');
  const [quizzes, setQuizzes] = useState<Array<{ id?: number; question: string; options: string[]; correctIndex: number; explanation: string }>>([]);
  const [editTestCases, setEditTestCases] = useState<CaseItem[]>([]);
  const [editEvalCases, setEditEvalCases] = useState<CaseItem[]>([]);
  const [form] = Form.useForm();

  // ===== 全站提交记录状态 =====
  const [activeSection, setActiveSection] = useState<'challenges' | 'submissions'>('challenges');
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [submissionsTotal, setSubmissionsTotal] = useState(0);
  const [subLoading, setSubLoading] = useState(false);
  const [subPage, setSubPage] = useState(1);
  const [subPageSize, setSubPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterChallengeId, setFilterChallengeId] = useState<number | undefined>(undefined);
  const [filterUserId, setFilterUserId] = useState<number | undefined>(undefined);
  const [inspectingSub, setInspectingSub] = useState<AdminSubmission | null>(null);

  const loadSubmissions = async (
    page = subPage,
    status = filterStatus,
    challengeId = filterChallengeId,
    userId = filterUserId
  ) => {
    setSubLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(subPageSize) });
      if (status) params.append('status', status);
      if (challengeId) params.append('challengeId', String(challengeId));
      if (userId) params.append('userId', String(userId));
      const res = await fetch(`/api/admin/submissions?${params.toString()}`, {
        headers: { ...getAuthHeaders() },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSubmissions(json.data.records || []);
        setSubmissionsTotal(json.data.total || 0);
      }
    } catch {
      message.error('加载全站提交记录失败');
    } finally {
      setSubLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let list = stageFilter ? challenges.filter(c => c.stageId === stageFilter) : challenges;
    if (challengeSearch.trim()) {
      const kw = challengeSearch.trim().toLowerCase();
      list = list.filter(c =>
        c.title?.toLowerCase().includes(kw) ||
        c.topicName?.toLowerCase().includes(kw) ||
        c.subtopicName?.toLowerCase().includes(kw) ||
        c.slug?.toLowerCase().includes(kw) ||
        String(c.id).includes(kw)
      );
    }
    return list;
  }, [challenges, stageFilter, challengeSearch]);

  // Modal 打开后，把加载好的数据填入表单
  useEffect(() => {
    if (editData && editing) {
      form.setFieldsValue(editData);
      setPreviewMd(editData.theoryContent || '');
    }
  }, [editData, editing, form]);

  // 打开编辑：先加载完整数据，再打开 Modal
  const openEdit = async (record: ChallengeRecord) => {
    setEditLoading(true);
    setEditing(record); // 先开 Modal 显示 loading
    setEditData(null);
    try {
      const res = await fetch(`/api/admin/challenges/${record.id}`, {
        headers: { ...getAuthHeaders() },
      });
      const json = await res.json();
      if (json.success && json.data) {
        setEditData({
          ...json.data,
          title: json.data.title || record.title,
          stageId: json.data.stageId ?? record.stageId,
          topicName: json.data.topicName || record.topicName,
          subtopicName: json.data.subtopicName || record.subtopicName,
          levelIndex: json.data.levelIndex ?? record.levelIndex,
          difficulty: json.data.difficulty || record.difficulty,
          accessLevel: json.data.accessLevel || record.accessLevel,
          isPublic: json.data.isPublic ?? true,
          theoryContent: json.data.theoryContent || '',
          starterCode: json.data.starterCode || '',
          solutionCode: json.data.solutionCode || '',
          thinkingQuestion: json.data.thinkingQuestion || '',
          aiPrompt: json.data.aiPrompt || '',
        });
        setQuizzes(json.data.quizzes || []);
        setEditTestCases(json.data.testCases || []);
        setEditEvalCases(json.data.evaluationCases || []);
      } else {
        setEditData(record); // 接口挂了，用列表数据兜底
      }
    } catch {
      setEditData(record);
    } finally {
      setEditLoading(false);
    }
  };

  // 保存
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const res = await fetch(`/api/admin/challenges/${editing?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ ...values, quizzes, testCases: editTestCases, evaluationCases: editEvalCases }),
      });
      const json = await res.json();
      if (json.success) {
        message.success('关卡已更新');
        setEditing(null);
        onRefresh?.();
      } else {
        message.error(json.message || '保存失败');
      }
    } catch (e: any) {
      if (e.errorFields) return;
      message.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card
      title={<span className="text-slate-200 font-bold">🪐 宇宙大地图关卡与评测逻辑维护</span>}
      extra={
        <div className="flex items-center gap-2">
          {/* 切换关卡管理 vs 全站提交记录 */}
          <div className="bg-slate-950 p-0.5 rounded-lg border border-slate-800 flex items-center mr-2">
            <button
              onClick={() => setActiveSection('challenges')}
              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                activeSection === 'challenges'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              关卡与草稿
            </button>
            <button
              onClick={() => {
                setActiveSection('submissions');
                void loadSubmissions(1);
              }}
              className={`px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === 'submissions'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History size={12} />
              全站提交记录
            </button>
          </div>

          {activeSection === 'challenges' && (
            <>
              <Input
                prefix={<Search size={12} className="text-slate-400" />}
                placeholder="搜索标题/主题/slug/ID..."
                value={challengeSearch}
                onChange={e => setChallengeSearch(e.target.value)}
                allowClear
                size="small"
                style={{ width: 190 }}
              />
              <Select placeholder="全部阶段" allowClear value={stageFilter}
                onChange={(v) => setStageFilter(v || null)} size="small" style={{ width: 150 }}
                options={STAGES.map((s, i) => i > 0 ? { value: i, label: `S${i} ${s}` } : null).filter(Boolean) as any} />
              <Button size="small" type={showTrash ? 'primary' : 'default'} ghost={!showTrash}
                icon={<Trash size={12} />}
                onClick={async () => {
                  const next = !showTrash;
                  setShowTrash(next);
                  if (next) {
                    try {
                      const r = await fetch('/api/admin/challenges/trash', {
                        headers: { ...getAuthHeaders() },
                      });
                      const j = await r.json();
                      setTrashChallenges(j.data || []);
                    } catch {}
                  }
                }}>
                回收站
              </Button>
            </>
          )}
        </div>
      }
      bordered={false} className="bg-slate-900 border border-slate-800"
    >
      {activeSection === 'submissions' ? (
        /* ===== 全站学员挑战提交记录看板 ===== */
        <div>
          {/* 筛选工具栏 */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              <Select
                placeholder="全部判题状态"
                allowClear
                value={filterStatus}
                onChange={(val) => {
                  setFilterStatus(val);
                  void loadSubmissions(1, val, filterChallengeId, filterUserId);
                }}
                size="small"
                style={{ width: 185 }}
                options={[
                  { value: 'ACCEPTED', label: '✅ 通过 (ACCEPTED)' },
                  { value: 'SAMPLE_ACCEPTED', label: '🟡 仅公开样例通过 (SAMPLE_ACCEPTED)' },
                  { value: 'WRONG_ANSWER', label: '❌ 答案错误 (WRONG_ANSWER)' },
                  { value: 'RUNTIME_ERROR', label: '⚠️ 运行错误 (RUNTIME_ERROR)' },
                  { value: 'TIME_LIMIT_EXCEEDED', label: '⏱️ 超时 (TLE)' },
                  { value: 'COMPILE_ERROR', label: '⚙️ 编译错误' },
                  { value: 'passed', label: '✅ 通过 (passed)' },
                  { value: 'failed', label: '❌ 未通过 (failed)' },
                ]}
              />

              <Select
                placeholder="按关卡筛选"
                allowClear
                showSearch
                optionFilterProp="label"
                value={filterChallengeId}
                onChange={(val) => {
                  setFilterChallengeId(val);
                  void loadSubmissions(1, filterStatus, val, filterUserId);
                }}
                size="small"
                style={{ width: 220 }}
                options={challenges.map((c) => ({
                  value: c.id,
                  label: `#${c.id} ${c.title} (${c.subtopicName || ''})`,
                }))}
              />

              <Select
                placeholder="按学员筛选"
                allowClear
                showSearch
                optionFilterProp="label"
                value={filterUserId}
                onChange={(val) => {
                  setFilterUserId(val);
                  void loadSubmissions(1, filterStatus, filterChallengeId, val);
                }}
                size="small"
                style={{ width: 160 }}
                options={(users || []).map((u) => ({
                  value: u.id,
                  label: `@${u.username} (UID-${u.id})`,
                }))}
              />
            </div>

            <Button
              size="small"
              icon={<RefreshCw size={12} className={subLoading ? 'animate-spin' : ''} />}
              onClick={() => void loadSubmissions(subPage)}
            >
              刷新
            </Button>
          </div>

          {/* 提交记录表格 */}
          <Table
            dataSource={submissions}
            rowKey="id"
            size="small"
            loading={subLoading}
            pagination={{
              current: subPage,
              pageSize: subPageSize,
              total: submissionsTotal,
              showTotal: (total) => `共 ${total} 条提交记录`,
              onChange: (p, ps) => {
                setSubPage(p);
                setSubPageSize(ps);
                void loadSubmissions(p);
              },
            }}
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                width: 60,
                render: (v: number) => <span className="font-mono text-indigo-400 text-xs">#{v}</span>,
              },
              {
                title: '学员',
                dataIndex: 'username',
                width: 120,
                render: (name: string, r: AdminSubmission) => (
                  <span className="font-semibold text-purple-300 text-xs">
                    @{name || `UID-${r.userId}`}
                  </span>
                ),
              },
              {
                title: '关卡题目',
                key: 'challenge',
                ellipsis: true,
                render: (_: any, r: AdminSubmission) => (
                  <div className="text-xs">
                    <span className="font-semibold text-slate-100">{r.challengeTitle}</span>
                    <span className="text-slate-500 ml-1.5 text-[11px]">
                      ({r.topicName || ''} / {r.subtopicName || ''})
                    </span>
                  </div>
                ),
              },
              {
                title: '状态',
                dataIndex: 'status',
                width: 140,
                render: (status: string) => (
                  <Tag color={getSubmissionTagColor(status)} className="text-[10px]">
                    {status || 'UNKNOWN'}
                  </Tag>
                ),
              },
              {
                title: '执行耗时',
                dataIndex: 'executionTime',
                width: 80,
                render: (v?: number) => (
                  <span className="font-mono text-slate-400 text-xs">
                    {v !== undefined && v !== null ? `${v}ms` : '—'}
                  </span>
                ),
              },
              {
                title: '提交时间',
                dataIndex: 'submittedAt',
                width: 140,
                render: (val: string) => (
                  <span className="text-slate-400 text-xs">
                    {val ? val.replace('T', ' ').substring(0, 19) : '—'}
                  </span>
                ),
              },
              {
                title: '操作',
                key: 'actions',
                width: 90,
                render: (_: any, record: AdminSubmission) => (
                  <Button
                    size="small"
                    type="primary"
                    ghost
                    icon={<Eye size={12} />}
                    className="text-[10px]"
                    onClick={() => setInspectingSub(record)}
                  >
                    查看代码
                  </Button>
                ),
              },
            ]}
          />
        </div>
      ) : (
        /* ===== 原有：关卡与草稿区 ===== */
        <>
      {/* ===== 草稿审核区 ===== */}
      {drafts && drafts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" /> 待审核草稿 ({drafts.filter(d => d.status === 'pending').length})
          </h4>
          <Table
            dataSource={drafts}
            rowKey="id"
            size="small"
            pagination={false}
            columns={[
              { title: '草稿ID', dataIndex: 'id', width: 60, render: (v: number) => <span className="font-mono text-amber-400 text-xs">D#{v}</span> },
              { title: '标题', dataIndex: 'levelTitle', ellipsis: true, render: (t: string) => <span className="font-semibold text-amber-100 text-xs">{t}</span> },
              { title: '阶段', dataIndex: 'stageId', width: 60, render: (v: number) => <span className="font-mono text-xs text-slate-400">S{v}</span> },
              { title: '主题/小节', key: 'topic', width: '20%', render: (_: any, r: any) => (
                <span className="text-slate-400 text-xs">{r.topicName || '—'} / {r.subtopicName || '—'}</span>
              )},
              { title: '出题人', dataIndex: 'userId', width: 80, render: (v: number) => <span className="text-xs text-purple-400">{getAuthorName(v, users)}</span> },
              { title: '状态', dataIndex: 'status', width: 70, render: (v: string) => (
                <Tag color={v === 'pending' ? 'orange' : v === 'approved' ? 'green' : 'red'} className="text-[10px]">
                  {v === 'pending' ? '待审' : v === 'approved' ? '已通过' : '已驳回'}
                </Tag>
              )},
              { title: '操作', key: 'actions', width: 200,
                render: (_: any, record: any) => (
                  <div className="flex gap-1">
                    {record.status === 'pending' && (<>
                      <Button type="primary" size="small" className="text-[10px]"
                        icon={<CheckCircle size={12} />}
                        onClick={() => {
                          const slug = (record.levelTitle || `challenge-${record.id}`).replace(/[^a-zA-Z0-9一-鿿]/g, '-').toLowerCase().replace(/-+/g, '-');
                          onApproveDraft?.(record.id, slug, record.levelIndex ?? 1);
                        }}>通过</Button>
                      <Button danger size="small" className="text-[10px]"
                        icon={<XCircle size={12} />}
                        onClick={() => onRejectDraft?.(record.id)}>驳回</Button>
                    </>)}
                    <Popconfirm title="确定删除此草稿？" onConfirm={() => onDeleteDraft?.(record.id)}>
                      <Button size="small" className="text-[10px]" icon={<Trash2 size={12} />} danger />
                    </Popconfirm>
                  </div>
                )
              }
            ]}
          />
        </div>
      )}

      {/* ===== 已发布关卡列表 ===== */}
      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
        <CheckCircle className="w-3.5 h-3.5" /> 已发布关卡 ({filtered.length})
      </h4>
      <Table dataSource={filtered} rowKey="id" size="small"
        pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 道关卡` }}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 55, render: (v: number) => <span className="font-mono text-indigo-400 text-xs">#{v}</span> },
          { title: '关卡标题', dataIndex: 'title', ellipsis: true, render: (t: string) => <span className="font-semibold text-slate-100 text-xs">{t}</span> },
          { title: '阶段', dataIndex: 'stageId', width: 70, render: (v: number) => <span className="font-mono text-xs text-slate-400">S{v}</span> },
          { title: '主题 / 小节', key: 'topic', width: '20%', render: (_: any, r: ChallengeRecord) => (
            <span className="text-slate-400 text-xs">{r.topicName || '—'} / {r.subtopicName || '—'}</span>
          )},
          { title: '序号', dataIndex: 'levelIndex', width: 50, render: (v: number) => <span className="font-mono text-xs">{v}</span> },
          { title: '难度', dataIndex: 'difficulty', width: 60, render: (v: string) => {
            const colors: Record<string, string> = { foundation: 'default', easy: 'green', medium: 'orange', hard: 'red' };
            return <Tag color={colors[v] || 'default'} className="text-[10px]">{v}</Tag>;
          }},
          { title: '访问', dataIndex: 'accessLevel', width: 55,
            render: (v: string) => <Tag color={v === 'free' ? 'green' : v === 'vip' ? 'gold' : 'default'} className="text-[10px]">{v === 'free' ? '免费' : v === 'vip' ? 'VIP' : '会员'}</Tag>
          },
          { title: '出题人', dataIndex: 'authorId', width: 80, render: (v: number) => <span className="text-xs text-purple-400">{getAuthorName(v, users)}</span> },
          { title: '可见', dataIndex: 'isPublic', width: 60,
            render: (v: any) => <Tag color={v === false ? 'orange' : 'green'} className="text-[10px]">{v === false ? '🔒' : '🌐'}</Tag>
          },
          { title: '操作', key: 'actions', width: 120,
            render: (_: any, record: ChallengeRecord) => (
              <div className="flex gap-1">
                <Button type="primary" ghost size="small" icon={<Edit3 size={12} />} loading={editLoading && editing?.id === record.id}
                  onClick={() => openEdit(record)} />
                <Button size="small" icon={<History size={12} />} title="查看此题提交记录"
                  onClick={() => {
                    setActiveSection('submissions');
                    setFilterChallengeId(record.id);
                    void loadSubmissions(1, filterStatus, record.id, filterUserId);
                  }} />
                <Popconfirm title="确定删除此关卡？" onConfirm={() => onDeleteChallenge?.(record.id)}>
                  <Button size="small" icon={<Trash2 size={12} />} danger />
                </Popconfirm>
              </div>
            )
          }
        ]}
      />

      {/* ===== 回收站 ===== */}
      {showTrash && (
        <div className="mt-6">
          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Trash className="w-3.5 h-3.5" /> 回收站 ({trashChallenges.length})
          </h4>
          <Table
            dataSource={trashChallenges}
            rowKey="id"
            size="small"
            pagination={false}
            columns={[
              { title: 'ID', dataIndex: 'id', width: 55, render: (v: number) => <span className="font-mono text-slate-500 text-xs">#{v}</span> },
              { title: '标题', dataIndex: 'title', ellipsis: true, render: (t: string) => <span className="text-slate-400 text-xs">{t}</span> },
              { title: '阶段', dataIndex: 'stageId', width: 60, render: (v: number) => <span className="text-xs text-slate-500">S{v}</span> },
              { title: '主题/小节', key: 'topic', width: '25%', render: (_: any, r: ChallengeRecord) => (
                <span className="text-slate-500 text-xs">{r.topicName} / {r.subtopicName}</span>
              )},
              { title: '操作', key: 'actions', width: 80,
                render: (_: any, record: ChallengeRecord) => (
                  <Button size="small" type="primary" ghost
                    icon={<RotateCcw size={12} />}
                    onClick={async () => {
                      try {
                        await fetch(`/api/admin/challenges/${record.id}/restore`, {
                          method: 'PUT',
                          headers: { ...getAuthHeaders() },
                        });
                        message.success('已恢复');
                        setTrashChallenges(prev => prev.filter(c => c.id !== record.id));
                        onRefresh?.();
                      } catch { message.error('恢复失败'); }
                    }}>
                    恢复
                  </Button>
                )
              }
            ]}
          />
        </div>
      )}
      </>
      )}

      {/* 编辑弹窗 */}
      <Modal
        title={editing ? `编辑关卡 #${editing.id}: ${editing.title}` : ''}
        open={editing !== null} onOk={handleSave} onCancel={() => { setEditing(null); setEditData(null); }}
        okText="保存修改" cancelText="取消" width={800}
        confirmLoading={saving}
      >
        {editLoading && !editData ? (
          <div className="flex items-center justify-center py-20"><Spin /><span className="ml-3 text-slate-400">加载关卡数据...</span></div>
        ) : (
        <Form form={form} layout="vertical" className="mt-2">
          <Tabs items={[
            { key: 'meta', label: '元数据', children: (
              <>
              <Row gutter={16}>
                <Col span={16}><Form.Item name="title" label="关卡标题" rules={[{ required: true }]}><Input /></Form.Item></Col>
                <Col span={8}><Form.Item name="stageId" label="阶段"><Select options={STAGES.map((s, i) => i > 0 ? { value: i, label: `S${i} ${s}` } : null).filter(Boolean) as any} /></Form.Item></Col>
                <Col span={8}><Form.Item name="topicName" label="主题"><Input /></Form.Item></Col>
                <Col span={8}><Form.Item name="subtopicName" label="小节"><Input /></Form.Item></Col>
                <Col span={8}><Form.Item name="levelIndex" label="关卡序号"><Input type="number" /></Form.Item></Col>
                <Col span={8}><Form.Item name="difficulty" label="难度">
                  <Select options={[{ value: 'foundation', label: '基础' }, { value: 'easy', label: '简单' }, { value: 'medium', label: '中等' }, { value: 'hard', label: '困难' }]} />
                </Form.Item></Col>
                <Col span={8}><Form.Item name="accessLevel" label="访问权限">
                  <Select options={[{ value: 'free', label: '免费' }, { value: 'member', label: '会员' }, { value: 'vip', label: 'VIP' }]} />
                </Form.Item></Col>
              </Row>
              <Row gutter={16} className="mt-3">
                <Col span={8}>
                  <Form.Item name="isPublic" label="可见性">
                    <Select options={[{ value: true, label: '🌐 公开' }, { value: false, label: '🔒 私有' }]} />
                  </Form.Item>
                </Col>
              </Row>
              </>
            )},
            { key: 'theory', label: '理论内容', children: (
              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="theoryContent" label="Markdown 正文" className="mb-0">
                  <Input.TextArea rows={12} className="font-mono text-xs"
                    onChange={e => setPreviewMd(e.target.value)} />
                </Form.Item>
                <div>
                  <label className="block mb-2 text-xs text-slate-400">预览</label>
                  <div className="rounded bg-slate-950 border border-slate-700 p-3 h-[300px] overflow-y-auto prose prose-invert prose-xs max-w-none text-slate-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                      {previewMd || '*暂无内容*'}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )},
            { key: 'code', label: '代码', children: (
              <Row gutter={16}>
                <Col span={12}><Form.Item name="starterCode" label="起手代码"><Input.TextArea rows={8} className="font-mono text-xs bg-slate-950 text-emerald-400" /></Form.Item></Col>
                <Col span={12}><Form.Item name="solutionCode" label="标准答案"><Input.TextArea rows={8} className="font-mono text-xs bg-slate-950 text-amber-400" /></Form.Item></Col>
              </Row>
            )},
            { key: 'quizzes', label: `选择题 (${quizzes.length})`, children: (
              <div className="space-y-3">
                {quizzes.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-700 relative">
                    <button className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                      onClick={() => setQuizzes(prev => prev.filter((_, i) => i !== idx))}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Row gutter={12}>
                      <Col span={18}>
                        <label className="text-[10px] text-slate-400">题目 {idx + 1}</label>
                        <Input size="small" value={q.question}
                          onChange={e => setQuizzes(prev => prev.map((q2, i) => i === idx ? { ...q2, question: e.target.value } : q2))} />
                      </Col>
                      <Col span={6}>
                        <label className="text-[10px] text-slate-400">正确答案索引</label>
                        <InputNumber size="small" min={0} max={3} value={q.correctIndex} className="w-full"
                          onChange={v => setQuizzes(prev => prev.map((q2, i) => i === idx ? { ...q2, correctIndex: v ?? 0 } : q2))} />
                      </Col>
                    </Row>
                    <Row gutter={8} className="mt-2">
                      {q.options.map((opt, oi) => (
                        <Col span={6} key={oi}>
                          <label className="text-[10px] text-slate-500">{String.fromCharCode(65 + oi)}</label>
                          <Input size="small" value={opt}
                            onChange={e => setQuizzes(prev => prev.map((q2, i) => i === idx ? {
                              ...q2, options: q2.options.map((o, j) => j === oi ? e.target.value : o)
                            } : q2))} />
                        </Col>
                      ))}
                    </Row>
                    <div className="mt-2">
                      <label className="text-[10px] text-slate-400">解析</label>
                      <Input size="small" value={q.explanation || ''}
                        onChange={e => setQuizzes(prev => prev.map((q2, i) => i === idx ? { ...q2, explanation: e.target.value } : q2))} />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setQuizzes(prev => [...prev, { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }])}
                  className="w-full py-2 rounded-lg border border-dashed border-slate-600 text-slate-400 text-xs hover:border-purple-500 hover:text-purple-400 transition flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> 添加选择题
                </button>
              </div>
            )},
            { key: 'testcases', label: `测试样例(${editTestCases.length})`, children: (
              <CaseEditorList cases={editTestCases} onChange={setEditTestCases} />
            )},
            { key: 'evalcases', label: `通过样例(${editEvalCases.length}) 🔒`, children: (
              <CaseEditorList cases={editEvalCases} onChange={setEditEvalCases} isEval />
            )},
            { key: 'extra', label: '思考题', children: (
              <>
                <Form.Item name="thinkingQuestion" label="思考题题目"><Input.TextArea rows={3} /></Form.Item>
                <Form.Item name="aiPrompt" label="AI 评分提示词"><Input.TextArea rows={3} /></Form.Item>
              </>
            )},
          ]} />
        </Form>
        )}
      </Modal>

      {/* 提交代码详情查看弹窗 */}
      <Modal
        title={
          inspectingSub ? (
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-cyan-400" />
              <span>学员提交代码详情 - 记录 #{inspectingSub.id}</span>
            </div>
          ) : ''
        }
        open={inspectingSub !== null}
        onCancel={() => setInspectingSub(null)}
        footer={[
          <Button
            key="copy"
            icon={<Copy size={12} />}
            onClick={() => {
              if (inspectingSub?.code) {
                void navigator.clipboard.writeText(inspectingSub.code);
                message.success('已复制提交代码到剪贴板！');
              }
            }}
          >
            复制代码
          </Button>,
          <Button key="close" type="primary" onClick={() => setInspectingSub(null)}>
            关闭
          </Button>,
        ]}
        width={750}
      >
        {inspectingSub && (
          <div className="space-y-4 my-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">提交学员</span>
                <span className="font-semibold text-purple-300">
                  @{inspectingSub.username} (UID-{inspectingSub.userId})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">关卡题目</span>
                <span className="font-semibold text-slate-200">
                  #{inspectingSub.challengeId} {inspectingSub.challengeTitle}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">判题状态</span>
                <Tag color={getSubmissionTagColor(inspectingSub.status)}>
                  {inspectingSub.status}
                </Tag>
              </div>
              <div>
                <span className="text-slate-500 block">耗时 / 时间</span>
                <span className="text-slate-300">
                  {inspectingSub.executionTime !== undefined && inspectingSub.executionTime !== null
                    ? `${inspectingSub.executionTime}ms`
                    : '—'}{' '}
                  ·{' '}
                  {inspectingSub.submittedAt
                    ? inspectingSub.submittedAt.replace('T', ' ').substring(0, 19)
                    : ''}
                </span>
              </div>
            </div>

            {inspectingSub.errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono whitespace-pre-wrap">
                <span className="font-bold block mb-1">判题诊断 / 报错信息：</span>
                {inspectingSub.errorMessage}
              </div>
            )}

            <div>
              <div className="text-xs text-slate-400 font-mono mb-1.5 flex justify-between">
                <span>提交代码 ({inspectingSub.language || 'python'})：</span>
                <span className="text-slate-500">{inspectingSub.code?.length || 0} 字符</span>
              </div>
              <pre className="bg-[#030308] border border-slate-800 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap select-all max-h-[50vh] leading-relaxed">
                {inspectingSub.code}
              </pre>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}
