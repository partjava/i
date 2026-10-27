import { describe, expect, it } from 'vitest';
import { ChallengeExecutionRequests, challengeResultLabel, shouldRecordChallengePass } from './challenge-execution-state';

describe('sample and full challenge execution', () => {
  it('never grants progression for an accepted sample or untested execution', () => {
    expect(shouldRecordChallengePass('sample', 'ACCEPTED')).toBe(false);
    expect(shouldRecordChallengePass('submit', 'EXECUTED')).toBe(false);
    expect(shouldRecordChallengePass('submit', 'ACCEPTED')).toBe(true);
    expect(challengeResultLabel('sample', 'ACCEPTED')).toBe('样例通过（未通关）');
    expect(challengeResultLabel('submit', 'ACCEPTED')).toContain('全部通过');
    expect(challengeResultLabel('submit', 'EXECUTED')).toContain('未通关');
  });
  it('selects the bounded preview and full-submit endpoints separately', () => {
    const requests = new ChallengeExecutionRequests();
    const sample = requests.beginChallenge('print(1)', 'a/b', 'sample')!;
    expect(sample.endpoint).toBe('/api/challenges/a%2Fb/run');
    expect(sample.waitTimeoutMs).toBe(70000);
    requests.finish(sample.controller);
    const full = requests.beginChallenge('print(1)', 'a/b', 'submit')!;
    expect(full.endpoint).toBe('/api/challenges/a%2Fb/submit');
    expect(full.waitTimeoutMs).toBe(240000);
  });
  it('shares a same-tick lock across modes and rejects a late sample after cancelling then submitting', () => {
    const requests = new ChallengeExecutionRequests();
    const sample = requests.beginChallenge('print(1)', '1', 'sample')!;
    expect(requests.beginChallenge('print(1)', '1', 'submit')).toBeNull();
    requests.cancel();
    const full = requests.beginChallenge('print(2)', '1', 'submit')!;
    expect(sample.controller.signal.aborted).toBe(true);
    expect(requests.isCurrent(sample.controller)).toBe(false);
    requests.finish(sample.controller);
    expect(requests.isCurrent(full.controller)).toBe(true);
    expect(full.mode).toBe('submit');
  });
});
