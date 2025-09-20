'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function DebugNotesPage() {
  const { data: session } = useSession();
  const [apiResult, setApiResult] = useState<any>(null);
  const [dbResult, setDbResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notes', {
        credentials: 'include',
      });
      const data = await response.json();
      setApiResult({
        status: response.status,
        data: data
      });
    } catch (error) {
      setApiResult({
        status: 'error',
        data: error
      });
    }
    setLoading(false);
  };

  const testDB = async () => {
    try {
      const response = await fetch('/api/debug/check-notes', {
        credentials: 'include',
      });
      const data = await response.json();
      setDbResult(data);
    } catch (error) {
      setDbResult({ error: error });
    }
  };

  useEffect(() => {
    if (session) {
      testAPI();
      testDB();
    }
  }, [session]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">调试笔记显示问题</h1>
      
      <div className="space-y-6">
        {/* 用户信息 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">当前用户信息</h2>
          <pre className="text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* API 测试结果 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API 测试结果 (/api/notes)</h2>
          <button 
            onClick={testAPI}
            disabled={loading}
            className="mb-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? '测试中...' : '重新测试API'}
          </button>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        </div>

        {/* 数据库直接查询 */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">数据库直接查询</h2>
          <button 
            onClick={testDB}
            className="mb-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            查询数据库
          </button>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(dbResult, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}