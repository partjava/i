const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript'), fs = require('node:fs'), Module = require('node:module');
const file = require('node:path').resolve(__dirname, '../app/challenges/components/challenge-ai-context.ts');
const loaded = new Module(file, module);
loaded._compile(ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {buildChallengeContext} = loaded.exports;
const detail = {id:'one',name:'循环',levelTitle:'求和',theory:'循环基础',starterCode:'OLD STARTER',expectedOutput:'55',thinkingQuestion:'为什么终止？',conceptualQuizzes:[{question:'循环几次？',options:['十次','九次'],answer:0,explanation:'SECRET EXPLANATION'}],solutionCode:'SECRET SOLUTION'};
const state = {detail,nodeName:'Python',activeTab:'conceptual',code:'print(sum(range(11)))',testResults:'NameError',thinkingAnswer:'边界条件',selectedAnswers:{0:1}};
test('sends current questions, options, answer selection, edited code and run result without solution leakage',()=>{
 const ctx=buildChallengeContext(state);
 for(const text of ['循环几次？','A. 十次','学生已选：B','为什么终止？','边界条件','print(sum(range(11)))','NameError','理解测试']) assert.ok(ctx.includes(text),text);
 for(const text of ['OLD STARTER','SECRET SOLUTION','SECRET EXPLANATION']) assert.ok(!ctx.includes(text),text);
});
test('switching level uses new state and accepts object thinking questions',()=>{
 const ctx=buildChallengeContext({...state,detail:{...detail,id:'two',levelTitle:'新题',thinkingQuestion:{question:'新思考题'},conceptualQuizzes:[]},code:'NEW CODE',testResults:'',selectedAnswers:{}});
 assert.ok(ctx.includes('新题（two）'));assert.ok(ctx.includes('新思考题'));assert.ok(ctx.includes('尚未运行'));assert.ok(!ctx.includes('循环几次？'));assert.ok(!ctx.includes(state.code));
});
test('bounds long content and marks truncation',()=>{const ctx=buildChallengeContext({...state,code:'x'.repeat(30000),testResults:'e'.repeat(30000)});assert.ok(ctx.length<12000);assert.ok(ctx.includes('[内容已截断]'));});
