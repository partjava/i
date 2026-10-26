const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const Module = require('node:module');
const file = require('node:path').resolve(__dirname, '../app/_shared/components/ai-robot/types.ts');
const loaded = new Module(file, module);
loaded._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, file);
const { collectCurrentPageContext } = loaded.exports;
test('book context takes priority over navigation and chat text and tracks active spread', () => {
 const previous = { document: global.document, window: global.window };
 let text = '基本算术运算符\nint a = 10, b = 3;';
 let removed = false;
 const root = { querySelector: () => ({textContent:'运算符'}), cloneNode: () => ({get textContent() {return text;}, querySelectorAll: () => [{remove() {removed = true;}}]}) };
 global.document = {title:'PartJava', querySelector: selector => selector === '#study-book-root' ? root : {textContent:'导航 + 聊天旧内容'}};
 global.window = { location:{pathname:'/study/computer/cpp/operators'} };
 try {
  const context = collectCurrentPageContext();
  assert.ok(context.contextText.includes('int a = 10, b = 3;'));
  assert.ok(!context.contextText.includes('聊天旧内容'));
  assert.ok(removed);
  text = '关系与逻辑运算符';
  assert.ok(collectCurrentPageContext().contextText.includes(text));
  assert.ok(!collectCurrentPageContext().contextText.includes('int a'));
 } finally { Object.assign(global, previous); }
});
test('context collector is safe during server rendering', () => {
 assert.deepEqual(collectCurrentPageContext(), {pathname:'', contextText:''});
});
