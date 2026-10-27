const statusLabels: Record<string, string> = {
  ACCEPTED: 'Accepted 通过', EXECUTED: 'Executed 执行完成（未评测）',
  WRONG_ANSWER: 'Wrong Answer 答案错误', COMPILE_ERROR: 'Compile Error 编译错误',
  RUNTIME_ERROR: 'Runtime Error 运行错误', TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded 执行超时',
  OUTPUT_LIMIT_EXCEEDED: 'Output Limit Exceeded 输出超限', MEMORY_LIMIT_EXCEEDED: 'Memory Limit Exceeded 内存超限',
  SYSTEM_BUSY: 'System Busy 系统繁忙', SERVICE_UNAVAILABLE: 'Service Unavailable 执行服务不可用',
  SYSTEM_ERROR: 'System Error 系统错误', NETWORK_ERROR: 'Network Error 网络连接失败',
  REQUEST_TIMEOUT: 'Request Timeout 等待结果超时', CANCELLED: '已停止等待（服务端任务可能仍在运行）',
};
export const normalizeExecutionStatus = (status: unknown): string =>
  typeof status === 'string' && Object.prototype.hasOwnProperty.call(statusLabels, status) ? status : 'SYSTEM_ERROR';
export const executionLabel = (status: string): string => statusLabels[normalizeExecutionStatus(status)];
export const standaloneSucceeded = (ok: boolean, result: {success?: unknown; status?: unknown}): boolean =>
  ok && result.success === true && result.status === 'ACCEPTED';

// A synchronous lock also rejects repeated clicks before React has rendered loading state.
export class ExecutionRequests {
  private current: AbortController | null = null;
  begin(code: string): AbortController | null {
    if (!code.trim() || this.current) return null;
    this.current = new AbortController();
    return this.current;
  }
  cancel(): void {
    this.current?.abort();
    this.current = null;
  }
  isCurrent(request: AbortController): boolean {
    return this.current === request && !request.signal.aborted;
  }
  finish(request: AbortController): void {
    if (this.current === request) this.current = null;
  }
}

export class ExecutionResponseError extends Error {
  constructor(public readonly status: string, message: string) { super(message); }
}
interface ExecutionEnvelope {
  success?: boolean; status?: unknown; output?: string; error?: string;
  time?: number; memory?: number; message?: string;
  data?: { status?: unknown; runtimeMs?: number; message?: string };
}
export async function readExecutionResponse(response: Response): Promise<ExecutionEnvelope> {
  try {
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error('invalid response');
    return result as ExecutionEnvelope;
  } catch {
    const status = response.status === 429 ? 'SYSTEM_BUSY' : response.status >= 502 ? 'SERVICE_UNAVAILABLE' : 'SYSTEM_ERROR';
    throw new ExecutionResponseError(status, `HTTP ${response.status}: 执行服务未返回有效 JSON 结果`);
  }
}

interface SubmittedSource { code: string; language?: string; input?: string }
export const isSubmittedSourceStale = (submitted: SubmittedSource | null, current: SubmittedSource): boolean =>
  submitted !== null && (submitted.code !== current.code || submitted.language !== current.language || submitted.input !== current.input);
