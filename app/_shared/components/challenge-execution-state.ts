import { ExecutionRequests, executionLabel } from './execution-state';

export type ChallengeExecutionMode = 'sample' | 'submit';

export const shouldRecordChallengePass = (mode: ChallengeExecutionMode, status: string): boolean =>
  mode === 'submit' && status === 'ACCEPTED';

export function challengeResultLabel(mode: ChallengeExecutionMode, status: string): string {
  if (status === 'ACCEPTED') return mode === 'sample' ? '样例通过（未通关）' : 'Accepted 全部通过';
  if (status === 'EXECUTED') return '执行完成（无测试用例，未通关）';
  return executionLabel(status);
}

export class ChallengeExecutionRequests extends ExecutionRequests {
  beginChallenge(code: string, challengeId: string, mode: ChallengeExecutionMode) {
    const controller = this.begin(code);
    if (!controller) return null;
    return {
      controller, mode,
      endpoint: `/api/challenges/${encodeURIComponent(challengeId)}/${mode === 'sample' ? 'run' : 'submit'}`,
      waitTimeoutMs: mode === 'sample' ? 70000 : 240000,
    };
  }
}
