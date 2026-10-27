import { useEffect, useRef, useState } from 'react';
import { ExecutionRequests, executionLabel, normalizeExecutionStatus, standaloneSucceeded, readExecutionResponse, ExecutionResponseError, isSubmittedSourceStale } from './execution-state';

export function useStandaloneExecution(code: string, language: string, input: string) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [submitted, setSubmitted] = useState<{code: string; language: string; input: string} | null>(null);
  const requests = useRef(new ExecutionRequests());
  useEffect(() => () => requests.current.cancel(), []);
  useEffect(() => {
    requests.current.cancel();
    setIsRunning(false);
    setOutput('');
    setSubmitted(null);
  }, [language]);

  const cancelRun = () => {
    requests.current.cancel();
    setIsRunning(false);
    setOutput(executionLabel('CANCELLED'));
  };
  const runCode = async () => {
    const request = requests.current.begin(code);
    if (!request) return;
    setSubmitted({ code, language, input });
    setIsRunning(true);
    setOutput('正在请求执行服务...');
    const timeout = setTimeout(() => {
      if (!requests.current.isCurrent(request)) return;
      requests.current.cancel();
      setIsRunning(false);
      setOutput(`${executionLabel('REQUEST_TIMEOUT')}\n服务端任务可能仍在运行。`);
    }, 60000);
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, input }), signal: request.signal,
      });
      const result = await readExecutionResponse(response);
      if (!requests.current.isCurrent(request)) return;
      const succeeded = standaloneSucceeded(response.ok, result);
      const status = succeeded ? 'ACCEPTED' : result.status === 'ACCEPTED' ? 'SYSTEM_ERROR' : normalizeExecutionStatus(result.status);
      setOutput(`${succeeded ? '代码执行完成' : '代码执行失败'}\n状态: ${executionLabel(status)}\n语言: ${language}\n执行时间: ${result.time ?? '未知'}秒\n内存使用: ${result.memory ?? '未知'}KB\n输入数据: ${input || '无'}\n\n输出结果:\n${result.output || '(无输出)'}${result.error ? `\n\n错误信息:\n${result.error}` : ''}`);
    } catch (error) {
      if (requests.current.isCurrent(request)) {
        setOutput(`${executionLabel(error instanceof ExecutionResponseError ? error.status : 'NETWORK_ERROR')}\n${error instanceof Error ? error.message : '未收到有效执行结果'}`);
      }
    } finally {
      clearTimeout(timeout);
      if (requests.current.isCurrent(request)) {
        requests.current.finish(request);
        setIsRunning(false);
      }
    }
  };
  const stale = isSubmittedSourceStale(submitted, { code, language, input });
  return { output, setOutput, isRunning, runCode, cancelRun, stale };
}
