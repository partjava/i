const {test}=require('node:test');const assert=require('node:assert/strict');
const ts=require('typescript'),fs=require('node:fs'),Module=require('node:module');
const file=require('node:path').resolve(__dirname,'../app/_shared/components/ai/conversation.ts');const m=new Module(file,module);m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {conversationText,conversationHistory,cacheScope}=m.exports;
test('welcome and errors do not become notes or follow-up context',()=>{
 const welcome={id:'welcome',role:'assistant',content:'你好'};const error={id:'err-1',role:'assistant',content:'请求失败'};
 assert.equal(conversationText([welcome,error]),'');
 const messages=[welcome,{id:'u1',role:'user',content:'为什么'},error,{id:'a1',role:'assistant',content:'因为条件不满足'}];
 assert.deepEqual(conversationHistory(messages),[{role:'user',content:'为什么'},{role:'assistant',content:'因为条件不满足'}]);
 assert.ok(!conversationText(messages).includes('你好'));
});
test('history is bounded and excludes failed replies',()=>{
 const messages=Array.from({length:20},(_,i)=>({id:String(i),role:'user',content:'x'.repeat(5000)}));
 messages.push({id:'failed',role:'assistant',content:'bad',failed:true});
 assert.equal(conversationHistory(messages).length,8);assert.equal(conversationHistory(messages)[0].content.length,3000);
});
test('cache identity changes with account, route, body and preceding dialogue',async()=>{
 const base=['7','/study/a','页面正文',[]];const key=await cacheScope(...base);
 assert.equal(key,await cacheScope(...base));
 for(const [i,value] of [[0,'8'],[1,'/study/b'],[2,'修改的正文'],[3,[{role:'user',content:'上一问'}]]]){const next=[...base];next[i]=value;assert.notEqual(key,await cacheScope(...next));}
});
