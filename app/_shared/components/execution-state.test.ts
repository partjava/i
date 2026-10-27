import { describe, expect, it } from 'vitest';
import { ExecutionRequests, executionLabel, standaloneSucceeded, normalizeExecutionStatus, readExecutionResponse, ExecutionResponseError, isSubmittedSourceStale } from './execution-state';

describe('execution reporting', () => {
  it('requires an accepted result and HTTP success, never a truthy envelope alone', () => {
    expect(standaloneSucceeded(true, { success: true, status: 'ACCEPTED' })).toBe(true);
    for (const status of ['COMPILE_ERROR', 'RUNTIME_ERROR', 'SERVICE_UNAVAILABLE', 'EXECUTED', undefined]) {
      expect(standaloneSucceeded(true, { success: true, status })).toBe(false);
    }
    expect(standaloneSucceeded(false, { success: true, status: 'ACCEPTED' })).toBe(false);
  });
  it('keeps infrastructure errors and untested execution distinct from wrong answers', () => {
    expect(executionLabel('COMPILE_ERROR')).toContain('编译');
    expect(executionLabel('SERVICE_UNAVAILABLE')).toContain('不可用');
    expect(executionLabel('EXECUTED')).toContain('未评测');
    expect(normalizeExecutionStatus('mystery')).toBe('SYSTEM_ERROR');
  });
});

describe('request lifecycle', () => {
  it('blocks whitespace and same-tick duplicate runs', () => {
    const requests = new ExecutionRequests();
    expect(requests.begin('  ')).toBeNull();
    expect(requests.begin('print(1)')).not.toBeNull();
    expect(requests.begin('print(2)')).toBeNull();
  });
  it('invalidates late responses after cancellation, navigation or unmount', () => {
    const requests = new ExecutionRequests();
    const old = requests.begin('print(1)')!;
    requests.cancel();
    expect(old.signal.aborted).toBe(true);
    expect(requests.isCurrent(old)).toBe(false);
    const next = requests.begin('print(2)')!;
    requests.finish(old);
    expect(requests.isCurrent(next)).toBe(true);
    requests.finish(next);
    expect(requests.begin('print(3)')).not.toBeNull();
  });
});

describe('execution transport errors', () => {
  it('reports non-JSON service failures as service unavailable, not network or success', async () => {
    await expect(readExecutionResponse(new Response('upstream down', { status: 503 })))
      .rejects.toMatchObject({ status: 'SERVICE_UNAVAILABLE' });
    await expect(readExecutionResponse(new Response('rate limit', { status: 429 })))
      .rejects.toMatchObject({ status: 'SYSTEM_BUSY' });
  });
  it('rejects malformed successful envelopes instead of fabricating a result', async () => {
    for (const body of ['not JSON', 'null', '[]']) {
      await expect(readExecutionResponse(new Response(body)))
        .rejects.toBeInstanceOf(ExecutionResponseError);
    }
  });
});

describe('submitted source identity', () => {
  it('marks edited code or stdin as old without transferring the accepted result', () => {
    const submitted = { code: 'print(1)', language: 'python', input: '' };
    expect(isSubmittedSourceStale(submitted, submitted)).toBe(false);
    expect(isSubmittedSourceStale(submitted, { ...submitted, code: 'print(2)' })).toBe(true);
    expect(isSubmittedSourceStale(submitted, { ...submitted, input: 'changed' })).toBe(true);
    expect(isSubmittedSourceStale(submitted, { ...submitted, language: 'javascript' })).toBe(true);
    expect(isSubmittedSourceStale(null, submitted)).toBe(false);
  });
});
