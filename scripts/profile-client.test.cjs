const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const file = path.resolve(__dirname, '../app/profile/profile-client.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const loaded = new Module(file, module);
loaded.filename = file;
loaded.paths = module.paths;
loaded._compile(compiled, file);
const { readProfileResponse, saveProfileAvatar, compressAvatar, getAchievementSummary } = loaded.exports;

test('accepts direct profiles and wrapped backend responses', async () => {
  assert.deepEqual(await readProfileResponse(Response.json({ image: 'old' })), { image: 'old' });
  assert.deepEqual(await readProfileResponse(Response.json({ success: true, data: { avatar: 'new' } })), { avatar: 'new' });
});
test('rejects business errors even when HTTP status is 200', async () => {
  await assert.rejects(readProfileResponse(Response.json({ success: false, message: '头像过大' })), /头像过大/);
  await assert.rejects(readProfileResponse(new Response('upstream unavailable', { status: 502 })), /502/);
});
test('avatar save preserves stored fields and updates both profile tables via profile API', async () => {
  const calls = [];
  const request = async (url, init) => {
    calls.push({ url, init });
    if (calls.length === 1) return Response.json({ name: 'Saved name', image: 'old', skills: ['Java'] });
    return Response.json({ success: true, user: JSON.parse(init.body) });
  };
  assert.equal(await saveProfileAvatar('data:image/jpeg;base64,new', request), 'data:image/jpeg;base64,new');
  assert.equal(calls[0].url, '/api/user/profile');
  assert.equal(calls[1].init.method, 'PUT');
  assert.deepEqual(JSON.parse(calls[1].init.body), {
    name: 'Saved name', image: 'data:image/jpeg;base64,new', skills: ['Java']
  });
});
test('failed profile read never sends an avatar write', async () => {
  let calls = 0;
  await assert.rejects(saveProfileAvatar('new', async () => {
    calls++; return Response.json({ message: '请登录' }, { status: 401 });
  }), /请登录/);
  assert.equal(calls, 1);
});

test('failed avatar write reports backend message', async () => {
  let calls = 0;
  await assert.rejects(saveProfileAvatar('new', async () => {
    calls++;
    return calls === 1 ? Response.json({ name: 'Alice' })
      : Response.json({ success: false, message: '保存失败' });
  }), /保存失败/);
});
test('image read errors reject instead of leaving upload pending', async () => {
  const original = global.FileReader;
  global.FileReader = class {
    readAsDataURL() { this.onerror(); }
  };
  try { await assert.rejects(compressAvatar({}), /图片读取失败/); }
  finally { global.FileReader = original; }
});
test('image decode errors reject', async () => {
  const reader = global.FileReader, image = global.Image;
  global.FileReader = class {
    readAsDataURL() { this.result = 'invalid'; this.onload(); }
  };
  global.Image = class { set src(value) { this.onerror(); } };
  try { await assert.rejects(compressAvatar({}), /图片无法解码/); }
  finally { global.FileReader = reader; global.Image = image; }
});

test('achievement progress follows real unlocked list instead of unrelated thresholds', () => {
  assert.deepEqual(getAchievementSummary([{ unlocked: true }, { unlocked: false }], { total: 10, earned: 0 }),
    { total: 2, earned: 1, percent: 50 });
  assert.deepEqual(getAchievementSummary([], { total: 15, earned: 3 }), { total: 15, earned: 3, percent: 20 });
  assert.deepEqual(getAchievementSummary([], { total: 0, earned: 0 }), { total: 0, earned: 0, percent: 0 });
});
