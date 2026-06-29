const assert = require('assert');
const path = require('path');

const {
  loadChallengeBank,
  validateChallenge,
  normalizeChallengeForDb,
} = require('./seedStarChallengesFromBank');

const bankDir = path.join(__dirname, '..', 'challenges_bank');

function testLoadsStageOneBank() {
  const challenges = loadChallengeBank(bankDir);

  assert.strictEqual(challenges.length, 14);
  assert.deepStrictEqual(
    challenges.map((item) => item.subtopicName),
    [
      '计算机组成原理',
      '操作系统',
      '计算机网络',
      '编码系统',
      '常用命令',
      '文件系统',
      '权限管理',
      '进程管理',
      'Shell脚本',
      'init/clone',
      'add/commit/push',
      'branch/merge',
      'rebase',
      'conflict解决',
    ]
  );
}

function testRejectsInvalidQuizAnswerIndex() {
  const invalid = {
    slug: 'bad-quiz',
    stageId: 1,
    topicName: '计算机基础',
    subtopicName: '计算机网络',
    levelIndex: 1,
    levelTitle: '错误选择题',
    theoryContent: 'body',
    latexFormulas: [],
    starterCode: 'pass',
    solutionCode: 'pass',
    expectedOutput: 'ok',
    testCases: [{ name: 'sample', input: {}, expected: 'ok' }],
    quizzes: [
      {
        question: 'bad',
        options: ['A', 'B'],
        answer: 3,
        explanation: 'bad',
      },
    ],
    thinkingQuestion: 'why',
    aiPrompt: 'score',
  };

  assert.throws(
    () => validateChallenge(invalid, 'bad.json'),
    /quiz answer out of range/
  );
}

function testNormalizesChallengeForDatabase() {
  const [challenge] = loadChallengeBank(bankDir);
  const normalized = normalizeChallengeForDb(challenge);

  assert.strictEqual(normalized.stageId, 1);
  assert.strictEqual(normalized.subtopicName, '计算机组成原理');
  assert.strictEqual(normalized.levelIndex, 1);
  assert.strictEqual(typeof normalized.latexFormulasJson, 'string');
  assert.strictEqual(typeof normalized.testCasesJson, 'string');
  assert.strictEqual(normalized.quizzes.length, 2);
}

function run() {
  testLoadsStageOneBank();
  testRejectsInvalidQuizAnswerIndex();
  testNormalizesChallengeForDatabase();
  console.log('seedStarChallengesFromBank tests passed');
}

run();
